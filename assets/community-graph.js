(() => {
  const container = document.getElementById('channelGraphContainer');
  const svg       = document.getElementById('channelGraphSvg');
  if (!container || !svg) return;

  const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#$%&';

  function glitchIn(el, finalText, duration = 500) {
    if (REDUCE_MOTION) { el.textContent = finalText; return; }
    const start = performance.now();
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const settled = Math.floor(progress * finalText.length);
      let out = '';
      for (let i = 0; i < finalText.length; i++) {
        const ch = finalText[i];
        out += (i < settled || ch === ' ' || ch === '#' || ch === '-')
          ? ch
          : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      el.textContent = out;
      if (progress < 1) requestAnimationFrame(frame);
      else el.textContent = finalText;
    }
    requestAnimationFrame(frame);
  }

  const NODES = [
    {
      id: 'build-log', label: '#build-log', icon: 'hub', fill: true, isCore: true,
      tag: '#build-log',
      desc: "This is where ProjectCreation's own development happens in the open — every update, fix, and feature gets logged here in real time. Watch the build-log to see exactly what's being worked on and trust that progress is real, not just promises.",
      live: '@alex: shipped the dark mode toggle tonight 🌙',
    },
    {
      id: 'goals', label: '#goals-2026', icon: 'flag', fill: false, isCore: false,
      tag: '#goals-2026',
      desc: "Where builders publicly commit to what they're making this year. Posting your goal here turns a vague idea into a real deadline — and gives the community something to hold you to.",
      live: '@mira: just dropped my 2026 roadmap — feedback welcome 👀',
    },
    {
      id: 'showcase', label: '#showcase', icon: 'rocket_launch', fill: false, isCore: false,
      tag: '#showcase',
      desc: 'The highlight reel. This is where finished builds, demos, and launches get shown off — a steady stream of proof that people here actually ship. Scroll through for inspiration, or post your own when it\'s ready.',
      live: "@devkid: demo's up, would love a look 🎥",
    },
    {
      id: 'wins', label: '#wins', icon: 'emoji_events', fill: false, isCore: false,
      tag: '#wins',
      desc: 'Every milestone worth celebrating lives here — first user, first sale, first launch, first anything. A reminder that progress (even small) is worth sharing and cheering for.',
      live: '@jordan: just hit 100 users! 🎉',
    },
    {
      id: 'stuck', label: '#stuck', icon: 'help', fill: false, isCore: false,
      tag: '#stuck',
      desc: 'No one builds alone. This is the no-judgment zone for bugs, blockers, and "why isn\'t this working" moments — post here and someone in the community will likely have hit the same wall.',
      live: '@riley: anyone know why this build keeps failing?',
    },
    {
      id: 'accountability', label: '#accountability', icon: 'groups', fill: false, isCore: false,
      tag: '#accountability',
      desc: 'Pair up, check in, stay consistent. This channel is for builders keeping each other on track — daily/weekly check-ins, progress streaks, and gentle peer pressure that actually works.',
      live: '@sam: day 14 — still on track 💪',
    },
  ];

  const LINKS = [
    ['build-log', 'goals'],
    ['build-log', 'showcase'],
    ['build-log', 'wins'],
    ['build-log', 'stuck'],
    ['build-log', 'accountability'],
    ['goals', 'showcase'],
    ['showcase', 'wins'],
    ['wins', 'stuck'],
    ['stuck', 'accountability'],
    ['accountability', 'goals'],
  ];

  const HOME = {
    'build-log':      [0.50, 0.50],
    'goals':          [0.50, 0.12],
    'showcase':       [0.88, 0.26],
    'wins':           [0.78, 0.88],
    'stuck':          [0.22, 0.88],
    'accountability': [0.12, 0.26],
  };

  // ── Detail panel ──────────────────────────────────────────
  const panel     = document.getElementById('channelDetailPanel');
  const panelIcon = document.getElementById('channelDetailIcon');
  const panelTag  = document.getElementById('channelDetailTag');
  const panelDesc = document.getElementById('channelDetailDesc');
  const panelLive = document.getElementById('channelDetailLive');
  const hubDef    = NODES.find(n => n.isCore);
  let activeId    = hubDef.id;

  function setPanel(def) {
    if (!def || !panel || def.id === activeId) return;
    activeId = def.id;
    const apply = () => {
      if (panelIcon) panelIcon.textContent = def.icon || '';
      if (panelTag) {
        if (REDUCE_MOTION) panelTag.textContent = def.tag || '';
        else glitchIn(panelTag, def.tag || '');
      }
      if (panelDesc) panelDesc.textContent = def.desc || '';
      if (panelLive) panelLive.textContent = def.live || '';
      panel.classList.remove('is-updating');
    };

    if (REDUCE_MOTION) { apply(); return; }
    panel.classList.add('is-updating');
    setTimeout(apply, 160);
  }

  // ── Wait for real layout dimensions ───────────────────────
  function waitForDimensions() {
    if (container.offsetWidth > 0) {
      setup();
    } else {
      requestAnimationFrame(waitForDimensions);
    }
  }
  requestAnimationFrame(waitForDimensions);

  function setup() {
    let W = container.offsetWidth;
    let H = container.offsetHeight;

    // ── Physics state ────────────────────────────────────────
    const state = {};
    NODES.forEach(({ id }) => {
      state[id] = {
        x:  HOME[id][0] * W,
        y:  HOME[id][1] * H,
        vx: 0, vy: 0,
        ax: 0, ay: 0,
        pinned: false,
      };
    });

    let frozen      = true;
    let isReturning = false;

    // ── Build DOM nodes ──────────────────────────────────────
    const nodeEls = {};
    NODES.forEach(def => {
      const el = document.createElement('div');
      el.tabIndex = 0;
      el.className = def.isCore ? 'gn gn-core' : 'gn';
      const box = document.createElement('div');
      box.className = def.isCore ? 'gn-box gn-box-core' : 'gn-box';
      const icon = document.createElement('span');
      icon.className = def.fill ? 'material-symbols-outlined material-symbols-fill' : 'material-symbols-outlined';
      icon.textContent = def.icon;
      const label = document.createElement('span');
      label.className = 'gn-label';
      label.textContent = def.label;
      box.appendChild(icon);
      el.append(box, label);
      container.appendChild(el);
      nodeEls[def.id] = el;

      const activate = () => setPanel(def);
      const deactivate = () => setPanel(hubDef);
      el.addEventListener('mouseenter', activate);
      el.addEventListener('focusin', activate);
      el.addEventListener('mouseleave', deactivate);
      el.addEventListener('focusout', deactivate);
    });

    // ── Build SVG lines ──────────────────────────────────────
    const lineEls = {};
    LINKS.forEach(([a, b]) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('class', 'graph-line');
      svg.appendChild(line);
      lineEls[`${a}:${b}`] = line;
    });

    // ── Rest length = actual home distances ──────────────────
    let _restLen = 0;
    function calcRestLen() {
      let total = 0;
      LINKS.forEach(([aid, bid]) => {
        const dx = (HOME[bid][0] - HOME[aid][0]) * W;
        const dy = (HOME[bid][1] - HOME[aid][1]) * H;
        total += Math.sqrt(dx * dx + dy * dy);
      });
      _restLen = total / LINKS.length;
    }
    calcRestLen();

    // ── Physics constants ────────────────────────────────────
    const SPRING_K  = 0.006;
    const REPULSE   = 300;
    const CENTER_K  = 0.0003;
    const DAMPING   = 0.82;
    const PAD       = 52;

    // ── Tick ─────────────────────────────────────────────────
    function tick() {
      if (frozen) return;

      const list = NODES.map(d => state[d.id]);

      // Return mode: damped spring with tiny bounce (ζ≈0.64)
      if (isReturning) {
        const K    = 0.008;
        const DAMP = 0.88;
        let allDone = true;

        NODES.forEach(({ id }) => {
          const n  = state[id];
          const hx = HOME[id][0] * W;
          const hy = HOME[id][1] * H;
          const dx = hx - n.x;
          const dy = hy - n.y;

          n.vx = (n.vx + dx * K) * DAMP;
          n.vy = (n.vy + dy * K) * DAMP;
          n.x += n.vx;
          n.y += n.vy;

          const dist  = Math.sqrt(dx * dx + dy * dy);
          const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
          if (dist > 0.5 || speed > 0.1) allDone = false;
        });

        if (allDone) {
          isReturning = false;
          frozen      = true;
          NODES.forEach(({ id }) => {
            state[id].x  = HOME[id][0] * W;
            state[id].y  = HOME[id][1] * H;
            state[id].vx = 0;
            state[id].vy = 0;
          });
        }

        return;
      }

      // Regular drag physics
      list.forEach(n => { n.ax = 0; n.ay = 0; });

      LINKS.forEach(([aid, bid]) => {
        const a = state[aid], b = state[bid];
        const dx = b.x - a.x, dy = b.y - a.y;
        const d  = Math.sqrt(dx * dx + dy * dy) || 1;
        const f  = SPRING_K * (d - _restLen);
        a.ax += dx / d * f;  a.ay += dy / d * f;
        b.ax -= dx / d * f;  b.ay -= dy / d * f;
      });

      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          const a = list[i], b = list[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d2 = dx * dx + dy * dy || 1;
          const d  = Math.sqrt(d2);
          const f  = REPULSE / d2;
          a.ax -= dx / d * f;  a.ay -= dy / d * f;
          b.ax += dx / d * f;  b.ay += dy / d * f;
        }
      }

      list.forEach(n => {
        n.ax += (W * 0.5 - n.x) * CENTER_K;
        n.ay += (H * 0.5 - n.y) * CENTER_K;
      });

      list.forEach(n => {
        if (n.pinned) return;
        n.vx = (n.vx + n.ax) * DAMPING;
        n.vy = (n.vy + n.ay) * DAMPING;
        n.x  = Math.max(PAD, Math.min(W - PAD, n.x + n.vx));
        n.y  = Math.max(PAD, Math.min(H - PAD, n.y + n.vy));
      });
    }

    // ── Render ───────────────────────────────────────────────
    function render() {
      NODES.forEach(({ id }) => {
        const n  = state[id];
        const el = nodeEls[id];
        el.style.left = n.x + 'px';
        el.style.top  = n.y + 'px';
      });
      LINKS.forEach(([a, b]) => {
        const na = state[a], nb = state[b];
        const ln = lineEls[`${a}:${b}`];
        ln.setAttribute('x1', na.x); ln.setAttribute('y1', na.y);
        ln.setAttribute('x2', nb.x); ln.setAttribute('y2', nb.y);
      });
    }

    render(); // position nodes at home before first frame
    let rafId;
    function loop() { tick(); if (!frozen) render(); rafId = requestAnimationFrame(loop); }
    loop();

    // ── Drag ─────────────────────────────────────────────────
    let dragId = null, ox = 0, oy = 0, moved = false;

    function ptStart(e, id) {
      e.preventDefault();
      frozen      = false;
      isReturning = false;

      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();
      const n = state[id];
      ox = n.x - (cx - rect.left);
      oy = n.y - (cy - rect.top);
      n.pinned = true; n.vx = 0; n.vy = 0;
      dragId = id; moved = false;
      nodeEls[id].style.cursor = 'grabbing';
    }

    function ptMove(e) {
      if (!dragId) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const rect = container.getBoundingClientRect();
      const n  = state[dragId];
      const nx = Math.max(0, Math.min(W, cx - rect.left + ox));
      const ny = Math.max(0, Math.min(H, cy - rect.top  + oy));
      if (Math.abs(nx - n.x) > 4 || Math.abs(ny - n.y) > 4) moved = true;
      n.x = nx; n.y = ny;
    }

    function ptEnd() {
      if (!dragId) return;
      state[dragId].pinned = false;
      nodeEls[dragId].style.cursor = 'grab';
      dragId      = null;
      isReturning = true;
    }

    NODES.forEach(({ id }) => {
      const el = nodeEls[id];
      el.addEventListener('mousedown',  e => ptStart(e, id));
      el.addEventListener('touchstart', e => ptStart(e, id), { passive: false });
    });
    document.addEventListener('mousemove', ptMove);
    document.addEventListener('touchmove', e => ptMove(e), { passive: false });
    document.addEventListener('mouseup',   ptEnd);
    document.addEventListener('touchend',  ptEnd);

    // ── Resize ───────────────────────────────────────────────
    window.addEventListener('resize', () => {
      const ow = W, oh = H;
      W = container.offsetWidth;
      H = container.offsetHeight;
      if (!ow || !oh) return;
      NODES.forEach(({ id }) => {
        const n = state[id];
        n.x = (n.x / ow) * W;
        n.y = (n.y / oh) * H;
      });
      calcRestLen();
    });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        frozen = true;
        cancelAnimationFrame(rafId);
      } else {
        frozen = false;
        rafId = requestAnimationFrame(loop);
      }
    });

  } // end setup()
})();
