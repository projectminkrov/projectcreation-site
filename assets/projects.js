(() => {
  const { createClient } = supabase;
  const db = createClient(
    'https://gohyhxqvcjdthxvpewrx.supabase.co',
    'sb_publishable_rBSID_xnOICGEpVQWPW8KA_FYFSdoS1'
  );

  const profileWrapper   = document.getElementById('profileWrapper');
  const profileBtn       = document.getElementById('profileBtn');
  const profileDropdown  = document.getElementById('profileDropdown');
  const navSignIn        = document.getElementById('navSignIn');
  const navCreateAccount = document.getElementById('navCreateAccount');
  const dropEmail        = document.getElementById('dropEmail');
  const dropId           = document.getElementById('dropId');
  const dropSince        = document.getElementById('dropSince');
  const dropSignOut      = document.getElementById('dropSignOut');
  const dropHandle       = document.getElementById('dropHandle');
  const navAvatarImg     = document.getElementById('navAvatarImg');
  const navAvatarIcon    = document.getElementById('navAvatarIcon');

  const LEGACY_AVATAR_KEY = 'pc-avatar';
  const avatarKeyFor = (userId) => `pc-avatar:${userId}`;

  function showNavAvatar(url, userId) {
    navAvatarImg.onload = null;
    navAvatarImg.src = url;
    navAvatarImg.hidden = false;
    navAvatarImg.classList.remove('hidden');
    navAvatarIcon.classList.add('hidden');
    try {
      localStorage.setItem(avatarKeyFor(userId), url);
      localStorage.removeItem(LEGACY_AVATAR_KEY);
    } catch(e) {}
  }

  function showNavAvatarFallback(userId) {
    navAvatarImg.onload = null;
    navAvatarImg.removeAttribute('src');
    navAvatarImg.hidden = true;
    navAvatarImg.classList.add('hidden');
    navAvatarIcon.classList.remove('hidden');
    try {
      if (userId) localStorage.removeItem(avatarKeyFor(userId));
      localStorage.removeItem(LEGACY_AVATAR_KEY);
    } catch(e) {}
  }

  function showCachedNavAvatar(userId) {
    try {
      const cached = localStorage.getItem(avatarKeyFor(userId));
      if (!cached) return;
      navAvatarImg.onload = () => {
        navAvatarImg.onload = null;
        showNavAvatar(cached, userId);
      };
      navAvatarImg.onerror = () => showNavAvatarFallback(userId);
      navAvatarImg.src = cached;
    } catch(e) {}
  }

  function showProfile(user) {
    navSignIn.classList.add('auth-nav-hidden');
    navCreateAccount.classList.add('auth-nav-hidden');
    profileWrapper.classList.add('visible');
    dropEmail.textContent = user.email;
    dropId.textContent    = user.id;
    const d = new Date(user.created_at);
    dropSince.textContent = d.toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });

    showNavAvatarFallback(user.id);
    showCachedNavAvatar(user.id);
    loadProfileExtras(user.id);
  }

  async function loadProfileExtras(userId) {
    try {
      const { data } = await db
        .from('profiles')
        .select('handle, avatar_url')
        .eq('id', userId)
        .single();

      if (!data) {
        showNavAvatarFallback(userId);
        return;
      }

      if (data.handle) {
        dropHandle.textContent = '▎ @' + data.handle;
      }

      if (data.avatar_url && data.avatar_url.startsWith('https://')) {
        const probe = new Image();
        probe.onload = () => {
          showNavAvatar(data.avatar_url, userId);
        };
        probe.onerror = () => {
          showNavAvatarFallback(userId);
        };
        probe.src = data.avatar_url + '?t=' + Date.now();
      } else {
        showNavAvatarFallback(userId);
      }
    } catch {}
  }

  db.auth.getUser().then(({ data: { user } }) => {
    if (user) {
      showProfile(user);
    } else {
      profileWrapper.classList.remove('visible');
      navSignIn.classList.remove('auth-nav-hidden');
      navCreateAccount.classList.remove('auth-nav-hidden');
    }
  }).catch(() => {});

  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('open');
  });

  document.addEventListener('click', () => profileDropdown.classList.remove('open'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') profileDropdown.classList.remove('open');
  });
  profileDropdown.addEventListener('click', (e) => e.stopPropagation());

  dropSignOut.addEventListener('click', async () => {
    try { await db.auth.signOut(); } catch(e) {}
    try { localStorage.removeItem(LEGACY_AVATAR_KEY); } catch(e) {}
    window.location.reload();
  });

  db.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      showProfile(session.user);
    } else {
      profileWrapper.classList.remove('visible');
      profileDropdown.classList.remove('open');
      showNavAvatarFallback();
      navSignIn.classList.remove('auth-nav-hidden');
      navCreateAccount.classList.remove('auth-nav-hidden');
    }
  });
})();

(() => {
  const button = document.getElementById('themeSwitch');
  if (!button) return;

  const themes     = ['', 'theme-red', 'theme-green', 'theme-purple'];
  const nextLabels = ['Switch to red theme', 'Switch to green theme', 'Switch to purple theme', 'Switch to blue theme'];
  const saved = (function(){ try { return localStorage.getItem('pc-theme') || ''; } catch(e) { return ''; } }());
  let idx = Math.max(0, themes.indexOf(saved));

  if (idx !== 0) {
    button.setAttribute('aria-label', nextLabels[idx]);
    button.setAttribute('aria-pressed', 'true');
  }

  button.addEventListener('click', () => {
    if (themes[idx]) document.body.classList.remove(themes[idx]);
    idx = (idx + 1) % themes.length;
    if (themes[idx]) document.body.classList.add(themes[idx]);
    try { localStorage.setItem('pc-theme', themes[idx]); } catch(e) {}
    button.setAttribute('aria-label', nextLabels[idx]);
    button.setAttribute('aria-pressed', String(idx !== 0));
  });
})();

(() => {
  const section = document.getElementById('orbitSection');
  if (!section) return;

  const imgs = [
    document.getElementById('orbitImg0'),
    document.getElementById('orbitImg1'),
    document.getElementById('orbitImg2'),
  ].filter(Boolean);

  if (!imgs.length) return;

  imgs.forEach((img) => {
    img.onerror = () => { img.style.opacity = '0'; };
  });

  let angle = -Math.PI / 2;
  const TWO_PI = Math.PI * 2;
  const SPEED = 0.00020;
  const SPACING = TWO_PI / imgs.length;
  let lastTime = null;

  function getRadius() {
    const maxImageWidth = Math.max(...imgs.map((img) => img.offsetWidth || 0));
    const maxImageHeight = Math.max(...imgs.map((img) => img.offsetHeight || 0));
    const imageDiagonal = Math.hypot(maxImageWidth, maxImageHeight);
    const nonOverlapRadius = (imageDiagonal / Math.sqrt(3)) * 1.12;
    const containedRadius = Math.max(
      160,
      Math.min(
        (section.offsetWidth - maxImageWidth) * 0.46,
        (section.offsetHeight - maxImageHeight) * 0.46
      )
    );

    return Math.min(
      Math.max(
        nonOverlapRadius,
        section.offsetWidth * 0.32,
        section.offsetHeight * 0.34
      ),
      containedRadius,
      390
    );
  }

  let rafId = null;
  let paused = false;

  function tick(time) {
    if (!paused) {
      if (lastTime !== null) {
        angle -= SPEED * (time - lastTime);
      }
      lastTime = time;

      const radius = getRadius();
      imgs.forEach((img, i) => {
        const theta = angle + i * SPACING;
        const x = Math.cos(theta) * radius;
        const y = Math.sin(theta) * radius;
        img.style.transform = `translate(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px))`;
      });
    }

    rafId = requestAnimationFrame(tick);
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      paused = true;
      lastTime = null;
    } else {
      paused = false;
    }
  });

  rafId = requestAnimationFrame(tick);
})();
