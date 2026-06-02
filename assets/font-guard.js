(() => {
  if (!('fonts' in document)) return;
  document.documentElement.classList.add('icons-loading');
  const fallback = setTimeout(() => document.documentElement.classList.remove('icons-loading'), 3000);
  document.fonts.ready.then(() => {
    clearTimeout(fallback);
    document.documentElement.classList.remove('icons-loading');
  });
})();
