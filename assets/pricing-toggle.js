// pricing-toggle.js — Billing toggle, typewriter, glitch counter, savings meter,
// border tracer, and table row hover for the pricing page.
// External file so production CSP can keep script-src 'self' without unsafe-inline.
(function () {
  var btnMonthly = document.getElementById('billMonthly');
  var btnYearly  = document.getElementById('billYearly');
  if (!btnMonthly || !btnYearly) return;

  var slider = document.getElementById('billingSlider');

  var savingsEls = [
    document.getElementById('savingsCore'),
    document.getElementById('savingsPro'),
    document.getElementById('savingsMax'),
  ];

  var savingsAmtIds  = ['savingsAmtCore', 'savingsAmtPro', 'savingsAmtMax'];
  var savingsTargets = [16, 50, 100];
  var savingsTimers  = [null, null, null];

  var plans = [
    { price: 'priceCore', suffix: 'suffixCore', monthly: '8',  yearly: '80'  },
    { price: 'pricePro',  suffix: 'suffixPro',  monthly: '20', yearly: '190' },
    { price: 'priceMax',  suffix: 'suffixMax',  monthly: '40', yearly: '380' },
  ];

  var GLITCH_CHARS = '0123456789';
  var glitchTimers = {};

  // ── 2. Price glitch counter ─────────────────────────────────
  function glitchPrice(el, target) {
    var id = el.id;
    clearInterval(glitchTimers[id]);
    var start    = Date.now();
    var duration = 130;
    glitchTimers[id] = setInterval(function () {
      var elapsed = Date.now() - start;
      if (elapsed >= duration) {
        el.textContent = target;
        clearInterval(glitchTimers[id]);
        return;
      }
      var scrambled = '';
      for (var i = 0; i < target.length; i++) {
        scrambled += GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      }
      el.textContent = scrambled;
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
    // Text colours (bg handled by the CSS slider)
    setClasses(btnMonthly,
      isYearly ? ['text-on-primary']        : ['text-on-surface-variant'],
      isYearly ? ['text-on-surface-variant'] : ['text-on-primary']
    );
    setClasses(btnYearly,
      isYearly ? ['text-on-surface-variant'] : ['text-on-primary'],
      isYearly ? ['text-on-primary']         : ['text-on-surface-variant']
    );

    // Slide indicator
    if (slider) slider.classList.toggle('is-yearly', isYearly);

    btnMonthly.setAttribute('aria-pressed', String(!isYearly));
    btnYearly.setAttribute('aria-pressed',  String(isYearly));

    // Savings visibility + count-up
    savingsEls.forEach(function (el) { if (el) el.classList.toggle('hidden', !isYearly); });
    if (isYearly) countUpSavings();

    // Glitch prices
    plans.forEach(function (p) {
      var priceEl  = document.getElementById(p.price);
      var suffixEl = document.getElementById(p.suffix);
      if (priceEl)  glitchPrice(priceEl, isYearly ? p.yearly : p.monthly);
      if (suffixEl) suffixEl.textContent = isYearly ? '/yr' : '/mo';
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

  // ── 1. Typewriter ───────────────────────────────────────────
  var labelEl    = document.getElementById('pricingLabel');
  var headlineEl = document.getElementById('pricingHeadline');

  function typewriter(el, text, charMs, onDone) {
    el.textContent = '';
    var cursor = document.createElement('span');
    cursor.className = 'typewriter-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    el.appendChild(cursor);
    var i = 0;
    var timer = setInterval(function () {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
      } else {
        clearInterval(timer);
        if (onDone) onDone(cursor);
      }
    }, charMs);
  }

  function blinkThenRemove(cursor) {
    var count = 0;
    var interval = setInterval(function () {
      count++;
      if (count >= 4) {
        clearInterval(interval);
        if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
      }
    }, 330);
  }

  if (labelEl && headlineEl) {
    typewriter(labelEl, 'System_Pricing.cfg', 28, function (cursor) {
      if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
      setTimeout(function () {
        typewriter(headlineEl, 'Pricing', 55, blinkThenRemove);
      }, 80);
    });
  }
}());
