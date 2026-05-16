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

  const HOME = {
    core:      [0.50, 0.50],
    projects:  [0.28, 0.30],
    tools:     [0.72, 0.30],
    vision:    [0.28, 0.70],
    community: [0.72, 0.70],
  };

  let W = container.offsetWidth;
  let H = container.offsetHeight;

  const state = {};
  NODES.forEach(({ id }) => {
    const [px, py] = HOME[id];
    state[id] = { x: px * W, y: py * H, vx: 0, vy: 0, pinned: false };
  });

  let frozen      = true;
  let isReturning = false;

  // ── DOM nodes ─────────────────────────────────────────
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

  // ── SVG lines ─────────────────────────────────────────
  const lineEls = {};
  LINKS.forEach(([a, b]) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('class', 'graph-line');
    svg.appendChild(line);
    lineEls[`${a}:${b}`] = line;
  });

  // ── Rest length from actual home distances ─────────────
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

  // ── Physics constants (drag phase only) ───────────────
  // D3-inspired: higher velocity decay = less bounce during interaction
  const SPRING_K  = 0.006;
  const REPULSE   = 300;
  const CENTER_K  = 0.0003;
  const DAMPING   = 0.82;  // lose ~18% velocity per frame — D3 default loses 40%
  const PAD       = 52;

  // ── Tick ─────────────────────────────────────────────
  function tick() {
    if (frozen) return;

    const list = NODES.map(d => state[d.id]);

    // ── Return mode: tuned damped spring (ζ ≈ 0.65 → ~6% overshoot) ──
    // Formula: ζ = (1 - DAMP) / (2 * sqrt(K))
    // With K=0.02, DAMP=0.82 → ζ = 0.18/0.283 ≈ 0.636
    // Overshoot = exp(-π·ζ/√(1-ζ²)) ≈ 6% — one tiny bounce then clean settle.
    if (isReturning) {
      const K    = 0.02;
      const DAMP = 0.82;
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
        frozen = true;
        NODES.forEach(({ id }) => {
          state[id].x  = HOME[id][0] * W;
          state[id].y  = HOME[id][1] * H;
          state[id].vx = 0;
          state[id].vy = 0;
        });
      }

      render();
      return;
    }

    // ── Regular drag physics ──────────────────────────
    list.forEach(n => { n.ax = 0; n.ay = 0; });

    // Spring along links
    LINKS.forEach(([aid, bid]) => {
      const a = state[aid], b = state[bid];
      const dx = b.x - a.x, dy = b.y - a.y;
      const d  = Math.sqrt(dx * dx + dy * dy) || 1;
      const f  = SPRING_K * (d - _restLen);
      a.ax += dx / d * f;  a.ay += dy / d * f;
      b.ax -= dx / d * f;  b.ay -= dy / d * f;
    });

    // Repulsion
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

    // Center gravity
    list.forEach(n => {
      n.ax += (W * 0.5 - n.x) * CENTER_K;
      n.ay += (H * 0.5 - n.y) * CENTER_K;
    });

    // Integrate
    list.forEach(n => {
      if (n.pinned) return;
      n.vx = (n.vx + n.ax) * DAMPING;
      n.vy = (n.vy + n.ay) * DAMPING;
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
      const na = state[a], nb = state[b];
      const ln = lineEls[`${a}:${b}`];
      ln.setAttribute('x1', na.x); ln.setAttribute('y1', na.y);
      ln.setAttribute('x2', nb.x); ln.setAttribute('y2', nb.y);
    });
  }

  function loop() { tick(); render(); requestAnimationFrame(loop); }
  loop();

  // ── Drag ─────────────────────────────────────────────
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
    if (moved) {
      nodeEls[dragId].addEventListener('click', e => e.preventDefault(), { once: true });
    }
    dragId      = null;
    isReturning = true; // triggers smooth lerp back to home
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
