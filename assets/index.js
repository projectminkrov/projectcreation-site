(() => {
      const { createClient } = supabase;
      const db = createClient(
        'https://gohyhxqvcjdthxvpewrx.supabase.co',
        'sb_publishable_rBSID_xnOICGEpVQWPW8KA_FYFSdoS1'
      );

      const profileWrapper    = document.getElementById('profileWrapper');
      const profileBtn        = document.getElementById('profileBtn');
      const profileDropdown   = document.getElementById('profileDropdown');
      const navSignIn         = document.getElementById('navSignIn');
      const navCreateAccount  = document.getElementById('navCreateAccount');
      const dropEmail         = document.getElementById('dropEmail');
      const dropId            = document.getElementById('dropId');
      const dropSince         = document.getElementById('dropSince');
      const dropSignOut       = document.getElementById('dropSignOut');
      const dropHandle        = document.getElementById('dropHandle');
      const navAvatarImg      = document.getElementById('navAvatarImg');
      const navAvatarIcon     = document.getElementById('navAvatarIcon');

      const AVATAR_KEY = 'pc-avatar';
      try {
        const cached = localStorage.getItem(AVATAR_KEY);
        if (cached) {
          navAvatarImg.onload = () => {
            navAvatarImg.onload = null;
            navAvatarImg.classList.remove('hidden');
          };
          navAvatarImg.src = cached;
        }
      } catch(e) {}

      function showProfile(user) {
        navSignIn.classList.add('auth-nav-hidden');
        navCreateAccount.classList.add('auth-nav-hidden');
        profileWrapper.classList.add('visible');

        dropEmail.textContent = user.email;
        dropId.textContent    = user.id;
        const d = new Date(user.created_at);
        dropSince.textContent = d.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

        loadProfileExtras(user.id);
      }

      async function loadProfileExtras(userId) {
        try {
          const { data } = await db
            .from('profiles')
            .select('handle, avatar_url')
            .eq('id', userId)
            .single();

          if (!data) return;

          if (data.handle) {
            dropHandle.textContent = '▎ @' + data.handle;
          }

          if (data.avatar_url && data.avatar_url.startsWith('https://')) {
            const probe = new Image();
            probe.onload = () => {
              navAvatarImg.src = data.avatar_url;
              navAvatarImg.classList.remove('hidden');
              navAvatarIcon.classList.add('hidden');
              try { localStorage.setItem(AVATAR_KEY, data.avatar_url); } catch(e) {}
            };
            probe.onerror = () => {
              navAvatarImg.classList.add('hidden');
              navAvatarIcon.classList.remove('hidden');
              try { localStorage.removeItem(AVATAR_KEY); } catch(e) {}
            };
            probe.src = data.avatar_url + '?t=' + Date.now();
          } else {
            navAvatarIcon.classList.remove('hidden');
            try { localStorage.removeItem(AVATAR_KEY); } catch(e) {}
          }
        } catch {}
      }

      // Check session on load — also hides profile if local session is revoked server-side
      db.auth.getUser().then(({ data: { user } }) => {
        if (user) {
          showProfile(user);
        } else {
          profileWrapper.classList.remove('visible');
          navSignIn.classList.remove('auth-nav-hidden');
          navCreateAccount.classList.remove('auth-nav-hidden');
        }
      }).catch(() => {});

      // Toggle dropdown
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('open');
      });

      // Close on outside click or Escape key
      document.addEventListener('click', () => {
        profileDropdown.classList.remove('open');
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') profileDropdown.classList.remove('open');
      });
      profileDropdown.addEventListener('click', (e) => e.stopPropagation());

      // Sign out
      dropSignOut.addEventListener('click', async () => {
        try { await db.auth.signOut(); } catch(e) {}
        try { localStorage.removeItem(AVATAR_KEY); } catch(e) {}
        window.location.reload();
      });

      // React to auth changes (login in another tab, etc.)
      db.auth.onAuthStateChange((event, session) => {
        if (session?.user) {
          showProfile(session.user);
        } else {
          profileWrapper.classList.remove('visible');
          profileDropdown.classList.remove('open');
          navSignIn.classList.remove('auth-nav-hidden');
          navCreateAccount.classList.remove('auth-nav-hidden');
        }
      });
    })();

(() => {
      const button = document.getElementById("themeSwitch");
      if (!button) return;

      const themes = ["", "theme-red", "theme-green", "theme-purple"];
      const nextLabels = ["Switch to red theme", "Switch to green theme", "Switch to purple theme", "Switch to blue theme"];
      const saved = (function(){try{return localStorage.getItem('pc-theme')||'';}catch(e){return '';}}());
      let idx = Math.max(0, themes.indexOf(saved));

      // Sync aria state to restored theme (body class already applied by inline script)
      if (idx !== 0) {
        button.setAttribute("aria-label", nextLabels[idx]);
        button.setAttribute("aria-pressed", "true");
      }

      button.addEventListener("click", () => {
        if (themes[idx]) document.body.classList.remove(themes[idx]);
        idx = (idx + 1) % themes.length;
        if (themes[idx]) document.body.classList.add(themes[idx]);
        try{localStorage.setItem('pc-theme',themes[idx]);}catch(e){}
        button.setAttribute("aria-label", nextLabels[idx]);
        button.setAttribute("aria-pressed", String(idx !== 0));
      });
    })();

// ── Vision section animations ─────────────────────────
(() => {
  const headline    = document.getElementById('vision-headline');
  const visionLines = document.querySelectorAll('.vision-text');
  const brackets    = document.querySelectorAll('.vision-bracket');
  const section     = document.getElementById('vision');
  if (!headline || !section) return;

  const CHARS = '!<>-_/[]{}=+*?#@$%ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  function scramble(el, duration, cb) {
    const final = el.textContent.trim();
    const len = final.length;
    let frame = 0;
    const totalFrames = Math.ceil(duration / 40);
    const id = setInterval(() => {
      const resolved = Math.floor(len * Math.min((frame / totalFrames) * 1.6, 1));
      let out = '';
      for (let i = 0; i < len; i++) {
        if (final[i] === ' ') { out += ' '; continue; }
        out += i < resolved ? final[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      el.textContent = out;
      if (++frame > totalFrames) {
        el.textContent = final;
        clearInterval(id);
        if (cb) cb();
      }
    }, 40);
  }

  function typewriter(el, text, speed, cb) {
    const cursor = document.createElement('span');
    cursor.className = 'vision-cursor';
    el.textContent = '';
    el.appendChild(cursor);
    let typed = '';
    let i = 0;
    const id = setInterval(() => {
      typed += text[i++];
      el.textContent = typed;
      el.appendChild(cursor);
      if (i >= text.length) {
        clearInterval(id);
        cursor.remove();
        if (cb) cb();
      }
    }, speed);
  }

  const lineTexts = Array.from(visionLines).map(el => el.textContent);

  function typeNext(idx) {
    if (idx >= visionLines.length) return;
    typewriter(visionLines[idx], lineTexts[idx], 10, () => typeNext(idx + 1));
  }

  let fired = false;
  const observer = new IntersectionObserver(entries => {
    if (fired || !entries[0].isIntersecting) return;
    fired = true;
    observer.disconnect();
    brackets.forEach(b => b.classList.add('animate'));
    visionLines.forEach(el => { el.textContent = ''; });
    scramble(headline, 800, () => typeNext(0));
  }, { threshold: 0.25 });

  observer.observe(section);
})();

// ── Nav active state ──────────────────────────────────
(() => {
  const navBrand     = document.getElementById('navBrand');
  const navMap = {
    vision: document.getElementById('navVision'),
  };
  const sectionIds = ['vision'];

  function activateNav(id) {
    navBrand.classList.toggle('nav-brand-active', !id);
    sectionIds.forEach(sid => {
      const el = navMap[sid];
      if (el) el.classList.toggle('nav-link-active', sid === id);
    });
  }

  // Brand active by default (home)
  activateNav(null);

  if (!('IntersectionObserver' in window)) return;

  const visible = new Set();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) visible.add(e.target.id);
      else visible.delete(e.target.id);
    });
    const active = sectionIds.find(id => visible.has(id));
    activateNav(active || null);
  }, { threshold: 0.25, rootMargin: '-10% 0px -10% 0px' });

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
