// pricing-toggle.js — Billing toggle crossfade, decipher reveal, price
// count-up, savings meter, table row hover, and guided-rail scrollspy
// for the pricing page.
// External file so production CSP can keep script-src 'self' without unsafe-inline.

// Shared billing state — other sections (who-cards, climb track) read
// this to keep their price displays in sync with the toggle.
window.PRICING = {
  isYearly: false,
  onToggle: [],
};

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

  // Plain monthly-equivalent price displays elsewhere on the page
  // (who-cards, climb track) — no suffix/was elements to manage,
  // just the number itself.
  var extraPrices = [
    { price: 'climbPriceCore', monthly: '8',  yearly: '6'  },
    { price: 'climbPricePro',  monthly: '20', yearly: '15' },
    { price: 'climbPriceMax',  monthly: '40', yearly: '30' },
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
    window.PRICING.isYearly = isYearly;

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

    // Sync the plain monthly-equivalent prices shown in the who-cards
    // and climb track.
    extraPrices.forEach(function (p) {
      var el = document.getElementById(p.price);
      if (el) animatePriceTo(el, isYearly ? p.yearly : p.monthly);
    });

    // Let other sections react (e.g. the climb track's scan messages).
    window.PRICING.onToggle.forEach(function (fn) { fn(isYearly); });
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
  var pendingTier = null;

  var TIER_PRICES = {
    core: { monthly: 8,  yearly: 6  },
    pro:  { monthly: 20, yearly: 15 },
    max:  { monthly: 40, yearly: 30 },
  };

  function buildScanMsgs() {
    var isYearly = window.PRICING && window.PRICING.isYearly;
    var msgs = {};
    Object.keys(TIER_PRICES).forEach(function (tier) {
      var price = isYearly ? TIER_PRICES[tier].yearly : TIER_PRICES[tier].monthly;
      msgs[tier] = 'scanning tier: ' + tier.toUpperCase() + ' · €' + price + '/mo...';
    });
    return msgs;
  }

  var SCAN_MSGS = buildScanMsgs();

  // ── Helpers ────────────────────────────────────────────────
  var typewriteTimer = null;
  function typewrite(el, text, speed) {
    clearInterval(typewriteTimer);
    el.textContent = '';
    var i = 0;
    var cursor = el.nextElementSibling;
    if (cursor) cursor.style.display = '';
    typewriteTimer = setInterval(function () {
      el.textContent = text.slice(0, ++i);
      if (i >= text.length) {
        clearInterval(typewriteTimer);
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
    // Always reflect the clicked tab right away, even mid-animation
    terminal.querySelectorAll('.snap-tab').forEach(function (t) {
      t.classList.toggle('snap-tab-active', t.dataset.tier === tier);
    });

    if (skipAnim) {
      currentTier = tier;
      applyTierContent(tier);
      if (scanTextEl) {
        scanTextEl.textContent = SCAN_MSGS[tier];
        var c = scanTextEl.nextElementSibling;
        if (c) c.style.display = 'none';
      }
      return;
    }

    if (switching) {
      pendingTier = tier;
      return;
    }

    if (tier === currentTier) return;
    currentTier = tier;
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
      applyTierContent(currentTier);

      // Typewrite scan header
      if (scanTextEl) typewrite(scanTextEl, SCAN_MSGS[currentTier], 28);

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
      animateBars(currentTier, 180);

      setTimeout(function () {
        featRows.forEach(function (r) { r.style.transitionDelay = ''; });
        switching = false;
        if (pendingTier && pendingTier !== currentTier) {
          var next = pendingTier;
          pendingTier = null;
          switchTier(next, false);
        } else {
          pendingTier = null;
        }
      }, 80 + featRows.length * 50 + 400);

    }, 18 * featRows.length + 100);
  }

  // ── Billing toggle: refresh scan messages + live scan text ──
  window.PRICING.onToggle.push(function () {
    SCAN_MSGS = buildScanMsgs();
    if (scanTextEl) {
      clearInterval(typewriteTimer);
      var cursor = scanTextEl.nextElementSibling;
      scanTextEl.textContent = SCAN_MSGS[currentTier];
      if (cursor) cursor.style.display = 'none';
    }
  });

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

// ── Section 02: pricing card live process feed ────────────────
// Each card has a small terminal-style status line that types out,
// holds, then erases and types the next message — looping while the
// card is in view, like a live monitoring feed for that tier.
(function () {
  var FEEDS = {
    core: [
      'workspace: 1/1 active',
      'automated runs: off',
      'cipher: 4 terminals',
    ],
    pro: [
      'workspace: 2/2 synced',
      'automated runs: 10/hr',
      'cipher: 8 terminals',
    ],
    max: [
      'workspace: unlimited',
      'automated runs: unlimited',
      'cipher: 12 terminals',
    ],
  };

  var TYPE_SPEED   = 45;
  var ERASE_SPEED  = 25;
  var HOLD_MS      = 1800;
  var prefersReduced = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.pricing-feed').forEach(function (feed) {
    var tier = feed.getAttribute('data-tier');
    var msgs = FEEDS[tier];
    if (!msgs) return;
    var textEl = feed.querySelector('.pricing-feed-text');
    if (!textEl) return;

    if (prefersReduced) {
      textEl.textContent = '$ ' + msgs[0];
      return;
    }

    var index = 0;
    var timer = null;
    var running = false;

    function step() {
      var full = '$ ' + msgs[index];
      var i = 0;
      typeForward();

      function typeForward() {
        textEl.textContent = full.slice(0, i++);
        if (i <= full.length) {
          timer = setTimeout(typeForward, TYPE_SPEED);
        } else {
          timer = setTimeout(eraseBack, HOLD_MS);
        }
      }

      function eraseBack() {
        textEl.textContent = full.slice(0, i--);
        if (i >= 0) {
          timer = setTimeout(eraseBack, ERASE_SPEED);
        } else {
          index = (index + 1) % msgs.length;
          timer = setTimeout(step, 200);
        }
      }
    }

    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting && !running) {
          running = true;
          feed.classList.add('feed-active');
          step();
        } else if (!entry.isIntersecting && running) {
          running = false;
          feed.classList.remove('feed-active');
          clearTimeout(timer);
        }
      });
    }, { threshold: 0.2 }).observe(feed);
  });
}());

