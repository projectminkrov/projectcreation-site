-- ============================================================
-- Migration 001: Harden profiles RLS — lock email column
-- Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

-- Drop the existing UPDATE policy that allowed users to freely update
-- any column including the email field
DROP POLICY IF EXISTS "update_own_profile" ON public.profiles;

-- Keep table privileges least-privilege before the hardened policy is added.
REVOKE ALL ON public.profiles FROM anon;
GRANT SELECT, UPDATE ON public.profiles TO authenticated;

-- Recreate UPDATE policy with an email column lock.
-- The WITH CHECK constraint ensures the email value in the profiles row
-- can never be changed to anything other than the authenticated user's
-- actual email in auth.users. This closes the data-integrity gap where a
-- user could overwrite their profile email with another user's address.
CREATE POLICY "update_own_profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND email = (SELECT email FROM auth.users WHERE id = auth.uid())
  );

-- Also explicitly revoke UPDATE privilege on the email column at the
-- Postgres column-level as a second line of defence.
-- Even if the RLS policy above were bypassed, this prevents the column
-- from being written at all by the authenticated role.
REVOKE UPDATE (email) ON public.profiles FROM authenticated;
REVOKE UPDATE (email) ON public.profiles FROM anon;

-- Verify the policy is correctly installed
-- (Run this SELECT after applying — it should return 1 row for update_own_profile)
-- SELECT policyname, cmd, qual, with_check
--   FROM pg_policies
--   WHERE tablename = 'profiles' AND policyname = 'update_own_profile';
