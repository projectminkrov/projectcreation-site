// Injects Organization/WebSite (and page-specific) structured data
// (schema.org JSON-LD) for SEO.
// Kept as an external script to comply with the site's strict CSP (script-src 'self', no inline scripts).
(function () {
  var BASE = 'https://projectcreation.net';

  var graph = [
    {
      "@type": "Organization",
      "@id": BASE + "/#organization",
      "name": "ProjectCreation",
      "alternateName": ["Project Creation", "projectcreation.net"],
      "url": BASE + "/",
      "logo": {
        "@type": "ImageObject",
        "@id": BASE + "/#logo",
        "url": BASE + "/assets/favicon.svg",
        "contentUrl": BASE + "/assets/favicon.svg",
        "caption": "ProjectCreation"
      },
      "image": {
        "@id": BASE + "/#logo"
      },
      "description": "ProjectCreation is an AI-powered developer tools suite — ProjectCipher (multi-agent AI terminal orchestration), ProjectWord (offline macOS dictation), and ProjectBuilt (idea-to-plan AI) — for shipping software faster without losing the craft.",
      "sameAs": [
        "https://discord.gg/9UWvtc8RXT"
      ]
    },
    {
      "@type": "WebSite",
      "@id": BASE + "/#website",
      "name": "ProjectCreation",
      "alternateName": "Project Creation",
      "url": BASE + "/",
      "description": "One system, endless creation. AI developer tools suite for builders who ship.",
      "publisher": {
        "@id": BASE + "/#organization"
      },
      "inLanguage": "en"
    }
  ];

  var path = location.pathname;

  // homepage — add WebPage entity + FAQ
  if (path === '/' || path === '/index.html') {
    graph.push(
      {
        "@type": "WebPage",
        "@id": BASE + "/#webpage",
        "url": BASE + "/",
        "name": "ProjectCreation — AI Developer Tools Suite",
        "isPartOf": { "@id": BASE + "/#website" },
        "about": { "@id": BASE + "/#organization" },
        "description": "ProjectCreation: AI terminal orchestration, native macOS dictation, and idea-to-plan AI — one suite for developers who ship faster without losing the craft.",
        "inLanguage": "en",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [{
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": BASE + "/"
          }]
        }
      },
      {
        "@type": "FAQPage",
        "@id": BASE + "/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is ProjectCreation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ProjectCreation (projectcreation.net) is an AI-powered developer tools suite. It includes ProjectCipher (a macOS app for running up to 12 AI agents in one terminal room), ProjectWord (an offline macOS dictation engine powered by Whisper AI), and ProjectBuilt (an AI partner that turns ideas into step-by-step project plans). One account covers all three tools."
            }
          },
          {
            "@type": "Question",
            "name": "What is ProjectCipher?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ProjectCipher is a macOS application from ProjectCreation that lets you run up to 12 AI agents simultaneously in a single terminal room. Each agent has its own pane and full context, so you can orchestrate complex development tasks without switching between tools or losing thread."
            }
          },
          {
            "@type": "Question",
            "name": "What is ProjectWord?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ProjectWord is a native macOS dictation engine from ProjectCreation. It uses Whisper AI to transcribe your voice and type the words directly where your cursor is — in any app, any field. It runs completely offline by default, with no data sent to external servers."
            }
          },
          {
            "@type": "Question",
            "name": "How much does ProjectCreation cost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ProjectCreation has three subscription tiers: Core at €8/month, Pro at €20/month, and Max at €40/month. All tiers include ProjectWord and ProjectBuilt plus a portion of ProjectCipher capacity. There is a 3-day Pro trial with no credit card required."
            }
          }
        ]
      }
    );
  }

  // projects.html — describe each tool as a SoftwareApplication
  if (path === '/projects.html' || path.endsWith('/projects.html')) {
    graph.push(
      {
        "@type": "WebPage",
        "@id": BASE + "/projects.html#webpage",
        "url": BASE + "/projects.html",
        "name": "ProjectCreation Projects — ProjectCipher, ProjectWord & ProjectBuilt",
        "isPartOf": { "@id": BASE + "/#website" },
        "description": "Explore ProjectCreation's builder tools: ProjectCipher (AI terminal orchestration), ProjectWord (offline macOS dictation), and ProjectBuilt (idea-to-plan AI).",
        "inLanguage": "en",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE + "/" },
            { "@type": "ListItem", "position": 2, "name": "Projects", "item": BASE + "/projects.html" }
          ]
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": BASE + "/projects.html#projectcipher",
        "name": "ProjectCipher",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "macOS",
        "description": "AI terminal orchestration room — up to twelve AI agents in one room, running side by side on your Mac.",
        "url": BASE + "/projects.html#projectcipher",
        "image": BASE + "/assets/projectcipher-terminal-room-20260521.png",
        "brand": { "@id": BASE + "/#organization" },
        "offers": {
          "@type": "Offer",
          "price": "8",
          "priceCurrency": "EUR",
          "url": BASE + "/pricing.html",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": BASE + "/projects.html#projectword",
        "name": "ProjectWord",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "macOS",
        "description": "Native macOS dictation engine — speak and have your words appear where your cursor is, running completely offline by default.",
        "url": BASE + "/projects.html#projectword",
        "image": BASE + "/assets/projectword-orbit.png",
        "brand": { "@id": BASE + "/#organization" },
        "offers": {
          "@type": "Offer",
          "price": "8",
          "priceCurrency": "EUR",
          "url": BASE + "/pricing.html",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "SoftwareApplication",
        "@id": BASE + "/projects.html#projectbuilt",
        "name": "ProjectBuilt",
        "applicationCategory": "DeveloperApplication",
        "operatingSystem": "Web",
        "description": "Idea-to-plan AI partner — turns an idea into a concrete, researched, step-by-step plan.",
        "url": BASE + "/projects.html#projectbuilt",
        "image": BASE + "/assets/projectbuilt-orbit.svg",
        "brand": { "@id": BASE + "/#organization" },
        "offers": {
          "@type": "Offer",
          "price": "8",
          "priceCurrency": "EUR",
          "url": BASE + "/pricing.html",
          "availability": "https://schema.org/InStock"
        }
      }
    );
  }

  // pricing.html — describe Core/Pro/Max tiers as Offers
  if (path === '/pricing.html' || path.endsWith('/pricing.html')) {
    graph.push(
      {
        "@type": "WebPage",
        "@id": BASE + "/pricing.html#webpage",
        "url": BASE + "/pricing.html",
        "name": "ProjectCreation Pricing — Core, Pro & Max Plans from €8/mo",
        "isPartOf": { "@id": BASE + "/#website" },
        "description": "ProjectCreation pricing: Core €8/mo, Pro €20/mo, Max €40/mo. One account covers ProjectCipher, ProjectWord, and ProjectBuilt. 3-day Pro trial, no card required.",
        "inLanguage": "en",
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE + "/" },
            { "@type": "ListItem", "position": 2, "name": "Pricing", "item": BASE + "/pricing.html" }
          ]
        }
      },
      {
        "@type": "Product",
        "@id": BASE + "/pricing.html#product",
        "name": "ProjectCreation Subscription",
        "description": "One account, three tiers — Core, Pro, and Max — covering ProjectCipher, ProjectWord, and ProjectBuilt.",
        "brand": { "@id": BASE + "/#organization" },
        "url": BASE + "/pricing.html",
        "offers": [
          {
            "@type": "Offer",
            "name": "Core",
            "price": "8",
            "priceCurrency": "EUR",
            "url": BASE + "/pricing.html",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2027-01-01"
          },
          {
            "@type": "Offer",
            "name": "Pro",
            "price": "20",
            "priceCurrency": "EUR",
            "url": BASE + "/pricing.html",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2027-01-01"
          },
          {
            "@type": "Offer",
            "name": "Max",
            "price": "40",
            "priceCurrency": "EUR",
            "url": BASE + "/pricing.html",
            "availability": "https://schema.org/InStock",
            "priceValidUntil": "2027-01-01"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": BASE + "/pricing.html#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What happens after the 3-day Pro trial?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "You get full Pro-level access for 3 days with no card required. When the trial ends, your account moves to whichever tier you choose — there's no surprise charge, because nothing's on file until you decide to subscribe."
            }
          },
          {
            "@type": "Question",
            "name": "Can I switch tiers later?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Core, Pro, and Max are steps on the same ladder, not separate products — move up when you need more terminals, automation, or workspace headroom, or back down when you don't."
            }
          },
          {
            "@type": "Question",
            "name": "What's the difference between monthly and yearly billing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yearly billing bundles 12 months for the price of 9 — three months free compared to paying monthly. Same features, same tier, just less of it going to billing overhead."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need all three tools to get value from one account?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Every tier includes ProjectWord and ProjectBuilt plus a slice of ProjectCipher — use whichever tools fit your workflow. The tier just controls how much room you have in each."
            }
          },
          {
            "@type": "Question",
            "name": "What is ProjectCreation?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ProjectCreation is an AI-powered developer tools suite at projectcreation.net — it includes ProjectCipher (multi-agent AI terminal orchestration), ProjectWord (offline macOS dictation), and ProjectBuilt (idea-to-plan AI planning). One account covers all three tools."
            }
          }
        ]
      }
    );
  }

  // community.html
  if (path === '/community.html' || path.endsWith('/community.html')) {
    graph.push({
      "@type": "WebPage",
      "@id": BASE + "/community.html#webpage",
      "url": BASE + "/community.html",
      "name": "ProjectCreation Community — Discord for Builders",
      "isPartOf": { "@id": BASE + "/#website" },
      "description": "Join the ProjectCreation Discord — builders sharing goals, shipped work, and live build-log updates from the team.",
      "inLanguage": "en",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE + "/" },
          { "@type": "ListItem", "position": 2, "name": "Community", "item": BASE + "/community.html" }
        ]
      }
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
