// pricing-toggle.js — Billing toggle crossfade, decipher reveal, price
// count-up, savings meter, table row hover, and guided-rail scrollspy
// for the pricing page.
// External file so production CSP can keep script-src 'self' without unsafe-inline.
(function () {
  var btnMonthly = document.getElementById('billMonthly');
  var btnYearly  = document.getElementById('billYearly');
  if (!btnMonthly || !btnYearly) return;

  var savingsEls = [
    document.getElementById('savingsCore'),
    document.getElementById('savingsPro'),
    document.getElementById('savingsMax'),
  ];

  var savingsAmtIds  = ['savingsAmtCore', 'savingsAmtPro', 'savingsAmtMax'];
  var savingsTargets = [24, 60, 120];
  var savingsTimers  = [null, null, null];

  var plans = [
    { price: 'priceCore', suffix: 'suffixCore', was: 'priceWasCore', monthly: '8',  yearly: '72'  },
    { price: 'pricePro',  suffix: 'suffixPro',  was: 'priceWasPro',  monthly: '20', yearly: '180' },
    { price: 'priceMax',  suffix: 'suffixMax',  was: 'priceWasMax',  monthly: '40', yearly: '360' },
  ];

  var priceTimers = {};

  // ── 2. Price count animation ────────────────────────────────
  // Counts smoothly from the currently displayed value to the target,
  // easing out so it visibly slows down as it nears the destination —
  // reads as a deliberate roll rather than a random flicker.
  function animatePriceTo(el, target) {
    var id = el.id;
    clearInterval(priceTimers[id]);
    var startVal = parseInt(el.textContent, 10);
    if (isNaN(startVal)) startVal = parseInt(target, 10);
    var endVal   = parseInt(target, 10);
    var start    = Date.now();
    var duration = 650;
    priceTimers[id] = setInterval(function () {
      var progress = Math.min((Date.now() - start) / duration, 1);
      var eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = String(Math.round(startVal + (endVal - startVal) * eased));
      if (progress >= 1) {
        el.textContent = target;
        clearInterval(priceTimers[id]);
      }
    }, 16);
  }

  // ── 7. Savings count-up ─────────────────────────────────────
  function countUpSavings() {
    savingsAmtIds.forEach(function (id, i) {
      var el = document.getElementById(id);
      if (!el) return;
      var target   = savingsTargets[i];
      var start    = Date.now();
      var duration = 420;
      clearInterval(savingsTimers[i]);
      el.textContent = '€0';
      savingsTimers[i] = setInterval(function () {
        var progress = Math.min((Date.now() - start) / duration, 1);
        var eased    = 1 - Math.pow(1 - progress, 3);
        el.textContent = '€' + Math.round(eased * target);
        if (progress >= 1) clearInterval(savingsTimers[i]);
      }, 16);
    });
  }

  // ── 3. Activate (toggle) ────────────────────────────────────
  function setClasses(el, remove, add) {
    if (!el) return;
    el.classList.remove.apply(el.classList, remove);
    el.classList.add.apply(el.classList, add);
  }

  function activate(isYearly) {
    // Each button's accent background crossfades independently via the
    // shared `transition-colors duration-200` utility — no moving part,
    // so there's nothing to stretch between two differently-sized tabs.
    setClasses(
      btnMonthly,
      isYearly ? ['bg-primary-container', 'text-on-primary'] : ['text-on-surface-variant', 'hover:bg-surface-container-highest'],
      isYearly ? ['text-on-surface-variant', 'hover:bg-surface-container-highest'] : ['bg-primary-container', 'text-on-primary']
    );
    setClasses(
      btnYearly,
      isYearly ? ['text-on-surface-variant', 'hover:bg-surface-container-highest'] : ['bg-primary-container', 'text-on-primary'],
      isYearly ? ['bg-primary-container', 'text-on-primary'] : ['text-on-surface-variant', 'hover:bg-surface-container-highest']
    );

    btnMonthly.setAttribute('aria-pressed', String(!isYearly));
    btnYearly.setAttribute('aria-pressed',  String(isYearly));

    // Savings visibility + count-up
    savingsEls.forEach(function (el) { if (el) el.classList.toggle('hidden', !isYearly); });
    if (isYearly) countUpSavings();

    // The headline number always reads "per month" — billed monthly at
    // its full rate, or billed annually at its discounted monthly-equivalent
    // (yearly total ÷ 12). Keeping the unit constant across the toggle lets
    // visitors compare tiers without doing the math themselves, and the
    // crossed-out full price makes the saving land at a glance.
    plans.forEach(function (p) {
      var priceEl  = document.getElementById(p.price);
      var suffixEl = document.getElementById(p.suffix);
      var wasEl    = document.getElementById(p.was);
      var monthlyEquivalent = String(Math.round(parseInt(p.yearly, 10) / 12));

      if (priceEl)  animatePriceTo(priceEl, isYearly ? monthlyEquivalent : p.monthly);
      if (suffixEl) suffixEl.textContent = '/mo';
      if (wasEl) {
        if (isYearly) {
          wasEl.textContent = '€' + p.monthly;
          wasEl.classList.remove('hidden');
        } else {
          wasEl.classList.add('hidden');
        }
      }
    });
  }

  btnMonthly.addEventListener('click', function () { activate(false); });
  btnYearly.addEventListener('click',  function () { activate(true);  });

  // ── 6. Table row hover crosshair ───────────────────────────
  var tableGrid = document.querySelector('.pricing-table-grid');
  if (tableGrid) {
    var hoveredRow = null;

    function setRowHighlight(row, on) {
      if (!row) return;
      tableGrid.querySelectorAll('[data-row="' + row + '"]').forEach(function (c) {
        c.classList.toggle('row-hover', on);
      });
    }

    tableGrid.addEventListener('mouseover', function (e) {
      var cell = e.target.closest('[data-row]');
      var row  = cell ? cell.dataset.row : null;
      if (row === hoveredRow) return;
      setRowHighlight(hoveredRow, false);
      hoveredRow = row;
      setRowHighlight(hoveredRow, true);
    });

    tableGrid.addEventListener('mouseleave', function () {
      setRowHighlight(hoveredRow, false);
      hoveredRow = null;
    });
  }

  // ── 1. Decipher reveal ──────────────────────────────────────
  // Same "deciphering text" effect as the homepage vision headline:
  // characters resolve left-to-right while the rest still scramble
  // through a random charset, reading as a terminal decoding itself.
  var labelEl    = document.getElementById('pricingLabel');
  var headlineEl = document.getElementById('pricingHeadline');
  var DECIPHER_CHARS = '!<>-_/[]{}=+*?#@$%ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  function decipher(el, duration, cb) {
    el.style.visibility = 'visible';
    var final = el.textContent.trim();
    var len   = final.length;
    var frame = 0;
    var totalFrames = Math.ceil(duration / 40);
    var id = setInterval(function () {
      var resolved = Math.floor(len * Math.min((frame / totalFrames) * 1.6, 1));
      var out = '';
      for (var i = 0; i < len; i++) {
        if (final[i] === ' ') { out += ' '; continue; }
        out += i < resolved ? final[i] : DECIPHER_CHARS[Math.floor(Math.random() * DECIPHER_CHARS.length)];
      }
      el.textContent = out;
      if (++frame > totalFrames) {
        el.textContent = final;
        clearInterval(id);
        if (cb) cb();
      }
    }, 40);
  }

  if (labelEl && headlineEl) {
    decipher(labelEl, 500, function () {
      setTimeout(function () {
        decipher(headlineEl, 700);
      }, 80);
    });
  }

}());

// ── Who section: terminal windows + morphing headline ──────────
(function () {
  var headline     = document.getElementById('whoHeadline');
  var terminalsWrap = document.querySelector('.who-terminals');
  var terminals    = terminalsWrap ? terminalsWrap.querySelectorAll('.who-terminal') : [];
  if (!headline || !terminals.length) return;

  var DEFAULT = 'Three different shapes of building. Three tiers to match them.';
  var CHARS   = '!<>-_/[]{}=+*?#@$%ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var timer   = null;

  function decipher(text, duration) {
    clearInterval(timer);
    var len = text.length;
    var frame = 0;
    var total = Math.ceil(duration / 40);
    timer = setInterval(function () {
      var resolved = Math.floor(len * Math.min((frame / total) * 1.6, 1));
      var out = '';
      for (var i = 0; i < len; i++) {
        if (text[i] === ' ') { out += ' '; continue; }
        out += i < resolved ? text[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      headline.textContent = out;
      if (++frame > total) {
        headline.textContent = text;
        clearInterval(timer);
      }
    }, 40);
  }

  // Stagger panels in on scroll
  var revealed = false;
  new IntersectionObserver(function (entries) {
    if (revealed || !entries[0].isIntersecting) return;
    revealed = true;
    terminals.forEach(function (t, i) {
      setTimeout(function () { t.classList.add('who-visible'); }, i * 130);
    });
  }, { threshold: 0.15 }).observe(terminalsWrap);

  // Hover: lift active, dim others, morph headline
  terminals.forEach(function (terminal) {
    var cta = terminal.querySelector('.who-terminal-cta');

    terminal.addEventListener('mouseenter', function () {
      terminalsWrap.classList.add('who-has-hover');
      terminal.classList.add('who-hovered');
      if (cta) { cta.removeAttribute('tabindex'); cta.removeAttribute('aria-hidden'); }
      var h = terminal.getAttribute('data-headline');
      if (h) decipher(h, 360);
    });

    terminal.addEventListener('mouseleave', function () {
      terminal.classList.remove('who-hovered');
      if (cta) { cta.setAttribute('tabindex', '-1'); cta.setAttribute('aria-hidden', 'true'); }
      var anyHovered = false;
      terminals.forEach(function (t) { if (t.classList.contains('who-hovered')) anyHovered = true; });
      if (!anyHovered) {
        terminalsWrap.classList.remove('who-has-hover');
        decipher(DEFAULT, 360);
      }
    });
  });

  // CPU bar ticker on MAX terminal hover
  var maxEl   = terminalsWrap.querySelector('[data-tier="max"]');
  var cpuBar  = maxEl ? maxEl.querySelector('.who-cpu-bar') : null;
  var cpuPct  = maxEl ? maxEl.querySelector('.who-cpu-pct') : null;
  if (maxEl && cpuBar && cpuPct) {
    var bars = ['███░░░░░░░','█████░░░░░','███████░░░','█████████░','██████████','█████████░','████████░░','██████░░░░'];
    var pcts = ['31%','52%','71%','90%','99%','94%','83%','67%'];
    var cpuIdx = 3;
    var cpuTimer = null;
    maxEl.addEventListener('mouseenter', function () {
      cpuTimer = setInterval(function () {
        cpuIdx = (cpuIdx + 1) % bars.length;
        cpuBar.textContent = bars[cpuIdx];
        cpuPct.textContent = pcts[cpuIdx];
      }, 380);
    });
    maxEl.addEventListener('mouseleave', function () {
      clearInterval(cpuTimer);
      cpuBar.textContent = '█████████░';
      cpuPct.textContent = '94%';
    });
  }
}());

// ── Upgrade Track + Focused Snap Terminal ─────────────────────
(function () {
  var track    = document.getElementById('climbTrack');
  var terminal = document.getElementById('snapTerminal');
  var featList = document.getElementById('snapFeatList');
  if (!track || !terminal || !featList) return;

  var climbNodes  = track.querySelectorAll('.climb-node');
  var featRows    = featList.querySelectorAll('.snap-feat-row');
  var featSects   = featList.querySelectorAll('.snap-feat-section');
  var scanTextEl  = document.getElementById('snapScanText');
  var currentTier = 'pro';
  var switching   = false;

  var SCAN_MSGS = {
    core: 'scanning tier: CORE · €8/mo...',
    pro:  'scanning tier: PRO · €20/mo...',
    max:  'scanning tier: MAX · €40/mo...'
  };

  // ── Helpers ────────────────────────────────────────────────
  function typewrite(el, text, speed) {
    el.textContent = '';
    var i = 0;
    var cursor = el.nextElementSibling;
    if (cursor) cursor.style.display = '';
    var t = setInterval(function () {
      el.textContent = text.slice(0, ++i);
      if (i >= text.length) {
        clearInterval(t);
        if (cursor) cursor.style.display = 'none';
      }
    }, speed);
  }

  function fmtVal(val, status) {
    if (!val) return '';
    val = val.replace('[OK]',  '<span class="snap-ok">[OK]</span>');
    val = val.replace('[--]',  '<span class="snap-dash">[--]</span>');
    if (status === 'limited') return '<span class="snap-limited">' + val + '</span>';
    return val;
  }

  // ── Apply tier content (no animation) ──────────────────────
  function applyTierContent(tier) {
    featRows.forEach(function (row) {
      var pct    = parseInt(row.dataset[tier + 'Pct'] || '0', 10);
      var status = row.dataset[tier + 'Status'] || 'off';
      var val    = row.dataset[tier + 'Val'] || '';
      var bar    = row.querySelector('.snap-feat-bar');
      var valEl  = row.querySelector('.snap-feat-val, .snap-feat-val-solo');
      if (valEl) valEl.innerHTML = fmtVal(val, status);
      if (bar) {
        bar.className = 'snap-feat-bar bar-' + status;
        bar.style.width = pct + '%';
      }
    });
  }

  // ── Animate bars from 0 (used on first reveal or tier switch) ─
  function animateBars(tier, delay) {
    featRows.forEach(function (row, i) {
      var bar    = row.querySelector('.snap-feat-bar');
      var pct    = parseInt(row.dataset[tier + 'Pct'] || '0', 10);
      var status = row.dataset[tier + 'Status'] || 'off';
      if (!bar) return;
      bar.className = 'snap-feat-bar bar-' + status;
      bar.style.width = '0%';
      setTimeout(function () { bar.style.width = pct + '%'; }, (delay || 0) + i * 60);
    });
  }

  // ── Switch tier (animated) ─────────────────────────────────
  function switchTier(tier, skipAnim) {
    if (tier === currentTier && !skipAnim) return;
    currentTier = tier;

    // Update tabs
    terminal.querySelectorAll('.snap-tab').forEach(function (t) {
      t.classList.toggle('snap-tab-active', t.dataset.tier === tier);
    });

    if (skipAnim) {
      applyTierContent(tier);
      if (scanTextEl) {
        scanTextEl.textContent = SCAN_MSGS[tier];
        var c = scanTextEl.nextElementSibling;
        if (c) c.style.display = 'none';
      }
      return;
    }

    if (switching) return;
    switching = true;

    // Fade rows out
    featRows.forEach(function (row, i) {
      row.style.transitionDelay = (i * 18) + 'ms';
      row.classList.remove('snap-in');
      row.classList.add('snap-out');
    });
    featSects.forEach(function (s) {
      s.classList.remove('snap-in');
      s.classList.add('snap-out');
    });

    setTimeout(function () {
      // Update content
      applyTierContent(tier);

      // Typewrite scan header
      if (scanTextEl) typewrite(scanTextEl, SCAN_MSGS[tier], 28);

      // Fade rows + sections in
      featSects.forEach(function (s, i) {
        s.classList.remove('snap-out');
        setTimeout(function () { s.classList.add('snap-in'); }, i * 100);
      });
      featRows.forEach(function (row, i) {
        row.classList.remove('snap-out');
        row.style.transitionDelay = (i * 50) + 'ms';
        setTimeout(function () { row.classList.add('snap-in'); }, 80 + i * 50);
      });

      // Animate bars after rows are visible
      animateBars(tier, 180);

      setTimeout(function () {
        featRows.forEach(function (r) { r.style.transitionDelay = ''; });
        switching = false;
      }, 80 + featRows.length * 50 + 400);

    }, 18 * featRows.length + 100);
  }

  // ── Tab clicks ────────────────────────────────────────────
  terminal.querySelectorAll('.snap-tab').forEach(function (tab) {
    tab.addEventListener('click', function () { switchTier(tab.dataset.tier, false); });
  });

  // ── Climb node hover → switch tier ───────────────────────
  climbNodes.forEach(function (node) {
    node.addEventListener('mouseenter', function () {
      if (node.dataset.tier) switchTier(node.dataset.tier, false);
    });
  });

  // ── Track fill + node activation on scroll ────────────────
  var trackDone = false;
  new IntersectionObserver(function (entries) {
    if (trackDone || !entries[0].isIntersecting) return;
    trackDone = true;
    track.classList.add('climb-active');
    climbNodes.forEach(function (node, i) {
      setTimeout(function () { node.classList.add('climb-node-lit'); }, 500 + i * 320);
    });
  }, { threshold: 0.25 }).observe(track);

  // ── Scroll reveal: stagger rows + sections in, animate bars ─
  var snapDone = false;
  new IntersectionObserver(function (entries) {
    if (snapDone || !entries[0].isIntersecting) return;
    snapDone = true;

    // Set content without bar animation first
    switchTier(currentTier, true);

    // Typewrite scan header
    if (scanTextEl) typewrite(scanTextEl, SCAN_MSGS[currentTier], 30);

    // Stagger sections in
    featSects.forEach(function (s, i) {
      setTimeout(function () { s.classList.add('snap-in'); }, i * 160);
    });

    // Stagger rows in
    featRows.forEach(function (row, i) {
      setTimeout(function () { row.classList.add('snap-in'); }, 120 + i * 65);
    });

    // Animate bars after rows start appearing
    animateBars(currentTier, 280);

  }, { threshold: 0.05 }).observe(terminal);

}());

// ── // 04 Get Started ─────────────────────────────────────────
(function () {
  var tierPanel  = document.getElementById('gsTierPanel');
  var clientBody = document.getElementById('gsClientBody');
  var sysBody    = document.getElementById('gsSysBody');
  var ctaLabel   = document.getElementById('gsCtaLabel');
  var ctaBtn     = document.getElementById('gsCtaBtn');
  var stream     = document.getElementById('gsStream');
  var ctaWrap    = document.getElementById('gsCtaWrap');
  var handshake  = document.getElementById('gsHandshake');
  if (!tierPanel || !clientBody || !sysBody) return;

  var activeTier = 'pro';

  var TIERS = {
    core: {
      cta:  'INITIALIZE CORE TRIAL →',
      client: [
        { k: '> tier:',   v: 'CORE',          c: '' },
        { k: '> trial:',  v: '3 days',         c: '' },
        { k: '> card:',   v: 'NOT REQUIRED',   c: 'ok' },
        { k: '> status:', v: 'READY',          c: 'cyan' },
      ],
      sys: [
        { k: 'ACK:',          v: 'TIER_RECEIVED',    c: '' },
        { k: 'GRANT:',        v: 'FULL_CORE_ACCESS', c: 'ok' },
        { k: 'TERMINALS:',    v: '4',                c: '' },
        { k: 'WORKSPACES:',   v: '1 active',         c: '' },
        { k: 'ORCHESTRATOR:', v: 'NONE',             c: 'dim' },
        { k: 'STATUS:',       v: 'AWAITING CONFIRM', c: 'cyan' },
      ],
    },
    pro: {
      cta:  'INITIALIZE PRO TRIAL →',
      client: [
        { k: '> tier:',   v: 'PRO',            c: '' },
        { k: '> trial:',  v: '3 days',         c: '' },
        { k: '> card:',   v: 'NOT REQUIRED',   c: 'ok' },
        { k: '> status:', v: 'READY',          c: 'cyan' },
      ],
      sys: [
        { k: 'ACK:',          v: 'TIER_RECEIVED',   c: '' },
        { k: 'GRANT:',        v: 'FULL_PRO_ACCESS', c: 'ok' },
        { k: 'TERMINALS:',    v: '8',               c: '' },
        { k: 'WORKSPACES:',   v: '2',               c: '' },
        { k: 'ORCHESTRATOR:', v: '10 / hr',         c: 'amber' },
        { k: 'STATUS:',       v: 'AWAITING CONFIRM',c: 'cyan' },
      ],
    },
    max: {
      cta:  'INITIALIZE MAX TRIAL →',
      client: [
        { k: '> tier:',   v: 'MAX',            c: '' },
        { k: '> trial:',  v: '3 days',         c: '' },
        { k: '> card:',   v: 'NOT REQUIRED',   c: 'ok' },
        { k: '> status:', v: 'READY',          c: 'cyan' },
      ],
      sys: [
        { k: 'ACK:',          v: 'TIER_RECEIVED',   c: '' },
        { k: 'GRANT:',        v: 'FULL_MAX_ACCESS', c: 'ok' },
        { k: 'TERMINALS:',    v: '12',              c: '' },
        { k: 'WORKSPACES:',   v: 'unlimited',       c: 'ok' },
        { k: 'ORCHESTRATOR:', v: 'unlimited',       c: 'ok' },
        { k: 'STATUS:',       v: 'AWAITING CONFIRM',c: 'cyan' },
      ],
    },
  };

  var CLS = { '': 'gs-lv', 'ok': 'gs-lv-ok', 'cyan': 'gs-lv-cyan', 'amber': 'gs-lv-amber', 'dim': 'gs-lv-dim' };

  function makeLine(k, v, c) {
    var el = document.createElement('div');
    el.className = 'gs-term-line';
    var kEl = document.createElement('span');
    kEl.className = 'gs-lk';
    kEl.textContent = k;
    var vEl = document.createElement('span');
    vEl.className = CLS[c] || 'gs-lv';
    vEl.textContent = v;
    el.appendChild(kEl);
    el.appendChild(vEl);
    return el;
  }

  function makeCursor() {
    var el = document.createElement('div');
    el.className = 'gs-term-line';
    var kEl = document.createElement('span');
    kEl.className = 'gs-lk';
    kEl.textContent = '> confirm? [Y/n]:';
    var c = document.createElement('span');
    c.className = 'gs-cursor';
    c.textContent = ' ▌';
    el.appendChild(kEl);
    el.appendChild(c);
    return el;
  }

  function renderTerminal(container, rows, withCursor, baseDelay) {
    container.innerHTML = '';
    var d = baseDelay || 0;
    rows.forEach(function (row, i) {
      var line = makeLine(row.k, row.v, row.c);
      container.appendChild(line);
      setTimeout(function () { line.classList.add('gs-in'); }, d + i * 70);
    });
    if (withCursor) {
      var cur = makeCursor();
      container.appendChild(cur);
      setTimeout(function () { cur.classList.add('gs-in'); }, d + rows.length * 70 + 40);
    }
  }

  function flashStream(cb) {
    if (!stream) { if (cb) cb(); return; }
    stream.classList.add('gs-stream-off');
    setTimeout(function () {
      stream.classList.remove('gs-stream-off');
      if (cb) cb();
    }, 220);
  }

  function selectTier(tier, animate) {
    activeTier = tier;
    var data = TIERS[tier];

    // Update cards
    tierPanel.querySelectorAll('.gs-tier-card').forEach(function (card) {
      var on = card.dataset.tier === tier;
      card.classList.toggle('gs-tier-armed', on);
      card.querySelector('.gs-tier-ind').textContent = on ? '● ARMED' : '○ STANDBY';
    });

    // Update CTA text
    if (ctaLabel) ctaLabel.textContent = data.cta;

    // Render client terminal
    renderTerminal(clientBody, data.client, true, 0);

    // Render sys terminal (with stream flash if animating)
    if (animate) {
      flashStream(function () { renderTerminal(sysBody, data.sys, false, 80); });
    } else {
      renderTerminal(sysBody, data.sys, false, 0);
    }
  }

  // Card clicks
  tierPanel.querySelectorAll('.gs-tier-card').forEach(function (card) {
    card.addEventListener('click', function () {
      if (card.dataset.tier !== activeTier) selectTier(card.dataset.tier, true);
    });
  });

  // Scroll reveal
  var revealed = false;
  new IntersectionObserver(function (entries) {
    if (revealed || !entries[0].isIntersecting) return;
    revealed = true;

    selectTier('pro', false);

    if (handshake) {
      handshake.style.opacity = '0';
      setTimeout(function () {
        handshake.style.transition = 'opacity 500ms ease';
        handshake.style.opacity = '1';
      }, 160);
    }

    if (ctaWrap) {
      ctaWrap.style.opacity = '0';
      ctaWrap.style.transform = 'translateY(14px)';
      setTimeout(function () {
        ctaWrap.style.transition = 'opacity 500ms ease, transform 500ms ease';
        ctaWrap.style.opacity = '1';
        ctaWrap.style.transform = 'none';
      }, 560);
    }
  }, { threshold: 0.08 }).observe(tierPanel);

}());
