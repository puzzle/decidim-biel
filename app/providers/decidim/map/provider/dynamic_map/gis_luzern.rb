# frozen_string_literal: true

module Decidim
  module Map
    module Provider
      module DynamicMap
        class GisLuzern < ::Decidim::Map::DynamicMap
          def builder_options
            configuration.merge(super)
          end

          # A builder for the GIS LU maps which need to be configured differently
          # than "normal" OSM based tile service providers.
          class Builder < Decidim::Map::DynamicMap::Builder
            # @see Decidim::Map::DynamicMap::Builder#javascript_snippets
            def javascript_snippets
              template.javascript_pack_tag('decidim/gis_luzern')
            end
          end
        end
      end
    end
  end
end
