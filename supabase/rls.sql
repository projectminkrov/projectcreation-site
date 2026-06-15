-- SUPERSEDED: this file does not match the live schema as of 2026-06-15.
-- The live `profiles` table includes columns (handle, avatar_url, username,
-- bio, tradition, role, selected_house_id, etc.) and policies not defined
-- here — see supabase/profiles.sql and the live migrations for the current
-- schema. Kept for historical reference.
-- ============================================================
-- ProjectCreation — Supabase RLS Setup
-- Run this entire file in: Supabase Dashboard → SQL Editor
-- ============================================================

-- 1. Profiles table (one row per user, auto-created on signup)
CREATE TABLE IF NOT EXISTS public.profiles (
  id          UUID        REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email       TEXT        NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Enable Row Level Security — no user can touch another user's data
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. Users can only read their own profile
DROP POLICY IF EXISTS "select_own_profile" ON public.profiles;
CREATE POLICY "select_own_profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 4. Users can only update their own profile
--    The WITH CHECK also locks the email column — users cannot change
--    their profile email to anyone else's address.
--    Column-level REVOKE (see bottom of file) adds a second line of defence.
DROP POLICY IF EXISTS "update_own_profile" ON public.profiles;
CREATE POLICY "update_own_profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- 5. No direct inserts from the client — profile is created via trigger only
DROP POLICY IF EXISTS "no_direct_insert" ON public.profiles;
CREATE POLICY "no_direct_insert"
  ON public.profiles
  FOR INSERT
  WITH CHECK (false);

-- 6. No direct deletes from the client — handled via CASCADE from auth.users
DROP POLICY IF EXISTS "no_direct_delete" ON public.profiles;
CREATE POLICY "no_direct_delete"
  ON public.profiles
  FOR DELETE
  USING (false);

-- 7. Auto-create a profile row whenever a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$;

-- Revoke public execute to prevent direct calls
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;

-- Least privilege: anonymous visitors should never receive table privileges.
-- Authenticated users get only the operations protected above by RLS.
REVOKE ALL ON public.profiles FROM anon;
GRANT SELECT, UPDATE ON public.profiles TO authenticated;

-- Column-level lock: prevent any role from updating the email field directly
REVOKE UPDATE (email) ON public.profiles FROM authenticated;
REVOKE UPDATE (email) ON public.profiles FROM anon;

-- Attach the trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
