// Injects Organization/WebSite structured data (schema.org JSON-LD) for SEO.
// Kept as an external script to comply with the site's strict CSP (script-src 'self', no inline scripts).
(function () {
  var data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "name": "ProjectCreation",
        "url": "https://projectcreation.net/",
        "description": "ProjectCreation is a suite of builder tools — ProjectCipher (AI terminal orchestration), ProjectWord (macOS dictation), and ProjectBuilt (idea-to-plan AI) — for crafting software faster without losing the soul of the work.",
        "sameAs": ["https://discord.gg/9UWvtc8RXT"]
      },
      {
        "@type": "WebSite",
        "name": "ProjectCreation",
        "url": "https://projectcreation.net/"
      }
    ]
  };
  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
})();
