#!/bin/bash

set -e

bundle install

bin/rails db:migrate RAILS_ENV=development

echo "a = Decidim::System::Admin.where(email: 'decidim@puzzle.ch').first_or_initialize; a.password = 'decidim'; a.save(validate: false)" | bundle exec rails console

if [ ! -f "/db-init/done" ]; then
  echo 'ActiveRecord::Base.connection.execute(IO.read(".docker/database-init.sql"))' | bundle exec rails console
  echo 'user = Decidim::User.where(email: "decidim@puzzle.ch").first; user.invite!; "http://localhost:3000/users/invitation/accept?invitation_token=#{user.raw_invitation_token}"' | bundle exec rails console
  #rake decidim_anonymous_proposals:generate_anonymous_group[Anonym,Anonym,anonym@dialogluzern.ch]
  date > /db-init/done
else
  echo "Skipping database initialization because already done on $(cat /db-init/done)"
fi

# Fix bundler / rubygems / rails bug that causes puma to fail
# https://github.com/rubygems/rubygems/issues/3279
bundle binstubs bundler --force

exec "$@"
