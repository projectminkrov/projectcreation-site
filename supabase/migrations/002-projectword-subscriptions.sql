-- ============================================================
-- Migration 002: ProjectWord subscriptions + founder access
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================
--
-- ProjectWord uses ProjectCreation accounts for access control. This migration
-- adds the shared subscription row that the macOS app reads after sign-in.
--
-- It intentionally does NOT replace ProjectCreation's existing
-- public.handle_new_user() profile trigger function.

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                     UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id                UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  tier                   TEXT        NOT NULL DEFAULT 'none'
                           CHECK (tier IN ('none', 'trial', 'core', 'pro', 'max')),
  is_active              BOOLEAN     NOT NULL DEFAULT false,
  trial_ends_at          TIMESTAMPTZ,
  current_period_ends_at TIMESTAMPTZ,
  is_founder             BOOLEAN     NOT NULL DEFAULT false,
  created_at             TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at             TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own subscription" ON public.subscriptions;
CREATE POLICY "Users can read own subscription"
  ON public.subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

REVOKE ALL ON public.subscriptions FROM anon;
GRANT SELECT ON public.subscriptions TO authenticated;

CREATE OR REPLACE FUNCTION public.handle_new_projectword_subscription()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.subscriptions (user_id, tier, is_active, trial_ends_at)
  VALUES (
    NEW.id,
    'trial',
    TRUE,
    NOW() + INTERVAL '3 days'
  )
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.handle_new_projectword_subscription() FROM PUBLIC;

DROP TRIGGER IF EXISTS on_auth_user_created_projectword_subscription ON auth.users;
CREATE TRIGGER on_auth_user_created_projectword_subscription
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_projectword_subscription();

-- Founder access for the owner account.
-- Run after the founder account exists in auth.users.
INSERT INTO public.subscriptions (user_id, tier, is_active, is_founder)
SELECT id, 'max', TRUE, TRUE
FROM auth.users
WHERE email = 'minkrov@proton.me'
ON CONFLICT (user_id) DO UPDATE
SET
  is_founder = TRUE,
  tier       = 'max',
  is_active  = TRUE;
