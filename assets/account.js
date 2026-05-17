(() => {
      const { createClient } = supabase;
      const db = createClient(
        'https://gohyhxqvcjdthxvpewrx.supabase.co',
        'sb_publishable_rBSID_xnOICGEpVQWPW8KA_FYFSdoS1'
      );

      // Guard: validate session server-side (getUser() hits Supabase on every call,
      // unlike getSession() which only reads the local cache and can be stale).
      db.auth.getUser()
        .then(({ data: { user }, error }) => {
          if (error || !user) {
            window.location.replace('/login.html');
            return;
          }
          document.getElementById('userEmail').textContent = user.email;
          document.getElementById('userId').textContent = user.id;

          const created = new Date(user.created_at);
          document.getElementById('memberSince').textContent =
            created.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

          // Only reveal the page after auth is confirmed — prevents flash of unauthenticated shell
          document.getElementById('mainContent').classList.remove('is-invisible');
          document.getElementById('signOutBtn').classList.remove('is-invisible');
        })
        .catch(() => {
          // Network error or Supabase unreachable — fail safe to login
          window.location.replace('/login.html');
        });

      // Listen for auth changes (e.g. session expiry)
      db.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_OUT' || !session) {
          window.location.replace('/login.html');
        }
      });

      // Sign out
      document.getElementById('signOutBtn').addEventListener('click', async () => {
        try {
          await db.auth.signOut();
        } catch {
          // Ignore — navigate regardless
        }
        window.location.replace('/login.html');
      });
    })();
