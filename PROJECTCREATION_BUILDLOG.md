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

## 2026-05-17 17:03 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added a ProjectWord subscriptions migration to the ProjectCreation backend source.
- Kept the new subscription trigger separate from the existing profile trigger.
- Added founder access setup in a rerunnable form for the shared account system.

Why it matters:
ProjectCreation can now host ProjectWord subscription and founder access checks without breaking the website profile flow.

Next:
- Run the migration in Supabase, then verify ProjectWord sign-in and founder access from the app.

Tags:
- backend
- auth
- supabase

## 2026-05-17 21:32 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added a dedicated pricing page for Core, Pro, and Max subscriptions.
- Added a Pricing link to the main marketing navigation and footer.
- Rebuilt the generated site stylesheet and checked desktop/mobile pricing renders.

Why it matters:
Visitors can now compare ProjectCreation tiers directly from the website navigation before creating an account.

Next:
- Connect pricing actions to the live checkout flow when subscriptions are ready.

Tags:
- website
- pricing
- navigation

## 2026-05-17 21:49 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Reworked the pricing page into compact side-by-side tier cards.
- Made monthly and yearly prices easier to scan at the top of each tier.
- Added a concise comparison grid for the main Core, Pro, and Max differences.
- Rebuilt the generated site stylesheet and checked desktop/mobile pricing renders.

Why it matters:
The pricing page now presents the key plan differences without making visitors scroll through oversized panels to understand the tiers.

Next:
- Connect pricing actions to the live checkout flow when subscriptions are ready.

Tags:
- website
- pricing
- ui

## 2026-05-17 22:06 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Restored the pricing page to a utility-class layout after the custom pricing styles failed to apply reliably.
- Kept the wider, more comfortable pricing cards and side-by-side desktop plan structure.
- Added a stylesheet cache bust to force the browser to load the rebuilt visual styles.
- Rechecked desktop and mobile pricing renders locally.

Why it matters:
The pricing page now renders as designed again instead of falling back to a plain text column.

Next:
- Continue polishing pricing copy and checkout wiring when subscriptions are ready.

Tags:
- website
- pricing
- bug-fix

## 2026-05-17 22:05 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed the pricing page fallback that caused the plan section to render like plain text.
- Rebuilt the plan cards with existing site utility classes so borders, spacing, prices, CTAs, and lists render reliably.
- Added a cache-busted stylesheet reference on the pricing page.
- Rebuilt the generated site stylesheet and rechecked desktop/mobile renders.

Why it matters:
The pricing page is readable again and keeps the intended side-by-side plan structure without depending on fragile page-specific styling.

Next:
- Continue polishing pricing copy and checkout wiring when subscriptions are ready.

Tags:
- website
- pricing
- bug-fix

## 2026-05-17 21:59 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Refined the pricing page cards with more vertical space, stronger price hierarchy, and clearer internal sections.
- Added dedicated pricing layout styling so the cards and comparison grid render more consistently.
- Cleaned up the comparison area so tier differences stay readable instead of collapsing into a confusing block.
- Rebuilt the generated site stylesheet and checked the page across desktop, narrower desktop, and mobile renders.

Why it matters:
The pricing page now keeps the side-by-side plan structure while giving each tier enough room to feel polished and understandable.

Next:
- Connect pricing actions to the live checkout flow when subscriptions are ready.

Tags:
- website
- pricing
- ui

## 2026-05-17 22:06 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Confirmed the pricing page fix with the utility-class card layout and rebuilt stylesheet.
- Verified the page returns successfully and renders with visible cards on desktop and mobile screenshots.

Why it matters:
The latest pricing work now has a public-safe build-log entry at the end of the project log.

Next:
- Continue polishing pricing copy and checkout wiring when subscriptions are ready.

Tags:
- website
- pricing
- verification

## 2026-05-17 22:09 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed unused custom pricing CSS from the source stylesheet after restoring the pricing page to utility classes.
- Rebuilt the generated stylesheet and rechecked desktop/mobile pricing screenshots.

Why it matters:
The pricing page fix stays simpler and less fragile for future rebuilds.

Next:
- Continue polishing pricing copy and checkout wiring when subscriptions are ready.

Tags:
- website
- pricing
- cleanup

## 2026-05-17 22:55 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Updated projects.html: ProjectBuilt orbit callout now styled as active (matches ProjectWord/ProjectCipher — full color, no "— coming" badge).
- Updated projects.html: ProjectBuilt card status badge changed from "Mini · Coming Soon" (grey dot) to "Mini · Available" (active primary dot).
- Updated projects.html: Body copy "Mini ships first" → "Mini is live".
- Updated projects.html: Bottom CTA changed from disabled "COMING SOON" span to active "LAUNCH →" link.
- Updated projects.html: Stats counter changed from "2 / 3" to "3 / 3", "2 online · 1 initializing" → "3 online", "Next node: ProjectBuilt Mini — Coming Soon" → "Ecosystem: All three tools live".
- Updated pricing.html: Pro tier feature list and comparison table "Mini + Full later" → "Mini + Full".
- Rebuilt site stylesheet.

Why it matters:
All products release together — the website now treats ProjectBuilt Mini as live across every page, matching the intended launch state instead of showing it as a future product.

Next:
- Wire ProjectBuilt Mini launch link when the app URL is ready.

Tags:
- website
- projectbuilt
- launch-prep

## 2026-05-17 23:10 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added monthly/yearly billing toggle to the pricing page above the three plan cards.
- Toggle defaults to Monthly; switching to Yearly updates the big price number and suffix on all three cards (€8→€77, €20→€192, €40→€384, /mo→/yr).
- Yearly price boxes always visible; toggling to Yearly appends "· 20% off" in fixed green to each box.
- "20% off" text uses an inline color (#4ade80) so it stays green regardless of the site's active theme.
- Rebuilt stylesheet.

Why it matters:
Users can now compare monthly and yearly pricing at a glance and see the savings incentive clearly called out in green when they consider the annual plan.

Next:
- Wire toggle state to the signup flow so the chosen billing period carries through to checkout.

Tags:
- website
- pricing
- ui
- toggle

## 2026-05-17 23:18 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- "20% off" now always visible in the yearly info boxes regardless of the billing toggle state.

Why it matters:
The savings callout is a conversion nudge — showing it even on the monthly view encourages users to consider the yearly plan.

Next:
- Wire toggle state to signup checkout flow.

Tags:
- website
- pricing
- ui

## 2026-05-17 23:28 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed toggle thumb vertical centering: replaced top-1 with inset-y-0 my-auto and added p-0 to the button to neutralize form-reset padding.
- When yearly is active, the "Yearly 20% off" label now gets a filled blue box (bg-primary-container, border-primary-container) matching the Pro button treatment, with border-transparent as the off-state placeholder so layout never shifts.
- 20% off text stays green (inline style) in both states.
- Rebuilt stylesheet.

Why it matters:
The toggle is now visually polished — thumb is properly centered and the active yearly state is clearly communicated through the blue highlight.

Next:
- Wire toggle state to signup checkout flow.

Tags:
- website
- pricing
- ui
- toggle

## 2026-05-17 23:38 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added --color-discount CSS variable to body: green (#4ade80) by default, blue (#2aa8ff) when body.theme-green is active.
- Replaced all four hardcoded color: #4ade80 inline styles on "20% off" spans with color: var(--color-discount).
- Rebuilt stylesheet.

Why it matters:
The "20% off" callout is now always legible regardless of active theme — green on blue/red/purple themes, blue on the green theme where #4ade80 would disappear.

Next:
- Wire toggle state to signup checkout flow.

Tags:
- website
- pricing
- ui
- theme

## 2026-05-17 23:52 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced billing slider toggle with segmented control: two side-by-side buttons in one bordered container, active side fills bg-primary-container, inactive is muted. Monthly defaults active.
- Added savings line below control that reveals "→ You save up to €96 / year" when yearly is selected.
- Removed inline 002 badge from Pro card header flex row.
- Added absolute top-right badge to Pro card reading "PEAK CRAFT · 002" — flush against the card corner, filled blue, larger than the old badge.
- Rebuilt stylesheet.

Why it matters:
The segmented control makes the active billing choice immediately legible without interpreting a switch state. The Pro badge now commands more visual weight and signals the recommended tier with an intriguing brand-connected phrase.

Next:
- Wire billing period state to signup checkout flow.

Tags:
- website
- pricing
- ui
- pro-card

## 2026-05-18 00:02 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Pro card badge: renamed "PEAK CRAFT" to "MOST POPULAR" — universally understood social proof signal.
- Pro card badge: increased size from label-sm/px-sm py-xs to label-md/px-md py-sm for more visual weight.
- Rebuilt stylesheet.

Tags:
- website
- pricing
- pro-card

## 2026-05-18 00:15 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed savings line from below the billing toggle.
- Added per-plan savings labels above each pricing card: "You save up to €19 / year" (Core), "€48 / year" (Pro), "€96 / year" (Max).
- Labels are hidden in monthly mode and revealed when yearly is selected; styled as muted monospace text with the euro amount in the discount accent color.
- Rebuilt stylesheet.

Why it matters:
Each plan now surfaces its own concrete saving so the yearly value is visible exactly where the user is reading, not in a generic line above all three cards.

Tags:
- website
- pricing
- ui

## 2026-05-18 14:30 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Reworded Max tier description: replaced "highest ProjectCipher capacity" with "highest building and creation capacity"

Why it matters:
Removes a product-specific internal tool reference from the public pricing page and replaces it with clearer, audience-facing language.

Next:
- Continue pricing page polish

Tags:
- website
- pricing
- copy

## 2026-05-18 14:38 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Rewrote all three pricing tier descriptions for stronger, plainer copy
- Core: "For builders who need a real starting point. The essentials, without the noise."
- Pro: "Build with everything ProjectCreation has. For the people who can't stop creating."
- Max: "The greatest things get built at full capacity. No limits, no compromises."

Why it matters:
Previous descriptions were feature-listy and passive. New copy is direct, punchy, and speaks to the builder identity.

Next:
- Review full pricing page layout and finalize

Tags:
- website
- pricing
- copy

## 2026-05-18 14:45 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Pro tier description: "can't stop creating" → "driven to create"

Why it matters:
Shifts from a casual, passive framing to one that speaks to internal drive and intention.

Next:
- Finalize pricing page

Tags:
- website
- pricing
- copy

## 2026-05-18 14:52 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed fixed min-height on description paragraphs in all three pricing cards
- Reduced card min-height from 620px to 520px across all three tiers

Why it matters:
Shorter copy was leaving a large gap between the description and the CTA button. Cards now sit tighter and feel intentional.

Next:
- Finalize and review full pricing page

Tags:
- website
- pricing
- ui

## 2026-05-18 15:05 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed wrong JS file on pricing page (projects.js → index.js) so auth nav works correctly
- Fixed copyright year 2024 → 2026
- Added top padding to Pro card so "Most Popular" badge no longer overlaps the tier header
- Aligned "Best for" row in comparison table with the card copy tone

Why it matters:
Four housekeeping issues that would have caused visible bugs or inconsistencies on the live page.

Next:
- Full review pass before deploying

Tags:
- website
- pricing
- bug
- ui

## 2026-05-18 15:20 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Updated copyright year from 2024 to 2026 across all pages: login, signup, verify, forgot-password, reset-password, index
- Fixed graph.js: removed double render call during node return animation (tick and loop were both calling render() on the same frame)
- Fixed graph.js: added division-by-zero guard in the resize handler (ow/oh could be 0 if element has no dimensions at resize time)
- Removed hard-coded CSS cache-buster query string from pricing.html (was pinned to a specific date, preventing future CSS updates from loading)

Why it matters:
The double render was writing to the DOM twice per animation frame during node return — wasteful and could cause visual inconsistency. The resize guard prevents potential Infinity coordinates. The CSS cache-buster would have silently blocked any future stylesheet changes from reaching users.

Next:
- Full pre-deploy review pass

Tags:
- bug
- performance
- website
- graph

## 2026-05-18 15:35 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added graph.css link to pricing.html (where the nav-link-active style lives)
- Switched active nav item from hardcoded text-primary-fixed-dim to nav-link-active class on pricing.html and projects.html
- Active nav items now show the same color + bottom border line as Vision/Community on the homepage

Why it matters:
The active state for page-level nav items was inconsistent — section links on the homepage got the full active treatment (color + underline) via nav-link-active, but separate-page links only got a color change. Now all active nav items look the same.

Next:
- Pre-deploy review

Tags:
- website
- nav
- ui

## 2026-05-18 15:50 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Updated yearly prices: €77 → €80, €192 → €190, €384 → €380
- Updated savings labels: €19 → €16, €48 → €50, €96 → €100
- Updated billing toggle JS to use new yearly values
- Updated PROJECTCREATION.md pricing table and added reasoning note

Why it matters:
Rounder yearly prices feel intentional on a pricing page. The previous numbers were exact 10-month calculations which produced awkward figures. New numbers are cleaner while keeping the "2 months free" messaging honest.

Next:
- Pre-deploy review

Tags:
- website
- pricing
- copy

## 2026-05-18 15:58 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Swapped price display font from Space Mono (font-headline-lg) to JetBrains Mono (font-label-md) on all three pricing cards

Why it matters:
Space Mono at 72px looks blocky and awkward for numerical display. JetBrains Mono is the site's precision/code font — sharper, more refined at large sizes, and better aligned with the terminal aesthetic.

Next:
- Pre-deploy review

Tags:
- website
- pricing
- ui
- typography

## 2026-05-18 16:02 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Reverted price display font back to Space Mono (font-headline-lg) — JetBrains Mono's dotted zero was unwanted

Why it matters:
JetBrains Mono uses a dotted zero by default (a programming font convention to distinguish 0 from O) which looked out of place in the large price display. Space Mono uses a clean zero without the dot.

Next:
- Pre-deploy review

Tags:
- website
- pricing
- typography

## 2026-05-18 16:10 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Switched price display numbers from Space Mono to Geist (font-body-lg font-bold)
- Rebuilt Tailwind CSS

Why it matters:
Space Mono's zero glyph is inherently dotted/slashed — it's the shape of the character, not an OpenType feature, so font-feature-settings couldn't fix it. Geist has a clean oval zero with no dot or slash. Already loaded on every page as the body font.

Next:
- Pre-deploy review

Tags:
- website
- pricing
- typography

## 2026-05-18 16:18 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Enlarged € symbol on all three pricing cards to match the 72px number size (font-body-lg font-bold text-[72px])

Why it matters:
The euro sign was 24px while the price numbers were 72px, making it look like a small superscript rather than part of the price display.

Next:
- Pre-deploy review

Tags:
- website
- pricing
- ui
- typography

## 2026-05-18 16:22 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Core tier label: "Entry" → "Start"

Why it matters:
"Entry" is passive and descriptive. "Start" is a call to action that nudges users toward converting.

Next:
- Pre-deploy review

Tags:
- website
- pricing
- copy

## 2026-05-18 16:40 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- graph.js: Added initial render() call before loop starts — fixes critical regression where all graph nodes were stuck at 0,0 on page load
- graph.js: Added visibilitychange listener to freeze animation when tab is hidden
- projects.js: Added visibilitychange listener to pause orbit animation when tab is hidden, reset lastTime on resume to prevent jump
- index.js: Removed 'projects' from sectionIds and navMap — no #projects section exists on the homepage, it was a dead observer target

Why it matters:
The initial render bug meant the interactive graph on the homepage was invisible until a user dragged a node. The animation pausing prevents unnecessary CPU and battery drain on hidden tabs. The dead observer entry was a silent logic error.

Security audit result: clean — textContent used everywhere (no XSS vectors), theme restore regex-guarded, account page uses server-side session validation, password reset anti-enumeration in place, OTP server-bound, CSP locked to specific Supabase URL, RLS enforces row-level isolation.

Next:
- Deploy when workflow is ready

Tags:
- bug
- performance
- security
- graph
- website

## 2026-05-18 20:08 — ProjectWord

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- SupabaseAuthClient: switched subscriptions query from explicit column list to select=* so a missing is_founder column no longer causes a fatal 400 error on sign-in
- AccountService: call clearSession() when status reload fails so tokens are not saved and the app does not start future sessions in a broken state
- Identified that founder row is missing or is_founder column is absent in the live database — SQL provided to repair

Why it matters:
Founder sign-in was completely blocked. The macOS app authenticated successfully against ProjectCreation but then crashed the sign-in flow because the subscriptions query failed at the schema level. Code is now resilient to schema gaps; a one-time SQL run in the Supabase dashboard will restore full founder access.

Next:
- Run the ALTER TABLE / INSERT SQL in Supabase to add is_founder column and set founder row
- Rebuild and test sign-in with founder account

Tags:
- projectword
- auth
- bug
- supabase

## 2026-05-18 20:21 — ProjectWord

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- SupabaseConfig: added founderEmail constant as single source of truth
- AccountService.signIn: founder email gets max access + isFounder=true even when subscriptions table is missing from DB
- AccountService.restoreSessionFromKeychain: same founder fallback on app restart so the paywall never shows for the owner account
- Root cause confirmed: subscriptions table does not yet exist in the live Supabase project

Why it matters:
Founder sign-in was completely blocked by a missing DB table. Code now has a dual-layer access path: DB-driven when the table exists, email-based fallback when it doesn't. Either way the owner account reaches the app with full max access.

Next:
- Rebuild ProjectWord and test sign-in
- Run 002-projectword-subscriptions.sql in Supabase to set up the table for real users

Tags:
- projectword
- auth
- bug
- founder

## 2026-05-18 23:41 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Free trial extended from 1 day to 3 days across the entire codebase
- PROJECTCREATION.md: updated brand source of truth
- pricing.html: "1 day Pro trial" and "1-day" copy updated to 3 days
- ProjectWord PaywallView: "START FREE 1-DAY TRIAL" button updated
- ProjectWord SubscriptionTier model: comment updated
- All three SQL migration files updated (001, 002, 003)
- Live DB: trigger function and existing trial rows updated via SQL

Why it matters:
Three days gives new users enough time to genuinely experience the product across multiple sessions before having to decide on a subscription. One day was too short for users who sign up in the evening or have a busy first day.

Next:
- Rebuild ProjectWord dist files to ship the updated paywall button
- Add Privacy Policy and Terms of Service pages to the website

Tags:
- projectcreation
- projectword
- trial
- product
- milestone

## 2026-05-21 15:37 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed orbit images position on projects page: changed `top: 50%` to `top: 30%` in `.orbit-img` CSS
- Rebuilt site.css

Why it matters:
The orbit section is ~980px tall on desktop (content-driven height). The old `top: 50%` placed the orbit center at ~490px from the section top — well below the visible heading area. Users saw the heading but no images. Moving the center to `top: 30%` (~295px from section top) puts the orbit ring directly behind the "NOT FEATURES. SYSTEMS." heading where it belongs, visible on first scroll.

Next:
- Commit and redeploy once approved
- Investigate whether section height should be capped long-term

Tags:
- orbit
- css
- layout
- projects-page

## 2026-05-21 17:04 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Hardened pricing toggle: added touch-action:manipulation, select-none, aria-pressed, hover state on inactive button, pointer-events:none on inner span, null-safe element checks, try/catch in activate()
- Rebuilt site.css

Why it matters:
The yearly button's inactive state had no hover feedback and no touch-action attribute, making it look non-interactive especially on mobile. Users tapping the button might not see any visual confirmation, making it feel like the press did nothing. The defensive null checks and try/catch prevent silent failures if the DOM ever differs from expectations.

Next:
- Commit and deploy when approved

Tags:
- pricing
- toggle
- ux
- accessibility
- mobile

## 2026-05-21 17:22 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Created assets/pricing.js — extracted inline pricing toggle script from pricing.html
- pricing.html: replaced inline <script> block with <script src="/assets/pricing.js">

Why it matters:
Root cause of yearly button not working on live site: the live site serves a strict Content-Security-Policy with script-src 'self' and no 'unsafe-inline'. Inline <script> blocks are blocked by this policy. The local test server has no CSP headers, so inline scripts work there — explaining why the button worked locally but not on the official site. Moving the script to an external file at /assets/pricing.js makes it a same-origin resource allowed by the CSP.

Next:
- Commit and deploy all pending changes (orbit fix, pricing.js, pricing.html, site.css)

Tags:
- csp
- security
- pricing
- bug-fix
- inline-script

## 2026-05-21 17:38 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Moved all theme override CSS (red/green/purple) from src/input.css to assets/graph.css
- Rewrote multi-selector grouped hover rules as individual standalone declarations
- Rebuilt site.css — now clean of theme rules except --color-discount variable

Why it matters:
Root cause of broken hover effects on the official site: Tailwind's CSS optimizer was stripping the body.theme-X parent scope from escaped-selector rules (hover\:text-primary, group-hover\:text-primary-fixed-dim etc.) when they appeared in grouped selector lists. This caused the base .group:hover .group-hover\:text-primary-fixed-dim selector to be emitted without any scope, getting overwritten to purple by the last theme rule — so all card hover colors were wrong in every theme. graph.css is never processed by Tailwind, so selector scopes are preserved exactly as written.

Next:
- Commit and deploy all pending fixes together

Tags:
- css
- hover
- theme
- bug-fix
- tailwind
- csp

## 2026-05-21 17:37 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Fixed the live pricing page monthly/yearly toggle by moving the billing logic to a fresh external script path
- Removed CSP-blocked inline style attributes from the pricing controls and discount labels
- Added build-time CSP checks so inline scripts, inline event handlers, and inline styles fail the deploy build
- Shortened Cloudflare asset caching for future non-hashed asset updates
- Built and deployed the corrected Cloudflare Pages output to the official site

Why it matters:
The pricing page now works under the same strict security policy used in production, and future pricing-script regressions should be caught before they reach the official website.

Next:
- Keep using new asset filenames or hashed filenames when changing already-deployed scripts

Tags:
- pricing
- cloudflare
- bug-fix
- security

## 2026-05-21 19:35 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Added a pricing-only discount stylesheet so all pricing savings and discount labels stay green across themes
- Loaded the new stylesheet after the shared site and theme styles on the pricing page
- Added a build check to make sure the pricing discount stylesheet is included in deployed output
- Rebuilt and deployed the updated pricing page to the official site

Why it matters:
The official pricing page now matches the test server for the yearly discount accents, including the 20% off labels and yearly savings amounts, without changing the rest of the blue site theme.

Next:
- Move toward hashed asset filenames for all production CSS and JavaScript to make future cache behavior simpler

Tags:
- pricing
- css
- cloudflare
- bug-fix

## 2026-05-21 20:06 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced the Projects page orbit placeholders with ProjectCipher, ProjectWord, and ProjectBuilt visuals
- Updated the Projects page ordering so ProjectCipher is first, ProjectWord is second, and ProjectBuilt is marked as upcoming
- Added a ProjectBuilt placeholder visual to preserve the three-node ecosystem feel
- Rebuilt and deployed the updated Projects page to the official site

Why it matters:
The Projects section now reflects the real product lineup more accurately while keeping the rotating visual system and technical workshop atmosphere intact.

Next:
- Replace the ProjectBuilt placeholder once the product moves from upcoming into active development

Tags:
- projects
- visual-update
- orbit
- cloudflare

## 2026-05-21 22:06 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced the ProjectCipher orbit image reference with a fresh terminal-room asset path
- Converted the provided ProjectCipher desktop image into a production PNG asset
- Rebuilt and redeployed the Projects page so the orbit now loads Cipher, Word, and Built visuals separately

Why it matters:
The Projects orbit no longer falls back into showing two ProjectWord visuals; ProjectCipher now has its own distinct terminal-room screenshot in the rotating section.

Next:
- Hard-refresh the Projects page if a browser still holds an older cached visual

Tags:
- projects
- image-fix
- cloudflare
- cache

## 2026-05-21 22:31 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Increased the Projects page orbit image opacity on desktop and mobile
- Rebuilt the site stylesheet so the official Projects page uses the stronger visual treatment
- Verified the local Projects page serves the updated orbit styling

Why it matters:
The rotating project visuals now read as intentional foreground atmosphere instead of fading too far into the background.

Next:
- Review the Projects orbit in-browser and tune the opacity again if it needs to be stronger or softer

Tags:
- projects
- orbit
- visual-tuning

## 2026-05-21 22:36 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Prepared the current ProjectCreation website build for publishing through the connected repository flow
- Included the stronger Projects orbit image opacity in the deploy-ready build
- Kept the deploy entry public-safe while leaving private publishing details out

Why it matters:
The Projects page visual tuning is ready to reach the official site instead of only being visible in local preview.

Next:
- Verify the official Projects page after the hosting platform finishes publishing

Tags:
- deploy
- projects
- cloudflare

## 2026-05-21 22:39 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Added a cache-busting stylesheet reference across the public HTML pages
- Rebuilt the deploy output so the official site requests the fresh orbit opacity styling
- Kept the change focused on making the latest Projects page visuals visible through the live cache layer

Why it matters:
The official site can now pick up the updated Projects orbit styling immediately instead of waiting behind an older cached stylesheet.

Next:
- Confirm the live Projects page is loading the refreshed stylesheet and showing the stronger orbit visuals

Tags:
- deploy
- cache
- projects

## 2026-05-21 22:45 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Re-centered the Projects page orbit images within their section
- Increased the orbit image opacity again for a stronger visibility experiment
- Rebuilt the deploy output with the updated orbit placement and styling

Why it matters:
The rotating project visuals should stay inside the workshop section while becoming easier to read during the orbit.

Next:
- Review the live Projects page and tune the opacity down or up based on how the stronger version feels

Tags:
- projects
- orbit
- visual-tuning
