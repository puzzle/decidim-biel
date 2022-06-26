# frozen_string_literal: true

source 'https://rubygems.org'

DECIDIM_VERSION = '0.26.2'

ruby RUBY_VERSION

gem 'execjs'

gem 'decidim', DECIDIM_VERSION
gem 'decidim-proposals', DECIDIM_VERSION
# gem 'decidim-consultations', DECIDIM_VERSION
gem 'decidim-conferences', DECIDIM_VERSION
gem 'decidim-decidim_awesome', '~> 0.8.1'
gem 'decidim-initiatives', DECIDIM_VERSION

gem 'decidim-antivirus', github: 'mainio/decidim-module-antivirus'
gem 'decidim-term_customizer', github: 'mainio/decidim-module-term_customizer'

# gem 'decidim-jitsi_meetings', github: 'puzzle/decidim-module-jitsi-meetings', tag: DECIDIM_VERSION
# gem 'decidim-navbar_links', github: 'puzzle/decidim-module-navbar_links', tag: "v#{DECIDIM_VERSION}"
# gem 'decidim-navigation_maps', '~> 1.2.0'
# gem 'decidim-url_aliases', github: 'OpenSourcePolitics/decidim-urlaliases'

gem 'aws-sdk-s3', require: false
gem 'binding_of_caller'
gem 'bootsnap'
gem 'dalli'
gem 'delayed_job_active_record'
gem 'faker'
gem 'lograge'
gem 'prometheus_exporter'
gem 'byebug'
gem 'pry-byebug'
gem 'pry-rails'
gem 'puma'
gem 'sentry-raven'
gem 'uglifier'

group :development, :test do
  gem 'better_errors'
  gem 'binding_of_caller'
  gem 'pry-byebug'

  gem 'decidim-dev', DECIDIM_VERSION
end

group :development do
  gem 'letter_opener_web'
  gem 'listen'
  gem 'spring'
  gem 'spring-watcher-listen'
  gem 'web-console'
end

group :production do
  gem 'bleib'
end
