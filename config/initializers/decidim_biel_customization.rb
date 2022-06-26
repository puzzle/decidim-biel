# frozen_string_literal: true

# Decidim::DiffCell.include DecidimBiel::DiffCell
# Decidim::Proposals::ProposalMCell.include DecidimBiel::Proposals::ProposalMCell
# Decidim::ParticipatoryProcesses::ProcessMCell.include DecidimBiel::ParticipatoryProcesses::ProcessMCell
# Decidim::Proposals::Admin::ProposalNoteCreatedEvent.prepend DecidimBiel::Proposals::Admin::ProposalNoteCreatedEvent
# Decidim::Forms::AnswerQuestionnaire.prepend DecidimBiel::Forms::AnswerQuestionnaire
# Decidim::Assemblies::AssemblyMCell.prepend DecidimBiel::Assemblies::AssemblyMCell
# Decidim::Meetings::MeetingMCell.prepend DecidimBiel::Meetings::MeetingMCell
# Decidim::Meetings::MeetingPresenter.prepend DecidimBiel::Meetings::MeetingPresenter
# Decidim::Meetings::ContentBlocks::UpcomingEventsCell.prepend DecidimBiel::Meetings::ContentBlocks::UpcomingEventsCell

# Setup a controller hook to setup the sms gateway before the
# request is processed. This is done through a notification to
# get access to the `current_*` environment variables within
# Decidim. Taken and adapted from the term_customizer module.
# ActiveSupport::Notifications.subscribe 'start_processing.action_controller' do |_name, _started, _finished, _unique_id, data|
#   DecidimBiel::Verifications::Sms::AspsmsGateway.organization = data[:headers].env['decidim.current_organization']
# end

# module Decidim
#   module Map
#     module Provider
#       module DynamicMap
#         autoload :GisLuzern, 'decidim/map/provider/dynamic_map/gis_luzern'
#       end
#     end
#   end
# end
