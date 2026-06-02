/**
 * POST /api/newsletter
 *
 * Accepts { email } and:
 *   1. Backs up the subscriber to the Supabase newsletter_subscribers table
 *      using the service role key (server-side only — never exposed to the browser).
 *   2. Adds the subscriber to Kit (ConvertKit) so newsletters can be sent from
 *      their dashboard.
 *
 * Environment variables required in Cloudflare Pages dashboard:
 *   SUPABASE_URL              — e.g. https://xxxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY — from Supabase → Settings → API → service_role
 *   KIT_API_KEY               — from Kit → Settings → Advanced → API Keys
 *   KIT_FORM_ID               — from Kit → Forms → pick your form → in the URL
 *
 * Graceful degradation:
 *   - If Kit env vars are missing, only Supabase backup runs.
 *   - If Supabase env vars are missing, only Kit runs.
 *   - If neither is configured, returns success (dev/preview environment).
 *   - If one store fails and the other succeeds, returns success.
 *   - Only returns 500 if ALL configured stores fail.
 *
 * Local dev note:
 *   The Python dev server does not run Pages Functions. The form will show
 *   an error message locally — test the form after deploying to Cloudflare Pages
 *   or run `npx wrangler pages dev . --port 3000` for local function execution.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function onRequestPost({ request, env }) {
  // ── Parse body ──────────────────────────────────────────────────────────────
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  const email = (typeof body.email === 'string' ? body.email : '').trim().toLowerCase();

  if (!email || !EMAIL_RE.test(email)) {
    return json({ error: 'Please enter a valid email address.' }, 400);
  }

  const hasSupabase = Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY);
  const hasKit      = Boolean(env.KIT_API_KEY && env.KIT_FORM_ID);
  const results     = { supabase: false, kit: false };

  // ── 1. Backup to Supabase ──────────────────────────────────────────────────
  if (hasSupabase) {
    try {
      const res = await fetch(
        `${env.SUPABASE_URL}/rest/v1/newsletter_subscribers`,
        {
          method: 'POST',
          headers: {
            'Content-Type':  'application/json',
            'apikey':        env.SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
            // ignore-duplicates: silently skip if email already exists
            // return=minimal: no response body needed (keeps response small)
            'Prefer': 'resolution=ignore-duplicates,return=minimal',
          },
          body: JSON.stringify({ email, source: 'website' }),
        }
      );
      // 200/201/204 are all success for PostgREST upserts
      results.supabase = res.ok;
    } catch {
      // Network error — non-fatal, Kit is the primary sending store
    }
  }

  // ── 2. Add to Kit (ConvertKit) ─────────────────────────────────────────────
  if (hasKit) {
    try {
      const res = await fetch(
        `https://api.convertkit.com/v3/forms/${env.KIT_FORM_ID}/subscribe`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            api_key: env.KIT_API_KEY,
            email,
          }),
        }
      );
      results.kit = res.ok;
    } catch {
      // Network error — non-fatal if Supabase backup succeeded
    }
  }

  // ── Respond ────────────────────────────────────────────────────────────────
  // No stores configured = preview/dev deploy → return success so the UI works.
  if (!hasSupabase && !hasKit) {
    return json({ ok: true }, 200);
  }

  // At least one configured store accepted the email → success.
  if (results.supabase || results.kit) {
    return json({ ok: true }, 200);
  }

  // All configured stores failed.
  return json({ error: 'Could not save your subscription. Please try again.' }, 500);
}

// Reject non-POST requests with a clear status.
export async function onRequestGet() {
  return new Response('Method not allowed', { status: 405 });
}

// ── Helper ─────────────────────────────────────────────────────────────────
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type':               'application/json',
      'X-Content-Type-Options':     'nosniff',
      'Cache-Control':              'no-store',
    },
  });
}
