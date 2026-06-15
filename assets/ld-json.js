// Injects Organization/WebSite (and page-specific) structured data
// (schema.org JSON-LD) for SEO.
// Kept as an external script to comply with the site's strict CSP (script-src 'self', no inline scripts).
(function () {
  var graph = [
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
  ];

  var path = location.pathname;

  // projects.html — describe each tool as a SoftwareApplication
  if (path === '/projects.html' || path.endsWith('/projects.html')) {
    graph.push(
      {
        "@type": "SoftwareApplication",
        "name": "ProjectCipher",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "macOS",
        "description": "AI terminal orchestration room — up to twelve AI agents in one room, running side by side on your Mac.",
        "url": "https://projectcreation.net/projects.html#projectcipher",
        "image": "https://projectcreation.net/assets/projectcipher-terminal-room-20260521.png",
        "offers": {
          "@type": "Offer",
          "price": "8",
          "priceCurrency": "EUR",
          "url": "https://projectcreation.net/pricing.html"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "ProjectWord",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "macOS",
        "description": "Native macOS dictation engine — speak and have your words appear where your cursor is, running completely offline by default.",
        "url": "https://projectcreation.net/projects.html#projectword",
        "image": "https://projectcreation.net/assets/projectword-orbit.png",
        "offers": {
          "@type": "Offer",
          "price": "8",
          "priceCurrency": "EUR",
          "url": "https://projectcreation.net/pricing.html"
        }
      },
      {
        "@type": "SoftwareApplication",
        "name": "ProjectBuilt",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
        "description": "Idea-to-plan AI partner — turns an idea into a concrete, researched, step-by-step plan.",
        "url": "https://projectcreation.net/projects.html#projectbuilt",
        "image": "https://projectcreation.net/assets/projectbuilt-orbit.svg",
        "offers": {
          "@type": "Offer",
          "price": "8",
          "priceCurrency": "EUR",
          "url": "https://projectcreation.net/pricing.html"
        }
      }
    );
  }

  // pricing.html — describe Core/Pro/Max tiers as Offers
  if (path === '/pricing.html' || path.endsWith('/pricing.html')) {
    graph.push({
      "@type": "Product",
      "name": "ProjectCreation Subscription",
      "description": "One account, three tiers — Core, Pro, and Max — covering ProjectCipher, ProjectWord, and ProjectBuilt.",
      "brand": {
        "@type": "Brand",
        "name": "ProjectCreation"
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "Core",
          "price": "8",
          "priceCurrency": "EUR",
          "url": "https://projectcreation.net/pricing.html",
          "category": "Monthly subscription"
        },
        {
          "@type": "Offer",
          "name": "Pro",
          "price": "20",
          "priceCurrency": "EUR",
          "url": "https://projectcreation.net/pricing.html",
          "category": "Monthly subscription"
        },
        {
          "@type": "Offer",
          "name": "Max",
          "price": "40",
          "priceCurrency": "EUR",
          "url": "https://projectcreation.net/pricing.html",
          "category": "Monthly subscription"
        }
      ]
    });
  }

  var data = {
    "@context": "https://schema.org",
    "@graph": graph
  };
  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
})();
