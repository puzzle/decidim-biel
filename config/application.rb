# frozen_string_literal: true

require_relative 'boot'

require 'decidim/rails'
# Add the frameworks used by your app that are not loaded by Decidim.
require 'action_cable/engine'
# require 'action_mailbox/engine'
# require 'action_text/engine'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module DecidimBiel
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    config.autoloader = :zeitwerk

    # This option silences the logging of Redirector related SQL queries in your log file
    # config.redirector.silence_sql_logs = true

    Raven.configure do |config|
      config.dsn = ENV['SENTRY_DSN']
      config.current_environment = ENV['SENTRY_CURRENT_ENV']
    end
  end
end
