// ── Theme switcher (shared) ──────────────────────────────
// Standalone copy of the theme-switch logic from index.js, for pages
// that render #themeSwitch but don't load the full index.js bundle
// (which would duplicate auth/profile-nav logic already handled by
// their own page scripts, e.g. projects.js / account.js).
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
