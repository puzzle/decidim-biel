# frozen_string_literal: true

require 'active_support/concern'

module DecidimBiel
  module Proposals
    module HighlightedProposalsCell
      extend ActiveSupport::Concern

      included do
        def published_components
          super.where.not(state: ['rejected, withdrawn'])
        end
      end
    end
  end
end
