# frozen_string_literal: true

require 'active_support/concern'

module DecidimBiel
  module ParticipatoryProcesses
    module ProcessMCell
      extend ActiveSupport::Concern

      included do
        def resource_image_path
          model.hero_image.url || current_organization.highlighted_content_banner_image.url
        end

        def step_cta_path
          'https://www.labcity.ch'
        end
      end
    end
  end
end
