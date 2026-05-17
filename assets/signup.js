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
          const { error } = await db.auth.signUp({ email, password: pass });

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
