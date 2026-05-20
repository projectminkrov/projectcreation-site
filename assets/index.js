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

      function showProfile(user) {
        navSignIn.classList.add('auth-nav-hidden');
        navCreateAccount.classList.add('auth-nav-hidden');
        profileWrapper.classList.add('visible');

        dropEmail.textContent = user.email;
        dropId.textContent    = user.id;
        const d = new Date(user.created_at);
        dropSince.textContent = d.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
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

// ── Nav active state ──────────────────────────────────
(() => {
  const navBrand     = document.getElementById('navBrand');
  const navMap = {
    vision:    document.getElementById('navVision'),
    community: document.getElementById('navCommunity'),
  };
  const sectionIds = ['vision', 'community'];

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
