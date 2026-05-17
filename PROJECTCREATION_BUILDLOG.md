## 2026-05-12 15:16 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Created the ProjectCreation website shell with the supplied dark technical visual direction, navigation, hero graph, philosophy section, product cards, newsletter, and footer.
- Replaced the static globe concept with an interactive rotating network globe that supports drag and zoom.
- Verified desktop and mobile rendering with browser automation and tightened responsive spacing.

Why it matters:
This turns the visual concept into a real web page that can be configured and expanded into the company site.

Next:
- Connect final navigation, copy, forms, and deployment settings as the site content gets finalized.

Tags:
- website
- interactive-globe
- frontend

## 2026-05-12 15:27 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added a simple npm development command for serving the static ProjectCreation website locally.

Why it matters:
This gives the site a familiar one-command local workflow for testing in the browser.

Next:
- Keep expanding the site content and interaction setup from the local preview workflow.

Tags:
- setup
- local-preview
- website

## 2026-05-12 19:11 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed the temporary website implementation and its local preview command to prepare for a full redesign from a new template.

Why it matters:
This clears the working surface so the next ProjectCreation website direction can be built cleanly without carrying over the earlier test version.

Next:
- Rebuild the site from the upcoming replacement template.

Tags:
- reset
- website
- redesign

## 2026-05-12 19:32 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Rebuilt the ProjectCreation website from the new terminal-green template with the grid background, graph hero, manifesto panel, global reach section, tool cards, workspace image, and footer.
- Added local image assets for the globe and technical workspace so the visual sections render reliably during local preview.
- Restored the simple npm local preview command for testing the static site.

Why it matters:
The site now matches the new supplied direction and is ready for the next round of content and configuration work.

Next:
- Tune copy, links, and any product-specific interactions after the template direction is approved.

Tags:
- website
- redesign
- local-preview

## 2026-05-12 20:22 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added a red duplicate of the ProjectCreation website while leaving the original green version intact.
- Swapped the duplicate's accent palette, grid lines, borders, buttons, and system labels from green to red.
- Verified both variants render through the local preview flow with images loaded and no horizontal overflow.

Why it matters:
This makes it easy to compare the original green direction against a red visual direction before choosing the final brand tone.

Next:
- Review both variants side by side and decide which palette should become the main website direction.

Tags:
- website
- color-variant
- design-review

## 2026-05-12 20:27 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added a hybrid ProjectCreation website variant that combines green primary accents with red grid, borders, and secondary system styling.
- Added a fully blue ProjectCreation website variant as another palette direction.
- Verified all four website variants load through the local preview flow with images rendering and no horizontal overflow on desktop or mobile.

Why it matters:
The project now has four side-by-side visual directions for choosing the strongest brand palette before committing to the final site.

Next:
- Compare the green, red, hybrid, and blue variants and choose which palette should become the main direction.

Tags:
- website
- color-variants
- design-review

## 2026-05-12 20:42 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Promoted the blue website variant to the main local preview page.
- Removed the extra green and hybrid comparison pages while keeping the standalone red variant.
- Added a top-right shape switch that changes from a blue hexagon to a red triangle and toggles the main page between blue and red styling.
- Verified the main page and red variant load through the local preview flow with images rendering and no horizontal overflow on mobile after the switch.

Why it matters:
The preferred blue direction is now the default experience, while still allowing fast comparison against the red direction directly from the site.

Next:
- Continue refining the chosen blue/red theme system once the final palette direction is selected.

Tags:
- website
- theme-toggle
- color-variants

## 2026-05-12 20:53 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed the standalone red website file so the main local page is the single active website.
- Fixed the main page's red theme toggle button hover behavior so the primary action switches from filled to transparent with red text.
- Adjusted the hexagon/triangle switch alignment so the shape sits centered with the neighboring terminal and signal icons.
- Verified the main local page in blue and toggled-red states with images loaded and no horizontal overflow on desktop or mobile.

Why it matters:
The website now keeps the preferred blue direction as the only default page while still offering a polished red preview through the in-page theme switch.

Next:
- Continue refining the main site content and theme details from the single active local page.

Tags:
- website
- theme-toggle
- polish

## 2026-05-12 21:16 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: creation-feed

Changed:
- Initialized a git repository and pushed the site to a public GitHub repo (projectcreation-site).
- Created a Netlify project and deployed the site to production.
- Linked projectcreation.net as the custom domain on Netlify.
- SSL certificate will auto-provision once DNS propagates.

Why it matters:
The ProjectCreation landing page is now deployed to the internet and connected to the real brand domain. Once GoDaddy DNS records are updated, the site will be live at projectcreation.net with HTTPS.

Next:
- Add the two DNS records (A and CNAME) in GoDaddy to complete the domain connection.
- Verify the site resolves at projectcreation.net after propagation.
- Set up GitHub Releases for hosting DMG downloads when apps are ready.

Tags:
- deployment
- custom-domain
- netlify
- github

## 2026-05-14 23:55 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added green theme to the website theme switcher
- Theme cycle is now: blue (hexagon) → red (triangle) → green (square) → back to blue
- Green accent color is neon terminal green (#39ff14) matching the hacker/craft aesthetic
- All primary colors, borders, grid lines, scan line, and hover states update per theme

Why it matters:
Gives users a third visual identity option for the site — the green theme matches the terminal/hacker aesthetic shown in the product vision and makes the theme switcher feel like a real multi-mode system toggle.

Next:
- Deploy to projectcreation.net
- Consider persisting chosen theme to localStorage

Tags:
- ui
- theme
- design

## 2026-05-15 00:15 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Added green theme (neon #39ff14) — button shows a square shape
- Added purple theme (#a855f7) — button shows a diamond shape
- Theme switcher now cycles through four modes: blue (hexagon) → red (triangle) → green (square) → purple (diamond)
- All accent colors, borders, grid lines, and scan line update per theme
- Deployed to projectcreation.net via Netlify CLI

Why it matters:
The site now has four distinct visual identities users can switch between in real time. Green brings a terminal/hacker aesthetic and purple adds a deeper, more dramatic option — giving the brand more range without changing the underlying design system.

Next:
- Gather feedback on which theme resonates most with visitors
- Consider persisting the chosen theme to localStorage

Tags:
- ui
- theme
- design
- deploy

## 2026-05-15 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed critical race condition in password reset flow: success screen is now shown before sign-out, so users actually see the confirmation instead of being silently redirected to login
- Fixed confirm password input missing character length constraint to match password field

Why it matters:
Without the fix, every successful password reset would silently fail to show the success screen — users would just get bounced to the login page with no feedback. The root cause was an auth event firing mid-flow and triggering a redirect before the UI could update.

Next:
- Add DMARC DNS record to improve email deliverability classification
- Continue monitoring Resend DKIM verification status

Tags:
- bugfix
- auth
- password-reset

## 2026-05-15 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Wrapped every async Supabase call in try/catch across all auth pages (login, signup, verify, forgot-password, reset-password) — network failures now show a connection error and re-enable the button instead of leaving it permanently disabled
- Account page sign-out now navigates to login even if the sign-out call itself throws
- Homepage profile dropdown now closes on Escape key
- Homepage getUser() null case handled: profile icon correctly hides if a locally cached session has been revoked server-side

Why it matters:
Users on spotty connections would get permanently stuck on forms with no way to retry. These catches make every auth flow resilient to network failure.

Next:
- Add DMARC DNS record
- Monitor Resend DKIM verification

Tags:
- bugfix
- auth
- resilience
- accessibility

## 2026-05-15 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Theme choice now persists in localStorage — switching themes survives page navigation and browser refresh
- Theme is restored instantly on load (no visible flash) via an inline script on both the homepage and account page
- Profile dropdown "Session_Active" label and "GO TO ACCOUNT" button now follow the active theme color
- Account page now has full theme support: grid background, accent colors, borders, and muted text all switch correctly

Why it matters:
Previously the theme was purely cosmetic on the homepage and reset on every navigation. Now it behaves like a real preference that sticks across the whole session.

Next:
- Consider extending theme persistence to remaining auth pages
- Add DMARC DNS record

Tags:
- theme
- UX
- persistence
- account

## 2026-05-15 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- All localStorage calls wrapped in try/catch — prevents crash in private/incognito mode
- Account page sign-out button now hidden until auth is confirmed server-side
- Dropdown inner divider and sign-out button borders are now theme-aware
- dropSignOut click handler gets try/catch so page always reloads
- verify.html getSession() was missing .catch() — now matches all other pages
- Full theme CSS (red/green/purple) added to every auth page
- Theme restore script on every auth page — theme persists site-wide
- aria-live="polite" and role="alert" added to all error message elements

Why it matters:
Theme now persists across every page of the site. Every error is accessible to screen readers. Private browsing no longer crashes the theme system.

Next:
- Add DMARC DNS record for email deliverability

Tags:
- bugfix
- accessibility
- theme
- resilience

## 2026-05-16 12:23 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Ran a security and bug hardening pass across the static site, auth pages, deployment config, and database policy scripts
- Tightened deployment ignore rules so local tooling, internal setup files, and private environment-style files are kept out of deploy bundles
- Expanded production security headers and blocking rules for private paths and internal file types
- Hardened auth-page error handling around session checks, browser storage failures, verification resend cooldowns, and password-reset sign-out cleanup
- Made the profile policy setup safer to rerun and tightened anonymous table privileges while keeping authenticated access behind row-level security

Why it matters:
This reduces accidental information exposure, makes the account flows more resilient under blocked storage or network failures, and narrows the public attack surface around deployment and profile data access.

Next:
- Consider replacing runtime CDN Tailwind with a local build step so the production policy can remove inline-script allowances later
- Recheck production headers after the next deploy

Tags:
- security
- auth
- hardening
- deployment

## 2026-05-16 12:34 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Removed the runtime Tailwind browser compiler from production pages
- Added a local Tailwind build pipeline and compiled site stylesheet
- Moved all page scripts out of inline HTML and into local asset files
- Vendored the Supabase browser client into local assets after verifying its published integrity hash
- Removed app-owned inline style attributes and inline style blocks
- Tightened the production content policy so scripts must come from the site itself and inline script/style execution is no longer allowed

Why it matters:
The site now has a much smaller browser attack surface. Production no longer needs remote script hosts or inline execution allowances, which makes script injection and supply-chain abuse significantly harder while keeping the same visual design and auth flows.

Next:
- Recheck production headers after deployment
- Consider adding automated deployment checks for CSP regressions

Tags:
- security
- csp
- frontend
- hardening

## 2026-05-16 12:36 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Deployed the hardened ProjectCreation website to the official production domain
- Confirmed the live site serves the local stylesheet and local JavaScript assets
- Confirmed the live production content policy now blocks inline script execution and only allows same-origin scripts
- Verified the main stylesheet is reachable on production

Why it matters:
The official website is now running the stronger security posture from the local hardening pass, reducing dependency on remote runtime scripts and narrowing browser execution rules for visitors.

Next:
- Monitor the live site after DNS/CDN cache settles
- Add automated header checks before future deploys

Tags:
- deploy
- security
- production
- csp

## 2026-05-16 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: creation-feed

Changed:
- Graph is now fully interactive — nodes have spring/repulsion physics, drag any node and the whole network reacts in real time, release and it flows back naturally
- Full mouse and touch support; accidental navigation is blocked when the user actually dragged
- Nav "ProjectCreation" title now acts as the active home indicator (blue + underline), switches off when a page section scrolls into view
- Tools removed from nav (consolidated into Projects)
- Three page sections now have IDs wired to nav links with IntersectionObserver scroll tracking

Why it matters:
The graph went from a static decorative element to the most interactive part of the site — it now behaves like an Obsidian-style knowledge graph.

Next:
- Frontend content sections (Projects, Vision, Community)
- Mobile nav

Tags:
- frontend
- graph
- physics
- nav
- interactive

## 2026-05-16 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Interactive force-directed graph with spring/repulsion physics during drag
- Return animation uses a mathematically tuned damped spring (ζ≈0.64) — one small bounce then clean settle
- Graph starts frozen at home layout, physics only runs during interaction
- Return speed tuned to feel gradual rather than snapping back
- Nodes drag smoothly with low repulsion so satellites react gently

Why it matters:
The graph went from a static decorative element to a fully interactive physics simulation that feels natural and polished. It behaves like a real knowledge graph.

Next:
- Frontend content sections (Projects, Vision, Community)
- Mobile nav

Tags:
- graph
- physics
- interactive
- frontend
- done

## 2026-05-16 15:47 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Created projects.html — a dedicated projects page linked from the main nav
- Created assets/projects.js — auth session wiring, profile dropdown, theme switch for the new page
- Updated the Projects nav link on index.html to route to /projects.html instead of the home anchor
- Page includes hero, philosophy section, three product cards (ProjectWord, ProjectCipher, ProjectBuilt), and a CTA section

Why it matters:
The projects page gives each tool its own full introduction — intriguing copy and a consistent card design that describes what each project does without over-explaining. ProjectBuilt is represented as a placeholder that signals something meaningful is coming.

Next:
- Add ProjectBuilt product context once the user is ready to share it
- Wire up "Learn More" links when individual product pages or external links exist
- Consider adding project page to netlify.toml CSP rules if new external resources are needed

Tags:
- projects-page
- navigation
- product-cards
- ProjectWord
- ProjectCipher
- ProjectBuilt

## 2026-05-16 15:54 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fleshed out the ProjectBuilt card on projects.html with full product copy
- Removed placeholder opacity dimming — ProjectBuilt is now presented as a real upcoming product
- Added Mini / Full release split in the status indicators
- Updated CTA panel to show "ProjectBuilt Mini — Coming Soon" instead of TBA

Why it matters:
ProjectBuilt is one of the core tools of ProjectCreation — a partner app that helps people turn any idea into a concrete, simplified, followable plan. The card now communicates what the product actually is and why it matters: it addresses the paralysis of starting, not just the mechanics of planning.

Next:
- Begin building ProjectBuilt Mini when ready
- Add platform/stack tags once the tech decisions are made
- Wire up "Coming Soon" to a waitlist or notification mechanism if one is set up

Tags:
- ProjectBuilt
- product-copy
- projects-page

## 2026-05-16 16:04 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- ProjectWord: updated cloud description — now correctly states the cloud version uses a much larger Whisper model, making it significantly more precise and faster
- ProjectCipher: corrected agent count from 8 to 12 everywhere (tagline, body, footer)
- ProjectCipher: updated second description line to reflect upcoming cloud and account requirement; updated status badge to "Cloud · Account · Soon"
- Added DOWNLOAD buttons (bottom-right of each card, identical placement) for ProjectWord and ProjectCipher
- Added a muted COMING SOON button in the same position for ProjectBuilt
- Rebuilt site.css

Why it matters:
Accuracy matters — wrong numbers and incorrect feature descriptions erode trust. All three cards now correctly represent the products, and consistent buttons give the page a clear action per project.

Next:
- Wire download buttons to actual download links or project sub-pages when ready
- Wire ProjectBuilt button to a waitlist or notification page

Tags:
- copy-fix
- ProjectWord
- ProjectCipher
- buttons
- accuracy

## 2026-05-16 17:12 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced the bland two-box philosophy section on projects.html with a full-height orbit section
- Three app screenshot images orbit anti-clockwise in the background using requestAnimationFrame (JS) — images slot in at /assets/screenshot-projectword.png, /assets/screenshot-projectcipher.png, /assets/screenshot-projectbuilt.png
- Images at 22% opacity with radial vignette (darkens center for text legibility) and top/bottom edge fades (blends into surrounding sections)
- Centered large pixel-text headline "Not features. Systems." with intriguing sub-copy
- Full code review passed: all tags balanced, IDs consistent between HTML and JS, z-index layering correct, graceful image error handling
- Rebuilt site.css with new orbit CSS classes

Why it matters:
The philosophy section was the weakest visual moment on the page — static text in two boxes. The orbit section turns it into the most intriguing part of the page, pulling users in with motion and large type before they reach the product cards.

Next:
- Drop real app screenshots into /assets/ to complete the effect
- Tune orbit radius and image opacity once real screenshots are in place

Tags:
- projects-page
- orbit-animation
- visual-redesign
- javascript

## 2026-05-16 17:38 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Recovered graph node CSS (.gn-box, .gn-box-core, .gn-label, all theme variants) from last good commit (6da2235)
- Recovered nav active state CSS (.nav-brand-active, .nav-link-active, all theme variants)
- Moved both blocks permanently into src/input.css so they survive every future Tailwind rebuild
- Rebuilt site.css — both blocks confirmed present

Why it matters:
Every previous npm run build:css was silently wiping the hand-written graph and nav CSS since it lived only in the compiled output file. It now lives in the source file and will never be lost again.

Next:
- All future CSS changes go into src/input.css, never directly into assets/site.css

Tags:
- bug-fix
- graph
- nav
- css-source

## 2026-05-16 19:17 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Cleaned the interactive graph implementation so permanent graph and nav styling now lives in the dedicated graph stylesheet instead of the generated Tailwind source
- Updated graph navigation so each visible node points to a real destination
- Moved the Projects page orbit animation out of inline HTML and into the page script bundle
- Rebuilt the site stylesheet and verified local page assets, anchors, script syntax, and dependency audit status

Why it matters:
The website keeps its strict browser security posture while making the graph fix less fragile across future stylesheet rebuilds.

Next:
- Review the Projects page visuals with final product screenshots when they are ready

Tags:
- website
- security
- graph
- projects
