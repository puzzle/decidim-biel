##################################################################
#                            Variables                           #
##################################################################

# Versioning
ARG RUBY_VERSION="2.7"
ARG BUNDLER_VERSION="2.3.25"
ARG NODEJS_VERSION="16"
ARG YARN_VERSION="1.22.10"
ARG CYCLONEDX_CLI_VERSION="0.24.2"

# Packages
# ARG BUILD_PACKAGES="git libicu-dev libpq-dev nodejs npm"
ARG BUILD_PACKAGES="nodejs build-essential"
# ARG RUN_PACKAGES="clamav clamav-daemon git graphicsmagick libicu-dev libpq5 nodejs poppler-utils"
ARG RUN_PACKAGES="clamav clamav-daemon nodejs libpq5"

# Scripts
ARG PRE_INSTALL_SCRIPT="curl -sL https://deb.nodesource.com/setup_${NODEJS_VERSION}.x -o /tmp/nodesource_setup.sh && bash /tmp/nodesource_setup.sh"
ARG INSTALL_SCRIPT="node -v && npm -v && npm install -g yarn && yarn set version ${YARN_VERSION}"
ARG PRE_BUILD_SCRIPT
ARG BUILD_SCRIPT="yarn install && bundle exec rake assets:precompile"
ARG POST_BUILD_SCRIPT="echo \"(built at: $(date '+%Y-%m-%d %H:%M:%S'))\" > /app-src/BUILD_INFO"

# Bundler specific
ARG BUNDLE_WITHOUT="development:metrics:test"

# App specific
ARG RAILS_ENV="production"
ARG RACK_ENV="production"
ARG NODE_ENV="production"
ARG RAILS_HOST_NAME="unused.example.net"
ARG SECRET_KEY_BASE="needs-to-be-set"

ARG CUSTOMIZATION_OUTPUT="false"
ARG PUZZLE_DEP_TRACK_TOKEN
ARG PUZZLE_DEP_TRACK_URL
ARG SKIP_MEMCACHE_CHECK="true"

# Github specific
ARG GITHUB_SHA
ARG GITHUB_REPOSITORY
ARG GITHUB_REF_NAME
ARG BUILD_COMMIT="$GITHUB_SHA"
ARG BUILD_REPO="$GITHUB_REPOSITORY"
ARG BUILD_REF="$GITHUB_REF_NAME"

# # Gitlab specific
# ARG CI_COMMIT_SHA
# ARG CI_REPOSITORY_URL
# ARG CI_COMMIT_REF_NAME
# ARG BUILD_COMMIT="$CI_COMMIT_SHA"
# ARG BUILD_REPO="$CI_REPOSITORY_URL"
# ARG BUILD_REF="$CI_COMMIT_REF_NAME"

# # Openshift specific
# ARG OPENSHIFT_BUILD_COMMIT
# ARG OPENSHIFT_BUILD_SOURCE
# ARG OPENSHIFT_BUILD_REFERENCE
# ARG BUILD_COMMIT="$OPENSHIFT_BUILD_COMMIT"
# ARG BUILD_REPO="$OPENSHIFT_BUILD_SOURCE"
# ARG BUILD_REF="$OPENSHIFT_BUILD_REFERENCE"

# Runtime ENV Vars
ARG PS1='$SENTRY_CURRENT_ENV> '
ARG TZ="Europe/Zurich"

##################################################################
#                            Build Stage                         #
##################################################################

FROM ruby:${RUBY_VERSION} AS build

# arguments for steps
ARG PRE_INSTALL_SCRIPT
ARG BUILD_PACKAGES
ARG INSTALL_SCRIPT
ARG BUNDLER_VERSION
ARG PRE_BUILD_SCRIPT
ARG BUNDLE_WITHOUT
ARG BUILD_SCRIPT
ARG POST_BUILD_SCRIPT

# arguments potentially used by steps
ARG BUILD_COMMIT
ARG BUILD_REPO
ARG CUSTOMIZATION_OUTPUT
ARG CYCLONEDX_CLI_VERSION
ARG NODE_ENV
ARG PUZZLE_DEP_TRACK_TOKEN
ARG PUZZLE_DEP_TRACK_URL
ARG RACK_ENV
ARG RAILS_ENV
ARG RAILS_HOST_NAME
ARG SECRET_KEY_BASE
ARG SKIP_MEMCACHE_CHECK
ARG TZ

# Set build shell
SHELL ["/bin/bash", "-c"]

# Use root user
USER root

RUN bash -vxc "${PRE_INSTALL_SCRIPT:-"echo 'no PRE_INSTALL_SCRIPT provided'"}"

# Install dependencies
RUN export DEBIAN_FRONTEND=noninteractive \
 && apt-get update \
 && apt-get upgrade -y \
 && apt-get install -y --no-install-recommends ${BUILD_PACKAGES}

RUN bash -vxc "${INSTALL_SCRIPT:-"echo 'no INSTALL_SCRIPT provided'"}"

# Install specific versions of dependencies
RUN gem install bundler:${BUNDLER_VERSION} --no-document

# TODO: Load artifacts

# set up app-src directory
COPY . /app-src
WORKDIR /app-src

RUN bash -vxc "${PRE_BUILD_SCRIPT:-"echo 'no PRE_BUILD_SCRIPT provided'"}"

# install gems and build the app
RUN bundle config set --local deployment 'true' \
 && bundle config set --local without ${BUNDLE_WITHOUT} \
 && bundle package \
 && bundle install \
 && bundle clean

RUN bash -vxc "${BUILD_SCRIPT:-"echo 'no BUILD_SCRIPT provided'"}"

RUN bash -vxc "if [[ '${PUZZLE_DEP_TRACK_TOKEN}' ]]; then \
    curl 'https://github.com/CycloneDX/cyclonedx-cli/releases/download/v${CYCLONEDX_CLI_VERSION}/cyclonedx-linux-x64' \
         -O /tmp/cyclonedx-cli \
 && chmod a+x /tmp/cyclonedx-cli \
 && /tmp/cyclonedx-cli add files \
                       --no-input \
                       --base-path=/app-src \
                       --output-file /app-src/sbom.json \
                       --output-format json \
                       --exclude /.git/** \
 && curl -X 'POST' -i '${PUZZLE_DEP_TRACK_URL}' \
         -H 'Content-Type: multipart/form-data' \
         -H 'X-Api-Key: ${PUZZLE_DEP_TRACK_TOKEN}' \
         -F 'autoCreate=true' \
         -F 'projectName=${BUILD_REPO}' \
         -F 'projectVersion=${BUILD_COMMIT}' \
         -F 'bom=@/app-src/sbom.json'; \
fi"

RUN bash -vxc "${POST_BUILD_SCRIPT:-"echo 'no POST_BUILD_SCRIPT provided'"}"

# TODO: Save artifacts

RUN rm -rf vendor/cache/ .git spec/ node_modules/


##################################################################
#                            Run Stage                           #
##################################################################

# This image will be replaced by Openshift
FROM ruby:${RUBY_VERSION}-slim AS app

# Set runtime shell
SHELL ["/bin/bash", "-c"]

# Add user
RUN adduser --disabled-password --uid 1001 --gid 0 --gecos "" app

# arguments for steps
ARG RUN_PACKAGES
ARG BUNDLER_VERSION
ARG BUNDLE_WITHOUT

# arguments potentially used by steps
ARG NODE_ENV
ARG RACK_ENV
ARG RAILS_ENV

# data persisted in the image
ARG PS1
ARG TZ
ARG BUILD_COMMIT
ARG BUILD_REPO
ARG BUILD_REF

# Runtime ENV Vars
ENV PS1="${PS1}" \
    TZ="${TZ}" \
    BUILD_REPO="${BUILD_REPO}" \
    BUILD_REF="${BUILD_REF}" \
    BUILD_COMMIT="${BUILD_COMMIT}" \
    NODE_ENV="${NODE_ENV}" \
    RAILS_ENV="${RAILS_ENV}" \
    RACK_ENV="${RACK_ENV}"

# Prepare apt-get
RUN export DEBIAN_FRONTEND=noninteractive \
 && apt-get update \
 && apt-get upgrade -y \
 && apt-get install -y ${RUN_PACKAGES} vim curl less \
 && apt-get clean \
 && rm -rf /var/cache/apt/archives/* /var/lib/apt/lists/* /tmp/* /var/tmp/* \
 && truncate -s 0 /var/log/*log \
 # HACK: Maybe move to different image... gives clamav the right to execute
 && usermod -a -G 0 clamav

# Copy deployment ready source code from build
COPY --from=build /app-src /app-src
COPY docker/ /
WORKDIR /app-src

# Set group permissions to app folder
RUN chgrp -R 0 /app-src \
 && chmod -R u+w,g=u /app-src

# HACK: Maybe move to different image...
# Set group permissions to app folder and help clamav to start
RUN mkdir /var/run/clamav \
 && chown clamav /run/clamav \
 && sed -i 's/^chown/# chown/' /etc/init.d/clamav-daemon \
 && chgrp \
      -R 0 \
      /app-src \
      /var/log/clamav \
      /var/lib/clamav \
      /var/run/clamav \
      /run/clamav \
 && chmod \
      -R u+w,g=u \
      /app-src \
      /var/log/clamav \
      /var/lib/clamav \
      /var/run/clamav \
      /run/clamav \
      /run/clamav \
      /opt/bin/start_clamd \
 && freshclam

# support bin-stubs
ENV HOME=/app-src \
    PATH=/app-src/bin:$PATH

# Install specific versions of dependencies
RUN gem install bundler:${BUNDLER_VERSION} --no-document

# Use cached gems
RUN bundle config set --local deployment 'true' \
 && bundle config set --local without ${BUNDLE_WITHOUT} \
 && bundle install

USER 1001

CMD ["bundle", "exec", "puma", "-t", "8"]
