(() => {
  const terminalBtn = document.getElementById('terminalBtn');
  const sensorsBtn  = document.getElementById('sensorsBtn');
  if (!terminalBtn || !sensorsBtn) return;

  // Read-only Supabase client — only used for sensors data queries.
  // No onAuthStateChange listeners attached here to avoid competing with
  // the page's own auth client.
  const { createClient } = supabase;
  const db = createClient(
    'https://gohyhxqvcjdthxvpewrx.supabase.co',
    'sb_publishable_rBSID_xnOICGEpVQWPW8KA_FYFSdoS1'
  );

  const ONLINE_MS = 10 * 60 * 1000; // 10 minutes = online threshold

  const PROJECTS = [
    { slug: 'projectcipher', name: 'ProjectCipher', available: true },
    { slug: 'projectword',   name: 'ProjectWord',   available: true },
    { slug: 'projectbuilt',  name: 'ProjectBuilt',  available: true },
  ];

  const isMac = /Mac|iPhone|iPad|iPod/.test(navigator.platform);

  // ════════════════════════════════════════════════════════
  //  COMMAND PALETTE
  // ════════════════════════════════════════════════════════

  let paletteOpen  = false;
  let activeIdx    = 0;
  let flatItems    = []; // only command items (not group labels)
  let cmdGroups    = [];

  // ── Build command list ─────────────────────────────────
  function buildGroups(user) {
    const curPath = window.location.pathname;

    function nav(icon, label, path) {
      const isCurrent = curPath === path || (path === '/' && curPath === '/index.html');
      return {
        icon, label,
        desc: isCurrent ? 'current page' : path,
        // Close palette before navigating so body.style.overflow is always restored
        action() { closePalette(); window.location.href = path; },
      };
    }

    const navigation = [
      nav('home',        'Home',     '/'),
      nav('folder_open', 'Projects', '/projects.html'),
      nav('payments',    'Pricing',  '/pricing.html'),
    ];

    const account = user ? [
      nav('manage_accounts', 'Account', '/account.html'),
    ] : [
      nav('login',      'Sign In',       '/login.html'),
      nav('person_add', 'Create Account', '/signup.html'),
    ];

    const tools = [
      {
        icon: 'sensors',
        label: 'Project Status',
        desc: 'connected apps',
        action() { closePalette(); openSensors(); },
      },
    ];

    if (user) {
      tools.push({
        icon: 'logout',
        label: 'Sign Out',
        desc: 'end session',
        async action() {
          try { await db.auth.signOut(); } catch {}
          window.location.replace('/login.html');
        },
      });
    }

    return [
      { group: 'NAVIGATION', items: navigation },
      { group: 'ACCOUNT',    items: account    },
      { group: 'TOOLS',      items: tools      },
    ];
  }

  // ── DOM ────────────────────────────────────────────────
  const overlay = document.createElement('div');
  overlay.className = 'cmd-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Command palette');
  overlay.innerHTML = `
    <div class="cmd-panel" id="cmdPanel">
      <div class="cmd-header">
        <span class="cmd-prompt">&gt;</span>
        <input class="cmd-input" id="cmdInput" type="text"
          placeholder="Type a command or search…"
          autocomplete="off" spellcheck="false" autocorrect="off">
        <span class="cmd-kbd-hint">ESC to close</span>
      </div>
      <div class="cmd-results" id="cmdResults" role="listbox" aria-label="Commands"></div>
      <div class="cmd-footer">
        <span class="cmd-footer-hint"><kbd>↑</kbd><kbd>↓</kbd>&nbsp;navigate</span>
        <span class="cmd-footer-hint"><kbd>↵</kbd>&nbsp;select</span>
        <span class="cmd-footer-hint"><kbd>ESC</kbd>&nbsp;close</span>
        <span class="cmd-footer-hint"><kbd>${isMac ? '⌘' : 'Ctrl'}</kbd><kbd>K</kbd>&nbsp;toggle</span>
      </div>
    </div>`;
  document.body.appendChild(overlay);

  const cmdInput   = document.getElementById('cmdInput');
  const cmdResults = document.getElementById('cmdResults');

  // ── Render ─────────────────────────────────────────────
  function filterGroups(groups, q) {
    const lq = q.trim().toLowerCase();
    if (!lq) return groups;
    return groups.map(g => ({
      ...g,
      items: g.items.filter(i =>
        i.label.toLowerCase().includes(lq) ||
        i.desc.toLowerCase().includes(lq)
      ),
    })).filter(g => g.items.length > 0);
  }

  function renderResults(q) {
    const groups = filterGroups(cmdGroups, q);
    flatItems = groups.flatMap(g => g.items);

    if (!flatItems.length) {
      cmdResults.innerHTML = '<div class="cmd-no-results">No commands found</div>';
      activeIdx = 0;
      return;
    }

    let html = '';
    let ii = 0;
    for (const g of groups) {
      html += `<div class="cmd-group-label">${g.group}</div>`;
      for (const item of g.items) {
        const isActive = ii === 0;
        html += `
          <div class="cmd-item${isActive ? ' active' : ''}" role="option"
               aria-selected="${isActive}" data-cmd-idx="${ii}">
            <span class="cmd-item-icon material-symbols-outlined">${item.icon}</span>
            <span class="cmd-item-label">${item.label}</span>
            <span class="cmd-item-desc">${item.desc}</span>
          </div>`;
        ii++;
      }
    }
    cmdResults.innerHTML = html;
    activeIdx = 0;

    cmdResults.querySelectorAll('.cmd-item').forEach(el => {
      el.addEventListener('mouseenter', () => {
        setActive(parseInt(el.dataset.cmdIdx, 10));
      });
      el.addEventListener('click', () => {
        flatItems[parseInt(el.dataset.cmdIdx, 10)]?.action();
      });
    });
  }

  function setActive(idx) {
    const els = cmdResults.querySelectorAll('.cmd-item');
    if (!els.length) return;
    idx = Math.max(0, Math.min(idx, els.length - 1));
    els.forEach((el, i) => {
      const on = i === idx;
      el.classList.toggle('active', on);
      el.setAttribute('aria-selected', String(on));
    });
    els[idx]?.scrollIntoView({ block: 'nearest' });
    activeIdx = idx;
  }

  // ── Open / close ───────────────────────────────────────
  async function openPalette() {
    if (paletteOpen) return;
    // Mutual exclusivity — only one panel open at a time
    if (sensorsOpen) closeSensors();
    paletteOpen = true;

    let user = null;
    try { const { data } = await db.auth.getUser(); user = data?.user || null; } catch {}

    // Guard: user may have closed the palette (via button or Escape) during the auth await
    if (!paletteOpen) return;

    cmdGroups = buildGroups(user);
    renderResults('');

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    // Small delay so transition is visible before focus triggers reflow
    requestAnimationFrame(() => setTimeout(() => cmdInput.focus(), 20));
  }

  function closePalette() {
    if (!paletteOpen) return;
    paletteOpen = false;
    overlay.classList.remove('open');
    cmdInput.value = '';
    document.body.style.overflow = '';
  }

  // ── Input events ───────────────────────────────────────
  cmdInput.addEventListener('input', () => {
    renderResults(cmdInput.value);
  });

  cmdInput.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(activeIdx + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(activeIdx - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      flatItems[activeIdx]?.action();
    } else if (e.key === 'Escape') {
      closePalette();
    }
  });

  // Close on overlay background click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePalette();
  });

  // Stop panel clicks from bubbling to overlay
  document.getElementById('cmdPanel').addEventListener('click', (e) => e.stopPropagation());

  terminalBtn.addEventListener('click', () => {
    if (paletteOpen) closePalette();
    else openPalette();
  });

  // ════════════════════════════════════════════════════════
  //  SENSORS PANEL — connected project status
  // ════════════════════════════════════════════════════════

  let sensorsOpen = false;
  let sensorsConnections = [];
  let sensorsTickTimer = null;
  let sensorsRefreshTimer = null;

  const sensorsPanel = document.createElement('div');
  sensorsPanel.className = 'sensors-panel';
  sensorsPanel.id = 'sensorsPanel';
  document.body.appendChild(sensorsPanel);

  // ── Helpers ────────────────────────────────────────────
  function statusFor(conn) {
    if (!conn) return { key: 'never', label: 'Not Connected', extra: '' };
    const age = Date.now() - new Date(conn.last_active_at).getTime();
    if (age < ONLINE_MS) return { key: 'online', label: 'Online', extra: '' };
    return { key: 'offline', label: 'Offline', extra: ' · ' + ago(age) };
  }

  function ago(ms) {
    const s = Math.floor(ms / 1000);
    if (s < 60)  return s + 's ago';
    const m = Math.floor(s / 60);
    if (m < 60)  return m + 'm ago';
    const h = Math.floor(m / 60);
    if (h < 24)  return h + 'h ago';
    return Math.floor(h / 24) + 'd ago';
  }

  function positionPanel() {
    const r = sensorsBtn.getBoundingClientRect();
    sensorsPanel.style.top   = (r.bottom + 6) + 'px';
    // Align right edge of panel with right edge of button
    const rightGap = window.innerWidth - r.right;
    sensorsPanel.style.right = Math.max(4, rightGap) + 'px';
    sensorsPanel.style.left  = 'auto';
  }

  function headerHTML() {
    return `
      <div class="sensors-header">
        <span class="sensors-title">Project Status</span>
        <button class="sensors-close-btn" id="sensorsCloseBtn" aria-label="Close panel">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>`;
  }

  function bindClose() {
    document.getElementById('sensorsCloseBtn')?.addEventListener('click', closeSensors);
  }

  function renderRows(connections) {
    sensorsConnections = connections;
    let rows = '';
    for (const proj of PROJECTS) {
      if (!proj.available) {
        rows += `
          <div class="sensors-row">
            <span class="sensors-dot soon"></span>
            <span class="sensors-project-name soon">${proj.name}</span>
            <span class="sensors-status-label soon">Soon</span>
          </div>`;
        continue;
      }
      const conn   = connections.find(c => c.project_slug === proj.slug);
      const status = statusFor(conn);
      rows += `
        <div class="sensors-row">
          <span class="sensors-dot ${status.key}"></span>
          <span class="sensors-project-name">${proj.name}</span>
          <span class="sensors-status-label ${status.key}">${status.label}${status.extra}</span>
        </div>`;
    }
    sensorsPanel.innerHTML = headerHTML() + rows;
    bindClose();
  }

  // ── Open / close ───────────────────────────────────────
  async function openSensors() {
    if (sensorsOpen) return;
    // Mutual exclusivity — only one panel open at a time
    if (paletteOpen) closePalette();
    sensorsOpen = true;
    positionPanel();

    // Loading skeleton
    sensorsPanel.innerHTML = headerHTML() +
      '<div class="sensors-aux">Loading…</div>';
    bindClose();
    sensorsPanel.classList.add('open');

    try {
      const { data: { user } } = await db.auth.getUser();

      if (!user) {
        sensorsPanel.innerHTML = headerHTML() +
          '<div class="sensors-aux">Sign in to view<br>project connection status</div>';
        bindClose();
        return;
      }

      const { data: rows, error } = await db
        .from('project_connections')
        .select('project_slug, last_active_at')
        .eq('user_id', user.id);

      if (error) throw error;
      renderRows(rows || []);
      startSensorsLiveUpdates(user.id);

    } catch {
      sensorsPanel.innerHTML = headerHTML() +
        '<div class="sensors-aux">Could not load status</div>';
      bindClose();
    }
  }

  function stopSensorsLiveUpdates() {
    if (sensorsTickTimer)    { clearInterval(sensorsTickTimer); sensorsTickTimer = null; }
    if (sensorsRefreshTimer) { clearInterval(sensorsRefreshTimer); sensorsRefreshTimer = null; }
  }

  function startSensorsLiveUpdates(userId) {
    stopSensorsLiveUpdates();

    // Re-render "Xs/Xm ago" labels every second using the cached data —
    // keeps the displayed time accurate to the second without a refetch.
    sensorsTickTimer = setInterval(() => {
      if (!sensorsOpen) return stopSensorsLiveUpdates();
      renderRows(sensorsConnections);
    }, 1000);

    // Periodically refetch so a project that just came online/went offline
    // updates without the user closing and reopening the panel.
    sensorsRefreshTimer = setInterval(async () => {
      if (!sensorsOpen) return stopSensorsLiveUpdates();
      try {
        const { data: rows, error } = await db
          .from('project_connections')
          .select('project_slug, last_active_at')
          .eq('user_id', userId);
        if (error) throw error;
        renderRows(rows || []);
      } catch {
        // Keep showing the last known state; the tick timer keeps "ago" fresh.
      }
    }, 15000);
  }

  function closeSensors() {
    if (!sensorsOpen) return;
    sensorsOpen = false;
    sensorsPanel.classList.remove('open');
    stopSensorsLiveUpdates();
  }

  sensorsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (sensorsOpen) closeSensors();
    else openSensors();
  });

  // Close sensors on outside click
  document.addEventListener('click', (e) => {
    if (sensorsOpen &&
        !sensorsPanel.contains(e.target) &&
        e.target !== sensorsBtn &&
        !sensorsBtn.contains(e.target)) {
      closeSensors();
    }
  });

  // Reposition on resize OR scroll — panel is position:fixed so must track both
  window.addEventListener('resize', () => { if (sensorsOpen) positionPanel(); });
  window.addEventListener('scroll', () => { if (sensorsOpen) positionPanel(); }, { passive: true });

  // ════════════════════════════════════════════════════════
  //  GLOBAL KEYBOARD SHORTCUTS
  // ════════════════════════════════════════════════════════

  document.addEventListener('keydown', (e) => {
    // ⌘K / Ctrl+K — toggle palette
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (paletteOpen) closePalette();
      else openPalette();
      return;
    }
    // ESC — close whichever panel is open
    if (e.key === 'Escape') {
      if (paletteOpen) closePalette();
      if (sensorsOpen) closeSensors();
    }
  });

})();
