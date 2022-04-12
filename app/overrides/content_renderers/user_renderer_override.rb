# frozen_string_literal: true

# Overwrites the UserRenderer to use a fixed regex
Decidim::ContentRenderers::UserRenderer.class_eval do
  remove_const(:GLOBAL_ID_REGEX)
  const_set(:GLOBAL_ID_REGEX, %r{gid://[\w-]+/Decidim::User/\d+}.freeze)
end