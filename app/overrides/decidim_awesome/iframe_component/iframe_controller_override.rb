# frozen_string_literal: true

Decidim::DecidimAwesome::IframeComponent::IframeController.class_eval do
  def sanitize(html)
    sanitizer = Rails::Html::SafeListSanitizer.new
    sanitizer.sanitize(html, tags: %w(iframe div script), attributes: Decidim::DecidimAwesome::IframeComponent::IframeController::ALLOWED_ATTRIBUTES + ['class'])
  end
end