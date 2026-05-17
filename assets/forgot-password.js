(() => {
      const { createClient } = supabase;
      const db = createClient(
        'https://gohyhxqvcjdthxvpewrx.supabase.co',
        'sb_publishable_rBSID_xnOICGEpVQWPW8KA_FYFSdoS1'
      );

      // Redirect if already logged in
      db.auth.getSession().then(({ data: { session } }) => {
        if (session) window.location.replace('/account.html');
      }).catch(() => {});

      const form       = document.getElementById('resetForm');
      const errorMsg   = document.getElementById('errorMsg');
      const submitBtn  = document.getElementById('submitBtn');
      const successState = document.getElementById('successState');

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMsg.classList.add('hidden');

        const email = document.getElementById('email').value.trim().toLowerCase();
        if (!email) {
          errorMsg.textContent = 'Please enter your email address.';
          errorMsg.classList.remove('hidden');
          return;
        }

        submitBtn.textContent = 'SENDING...';
        submitBtn.disabled = true;

        try {
          await db.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://projectcreation.net/reset-password.html'
          });
        } catch {
          // Swallow — never reveal whether email is registered
        }

        // Always show success regardless of outcome (anti-enumeration)
        form.classList.add('hidden');
        successState.classList.remove('hidden');
      });
    })();
