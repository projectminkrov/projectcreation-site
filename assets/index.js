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

      const LEGACY_AVATAR_KEY = 'pc-avatar';
      const avatarKeyFor = (userId) => `pc-avatar:${userId}`;

      function showNavAvatar(url, userId) {
        navAvatarImg.onload = null;
        navAvatarImg.src = url;
        navAvatarImg.hidden = false;
        navAvatarImg.classList.remove('hidden');
        navAvatarIcon.hidden = true;
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
        navAvatarIcon.hidden = false;
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

          if (dropHandle && data.handle) {
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
        try { localStorage.removeItem(LEGACY_AVATAR_KEY); } catch(e) {}
        window.location.reload();
      });

      // React to auth changes (login in another tab, etc.)
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

// ── Vision background: log stream + code rain ─────────
(() => {
  const canvas  = document.getElementById('vision-bg');
  const toggle  = document.getElementById('vision-bg-toggle');
  const section = document.getElementById('vision');
  if (!canvas || !section) return;
  const ctx = canvas.getContext('2d');

  const CHARS = '!<>-_/[]{}=+*?#@$%ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const rc    = () => CHARS[Math.floor(Math.random() * CHARS.length)];

  // ── Log stream helpers ──────────────────────────────
  function p2(n) { return String(Math.floor(Math.random() * n)).padStart(2, '0'); }
  function ts()  { return `${p2(24)}:${p2(60)}:${p2(60)}.${String(Math.floor(Math.random()*999)).padStart(3,'0')}`; }
  function hx()  { return '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0'); }
  function ms()  { return (Math.floor(Math.random() * 49) + 1) + 'ms'; }
  function pid() { return String(Math.floor(Math.random() * 9999) + 1000); }
  const T = [
    () => `${ts()} › compile index.js ok`,
    () => `${ts()} [INFO] pid:${pid()} ready`,
    () => `${ts()} GET /api/init 200 ${ms()}`,
    () => `${ts()} [SYS] dispatch → ${hx()}`,
    () => `${ts()} cache hit ${hx()}`,
    () => `${ts()} [AUTH] token.verify pass`,
    () => `${ts()} POST /api/events 201 ${ms()}`,
    () => `${ts()} worker ready pid:${pid()}`,
    () => `${ts()} [DB] query 3ms rows:${Math.floor(Math.random()*200)+1}`,
    () => `${ts()} › lint 0 errors 0 warnings`,
    () => `${ts()} [FLOW] state → active`,
    () => `${ts()} snapshot ${hx()} written`,
    () => `${ts()} deploy → edge:${Math.floor(Math.random()*32)+1}`,
    () => `${ts()} [BUILD] hash:${hx()} cached`,
    () => `${ts()} mem:${Math.floor(Math.random()*900)+100}mb cpu:${Math.floor(Math.random()*20)+1}%`,
    () => `${ts()} GET /api/session 200 ${ms()}`,
    () => `${ts()} [NET] conn ${hx()} ok`,
    () => `${ts()} › typecheck pass`,
    () => `${ts()} bundle dist/ ${Math.floor(Math.random()*200)+40}kb`,
    () => `${ts()} [PROC] task:done exit:0`,
  ];
  const rl = () => T[Math.floor(Math.random() * T.length)]();

  // ── State ───────────────────────────────────────────
  const MODES = ['logs', 'rain'];
  let modeIdx  = 0;
  let logCols  = [];
  let rainCols = [];

  function initLogs(w, h) {
    const n  = Math.max(2, Math.floor(w / 240));
    const gw = w / n;
    logCols = Array.from({ length: n }, (_, i) => ({
      x:     i * gw + 8,
      clipW: gw - 4,
      lines: Array.from({ length: Math.ceil(h / 13) + 4 }, rl),
      off:   Math.random() * h,
      speed: 0.28 + Math.random() * 0.22,
    }));
  }

  function initRain(w, h) {
    const CW = 10, CH = 14;
    const rows = Math.ceil(h / CH) + 20;
    rainCols = Array.from({ length: Math.floor(w / CW) }, () => ({
      chars: Array.from({ length: rows }, rc),
      head:  -Math.floor(Math.random() * Math.ceil(h / CH)),
      trail: Math.floor(8 + Math.random() * 16),
      speed: 0.07 + Math.random() * 0.08,
    }));
  }

  function resize() {
    canvas.width  = section.offsetWidth;
    canvas.height = section.offsetHeight;
    initLogs(canvas.width, canvas.height);
    initRain(canvas.width, canvas.height);
  }

  // ── Draw: log stream ────────────────────────────────
  function drawLogs() {
    const h = canvas.height;
    ctx.clearRect(0, 0, canvas.width, h);
    ctx.font = '9px "JetBrains Mono",monospace';
    ctx.fillStyle   = '#2aa8ff';
    ctx.globalAlpha = 0.038;
    for (const c of logCols) {
      c.off += c.speed;
      if (c.off >= 13) { c.off -= 13; c.lines.push(rl()); c.lines.shift(); }
      ctx.save();
      ctx.beginPath(); ctx.rect(c.x - 4, 0, c.clipW, h); ctx.clip();
      const y0 = -c.off;
      for (let i = 0; i < c.lines.length; i++) {
        const y = y0 + i * 13;
        if (y > h) break;
        ctx.fillText(c.lines[i], c.x, y + 9);
      }
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  // ── Draw: code rain ─────────────────────────────────
  function drawRain() {
    const w = canvas.width, h = canvas.height;
    const CW = 10, CH = 14, FS = 10;
    const numRows = Math.ceil(h / CH) + 2;
    ctx.clearRect(0, 0, w, h);
    ctx.font = `${FS}px "JetBrains Mono",monospace`;
    for (let ci = 0; ci < rainCols.length; ci++) {
      const c = rainCols[ci];
      c.head += c.speed;
      if (c.head - c.trail > numRows) c.head = -Math.floor(Math.random() * 8);
      if (Math.random() < 0.03) c.chars[Math.floor(Math.random() * c.chars.length)] = rc();
      const headRow = Math.floor(c.head);
      for (let row = Math.max(0, headRow - c.trail); row <= headRow; row++) {
        const y = row * CH;
        if (y > h) break;
        const dist = headRow - row;
        ctx.globalAlpha = dist === 0 ? 0.18 : (1 - dist / c.trail) * 0.055;
        ctx.fillStyle   = dist === 0 ? '#b2c7d6' : '#2aa8ff';
        ctx.fillText(c.chars[row % c.chars.length], ci * CW, y + FS);
      }
    }
    ctx.globalAlpha = 1;
  }

  // ── Toggle ───────────────────────────────────────────
  if (toggle) {
    toggle.addEventListener('click', () => {
      modeIdx = (modeIdx + 1) % MODES.length;
      toggle.textContent = `BG: ${MODES[modeIdx].toUpperCase()}`;
    });
  }

  // ── Loop ─────────────────────────────────────────────
  let active = false;
  new IntersectionObserver(e => { active = e[0].isIntersecting; }, { threshold: 0 }).observe(section);
  function tick() {
    if (active) { if (modeIdx === 0) drawLogs(); else drawRain(); }
    requestAnimationFrame(tick);
  }
  resize();
  window.addEventListener('resize', resize);
  tick();
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

// ── Tools section: boot sequence on scroll-into-view ─────────────────
(() => {
  const toolsEl = document.getElementById('tools');
  const bootEl  = document.getElementById('tools-boot');
  const cardsEl = document.getElementById('tools-cards');
  if (!toolsEl || !bootEl || !cardsEl) return;

  const LINES = [
    { text: '> INITIALIZING MODULE_REGISTRY...', cls: '' },
    { text: '> [001] ProjectCipher ─────── LOADING', cls: '' },
    { text: '> [001] ProjectCipher ─────── ████████████ OK', cls: 'ok' },
    { text: '> [002] ProjectWord ───────── LOADING', cls: '' },
    { text: '> [002] ProjectWord ───────── ████████████ OK', cls: 'ok' },
    { text: '> [003] ProjectBuilt ──────── ████░░░░░░░░ PENDING', cls: 'pending' },
    { text: '> SYSTEM READY — 2/3 MODULES ONLINE', cls: 'ready' },
  ];
  const DELAYS = [0, 200, 620, 940, 1360, 1660, 2080];

  let booted = false;

  // Pre-insert all lines at once so the DOM height is stable before
  // any animation plays — prevents layout reflow / scroll-anchor jitter.
  const lineEls = LINES.map(({ text, cls }) => {
    const el = document.createElement('div');
    el.className = 'boot-line' + (cls ? ' ' + cls : '');
    el.textContent = text;
    bootEl.appendChild(el);
    return el;
  });

  function runBoot() {
    lineEls.forEach((el, i) => {
      setTimeout(() => {
        el.classList.add('shown');

        if (i === lineEls.length - 1) {
          setTimeout(() => {
            cardsEl.classList.add('revealed');
            if (typeof window._pcInitCanvases === 'function') window._pcInitCanvases();
          }, 480);
        }
      }, DELAYS[i]);
    });
  }

  // Fire when the section top scrolls into the top 55% of the viewport —
  // section title is clearly visible and the user is actively on this section.
  function checkBoot() {
    if (booted) return;
    const top = toolsEl.getBoundingClientRect().top;
    if (top <= window.innerHeight * 0.55 && top > -100) {
      booted = true;
      window.removeEventListener('scroll', checkBoot);
      runBoot();
    }
  }

  window.addEventListener('scroll', checkBoot, { passive: true });
  checkBoot();
})();

// ── Tools section: boot sequence + hover scramble + canvas animations ──
(() => {
  const toolsSection = document.getElementById('tools');
  const bootEl       = document.getElementById('tools-boot');
  const cardsEl      = document.getElementById('tools-cards');
  if (!toolsSection || !bootEl || !cardsEl) return;

  const SCRAMBLE_CHARS = '!<>-_/[]{}=+*?#@$%ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  // ── Scramble utility ─────────────────────────────────
  function scramble(el, duration) {
    const final = el.dataset.final || el.textContent.trim();
    el.dataset.final = final;
    const len = final.length;
    let frame = 0;
    const totalFrames = Math.ceil(duration / 40);
    const id = setInterval(() => {
      const resolved = Math.floor(len * Math.min((frame / totalFrames) * 1.6, 1));
      let out = '';
      for (let i = 0; i < len; i++) {
        if (final[i] === ' ') { out += ' '; continue; }
        out += i < resolved
          ? final[i]
          : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      el.textContent = out;
      if (++frame > totalFrames) {
        el.textContent = final;
        clearInterval(id);
      }
    }, 40);
    return id;
  }

  // ── Attach scramble + brackets on hover ──────────────
  cardsEl.querySelectorAll('.tools-card').forEach(card => {
    const title = card.querySelector('.tools-card-title');
    if (!title) return;
    let sid = null;
    card.addEventListener('mouseenter', () => {
      if (sid) clearInterval(sid);
      sid = scramble(title, 380);
    });
    card.addEventListener('mouseleave', () => {
      if (sid) { clearInterval(sid); sid = null; }
      title.textContent = title.dataset.final || title.textContent;
    });
  });

  // ── Canvas animations ────────────────────────────────
  function initCanvases() {
    cardsEl.querySelectorAll('.tools-card').forEach(card => {
      const canvas  = card.querySelector('.tools-card-canvas');
      const project = card.dataset.project;
      if (!canvas || !project) return;
      const ctx = canvas.getContext('2d');

      let rainCols = [];
      let wavePhase = 0;
      let dotPulse  = 0;
      let dots      = [];

      function resize() {
        canvas.width  = card.offsetWidth;
        canvas.height = card.offsetHeight;
        if (project === 'cipher') buildRain();
        if (project === 'built')  buildDots();
      }

      // ProjectCipher — falling character rain
      function buildRain() {
        const CW = 13, CH = 16;
        const rows = Math.ceil(canvas.height / CH) + 20;
        rainCols = Array.from({ length: Math.floor(canvas.width / CW) }, () => ({
          chars: Array.from({ length: rows }, () =>
            SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]),
          head:  -Math.floor(Math.random() * Math.ceil(canvas.height / CH)),
          trail: Math.floor(6 + Math.random() * 10),
          speed: 0.055 + Math.random() * 0.065,
        }));
      }

      function drawRain() {
        const w = canvas.width, h = canvas.height;
        const CW = 13, CH = 16, FS = 11;
        const numRows = Math.ceil(h / CH) + 2;
        ctx.clearRect(0, 0, w, h);
        ctx.font = `${FS}px "JetBrains Mono",monospace`;
        rainCols.forEach((c, ci) => {
          c.head += c.speed;
          if (c.head - c.trail > numRows) c.head = -Math.floor(Math.random() * 8);
          if (Math.random() < 0.018)
            c.chars[Math.floor(Math.random() * c.chars.length)] =
              SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          const headRow = Math.floor(c.head);
          for (let row = Math.max(0, headRow - c.trail); row <= headRow; row++) {
            const y = row * CH;
            if (y > h) break;
            const dist = headRow - row;
            ctx.globalAlpha = dist === 0 ? 0.55 : (1 - dist / c.trail) * 0.14;
            ctx.fillStyle   = dist === 0 ? '#b2c7d6' : '#2aa8ff';
            ctx.fillText(c.chars[row % c.chars.length], ci * CW, y + FS);
          }
        });
        ctx.globalAlpha = 1;
      }

      // ProjectWord — audio waveform
      function drawWave() {
        const w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = '#2aa8ff';
        const cy = h / 2;
        const amp = h * 0.13;
        [{ a: 0.38, lw: 1.5, ph: 0 }, { a: 0.18, lw: 1, ph: 0.9 }, { a: 0.08, lw: 0.7, ph: 1.8 }]
          .forEach(({ a, lw, ph }) => {
            ctx.globalAlpha = a;
            ctx.lineWidth   = lw;
            ctx.beginPath();
            for (let x = 0; x <= w; x += 2) {
              const y = cy
                + amp * Math.sin(x * 0.022 + wavePhase + ph)
                * Math.sin(wavePhase * 0.28 + ph * 0.5);
              x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            }
            ctx.stroke();
          });
        ctx.globalAlpha = 1;
        wavePhase += 0.022;
      }

      // ProjectBuilt — blueprint dot grid
      function buildDots() {
        const spacing = 30;
        dots = [];
        for (let x = spacing; x < canvas.width; x += spacing)
          for (let y = spacing; y < canvas.height; y += spacing)
            dots.push({ x, y, phase: Math.random() * Math.PI * 2 });
      }

      function drawDots() {
        const w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        dotPulse += 0.013;

        // faint grid lines
        ctx.strokeStyle = '#2aa8ff';
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 0.035;
        const gs = 60;
        for (let x = gs; x < w; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
        for (let y = gs; y < h; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

        // pulsing dots
        ctx.fillStyle = '#2aa8ff';
        dots.forEach(d => {
          ctx.globalAlpha = Math.max(0, 0.07 + 0.12 * Math.sin(dotPulse + d.phase));
          ctx.beginPath();
          ctx.arc(d.x, d.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }

      function draw() {
        if (project === 'cipher') drawRain();
        else if (project === 'word')  drawWave();
        else if (project === 'built') drawDots();
      }

      resize();
      if (typeof ResizeObserver !== 'undefined')
        new ResizeObserver(resize).observe(card);

      (function loop() { draw(); requestAnimationFrame(loop); })();
    });
  }

  // Expose canvas init for the scroll-driven animation
  window._pcInitCanvases = initCanvases;
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

  // ── Newsletter form ──────────────────────────────────────
  const newsletterForm    = document.getElementById('newsletterSignupForm');
  const newsletterEmail   = document.getElementById('newsletterEmail');
  const newsletterError   = document.getElementById('newsletterError');
  const newsletterDefault = document.getElementById('newsletterForm');
  const newsletterSuccess = document.getElementById('newsletterSuccess');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const val = (newsletterEmail.value || '').trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (!valid) {
        newsletterError.classList.remove('hidden');
        newsletterEmail.focus();
        return;
      }
      newsletterError.classList.add('hidden');
      // TODO: wire to backend when newsletter service is configured
      newsletterDefault.classList.add('hidden');
      newsletterSuccess.classList.remove('hidden');
      newsletterSuccess.classList.add('flex');
    });

    newsletterEmail.addEventListener('input', () => {
      newsletterError.classList.add('hidden');
    });
  }
})();
