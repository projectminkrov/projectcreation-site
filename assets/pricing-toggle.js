// pricing-toggle.js — Billing period toggle for the pricing page.
// External file so production CSP can keep script-src 'self' without unsafe-inline.
(function () {
  var btnMonthly = document.getElementById('billMonthly');
  var btnYearly = document.getElementById('billYearly');
  if (!btnMonthly || !btnYearly) return;

  var savingsEls = ['savingsCore', 'savingsPro', 'savingsMax'].map(function (id) {
    return document.getElementById(id);
  });

  var plans = [
    { price: 'priceCore', suffix: 'suffixCore', monthly: '8', yearly: '80' },
    { price: 'pricePro', suffix: 'suffixPro', monthly: '20', yearly: '190' },
    { price: 'priceMax', suffix: 'suffixMax', monthly: '40', yearly: '380' },
  ];

  function setClasses(el, remove, add) {
    if (!el) return;
    el.classList.remove.apply(el.classList, remove);
    el.classList.add.apply(el.classList, add);
  }

  function activate(isYearly) {
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

    savingsEls.forEach(function (el) {
      if (el) el.classList.toggle('hidden', !isYearly);
    });

    btnMonthly.setAttribute('aria-pressed', String(!isYearly));
    btnYearly.setAttribute('aria-pressed', String(isYearly));

    plans.forEach(function (p) {
      var priceEl = document.getElementById(p.price);
      var suffixEl = document.getElementById(p.suffix);
      if (priceEl) priceEl.textContent = isYearly ? p.yearly : p.monthly;
      if (suffixEl) suffixEl.textContent = isYearly ? '/yr' : '/mo';
    });
  }

  btnMonthly.addEventListener('click', function () { activate(false); });
  btnYearly.addEventListener('click', function () { activate(true); });
}());
