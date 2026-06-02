-- ============================================================
-- Migration 004: Project connection tracking
--
-- Each project app upserts a row here when the user is active.
-- ProjectCreation reads it to show per-project status in the
-- sensors panel (online / offline / never connected).
--
-- Status thresholds (enforced in the client, not the DB):
--   Online       — last_active_at < 10 minutes ago
--   Offline      — last_active_at ≥ 10 minutes ago
--   Never used   — no row for this (user_id, project_slug)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.project_connections (
  user_id         UUID        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  project_slug    TEXT        NOT NULL
                    CHECK (project_slug IN ('projectword', 'projectcipher', 'projectbuilt')),
  last_active_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, project_slug)
);

ALTER TABLE public.project_connections ENABLE ROW LEVEL SECURITY;

-- Users can only read their own rows
DROP POLICY IF EXISTS "Users can read own project connections"  ON public.project_connections;
CREATE POLICY "Users can read own project connections"
  ON public.project_connections
  FOR SELECT
  USING (auth.uid() = user_id);

-- Each project app upserts when the user is active
DROP POLICY IF EXISTS "Users can insert own project connections" ON public.project_connections;
CREATE POLICY "Users can insert own project connections"
  ON public.project_connections
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own project connections" ON public.project_connections;
CREATE POLICY "Users can update own project connections"
  ON public.project_connections
  FOR UPDATE
  USING (auth.uid() = user_id);

-- No anonymous access
REVOKE ALL ON public.project_connections FROM anon;
GRANT SELECT, INSERT, UPDATE ON public.project_connections TO authenticated;
