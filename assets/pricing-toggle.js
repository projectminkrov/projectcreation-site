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

  // ── 8. Guided rail scrollspy ────────────────────────────────
  // Walks the visitor through four steps (who it's for, your match,
  // the climb, get started). As each step's section crosses the
  // viewport center, its rail node lights up and the line segments
  // before it fill in — a progress trail through the page, not just
  // a static map of it.
  var railNodes = document.querySelectorAll('.rail-node[data-rail-target]');
  var railLines = document.querySelectorAll('.rail-line');
  if (railNodes.length) {
    var stepEls = [];
    railNodes.forEach(function (node) {
      var target = document.getElementById(node.getAttribute('data-rail-target'));
      if (target) stepEls.push({ node: node, el: target });
    });

    function setActiveStep(index) {
      stepEls.forEach(function (s, i) {
        s.node.classList.toggle('active', i === index);
      });
      railLines.forEach(function (line, i) {
        line.classList.toggle('filled', i < index);
      });
    }

    var stepObserver = new IntersectionObserver(function (entries) {
      // When several short sections cross the detection band at once
      // (e.g. on first paint at narrow viewports), pick whichever one
      // is most centered in the band rather than letting the last
      // entry in the batch win arbitrarily.
      var winner = null;
      var winnerDist = Infinity;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var idx = stepEls.findIndex(function (s) { return s.el === entry.target; });
        if (idx === -1) return;
        var rect = entry.boundingClientRect;
        var dist = Math.abs((rect.top + rect.bottom) / 2 - window.innerHeight / 2);
        if (dist < winnerDist) {
          winnerDist = dist;
          winner = idx;
        }
      });
      if (winner !== null) setActiveStep(winner);
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    stepEls.forEach(function (s) { stepObserver.observe(s.el); });
  }
}());
