# frozen_string_literal: true

# Overwrites the HashtagRenderer to use a fixed regex
Decidim::ContentRenderers::HashtagRenderer.class_eval do
  remove_const(:GLOBAL_ID_REGEX)
  const_set(:GLOBAL_ID_REGEX, %r{gid://[\w-]*/Decidim::Hashtag/(\d+)/?(_?)([[:alnum:]](?:[[:alnum:]]|_)*)?\b}.freeze)
end