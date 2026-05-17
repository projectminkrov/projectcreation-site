(() => {
  try {
    const theme = localStorage.getItem('pc-theme');
    if (theme && /^theme-(red|green|purple)$/.test(theme)) {
      document.body.classList.add(theme);
    }
  } catch {}
})();
