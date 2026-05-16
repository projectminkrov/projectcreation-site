(() => {
  const container = document.getElementById('graphContainer');
  const svg       = document.getElementById('graphSvg');
  if (!container || !svg) return;

  const NODES = [
    { id: 'core',      label: 'Core',      icon: 'hub',          fill: true,  isCore: true,  href: null },
    { id: 'projects',  label: 'Projects',  icon: 'folder_open',  fill: false, isCore: false, href: '#projects' },
    { id: 'tools',     label: 'Tools',     icon: 'construction', fill: false, isCore: false, href: '#tools' },
    { id: 'vision',    label: 'Vision',    icon: 'visibility',   fill: false, isCore: false, href: '#vision' },
    { id: 'community', label: 'Community', icon: 'groups',       fill: false, isCore: false, href: '#community' },
  ];

  const LINKS = [
    ['core', 'projects'],
    ['core', 'tools'],
    ['core', 'vision'],
    ['core', 'community'],
  ];

  // Home layout (fractions of container W/H)
  const HOME = {
    core:      [0.50, 0.50],
    projects:  [0.28, 0.30],
    tools:     [0.72, 0.30],
    vision:    [0.28, 0.70],
    community: [0.72, 0.70],
  };

  let W = container.offsetWidth;
  let H = container.offsetHeight;

  // Physics state
  const state = {};
  NODES.forEach(({ id }) => {
    const [px, py] = HOME[id];
    state[id] = { x: px * W, y: py * H, vx: 0, vy: 0, pinned: false, ax: 0, ay: 0 };
  });

  // Return-to-home state
  let isReturning  = false;
  let homeStrength = 0; // ramps 0 → 1 after drag release
  let frozen       = true; // start frozen at home — physics only runs after first interaction

  // Build DOM nodes
  const nodeEls = {};
  NODES.forEach(def => {
    const el = document.createElement(def.href ? 'a' : 'div');
    if (def.href) { el.href = def.href; el.setAttribute('draggable', 'false'); }
    el.className = def.isCore ? 'gn gn-core' : 'gn';
    el.innerHTML =
      `<div class="gn-box${def.isCore ? ' gn-box-core' : ''}">` +
        `<span class="material-symbols-outlined${def.fill ? ' material-symbols-fill' : ''}">${def.icon}</span>` +
      `</div>` +
      `<span class="gn-label">${def.label}</span>`;
    container.appendChild(el);
    nodeEls[def.id] = el;
  });

  // Build SVG lines
  const lineEls = {};
  LINKS.forEach(([a, b]) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('class', 'graph-line');
    svg.appendChild(line);
    lineEls[`${a}:${b}`] = line;
  });

  // Physics constants
  const SPRING_K = 0.005;  // very gentle spring
  const REPULSE  = 1200;   // light repulsion
  const CENTER_K = 0.0004; // barely-there center gravity
  const DAMPING  = 0.97;   // high damping kills velocity fast
  const PAD      = 52;

  // Compute rest length from actual home distances so springs are at
  // equilibrium when nodes are at home — eliminates the core bounce source
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
  function restLen() { return _restLen; }

  function tick() {
    if (frozen) return; // no physics until user interacts
    const list = NODES.map(d => state[d.id]);
    list.forEach(n => { n.ax = 0; n.ay = 0; });

    // Spring attraction along links
    LINKS.forEach(([aid, bid]) => {
      const a = state[aid], b = state[bid];
      const dx = b.x - a.x, dy = b.y - a.y;
      const d  = Math.sqrt(dx * dx + dy * dy) || 1;
      const f  = SPRING_K * (d - restLen());
      a.ax += dx / d * f;  a.ay += dy / d * f;
      b.ax -= dx / d * f;  b.ay -= dy / d * f;
    });

    // Coulomb repulsion between every pair
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

    // Weak center gravity so nodes don't drift off screen
    list.forEach(n => {
      n.ax += (W * 0.5 - n.x) * CENTER_K;
      n.ay += (H * 0.5 - n.y) * CENTER_K;
    });

    // Return-to-home spring — ramps up smoothly after drag release
    const anyPinned = list.some(n => n.pinned);
    if (isReturning && !anyPinned) {
      homeStrength = Math.min(1, homeStrength + 0.005); // ~200 frames ≈ 3s to full strength
      const homeK = homeStrength * 0.018;              // very gentle pull

      NODES.forEach(({ id }) => {
        const n  = state[id];
        const hx = HOME[id][0] * W;
        const hy = HOME[id][1] * H;
        n.ax += (hx - n.x) * homeK;
        n.ay += (hy - n.y) * homeK;
      });

      // Once everything is close enough, snap and stop
      const settled = NODES.every(({ id }) => {
        const n  = state[id];
        const hx = HOME[id][0] * W;
        const hy = HOME[id][1] * H;
        const dx = n.x - hx, dy = n.y - hy;
        return Math.sqrt(dx * dx + dy * dy) < 2 &&
               Math.abs(n.vx) < 0.4 && Math.abs(n.vy) < 0.4;
      });

      if (settled) {
        isReturning  = false;
        homeStrength = 0;
        NODES.forEach(({ id }) => {
          const n  = state[id];
          n.x  = HOME[id][0] * W;
          n.y  = HOME[id][1] * H;
          n.vx = 0; n.vy = 0;
        });
        frozen = true; // refreeze until next interaction
      }
    }

    // Euler integration — higher damping during return gives slow, fluid drift
    const damp = isReturning ? 0.97 : DAMPING;
    list.forEach(n => {
      if (n.pinned) return;
      n.vx = (n.vx + n.ax) * damp;
      n.vy = (n.vy + n.ay) * damp;
      n.x  = Math.max(PAD, Math.min(W - PAD, n.x + n.vx));
      n.y  = Math.max(PAD, Math.min(H - PAD, n.y + n.vy));
    });
  }

  function render() {
    NODES.forEach(({ id }) => {
      const n  = state[id];
      const el = nodeEls[id];
      el.style.left = n.x + 'px';
      el.style.top  = n.y + 'px';
    });
    LINKS.forEach(([a, b]) => {
      const na   = state[a], nb = state[b];
      const line = lineEls[`${a}:${b}`];
      line.setAttribute('x1', na.x); line.setAttribute('y1', na.y);
      line.setAttribute('x2', nb.x); line.setAttribute('y2', nb.y);
    });
  }

  function loop() { tick(); render(); requestAnimationFrame(loop); }
  loop();

  // ── Drag / touch interaction ──────────────────────────
  let dragId = null, ox = 0, oy = 0, moved = false;

  function ptStart(e, id) {
    e.preventDefault();
    // Wake physics and cancel any active return animation
    frozen       = false;
    isReturning  = false;
    homeStrength = 0;

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
    // Block accidental href navigation if user actually dragged
    if (moved) {
      nodeEls[dragId].addEventListener('click', e => e.preventDefault(), { once: true });
    }
    dragId = null;
    // Trigger smooth return to home
    isReturning  = true;
    homeStrength = 0;
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

  // ── Resize ────────────────────────────────────────────
  window.addEventListener('resize', () => {
    const ow = W, oh = H;
    W = container.offsetWidth; H = container.offsetHeight;
    NODES.forEach(({ id }) => {
      const n = state[id];
      n.x = (n.x / ow) * W;
      n.y = (n.y / oh) * H;
    });
    calcRestLen();
  });
})();
