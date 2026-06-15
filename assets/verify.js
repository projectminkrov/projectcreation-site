(() => {
      const { createClient } = supabase;
      const db = createClient(
        window._supabaseConfig.url,
        window._supabaseConfig.anonKey
      );

      // Guard: must arrive from signup
      function readPendingEmail() {
        try {
          return sessionStorage.getItem('pendingEmail');
        } catch {
          return null;
        }
      }

      function clearPendingEmail() {
        try {
          sessionStorage.removeItem('pendingEmail');
        } catch {}
      }

      const email = readPendingEmail();
      if (!email) {
        window.location.replace('/signup.html');
        return; // stop all further execution — page is navigating away
      }
      document.getElementById('emailDisplay').textContent = email;

      // Redirect if already verified and logged in
      db.auth.getSession().then(({ data: { session } }) => {
        if (session) window.location.replace('/account.html');
      }).catch(() => {});

      // --- OTP input behaviour ---
      const inputs = Array.from(document.querySelectorAll('.otp-input'));
      const verifyBtn  = document.getElementById('verifyBtn');
      const resendBtn  = document.getElementById('resendBtn');
      const errorMsg   = document.getElementById('errorMsg');
      const successMsg = document.getElementById('successMsg');

      function showError(msg) {
        errorMsg.textContent = msg;
        errorMsg.classList.remove('hidden');
        successMsg.classList.add('hidden');
      }

      function showSuccess(msg) {
        successMsg.textContent = msg;
        successMsg.classList.remove('hidden');
        errorMsg.classList.add('hidden');
      }

      function getCode() {
        return inputs.map(i => i.value).join('');
      }

      inputs.forEach((input, idx) => {
        input.addEventListener('input', (e) => {
          const val = e.target.value.replace(/\D/g, '');
          input.value = val ? val[0] : '';
          input.classList.toggle('filled', !!input.value);
          if (val && idx < inputs.length - 1) {
            inputs[idx + 1].focus();
          }
        });

        input.addEventListener('keydown', (e) => {
          if (e.key === 'Backspace' && !input.value && idx > 0) {
            inputs[idx - 1].focus();
            inputs[idx - 1].value = '';
            inputs[idx - 1].classList.remove('filled');
          }
          if (e.key === 'Enter') verifyBtn.click();
        });

        input.addEventListener('paste', (e) => {
          e.preventDefault();
          const pasted = (e.clipboardData || window.clipboardData)
            .getData('text').replace(/\D/g, '').slice(0, 6);
          pasted.split('').forEach((char, i) => {
            if (inputs[i]) {
              inputs[i].value = char;
              inputs[i].classList.add('filled');
            }
          });
          const next = inputs[Math.min(pasted.length, inputs.length - 1)];
          if (next) next.focus();
        });
      });

      // --- Verify ---
      verifyBtn.addEventListener('click', async () => {
        errorMsg.classList.add('hidden');
        const code = getCode();

        if (code.length < 6) {
          showError('Please enter all 6 digits.');
          return;
        }

        verifyBtn.textContent = 'VERIFYING...';
        verifyBtn.disabled = true;

        try {
          const { error } = await db.auth.verifyOtp({
            email,
            token: code,
            type: 'signup'
          });

          if (error) {
            showError('Invalid or expired code. Please try again or request a new one.');
            verifyBtn.textContent = 'VERIFY CODE';
            verifyBtn.disabled = false;
            inputs.forEach(i => { i.value = ''; i.classList.remove('filled'); });
            inputs[0].focus();
            return;
          }

          clearPendingEmail();
          window.location.replace('/account.html');
        } catch {
          showError('Connection error. Please check your network and try again.');
          verifyBtn.textContent = 'VERIFY CODE';
          verifyBtn.disabled = false;
        }
      });

      // --- Resend ---
      let resendCooldown = 0;
      let resendTimer = null;

      function startResendCooldown(seconds) {
        resendCooldown = seconds;
        resendBtn.disabled = true;
        resendBtn.textContent = `Resend code (${resendCooldown}s)`;
        if (resendTimer) clearInterval(resendTimer);
        resendTimer = setInterval(() => {
          resendCooldown--;
          resendBtn.textContent = resendCooldown > 0 ? `Resend code (${resendCooldown}s)` : 'Resend code';
          if (resendCooldown <= 0) {
            resendBtn.disabled = false;
            clearInterval(resendTimer);
            resendTimer = null;
          }
        }, 1000);
      }

      resendBtn.addEventListener('click', async () => {
        if (resendCooldown > 0) return;

        resendBtn.disabled = true;

        try {
          const { error } = await db.auth.resend({ email, type: 'signup' });

          if (error) {
            showError('Could not resend code. Please wait a moment and try again.');
            startResendCooldown(15);
          } else {
            showSuccess('New code sent — check your inbox.');
            startResendCooldown(60);
          }
        } catch {
          showError('Connection error. Please check your network and try again.');
          startResendCooldown(15);
        }
      });

      inputs[0].focus();
    })();
