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

      const form       = document.getElementById('signupForm');
      const errorMsg   = document.getElementById('errorMsg');
      const submitBtn  = document.getElementById('submitBtn');

      function showError(msg) {
        errorMsg.textContent = msg;
        errorMsg.classList.remove('hidden');
      }

      function hideError() {
        errorMsg.classList.add('hidden');
      }

      function rememberPendingEmail(email) {
        try {
          sessionStorage.setItem('pendingEmail', email);
          return true;
        } catch {
          showError('Browser session storage is unavailable. Enable site storage and try again.');
          submitBtn.textContent = 'INITIALIZE ACCOUNT';
          submitBtn.disabled = false;
          return false;
        }
      }

      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideError();

        const email   = document.getElementById('email').value.trim().toLowerCase();
        const pass    = document.getElementById('password').value;
        const confirm = document.getElementById('confirmPassword').value;

        if (!email || !pass || !confirm) {
          showError('All fields are required.');
          return;
        }

        if (pass !== confirm) {
          showError('Passwords do not match.');
          return;
        }

        if (pass.length < 8) {
          showError('Password must be at least 8 characters.');
          return;
        }

        submitBtn.textContent = 'INITIALIZING...';
        submitBtn.disabled = true;

        try {
          const { data, error } = await db.auth.signUp({
            email,
            password: pass,
            options: {
              emailRedirectTo: 'https://projectcreation.net/verify.html'
            }
          });

          if (error) {
            // Rate limit — a code was already sent, redirect to verify page
            if (error.status === 429 || (error.code && error.code.includes('rate_limit'))) {
              if (!rememberPendingEmail(email)) return;
              window.location.replace('/verify.html');
              return;
            }
            // Generic error — do not reveal whether email is already registered
            showError('Unable to create account. Please check your details and try again.');
            submitBtn.textContent = 'INITIALIZE ACCOUNT';
            submitBtn.disabled = false;
            return;
          }

          // Supabase returns a fake success with empty identities when the email
          // is already registered (anti-enumeration behaviour). Redirect to login
          // so the user can sign in or use forgot-password instead.
          if (data?.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) {
            showError('An account with this email already exists. Please sign in or reset your password.');
            submitBtn.textContent = 'INITIALIZE ACCOUNT';
            submitBtn.disabled = false;
            return;
          }

          // Store email temporarily for the verification step
          if (!rememberPendingEmail(email)) return;
          window.location.replace('/verify.html');
        } catch {
          showError('Connection error. Please check your network and try again.');
          submitBtn.textContent = 'INITIALIZE ACCOUNT';
          submitBtn.disabled = false;
        }
      });
    })();
