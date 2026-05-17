(() => {
      const { createClient } = supabase;
      const db = createClient(
        'https://gohyhxqvcjdthxvpewrx.supabase.co',
        'sb_publishable_rBSID_xnOICGEpVQWPW8KA_FYFSdoS1'
      );

      // Redirect if already authenticated
      db.auth.getSession().then(({ data: { session } }) => {
        if (session) window.location.replace('/account.html');
      }).catch(() => {});

      const form      = document.getElementById('loginForm');
      const errorMsg  = document.getElementById('errorMsg');
      const submitBtn = document.getElementById('submitBtn');

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMsg.classList.add('hidden');

        const email    = document.getElementById('email').value.trim().toLowerCase();
        const password = document.getElementById('password').value;

        if (!email || !password) {
          errorMsg.textContent = 'Email and password are required.';
          errorMsg.classList.remove('hidden');
          return;
        }

        submitBtn.textContent = 'AUTHENTICATING...';
        submitBtn.disabled = true;

        try {
          const { error } = await db.auth.signInWithPassword({ email, password });

          if (error) {
            // Generic message — do not reveal whether email exists
            errorMsg.textContent = 'Invalid credentials. Please check your email and password.';
            errorMsg.classList.remove('hidden');
            submitBtn.textContent = 'AUTHENTICATE';
            submitBtn.disabled = false;
            return;
          }

          window.location.replace('/account.html');
        } catch {
          errorMsg.textContent = 'Connection error. Please check your network and try again.';
          errorMsg.classList.remove('hidden');
          submitBtn.textContent = 'AUTHENTICATE';
          submitBtn.disabled = false;
        }
      });
    })();
