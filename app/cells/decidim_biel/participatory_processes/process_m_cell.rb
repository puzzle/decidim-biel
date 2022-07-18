# frozen_string_literal: true

require 'active_support/concern'

module DecidimBiel
  module ParticipatoryProcesses
    module ProcessMCell
      extend ActiveSupport::Concern

      included do
        def resource_image_path
          # model.hero_image.url || current_organization.highlighted_content_banner_image.url
          if model.hero_image.attached?
            model.attached_uploader(:hero_image).path
          elsif current_organization.highlighted_content_banner_image.present?
            rails_blob_path(current_organization.highlighted_content_banner_image)
          else
            asset_pack_path('media/images/organization-default-image.png')
          end
        end
      end
    end
  end
end
