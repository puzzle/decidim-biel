# frozen_string_literal: true

module DecidimBiel
  module Proposals
    module HighlightedProposalsForComponentCell
      def proposals
        super.where.not(state: ['rejected, withdrawn'])
      end
    end
  end
end
