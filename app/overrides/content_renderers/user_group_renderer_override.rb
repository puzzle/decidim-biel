# frozen_string_literal: true

# Overwrites the UserGroupRenderer to use a fixed regex
Decidim::ContentRenderers::UserGroupRenderer.class_eval do
  remove_const(:GLOBAL_ID_REGEX)
  const_set(:GLOBAL_ID_REGEX, %r{gid://[\w-]+/Decidim::UserGroup/\d+}.freeze)
end