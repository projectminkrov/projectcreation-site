-- Allow common safe image formats for avatar uploads (run once in Supabase SQL Editor)
-- SVG excluded: can contain embedded JS (XSS risk when served with image/svg+xml content-type)
UPDATE storage.buckets
SET
  allowed_mime_types = ARRAY[
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/avif'
  ],
  file_size_limit = 5242880  -- 5 MB
WHERE id = 'avatars';
