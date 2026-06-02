-- ============================================================
-- Migration 005: Newsletter subscribers
--
-- Stores every subscription as a backup regardless of which
-- email-sending service (Kit/ConvertKit, etc.) is in use.
-- Writes are performed exclusively by the server-side Cloudflare
-- Pages Function using the Supabase service role key, which
-- bypasses RLS. No client access is granted.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  email         TEXT        NOT NULL,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  source        TEXT        NOT NULL DEFAULT 'website',
  CONSTRAINT newsletter_subscribers_email_key UNIQUE (email)
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- No policies = anon and authenticated roles are fully denied.
REVOKE ALL ON public.newsletter_subscribers FROM anon, authenticated;

-- The CF Pages Function uses the service role key, which needs explicit grants
-- even though it bypasses RLS.
GRANT INSERT, SELECT ON public.newsletter_subscribers TO service_role;
