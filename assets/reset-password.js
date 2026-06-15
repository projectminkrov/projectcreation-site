(() => {
      const { createClient } = supabase;
      const db = createClient(
        window._supabaseConfig.url,
        window._supabaseConfig.anonKey
      );

      const loadingState  = document.getElementById('loadingState');
      const invalidState  = document.getElementById('invalidState');
      const formState     = document.getElementById('formState');
      const successState  = document.getElementById('successState');
      const errorMsg      = document.getElementById('errorMsg');
      const submitBtn     = document.getElementById('submitBtn');

      function show(el) {
        [loadingState, invalidState, formState, successState].forEach(e => e.classList.add('hidden'));
        el.classList.remove('hidden');
      }

      // Fallback: if no PASSWORD_RECOVERY event fires within 4s, show invalid state
      const timeout = setTimeout(() => {
        if (!formState.classList.contains('hidden')) return;
        if (!successState.classList.contains('hidden')) return;
        show(invalidState);
      }, 4000);

      // Single auth state listener — handles recovery, sign-in, and sign-out
      db.auth.onAuthStateChange((event) => {
        if (event === 'PASSWORD_RECOVERY') {
          clearTimeout(timeout);
          show(formState);
        } else if (event === 'SIGNED_OUT') {
          // Only redirect on sign-out if we haven't already shown success
          if (successState.classList.contains('hidden')) {
            window.location.replace('/login.html');
          }
        }
      });

      // Handle form submission
      document.getElementById('newPassForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        errorMsg.classList.add('hidden');

        const password = document.getElementById('password').value;
        const confirm  = document.getElementById('confirmPassword').value;

        if (password !== confirm) {
          errorMsg.textContent = 'Passwords do not match.';
          errorMsg.classList.remove('hidden');
          return;
        }
        if (password.length < 8) {
          errorMsg.textContent = 'Password must be at least 8 characters.';
          errorMsg.classList.remove('hidden');
          return;
        }

        submitBtn.textContent = 'UPDATING...';
        submitBtn.disabled = true;

        try {
          const { error } = await db.auth.updateUser({ password });

          if (error) {
            errorMsg.textContent = 'Could not update password. The link may have expired — request a new one.';
            errorMsg.classList.remove('hidden');
            submitBtn.textContent = 'SET NEW PASSWORD';
            submitBtn.disabled = false;
            return;
          }

          // Show success BEFORE signing out — signOut fires SIGNED_OUT which
          // would redirect to login if successState is still hidden.
          show(successState);
          try {
            await db.auth.signOut();
          } catch {
            // Password update already succeeded; do not replace success with a sign-out warning.
          }
        } catch {
          errorMsg.textContent = 'Connection error. Please check your network and try again.';
          errorMsg.classList.remove('hidden');
          submitBtn.textContent = 'SET NEW PASSWORD';
          submitBtn.disabled = false;
        }
      });
    })();
