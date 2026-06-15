(() => {
      const { createClient } = supabase;
      const db = createClient(
        window._supabaseConfig.url,
        window._supabaseConfig.anonKey
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
            // User signed up but hasn't verified their email yet — send them
            // to the verify page so they can complete the OTP step.
            if (error.code === 'email_not_confirmed') {
              try { sessionStorage.setItem('pendingEmail', email); } catch {}
              window.location.replace('/verify.html');
              return;
            }
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
