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

## 2026-05-21 22:48 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Bumped the public stylesheet version after the orbit centering and opacity update
- Prepared the HTML pages to request the newest Projects orbit styling instead of a cached stylesheet

Why it matters:
The live Projects page needs a fresh stylesheet URL so the centered, more visible orbit appears immediately on the official site.

Next:
- Publish and verify the official Projects page loads the new stylesheet version

Tags:
- deploy
- cache
- projects

## 2026-05-21 22:55 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Widened the Projects page orbit spacing so the three visuals have more separation while rotating
- Added radius logic that accounts for the rendered image size and section bounds
- Versioned the Projects page script so the official site loads the updated orbit math
- Bumped the stylesheet version so the live page also receives the adjusted image sizing
- Rebuilt the deploy output with the adjusted orbit spacing

Why it matters:
The rotating project visuals should no longer stack on top of each other, keeping the workshop section cleaner and easier to read.

Next:
- Publish and verify the live Projects page is loading the updated orbit script and spacing

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

## 2026-05-22 20:48 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced the stacked "Project Nodes" table-style articles with three dedicated full-width showcase sections on projects.html
- ProjectCipher: text left, actual terminal room screenshot right (alternating layout)
- ProjectWord: screenshot left, text right (alternating)
- ProjectBuilt: text left, SVG placeholder right (muted/upcoming treatment)
- Added `.project-screenshot` CSS class (border + drop shadow, no inline styles) to src/input.css
- CSS version cache key bumped on projects.html; full build passes all CSP and security checks

Why it matters:
Each project now has its own dedicated visual identity on the page — title, description bullets, tech tags, CTA, and the correlated screenshot from the orbit section placed alongside it. Scrolling through the page now feels like browsing individual product entries rather than scanning a data table.

Next:
- Deploy via Cloudflare Pages once user runs wrangler deploy
- Potentially add anchor nav links or smooth scroll from orbit callouts to project sections

Tags:
- projects-page
- ui
- layout
- showcase-sections

## 2026-05-22 21:05 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed border-t divider lines between project sections
- Added generous vertical padding to each section for breathing room
- Inserted two hype text dividers between projects with vertical connector lines
- Cipher→Word: "The room handles the code. Your voice handles the rest."
- Word→Built: "You have the room. You have the voice. Now get the plan."
- Deployed to Cloudflare Pages

Why it matters:
Page now reads as a journey rather than a list — each project has space to breathe and the transitions between them add energy and momentum toward the upcoming ProjectBuilt.

Next:
- Polish individual project CTAs or add anchor links from nav

Tags:
- projects-page
- ui
- spacing
- hype-text

## 2026-05-22 21:20 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added intro hype block above ProjectCipher: "The workshop starts here. Build faster than you thought possible. Start with the room."
- Increased all three divider blocks from py-xl (64px) to py-[96px] for more breathing room
- Bug scan: no CSP violations, no inline styles/handlers, all scripts external
- Deployed to Cloudflare Pages

Why it matters:
All three projects now have a consistent hype intro above them, and the increased spacing makes the scroll feel less packed.

Next:
- Wire real download links when ProjectCipher and ProjectWord releases are ready

Tags:
- projects-page
- ui
- spacing
- hype-text

## 2026-05-23 09:15 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: creation-feed

Changed:
- Added profiles table + avatars storage bucket (SQL migration in supabase/profiles.sql — run in Supabase dashboard)
- Account page: profile editor with avatar upload and @handle input
- Nav dropdown: shows avatar photo and @handle when set, falls back to icon and Session_Active when not
- CSP updated to allow Supabase storage image URLs
- account.js fully rewritten; index.js and projects.js updated to load profile extras after auth
- Deployed to Cloudflare Pages

Why it matters:
Users can now personalize their ProjectCreation account with a profile photo and display name. The identity follows them across the site — the nav button becomes their face instead of a generic icon, and the dropdown greets them by their handle.

Next:
- User runs supabase/profiles.sql to activate the feature
- Could extend to pricing page nav once a pricing.js auth file exists

Tags:
- profile
- avatar
- handle
- account
- supabase-storage
- personalization

## 2026-05-24 12:00 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced custom SVG person silhouette with the filled account_circle Material Symbols icon as the default avatar fallback on the account page
- Added `.avatar-fallback-icon` CSS class (88px, primary blue at 45% opacity) so the icon fills the 80px circle container edge-to-edge with no white gaps
- Deployed to production

Why it matters:
The account page avatar fallback now uses the same icon as the nav profile button, keeping the UI consistent with the rest of the site's theme.

Next:
- Verify avatar upload and fallback icon render correctly in browser

Tags:
- avatar
- account
- ui
- consistency

## 2026-05-24 12:30 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced Material Symbols font icon fallback with an inline SVG using the exact account_circle filled path
- Adjusted SVG viewBox from "0 0 24 24" to "2 2 20 20" to remove the icon's built-in 1-unit internal padding, making the outer circle align exactly with the container boundary
- SVG positioned absolute with inset 0 / 100% width+height so the circular clip from the parent overflow:hidden lands precisely at the icon's outer edge — no more dark ring at the edges

Why it matters:
The font-based approach had unavoidable internal padding per the Material Symbols glyph spec; switching to a direct inline SVG path with a corrected viewBox eliminates all edge gaps and renders identically to the nav account_circle icon.

Next:
- Verify avatar fallback looks clean in browser

Tags:
- avatar
- account
- ui
- bugfix

## 2026-05-24 13:00 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Tightened SVG viewBox from "2 2 20 20" to "3.5 3.5 17 17" so the icon circle overflows the SVG boundary by ~1.5 units on each side — overflow:hidden clips inside the opaque part of the circle, eliminating the anti-alias gap ring
- Removed the 1px border from .profile-avatar-wrap that was eating into the clip area

Why it matters:
When an SVG circle's edge lands exactly at the clip boundary, semi-transparent anti-alias pixels get cut away leaving a visible ring. Letting the circle bleed past the clip fixes this permanently.

Next:
- Confirm avatar looks clean with no ring visible

Tags:
- avatar
- account
- ui
- bugfix

## 2026-05-24 13:30 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed avatar upload "profile update failed" error in account.js
- Added explicit `{ onConflict: 'id' }` to both profile upserts (avatar and handle) — without this, PostgREST can't determine which unique constraint to use when the table has both a primary key and a unique handle column
- Added PGRST116 handling in loadProfile: if no profile row exists (user predates the auto-create trigger), a row is inserted before proceeding
- Deployed to production

Why it matters:
Photos were being saved to storage but the profiles table update was failing silently, leaving the avatar URL un-persisted. Both root causes (ambiguous conflict target + missing row for pre-trigger accounts) are now handled.

Next:
- User tests photo upload; if successful, revisit the avatar icon sizing issue

Tags:
- avatar
- account
- supabase
- bugfix

## 2026-05-24 14:00 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced profiles upsert in avatar upload with explicit UPDATE → INSERT fallback to eliminate all ON CONFLICT ambiguity
- Error message now shows the actual Supabase error text to help diagnose if it still fails
- Expanded file input from jpeg/png/webp only to image/* (all image formats)
- Created supabase/patch_avatar_bucket.sql — run this in Supabase SQL Editor to expand bucket allowed types to all common image formats and raise the limit to 5 MB
- Deployed to production

Why it matters:
The upsert was failing silently; the new code shows the real error and uses a two-step update/insert that avoids multi-constraint ambiguity entirely.

Next:
- User re-tests upload; error message now shows exact failure reason if still broken

Tags:
- avatar
- account
- supabase
- bugfix

## 2026-05-24 15:00 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: creation-feed

Changed:
- Added canvas-based avatar crop editor modal on the account page
- Clicking an uploaded profile photo opens the crop editor; selecting a new file also routes through the editor before uploading
- Crop editor features: pan by drag (mouse + touch), zoom slider (1x–4x), circular crop preview with dimmed outer area and blue border
- On Save: renders the cropped circle to an offscreen canvas, exports as PNG blob, uploads to Supabase Storage, updates profile
- Edit hint overlay (pencil icon) appears on hover over an uploaded photo
- Clicking outside the modal or pressing Escape closes it
- Centralised saveProfileField() helper used by both avatar and future profile fields
- Deployed to production

Why it matters:
Users can now precisely position and zoom their photo into the circular avatar frame before saving, instead of getting whatever the raw upload looked like.

Next:
- User tests crop flow end to end

Tags:
- avatar
- account
- crop
- canvas
- ux

## 2026-05-24 15:15 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed alt text from avatar img element (was alt="Profile photo") — empty alt="" prevents the browser from rendering fallback text inside the circular container when the image hasn't loaded yet

Tags:
- avatar
- account
- bugfix

## 2026-05-24 15:30 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed "Could not load image" error when selecting a local file for avatar crop
- Root cause: img.crossOrigin = 'anonymous' was set unconditionally; blob: URLs have no HTTP server to return CORS headers so the browser fires onerror immediately
- Fix: only set crossOrigin for remote (Supabase) URLs, not blob: URLs

Tags:
- avatar
- crop
- bugfix

## 2026-05-24 15:45 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Switched file loading from URL.createObjectURL (blob URL) to FileReader.readAsDataURL (data URL)
- Root cause: iCloud Drive files that aren't fully downloaded locally produce a valid-looking blob URL but have no bytes behind it, so Image.onerror fires silently
- FileReader forces the OS to read the bytes immediately and surfaces a clear error if the file isn't available
- Tightened crossOrigin guard to only apply to http/https URLs (blob: and data: are same-origin)
- Added cache-bust to account.js script tag to prevent browsers serving stale code
- Removed now-unused cropObjUrl / URL.revokeObjectURL cleanup

Tags:
- avatar
- crop
- bugfix
- icloud

## 2026-05-24 16:00 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Shipped full avatar profile picture system: upload, circular crop editor (pan + zoom), save to Supabase Storage, reflected in nav dropdown
- Fixed all upload bugs: permission denied (missing GRANT), ambiguous upsert conflict target, iCloud file loading, CORS crossOrigin misuse, alt text bleed-through
- Display name (@handle) editor with uniqueness validation
- Both profile fields update the nav dropdown in real time

Why it matters:
Users can now fully personalise their ProjectCreation account with a profile photo and display name. The crop editor gives control over exactly what's shown in the circular avatar frame across the site.

Next:
- Continue building out the account and projects sections

Tags:
- avatar
- handle
- account
- profile
- shipped

## 2026-05-24 16:00 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed handle save using saveProfileField (UPDATE + INSERT fallback) instead of upsert
- upsert checks both INSERT and UPDATE RLS policies simultaneously which can fail; explicit UPDATE then INSERT avoids this
- Error message now shows actual Supabase error text to help diagnose if still broken
- Bumped account.js cache-bust version

Tags:
- handle
- account
- bugfix

## 2026-05-24 16:30 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Enforced case-insensitive handle uniqueness at DB level via lower(handle) unique index (applied via Supabase MCP)
- Added pre-save availability check in account.js using ilike query — users see "That handle is already taken." immediately before any DB write attempt
- Shows "Checking availability…" then "Saving…" for clear UX feedback

Why it matters:
Handles are now guaranteed unique regardless of capitalisation both at the database index level and with a fast client-side pre-check that gives instant feedback.

Tags:
- handle
- account
- uniqueness
- shipped

## 2026-05-24 18:51 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Full security and functionality audit across all JS files (account, index, projects, login, signup, verify, forgot-password, reset-password)
- Crop modal error messages now render in red (used shared setStatus helper) instead of indistinguishable muted gray
- Cleared color classes on crop modal status element when modal opens so previous state doesn't bleed through
- Added URL safety validation (must start with https://) before assigning avatar URL to nav image element on homepage and projects page
- Bumped account.js cache-bust version string

Why it matters:
The entire auth + account system is now audited and patched. Upload errors inside the crop modal are now visually distinct from informational messages, removing a UX blind spot. URL validation on the nav avatar hardens against unexpected DB values. All auth flows (login, signup, OTP verify, forgot-password, reset-password) confirmed clean — generic error messages, no enumeration, double-submit prevention, session guards all in place.

Next:
- Projects section on account page (currently placeholder)

Tags:
- security
- audit
- account
- avatar
- shipped

## 2026-05-24 19:15 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed nav avatar not displaying on homepage and projects page
- Pre-load avatar image via off-screen Image() object before swapping UI — ensures the photo only replaces the icon after the load succeeds
- Icon stays as fallback if image fails to load (no broken empty-circle state)
- Removed blank src="" attribute from nav avatar img elements to prevent empty-src browser quirks
- Cache-bust timestamp on nav avatar URL so latest upload is always fetched

Why it matters:
The profile photo was appearing as an empty circle alongside the icon instead of replacing it, visible to all users including on friends' devices. Pre-loading before swapping makes the transition atomic and error-safe.

Next:
- Confirm avatar photo shows correctly in nav after deploy

Tags:
- nav
- avatar
- bug-fix

## 2026-05-25 10:21 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added localStorage cache (`pc-avatar`) for the nav avatar URL in index.js and projects.js
- Cache is read synchronously on page load — avatar img is applied before any async auth calls resolve
- After loadProfileExtras() confirms the URL, cache is updated; if no avatar, cache is cleared
- On sign out, cache is cleared in both pages
- account.js now writes the new URL to the cache immediately after a successful avatar upload

Why it matters:
Eliminated the flash where the generic account icon appeared briefly before the profile picture loaded on every page reload. The avatar is now shown instantly from cache without a visible delay.

Next:
- Deploy updated assets

Tags:
- avatar
- nav
- localStorage
- performance
- glitch-fix

## 2026-05-25 10:35 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Changed Material Symbols font from display=swap to display=block across all 7 HTML pages
- Icon text is now invisible while the font loads instead of flashing as raw "account_circle" text
- Set navAvatarImg.src to the clean base URL (without cache-bust timestamp) so the browser can cache the avatar image and serve it instantly on subsequent loads

Why it matters:
Eliminated both visible phases of the nav avatar glitch: the "account_circle" text flash caused by font-display:swap, and the unnecessary image re-fetch caused by a cache-busting timestamp on the displayed img src. Combined with the localStorage cache from the previous fix, the profile picture now loads without any visible transition on reload.

Next:
- Deploy updated HTML and JS assets

Tags:
- avatar
- nav
- font-display
- glitch-fix
- Material Symbols

## 2026-05-25 10:52 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added auth-nav-hidden class to navSignIn and navCreateAccount in index.html and projects.html — both now start hidden and are only revealed if auth confirms no session
- Added hidden class to navAvatarIcon in both HTML files — icon now starts hidden and is only revealed as a fallback when no avatar is available (or avatar fails to load)
- Cache code now uses img.onload to reveal the avatar img, preventing the brief dark-circle artifact from an img element with a border-radius that is visible before its image data has finished loading
- Added probe.onerror handler to fall back to showing the icon if the avatar URL is unreachable

Why it matters:
Eliminated the flash of Sign in / Create Account buttons for logged-in users (they were visible by default and only hidden after the async auth check completed). Also eliminated the black circle flash caused by the account_circle icon being visible by default and by showing the img element before its image data was ready.

Next:
- Deploy

Tags:
- avatar
- nav
- auth-flash
- glitch-fix

## 2026-05-25 11:08 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Created assets/font-guard.js: runs synchronously in the head, adds icons-loading class to html element before any body content paints, removes it once document.fonts.ready resolves (3s hard fallback)
- Added CSS rule in input.css: .icons-loading .material-symbols-outlined and .material-symbols-fill get visibility:hidden — completely suppresses raw icon text while the Material Symbols font file is downloading
- Rebuilt assets/site.css with new rule compiled in
- Added script tag for font-guard.js to all 9 HTML pages (alongside theme-restore.js in the head)

Why it matters:
All Material Symbols icon spans (terminal, sensors, account_circle, and any others) are now invisible during font load instead of flashing as raw text. On warm browser cache the font loads in under 5ms so icons appear instantly. On first visit the icons are simply invisible for the brief load window, which is far better than showing raw text. The fix applies site-wide to every page.

Next:
- Deploy

Tags:
- icons
- Material Symbols
- font-display
- font-guard
- glitch-fix

## 2026-05-25 11:22 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Deleted the Global Reach / #community section (globe image, 140+ Countries, 50K+ Active Nodes)
- Removed Community nav link and its IntersectionObserver entry from index.js
- Redesigned #vision section from a two-column split grid to a full-width centered layout matching the spacious style of the projects page
- Title now uses pixel-text and headline-lg sizing, metadata condensed to a single line, text body and buttons are centered with generous padding

Why it matters:
The manifesto section now reads clearly and feels intentional rather than cramped. Removing the community section eliminates placeholder data that didn't reflect real metrics.

Next:
- Deploy

Tags:
- homepage
- vision
- layout
- community-removed

## 2026-05-25 14:30 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added text scramble animation to the vision headline (triggers on scroll into view, resolves left-to-right over 800ms using glitch characters)
- Added animated corner brackets to the vision section (CSS width/height transition, draw in on scroll trigger, theme-aware for red/green/purple variants)
- Added sequential typewriter reveal on all three > paragraphs (10ms/char, each starts after the previous finishes, blinking cursor while typing)
- Added vision-bracket and vision-cursor CSS classes with blink keyframe to input.css, rebuilt site.css
- Pushed to main — Cloudflare Pages auto-deploy triggered

Why it matters:
The vision/manifesto section was static text. Now it reads like a terminal decoding itself — the headline scrambles into place, corner brackets frame the section, and the three principle lines type in one after another. All three effects are scroll-triggered so they fire when the user actually reaches the section, not on page load.

Next:
- Monitor live on projectcreation.net
- Potentially extend typewriter speed or tweak scramble duration based on feel

Tags:
- vision
- animation
- scramble
- typewriter
- corner-brackets
- homepage

## 2026-05-25 14:50 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Increased vision section vertical padding from py-xl (64px) to 96px mobile / 160px desktop
- Increased paragraph spacing from space-y-md (24px) to space-y-lg (40px)
- Increased paragraph block bottom margin to 64px before the action buttons
- Deployed via wrangler

Why it matters:
The manifesto section now has much more room to breathe, giving the content more presence and leaving space for future background or interactive elements.

Next:
- Explore background or interactive elements for the vision section

Tags:
- vision
- spacing
- layout
- homepage

## 2026-05-25 15:05 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added canvas-based terminal log stream background to the vision section
- 20 columns of scrolling fake log lines (timestamps, HTTP requests, build output, sys events) in blue at 3.8% opacity
- Each column scrolls at a slightly different speed for an organic feel
- Canvas clips per-column to prevent text bleed, pauses via IntersectionObserver when section is off-screen
- Content div lifted to z-index 1 to remain above the canvas

Why it matters:
The vision section now has a living background that reinforces the "system running" aesthetic without competing with the foreground content.

Next:
- User review — may swap for code rain or adjust opacity

Tags:
- vision
- background
- canvas
- terminal
- homepage

## 2026-05-25 15:20 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added code rain as second background mode for the vision section
- Small BG: LOGS / BG: RAIN toggle button for live comparison (top-right of section)
- Code rain: glitch character columns with bright leading edge and fading trail, staggered speeds
- Both modes share the same canvas and IntersectionObserver

Next:
- User picks preferred background; remove toggle and lock in chosen mode

Tags:
- vision
- background
- canvas
- code-rain
- homepage

## 2026-05-25 20:10 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Deleted netlify.toml (Netlify deploy config, now retired)
- Deleted .netlifyignore (Netlify publish filter, now retired)

Why it matters:
Project is fully on Cloudflare Pages. Removing dead Netlify config eliminates the risk of accidentally deploying to Netlify with a stale CSP (the two configs had diverged). _headers is the only active security config now.

Next:
- Commit and deploy

Tags:
- cleanup
- cloudflare
- config

## 2026-05-25 20:25 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced Tools node in homepage graph with Pricing node (icon: payments, links to /pricing.html)
- Updated NODES, LINKS, and HOME position map in graph.js — all three kept consistent
- Tools for the Next Epoch section in index.html preserved as-is
- Full bug scan: build passes clean, all script/CSS references valid, no CSP violations, no orphaned anchor links, all JS syntax clean

Why it matters:
The graph now reflects the actual site navigation. Clicking Pricing in the graph takes users directly to the pricing page instead of a dead anchor.

Next:
- Deploy

Tags:
- graph
- navigation
- pricing
- bug-scan
- homepage

## 2026-05-25 20:30 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Replaced Tools graph node with Pricing on homepage — links to /pricing.html
- Removed netlify.toml and .netlifyignore (retired Netlify deployment)
- Full site deployed to projectcreation.net via Cloudflare Pages

Why it matters:
The graph now accurately reflects the site structure. Pricing is a real destination users can navigate to directly from the homepage visual. Dead Netlify config is gone so the deployment setup is clean and unambiguous.

Next:
- Gather feedback on the Pricing node placement and icon

Tags:
- graph
- navigation
- pricing
- cloudflare
- deploy
- cleanup

## 2026-05-25 22:49 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced four placeholder tool cards (Modular Logic, Neural Sync, Grid Engine, Real-time Telemetry) with the three real projects: ProjectCipher, ProjectWord, ProjectBuilt
- Cards now use actual project names, taglines, one-line descriptions, tech stack tags, and status indicators (Available / Upcoming)
- ProjectCipher and ProjectWord cards link directly to their anchors on the projects page
- ProjectBuilt card is visually dimmed to communicate its upcoming status
- Grid changed from 4-column to 3-column to match the actual ecosystem size
- Section body copy updated to reflect the real three-tool ecosystem

Why it matters:
The homepage "Tools for the Next Epoch" section now shows what actually exists instead of invented placeholders. Visitors can immediately see the real ecosystem, understand each tool's purpose, and navigate straight to the projects page from the card arrows.

Next:
- Explore interactive card redesign (active expansion, scramble-on-hover, scanline effects)

Tags:
- homepage
- tools-section
- content-sync
- projectcipher
- projectword
- projectbuilt

## 2026-05-25 20:40 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed hero section from projects.html: deleted "SYSTEM_PROJECTS.EXE" label, "The Workshop" h1, and subtitle paragraph
- Orbit section now leads the page directly
- Build clean, deployed to projectcreation.net

Why it matters:
The projects page no longer has a redundant header above the orbit visual — the visual itself carries the content weight.

Next:
- Review projects page layout without the hero

Tags:
- projects
- cleanup
- layout
- deploy

## 2026-05-25 20:55 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed technical workspace image (SYSTEM_CAPTURE section) from homepage bottom
- Added newsletter signup section: two-column layout with copy on left, email form on right
- Form shows inline validation and a success/confirmation state on submit
- Form submission is UI-only for now — backend will be wired when newsletter service is configured
- Deployed to projectcreation.net

Why it matters:
The homepage now has a real call-to-action for the newsletter instead of a placeholder image. The section matches the site design system and is ready to connect to a backend.

Next:
- Set up newsletter backend and wire form submission

Tags:
- newsletter
- homepage
- UI
- deploy

## 2026-05-25 21:05 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Refactored newsletter section to centered single-column layout
- Label, headline, and description all centered above the form
- Email input and submit button constrained to max-w-lg and centered
- Removed two-column grid split; section is now spacious and clean
- Deployed to projectcreation.net

Why it matters:
The newsletter section now reads as a focused, breathable call-to-action rather than a split panel.

Next:
- Wire newsletter backend when service is ready

Tags:
- newsletter
- layout
- homepage
- deploy

## 2026-05-25 21:12 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Narrowed newsletter form from max-w-lg to max-w-sm so the input and button no longer span the full width
- Deployed to projectcreation.net

Why it matters:
The form now sits as a compact, focused element centred in the section rather than stretching edge to edge.

Next:
- Wire newsletter backend when service is ready

Tags:
- newsletter
- layout
- homepage
- deploy

## 2026-05-25 21:25 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed bug: max-w-xs and max-w-sm were not being emitted by Tailwind (classes never used before, purged out)
- Added .newsletter-form-wrap { width: 100%; max-width: 360px } to src/input.css so it is always compiled
- Replaced broken Tailwind class on newsletter form div with .newsletter-form-wrap
- Confirmed class appears in compiled site.css before deploying
- Deployed to projectcreation.net

Why it matters:
Tailwind only outputs classes it finds during its content scan at build time. Adding a utility class that was never previously used has no effect until the CSS is rebuilt — and even then, if the class was silently missing, the visual change never lands. Moving it to input.css guarantees it is always compiled regardless of scan state.

Next:
- Wire newsletter backend when service is ready

Tags:
- bug-fix
- newsletter
- tailwind
- CSS
- deploy

## 2026-05-25 23:30 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Merged two separate tools sections into one unified #tools section
- Section header centered with 96px vertical padding, matching the vision section
- Boot sequence: a terminal loading log animates on scroll-in before cards reveal
- Scramble on hover: card titles use the same scramble effect as the vision headline
- Corner brackets animate in on card hover, matching the vision section aesthetic
- Canvas per card: matrix character rain (ProjectCipher), sine waveform (ProjectWord), blueprint dot grid (ProjectBuilt)
- Cards enlarged from 320px to 480px min-height with more generous padding
- All animations pause-on-leave and canvas opacity is controlled by CSS hover state

Why it matters:
The Tools for the Next Epoch section now matches the visual energy of the vision section. The boot sequence frames the three projects as real system modules, the scramble hover makes the section interactive, and each card communicates its product identity through a unique live animation. The section feels like part of a coherent, animated product site rather than a static card grid.

Next:
- Gather feedback on animation feel and timing
- Consider adding the cursor-following glow if the section needs more ambient life

Tags:
- homepage
- tools-section
- boot-sequence
- scramble
- canvas-animation
- interactive

## 2026-05-25 21:35 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Widened newsletter form from 360px to 576px to align with the text paragraph width above it
- Deployed to projectcreation.net

Tags:
- newsletter
- layout
- homepage
- deploy

## 2026-05-25 23:45 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Reduced tools section header padding from 96px to 52px top/bottom
- Subtitle (white text) dropped from headline-sm (24px bold) to body-lg (18px)
- Body line (gray text) dropped from body-lg (18px) to body-md (16px)
- Margins between header elements tightened (mb-md → mb-sm)

Why it matters:
The section now fits within a single viewport without scrolling, making the boot sequence and card grid visible together as intended.

Next:
- Monitor for feedback on spacing feel

Tags:
- homepage
- tools-section
- spacing
- typography

## 2026-05-26 00:05 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Tools section top padding increased from 52px to 80px for breathing room from the border
- Cinematic auto-scroll: when the tools section enters the viewport, the page smoothly scrolls to the section's bottom over 4 seconds (ease-in-out), revealing the boot sequence and card animations without user effort
- User takeover: wheel, touch, pointer, or keyboard events cancel the auto-scroll instantly and restore manual control
- 220ms settling window prevents the triggering scroll from self-cancelling the effect

Why it matters:
The section now feels intentionally spacious. The auto-scroll acts as a guided cinematic reveal — users see the boot sequence animate and the cards fade in as the page drifts down, creating a sense of depth and production quality without requiring any interaction.

Next:
- Gather feedback on auto-scroll feel and duration

Tags:
- homepage
- tools-section
- auto-scroll
- animation
- ux

## 2026-05-25 21:42 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added Community link to homepage navbar (links to #community anchor, ready for when the section is built)
- Deployed to projectcreation.net

Tags:
- nav
- community
- homepage
- deploy

## 2026-05-26 00:25 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced IntersectionObserver trigger with a scroll listener that fires only when the section top is within ±70px of the viewport top — eliminates the premature trigger that paused scroll too early
- Two-phase auto-scroll: Phase 1 (2700ms) drifts gently to the boot area in sync with the boot sequence; 640ms pause for card reveal; Phase 2 (1300ms) drops to place cards 180px below viewport top, matching the target screenshot
- 250ms settling window before cancel listeners attach to prevent self-cancellation from the triggering scroll

Why it matters:
The auto-scroll now fires at exactly the right moment, plays in sync with the boot and card animations, and lands on the precise final position showing all three cards.

Next:
- Verify on live site

Tags:
- homepage
- tools-section
- auto-scroll
- animation-sync

## 2026-05-25 23:36 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced two-phase cinematic auto-scroll with scroll-driven boot animation
- Boot sequence lines appear/disappear based on how far user has scrolled into the section
- Card grid fades in from progress 0.78 to 1.0, driven entirely by scroll position
- Animation locks permanently once fully complete (no reversal after cards fully appear)
- Canvas animations initialize the moment cards start becoming visible

Why it matters:
The tools section now feels like a native scroll-driven experience — the user is in full control of the playback speed rather than being taken along for a ride.

Next:
- Visual QA on live site

Tags:
- tools-section
- scroll-animation
- interactivity
- ux

## 2026-05-25 23:44 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Reduced scroll zone from 640px to 300px — animation completes with normal scrolling speed
- Cards no longer scroll-driven: they auto-reveal with CSS transition the moment the last boot line appears
- Adjusted boot line thresholds to spread evenly across the tighter scroll zone

Why it matters:
The boot sequence now feels snappy and responsive — a short scroll through the section plays the full animation, and the cards pop in automatically as soon as SYSTEM READY appears.

Next:
- Live QA on projectcreation.net

Tags:
- tools-section
- scroll-animation
- ux
- performance

## 2026-05-25 23:51 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Boot animation now starts as soon as the tools section enters the viewport from below
- Progress formula changed from measuring past the section top to measuring from the viewport bottom — animation begins at the section boundary line, not after fully scrolling into it

Why it matters:
The animation now starts right as the user crosses from the vision section into the tools section, making the transition feel immediately responsive.

Next:
- Live QA on projectcreation.net

Tags:
- tools-section
- scroll-animation
- ux

## 2026-05-25 23:56 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Retuned boot animation trigger offset to vh*0.5 — starts when section header is halfway down the screen, completes as it approaches the viewport top

Why it matters:
Fixes regression where animation completed off-screen before user could see it. Now visible and interactive as section scrolls into view.

Next:
- Live QA

Tags:
- tools-section
- scroll-animation
- bugfix

## 2026-05-26 00:05 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Dropped scroll-driven boot animation entirely after persistent timing issues across viewport sizes
- Restored IntersectionObserver-based boot sequence: plays automatically with staggered delays once the tools section scrolls into view
- Cards reveal with smooth CSS transition 480ms after the last boot line appears
- Canvas animations initialize immediately after card reveal
- Scramble-on-hover and corner bracket effects remain intact

Why it matters:
The Tools for the Next Epoch section now has a reliable, cinematic boot sequence that fires once per page load when the user reaches it — no dependency on scroll speed or viewport height. ProjectCipher, ProjectWord, and ProjectBuilt each have their own canvas animation that activates on reveal.

Next:
- Continue UI polish on other sections

Tags:
- tools-section
- boot-animation
- intersection-observer
- canvas
- ux

## 2026-05-26 00:14 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced IntersectionObserver (threshold 0.15) with explicit scroll listener for boot trigger
- Animation now fires when section top reaches the upper 55% of the viewport — user can clearly see the section before animation starts
- Prevents early-trigger bug where animation played and completed off-screen

Why it matters:
Low IntersectionObserver threshold was triggering when the section was barely a sliver at the viewport bottom, causing animation to finish before user arrived at the section.

Tags:
- tools-section
- boot-animation
- bugfix

## 2026-05-26 00:22 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed boot animation jitter: all 7 boot lines now pre-inserted into the DOM at page load (invisible via opacity:0), animation only toggles the shown class rather than inserting new elements
- Eliminates layout reflow during animation that was causing scroll-anchor to nudge the viewport

Why it matters:
Inserting DOM nodes mid-animation changed the page height, triggering browser scroll anchoring that shifted the viewport ~3 times during playback. Pre-allocation keeps the layout stable.

Tags:
- tools-section
- boot-animation
- bugfix
- layout

## 2026-05-26 15:33 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added the shared theme override stylesheet to the login, signup, verify, forgot-password, and reset-password screens
- Verified every page that restores the saved theme also loads the stylesheet that defines red, green, and purple theme colors
- Rebuilt the deploy output after the auth theme consistency fix

Why it matters:
When someone chooses a site color, the auth screens now honor that same saved theme instead of falling back to blue.

Next:
- Check the login and signup screens in each saved theme before publishing the update

Tags:
- auth
- theme
- visual-fix

## 2026-05-26 15:42 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed the production signup profile trigger so new accounts create profile rows with both user ID and email
- Added a local migration file matching the production database fix
- Ran a controlled signup smoke test against the live auth endpoint and cleaned up the temporary test account afterward

Why it matters:
New users can create accounts again instead of hitting the generic signup failure caused by a database trigger error.

Next:
- Ask the affected user to retry signup with their real email and password

Tags:
- auth
- signup
- database

## 2026-05-26 18:20 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Aligned the local profile setup SQL with the live signup trigger fix
- Kept the local setup script inserting profile email during account creation
- Restricted direct public access to the signup trigger function

Why it matters:
Future database setup now matches the production signup behavior, so new account creation does not regress when the schema is rebuilt or migrated.

Next:
- Keep the production signup smoke test result as the source of truth and ask the affected user to retry signup

Tags:
- auth
- signup
- database
- local-setup

## 2026-05-27 18:46 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed the nav avatar fallback so accounts without uploaded photos clear any stale cached image and show only the centered account icon
- Made avatar caching user-specific so a previous account photo cannot bleed into a different logged-in account
- Updated profile-row fallback inserts to include email when older accounts need a missing profile row created
- Rebuilt the static site output after the avatar UI fix

Why it matters:
New test accounts and fresh users now see a clean default account icon instead of a stray black avatar circle from another session or cached image state.

Next:
- Publish the avatar fallback fix and verify with a fresh account that has no uploaded profile photo

Tags:
- auth
- avatar
- profile
- ui-fix

## 2026-05-27 18:50 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Cache-busted the public account, homepage, pricing, and projects asset URLs for the avatar fallback fix
- Deployed the rebuilt static site directly to Cloudflare Pages with Wrangler
- Verified the live projects page now loads the new versioned avatar script and stylesheet

Why it matters:
The official site no longer has to wait for stale cached avatar JavaScript to expire before users see the corrected default account icon behavior.

Next:
- Re-test the fresh-account avatar button on projectcreation.net

Tags:
- cloudflare
- deploy
- avatar
- cache

## 2026-05-27 18:52 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed the empty nav avatar image so it cannot render a stray border line beside the fallback account icon
- Added native hidden-state toggling when switching between uploaded avatar photos and the default icon
- Rebuilt the static site output for deployment

Why it matters:
Accounts without profile photos now show only the centered default account icon, with no leftover image border or gray line.

Next:
- Deploy the rebuilt site and verify the official account button no longer shows the stray line

Tags:
- avatar
- ui-fix
- profile

## 2026-05-27 18:56 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Nudged the default nav profile icon upward so it visually aligns with the neighboring header buttons
- Bumped the public asset version for the updated navigation CSS
- Rebuilt the static site output for deployment

Why it matters:
The account button now sits in the same visual row as the terminal, network, and theme controls instead of feeling slightly lower.

Next:
- Deploy the alignment polish and verify on the official site

Tags:
- avatar
- navigation
- ui-polish

## 2026-05-27 19:00 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed uploaded nav avatars so the fallback account icon is fully hidden when a profile photo is present
- Added native hidden-state toggling for the fallback icon alongside the existing image visibility logic
- Bumped the public asset version and rebuilt the static site output

Why it matters:
Uploaded profile photos now replace the default account icon instead of appearing beside it.

Next:
- Deploy and verify the official site loads the corrected avatar replacement behavior

Tags:
- avatar
- profile
- ui-fix

## 2026-05-27 19:25 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed shared nav profile loading so pages without a handle label still load uploaded avatar photos
- Bumped the public asset version across account, homepage, pricing, and projects pages
- Rebuilt the static site output for deployment

Why it matters:
Uploaded profile pictures now appear consistently anywhere the account button is shown, including the pricing page.

Next:
- Deploy and verify the pricing page loads the corrected avatar script

Tags:
- avatar
- pricing
- profile
- ui-fix

## 2026-05-28 12:09 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Locked the nav avatar image to a non-shrinking square size with centered cover cropping
- Bumped the public asset version for the updated avatar sizing CSS
- Rebuilt the static site output for deployment

Why it matters:
Uploaded profile pictures should stay circular and proportional in the header instead of appearing squeezed or stretched.

Next:
- Deploy and verify the live avatar CSS on projectcreation.net

Tags:
- avatar
- navigation
- ui-fix

## 2026-05-28 12:11 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Matched uploaded nav avatar vertical alignment to the fallback profile icon
- Bumped the public asset version for the updated avatar alignment CSS
- Rebuilt the static site output for deployment

Why it matters:
Uploaded profile pictures now sit in the same visual row as the neighboring header controls.

Next:
- Deploy and verify the live avatar image alignment on projectcreation.net

Tags:
- avatar
- navigation
- ui-polish

## 2026-05-27 18:30 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Audited the full sign-up / sign-in / verify / forgot-password / reset-password auth flow.
- Identified root cause of "Unable to create account" error: Supabase auth returns HTTP 500 because the projectcreation.net sending domain is not yet verified in Resend (infrastructure issue, not JS).
- Fixed signup.js: added emailRedirectTo option to signUp() call so confirmation links land on the site rather than the Supabase default page.
- Fixed signup.js: detect Supabase's fake-success response for already-registered emails (empty identities array) and show a clear "account already exists" message instead of routing to verify.html.
- Fixed login.js: detect the email_not_confirmed error code and redirect unverified users to /verify.html instead of showing a generic "invalid credentials" message.

Why it matters:
The signup 500 error is blocked at the Resend sending-domain level and will resolve once that domain is verified. The JS fixes improve UX for edge cases (duplicate registrations, returning unverified users) that would cause silent failures or confusing error messages post-fix.

Next:
- Verify the projectcreation.net sending domain on https://resend.com/domains to unblock all new account creation.
- Test signup end-to-end once Resend domain is active.

Tags:
- auth
- bug-fix
- signup
- login

## 2026-05-27 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed `display: block` from `.nav-avatar` CSS class (was overriding Tailwind's `hidden` utility, causing the img element to show as a black circle even with no src set)
- Removed `hidden` from `navAvatarIcon` span in all 4 pages (index, projects, pricing, account) so the default account_circle icon shows immediately without waiting for JS
- Rebuilt CSS

Why it matters:
Users with no profile picture were seeing a black circle above the account icon in the nav. The icon now shows correctly by default, and gets replaced with the actual avatar image only when the user has set one.

Next:
- Test signup flow end-to-end
- Deploy when ready

Tags:
- bug-fix
- nav
- avatar
- ui

## 2026-06-02 17:58 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed account.html loading two separate Supabase clients simultaneously (index.js + account.js); nav auth code merged into account.js, index.js removed from account.html
- Fixed onAuthStateChange in account.js using `|| !session` which caused redirects to login on non-sign-out auth events (INITIAL_SESSION race, token refresh hiccups); condition narrowed to SIGNED_OUT only
- Fixed showNavAvatarFallback() called without userId in sign-out path on index.js and projects.js; added lastNavUserId tracking so the per-user avatar cache is properly cleaned on sign-out
- Added theme switch IIFE to account.js to replace functionality previously provided by index.js on that page
- Dev server moved to port 3000

Why it matters:
Four auth bugs were patching over each other to cause intermittent random sign-outs, especially when token refresh happened to fail briefly or a connected project triggered a global server-side sign-out. These fixes reduce false sign-out triggers significantly. ProjectCreation sign-out intentionally remains global scope to propagate sign-out across connected projects.

Next:
- Fix ProjectWord to use `scope: 'local'` for its own sign-out so it does not revoke the shared refresh token globally and sign out ProjectCreation users
- Monitor for any remaining spurious SIGNED_OUT events in production

Tags:
- bug-fix
- auth
- session
- sign-out

## 2026-06-02 18:22 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Implemented command palette (terminal button): opens with click or ⌘K/Ctrl+K, keyboard navigation (↑↓ Enter ESC), fuzzy search, context-aware commands (nav, account/auth, sign out, open project status)
- Implemented project status panel (sensors button): shows ProjectCipher, ProjectWord, ProjectBuilt with three statuses — Online (green pulse, active < 10 min), Offline (amber, last seen timestamp), Not Connected (gray, never used), Coming Soon for unavailable apps
- Added project_connections Supabase table (migration 004) with RLS — each app upserts last_active_at when a user is active, ProjectCreation reads it to display status
- Moved both features into dedicated nav-panels.js + nav-panels.css, loaded on all 4 main pages
- Added IDs (terminalBtn, sensorsBtn) and updated aria-labels on nav buttons across all pages
- Added nav-panels.js and nav-panels.css to build.js validation checks
- Build passes all CSP and security checks

Why it matters:
The two previously unused nav buttons now have real utility matching the technical brand. The command palette gives power users keyboard-driven navigation and quick actions. The sensors panel gives a live view of which projects are connected to the account.

Next:
- Apply migration 004 in Supabase dashboard
- Add project_connections upsert call to ProjectWord, ProjectCipher when user is active (see implementation note below)

Tags:
- feature
- command-palette
- sensors
- nav
- supabase

## 2026-06-02 18:40 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- All three connected apps now implement project_connections presence pinging
- ProjectWord: Swift REST upsert via SupabaseAuthClient, fires after every sign-in and token refresh
- ProjectBuilt: supabase-js upsert in auth useEffect + 5-min interval keep-alive
- ProjectCipher: optional account connection via sidebar gear menu, 5-min interval heartbeat once connected

Why it matters:
The sensors panel on ProjectCreation now has real data behind it. Each connected app reports activity independently and non-blockingly.

Next:
- Apply migration 004-project-connections.sql in the Supabase dashboard to create the table and RLS policies

Tags:
- feature
- presence
- sensors
- multi-app

## 2026-06-02 18:48 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed ProjectBuilt marked available:false in sensors PROJECTS array — it was always showing "Soon" even with real presence data wired up
- Fixed race condition in openPalette: added guard after db.auth.getUser() await so double-click during network call no longer leaves palette in broken half-open state
- Fixed Escape key not closing palette when focus is on a cmd-item rather than cmdInput — global keydown handler now closes both panels on Escape
- Fixed showNavAvatar in index.js and projects.js storing cache-busting ?t= params in localStorage — now strips query before caching, consistent with account.js
- Fixed ProjectWord Swift pingPresence building URL with trailing ? from empty queryItems — now constructs clean URL directly
- Fixed ProjectBuilt presence interval useEffect depending on full User object reference instead of user?.id — interval no longer recreates on every token refresh

Why it matters:
Six bugs patched that would have caused the sensors panel to never show ProjectBuilt status, keyboard navigation to break, avatar cache to bloat, and presence intervals to unnecessarily reset hourly.

Next:
- All clean — no outstanding known issues

Tags:
- bug-fix
- sensors
- command-palette
- avatar-cache
- presence

## 2026-06-02 19:10 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: creation-feed

Changed:
- Implemented newsletter subscription end-to-end: form → Cloudflare Pages Function → Supabase backup + Kit (ConvertKit)
- Created functions/api/newsletter.js: validates email server-side, writes to Supabase newsletter_subscribers table, adds to Kit mailing list, graceful degradation if either store is unavailable
- Created supabase/migrations/005-newsletter-subscribers.sql: new table with RLS enabled and all client access revoked — only accessible via service role key from the CF function
- Fixed critical CSP bug: connect-src was missing 'self', which would have blocked the same-origin fetch('/api/newsletter') at runtime in production
- Replaced the TODO stub in index.js newsletter handler with full async flow: loading state, API error messages, success reveal, button restore on failure

Why it matters:
The newsletter form was fully designed but wired to nothing. Every submission went silently into the void. It's now a complete pipeline — subscribers are stored in our own Supabase table as a permanent backup and added to Kit for the actual sending workflow. Two layers of storage means no vendor lock-in.

Next:
- Apply migration 005 in Supabase dashboard
- Create a Kit account, create a Form, add KIT_API_KEY and KIT_FORM_ID to Cloudflare Pages environment variables
- Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to Cloudflare Pages environment variables
- Deploy to Cloudflare Pages to activate the function

Tags:
- feature
- newsletter
- cloudflare-pages-functions
- supabase

## 2026-06-04 17:15 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Diagnosed and fixed the full newsletter signup workflow end-to-end
- Added missing KIT_FORM_ID secret to Cloudflare Pages (was never set)
- Fixed Kit API key detection in the newsletter function — now correctly handles V4 personal tokens, OAuth bearer tokens, and V3 legacy keys
- Fixed V4 endpoint: switched from broken form-based subscription to direct subscriber creation via POST /v4/subscribers
- Updated KIT_API_KEY in Cloudflare Pages to a working bearer token
- Deployed updated function; confirmed Supabase backup and Kit subscriber creation both succeed on every signup

Why it matters:
The newsletter form on the homepage was silently failing to add subscribers to Kit — Supabase backup was succeeding so the user saw a success message, but no one was actually being added to the email list. The full dual-store pipeline (Supabase + Kit) is now verified working end-to-end.

Next:
- Set up a verified sending domain on Kit (projectcreation.net) to fix DMARC deliverability warning
- Rotate KIT_API_KEY to a stable long-lived credential when Kit personal access tokens become available

Tags:
- newsletter
- kit
- cloudflare-pages
- bugfix
- env-vars

## 2026-06-04 23:45 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Full codebase bug scan with 5 parallel agents across all pages, JS modules, Cloudflare functions, Supabase schema, and security headers
- Fixed broken #community nav anchor — renamed newsletter section id so the Community nav link actually scrolls to destination
- Fixed auth button flash on pricing page — added auth-nav-hidden class so logged-in users don't see a Sign In button flicker before JS runs
- Fixed newsletter function hasKit check — no longer requires KIT_FORM_ID for V4/OAuth path (V3 only)
- Fixed avatar upload — now validates MIME type server-side and client-side before FileReader, blocking non-image files that bypass the accept attribute
- Fixed toBlob crash path in crop modal — wrapped in try-catch so a browser exception doesn't silently disable Save/Cancel buttons forever
- Fixed graph.js animation loop — rAF is now properly cancelled on page hide (visibilitychange) instead of continuing to fire in the background, and correctly resumes on page show
- Removed SVG from avatar bucket allowed MIME types in Supabase — SVG files can contain embedded JS and are an XSS vector when served with image/svg+xml content-type
- Deployed all fixes to production at projectcreation.net

Why it matters:
Seven confirmed bugs patched across navigation, auth UX, avatar upload security, animation performance, and the newsletter function. The site is now significantly more robust and secure heading into broader use.

Next:
- Set up verified sending domain on Kit (projectcreation.net) for newsletter deliverability

Tags:
- bugfix
- security
- performance
- auth
- avatar
- newsletter
- graph

## 2026-06-06 00:00 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added 6 animations and interactive elements to the pricing page
- Terminal typewriter effect types "System_Pricing.cfg" label and "Pricing" headline on page load, with a blinking block cursor that fades after finishing
- Price glitch counter scrambles digits for 130ms before resolving to the real value when switching Monthly ↔ Yearly
- Billing toggle now uses a sliding CSS indicator that translates smoothly between Monthly and Yearly, replacing the instant class swap; theme color variants (red/green/purple) included
- Pro card border tracer: animated conic-gradient ring travels around the Pro card's border continuously using @property --tracer-angle; theme variants included; respects prefers-reduced-motion
- Comparison table row hover: hovering any row highlights all 4 cells with a dim accent background sweep; Pro column cells get a stronger highlight; uses event delegation + mouseleave cleanup
- Savings count-up: switching to Yearly animates each savings amount from €0 to its target (€16/€50/€100) with an ease-out cubic curve over 420ms
- Created new assets/pricing-animations.css for all animation styles (not processed by Tailwind)

Why it matters:
The pricing page is a key conversion surface — these animations make it feel dynamic and on-brand with the site's terminal/digital aesthetic. The glitch counter and savings counter reinforce the value prop at the moment of decision. The border tracer draws the eye to the Pro card without being aggressive.

Next:
- Consider adding reduced-motion fallbacks for the typewriter and glitch counter
- Potential: card entrance animations on scroll (idea 5 from brainstorm)

Tags:
- pricing
- animations
- css
- javascript
- ux

## 2026-06-07 08:27 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed a flicker on the pricing page where the headline text would briefly appear statically, get cleared, and retype itself while the small label above it was still typing in
- Both the label and the headline now stay invisible from first paint and only become visible the instant their own typewriter animation begins, so the sequence reads as one clean continuous reveal with no flash or layout shift
- Iterated on the billing toggle and price-change animations based on hands-on feedback: replaced the sliding indicator with a simpler crossfade between Monthly/Yearly, and replaced the digit-scramble price effect with a smooth ease-out count-up that settles gently on the final number

Why it matters:
First impressions matter most on a pricing page — a clean, glitch-free reveal keeps attention on the offer instead of on rough edges in the motion design. Tuning the toggle and price animations after live feedback brings the page closer to the "premium, considered" feel the brand is going for.

Next:
- Final visual pass on localhost before redeploying to the live site
- Consider reduced-motion fallbacks for the typewriter sequence

Tags:
- pricing
- animations
- bugfix
- ux
- javascript

## 2026-06-07 08:35 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed the typewriter cursor on the pricing headline sitting visibly below the uppercase letters it follows; it now lines up cleanly on the same baseline as the text for both the small label and the large title

Why it matters:
Small alignment details like this are exactly what make terminal-style motion feel deliberate instead of rough — the cursor now reads as part of the same line of text rather than a stray block beneath it.

Next:
- Final visual pass on localhost before redeploying to the live site

Tags:
- pricing
- animations
- css
- bugfix
- ux

## 2026-06-07 08:48 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced the pricing page's typewriter reveal with the same "deciphering text" effect used on the homepage's vision headline: characters resolve left-to-right while the rest still scramble through a randomized terminal charset before locking into place
- Both the small label and the pricing title now decode in sequence with this effect, staying invisible until their own reveal begins so there's no flash of static text first
- Removed the now-unused typewriter cursor styles and logic in favor of the shared decipher approach

Why it matters:
Reusing the same decode animation across the homepage and pricing page makes the "Digital Craft" terminal aesthetic feel consistent and intentional site-wide, rather than having two different reveal styles competing for attention.

Next:
- Final visual pass on localhost before redeploying to the live site

Tags:
- pricing
- animations
- css
- javascript
- ux

## 2026-06-07 08:55 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Made the Pro card's animated border tracer more noticeable: thickened the glowing ring and widened/brightened the traveling arc so the flash reads more clearly as it travels around the card, across all theme color variants

Why it matters:
The tracer is meant to draw the eye to the highlighted plan — at its original subtlety it was easy to miss, so boosting its presence helps it actually do that job.

Next:
- Final visual pass on localhost before redeploying to the live site

Tags:
- pricing
- animations
- css
- ux

## 2026-06-07 09:10 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Reworked how the Yearly billing toggle displays price on the pricing page: the headline number now always reads "per month" instead of switching units between monthly and yearly totals
- Switching to Yearly now animates the headline number down to its discounted monthly-equivalent (yearly total divided by twelve) and shows the original full monthly price crossed out right beside it, so the saving is visible at a glance
- Kept the existing "billed €X yearly · save 20%" detail line and savings badge underneath for full transparency on what's actually charged

Why it matters:
Keeping the unit constant across the toggle (always "per month") matches how visitors naturally think about cost and how most SaaS pricing pages present it — it removes the mental math of comparing a monthly price to a yearly total, and the crossed-out comparison makes the 20% saving land instantly instead of needing to be calculated.

Next:
- Final visual pass on localhost before redeploying to the live site

Tags:
- pricing
- ux
- javascript
- conversion

## 2026-06-07 09:18 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed the crossed-out comparison price next to the pricing headline not actually showing a strikethrough — the relevant styling utility wasn't present in the compiled stylesheet, so the old price looked like plain text and read as confusing rather than as "this is the price you're not paying"
- Added an explicit strikethrough rule to the page's animation stylesheet so the comparison price now renders with a clear line through it, making it obvious at a glance which number is the real price

Why it matters:
A comparison price that doesn't visually read as "crossed out" defeats the whole point — it just adds a second number next to the real one and confuses rather than clarifies. With the strikethrough now actually rendering, the saving is unambiguous.

Next:
- Final visual pass on localhost before redeploying to the live site

Tags:
- pricing
- css
- bugfix
- ux

## 2026-06-07 09:35 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Adjusted the Pro and Max annual prices (€190 → €180, €380 → €360) so their monthly-equivalent figures land on clean whole numbers (€15/mo and €30/mo) with no rounding involved — the displayed price now divides evenly and matches the actual yearly charge exactly
- Updated the savings badges to match (Pro now shows "save €60/year", Max "save €120/year" — both larger than before, since the new annual prices are a better deal)
- Synced the change across the page copy, the billing toggle's underlying data, and the canonical brand/pricing reference doc
- Re-checked the whole pricing flow end to end: toggle math, crossed-out comparison prices, savings count-up targets, and the small print all line up with no stale numbers left anywhere in the codebase

Why it matters:
A monthly-equivalent price that requires rounding (e.g. "€16/mo" representing an actual €15.83/mo charge) creates exactly the kind of subtle mismatch that erodes trust with a technical audience. Adjusting the underlying annual price so the math comes out exact removes that gap entirely — the number shown is the number charged, period — while also making the annual savings look more compelling.

Next:
- Final visual pass on localhost before redeploying to the live site
- Consider whether the "two months free" copy for Pro/Max should eventually be updated to reflect the larger real saving (closer to three months free at the new prices)

Tags:
- pricing
- conversion
- ux
- javascript
- bugfix

## 2026-06-07 09:50 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Adjusted Core's annual price (€80 → €72) to align it with Pro and Max under one consistent structure: every tier's yearly price is now exactly 9 × its monthly price, exactly 25% off the full annual rate, and divides evenly into a clean monthly-equivalent (€6 / €15 / €30) with zero rounding anywhere
- Updated the "20% off" badges across the toggle and all three tiers to the now-accurate "25% off" — the claim is precise for every tier rather than an approximation
- Updated Core's savings badge from "save €16/year" to "save €24/year" to match the new structure
- Synced the change across the page copy, the toggle's underlying data, and the canonical brand/pricing reference doc
- Re-ran the full math check end to end across all three tiers — confirmed exact, consistent numbers with no stale references left anywhere

Why it matters:
The page previously advertised a flat "20% off" that wasn't quite true for any tier (Core was actually ~17% off, Pro/Max ~21% then 25% after the last price change). Aligning Core onto the same 9-months structure as Pro and Max makes "25% off" a precise, page-wide truth instead of a rounded marketing approximation — removing the last numerical inconsistency on the pricing page and giving the discount badge a bigger, fully accurate number to lead with.

Next:
- Final visual pass on localhost before redeploying to the live site
- Consider whether the "two months free" copy should eventually be updated to reflect the larger real saving across all tiers (closer to three months free / 25% off)

Tags:
- pricing
- conversion
- ux
- javascript
- bugfix

## 2026-06-07 09:58 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Finished aligning the pricing page's annual-billing messaging into one fully consistent, fully accurate structure across all three tiers
- Updated the "two months free" copy to "three months free" everywhere it appears — the new pricing structure (yearly = 9 × monthly) makes this the literal truth for Core, Pro, and Max alike, not an approximation
- Updated the canonical brand/pricing reference doc to describe the finished structure: every tier is now simultaneously exactly 25% off, exactly 3 months free, and divides into a clean whole-number monthly-equivalent — with nothing rounded or approximated anywhere in the chain

Why it matters:
This closes out the full pass on the pricing page's annual-billing story: every number a visitor sees — the badge, the "months free" framing, the savings amount, and the headline monthly price — now says exactly what it means and means exactly what it says, for all three tiers equally. That kind of internal consistency is what makes a pricing page feel considered rather than approximate, and is worth highlighting as a finished piece of work rather than another incremental tweak.

Next:
- Final visual pass on localhost, then redeploy the polished pricing page to the live site

Tags:
- pricing
- conversion
- ux
- milestone

## 2026-06-07 11:51 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Redesigned the pricing page's tier-comparison table from a single flat grid into three labeled panels (Products, Capacity & Limits, Best Fit) with comment-style section dividers
- Added new comparison rows (history limits, cloud sync, orchestrator, future-product access) pulled from the brand reference doc
- Replaced verbose cell text with compact glyphs for binary features and added a continuous accent bar down the Pro column to echo the card styling above

Why it matters:
The comparison table felt thin and generic next to the polished pricing cards above it — grouping the rows into clear categories and giving the Pro column a visual through-line makes the whole section feel like one designed system instead of cards-plus-an-afterthought-table.

Next:
- Visual QA pass in-browser across themes and breakpoints

Tags:
- pricing
- design
- frontend

## 2026-06-07 12:24 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Restructured the pricing page into a guided four-step narrative (who it's for, your match, the climb, get started) threaded by a scroll-spy rail nav that lights up and fills in as you move through each step
- Added a literal ascending "staircase" visual for the three tiers, with a small ghosted preview of it placed earlier on the page as a visual bridge between steps
- Kept all existing toggle, pricing-card, and comparison-table functionality fully intact inside the new structure
- Fixed a layout bug where the ghost-stairs glyph sat disconnected at the page edge instead of beside its heading, and a scroll-spy edge case where two short steps could both register as "active" on first load

Why it matters:
Turns the pricing page from a stack of separate sections into one connected walk-through — visitors get a sense of progress and a visual preview of where they're headed, instead of just scrolling past disconnected blocks.

Next:
- Continue general visual QA across themes and breakpoints

Tags:
- pricing
- design
- frontend
- navigation

## 2026-06-07 12:32 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Reworked the ghosted staircase glyph on the pricing page so it flows inline at the end of the "Your match" heading instead of sitting in a separate column, removing a visible gap that made it look stranded next to the text

Why it matters:
The glyph is meant to read as part of the sentence introducing it — a small visual wink before the full staircase appears later on the page — so it needed to sit directly against the words rather than floating apart from them.

Tags:
- pricing
- design
- frontend

## 2026-06-09 18:15 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Committed and deployed pricing page animation updates (toggle, transitions, layout)
- Added Supabase avatar bucket patch and profiles table SQL to repo
- Added team coordination context file (CLAUDE.md)
- Pushed to GitHub main branch, triggering Cloudflare Pages auto-deploy
- Confirmed live on projectcreation.net via direct wrangler deploy

Why it matters:
All recent pricing page work is now live on the official website. The GitHub → Cloudflare Pages pipeline is confirmed working, and the deploy workflow is documented: push to main auto-deploys; wrangler pages deploy dist can be used for immediate manual pushes.

Next:
- Apply Supabase SQL patches to the live database if not yet run
- Continue work on next feature

Tags:
- deploy
- pricing
- cloudflare
- supabase

## 2026-06-09 18:45 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Deleted .netlify/ local directory (was leftover from a previous hosting setup)
- Removed .netlify/ from .gitignore (nothing left to ignore)
- Pushed cleanup to GitHub

Why it matters:
Site fully moved to Cloudflare Pages. No Netlify references remain in the repo or locally.

Next:
- Continue with next feature or maintenance work

Tags:
- cleanup
- cloudflare
- hosting

## 2026-06-09 19:30 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced static bullet list in "// 01 — Who this is for" section with three interactive terminal windows (CORE.cfg, PRO.cfg, MAX.cfg)
- Hover a terminal: panel lifts with cyan border glow, others dim, headline morphs via decipher scramble to persona-specific copy, CTA slides in
- MAX terminal has live animated CPU bar on hover
- Terminals stagger in on scroll with opacity/translate animation
- Full theme override support (red, green, purple)
- Removed guided rail navigation strip — sections carry the structure on their own

Why it matters:
The pricing page "who is this for" section now feels like a live system rather than a static list — each persona gets their own terminal showing their actual workflow, and the page responds to exploration.

Next:
- Commit and deploy to projectcreation.net

Tags:
- pricing
- animation
- ui
- interactive

## 2026-06-09 19:50 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Fully rewrote who-terminal CSS to match new human-readable HTML class system (`.who-line`, `.who-price`, `.who-dot`, `.who-status-name`, etc.)
- Sequential line-reveal animation: each row slides in from the left with staggered CSS nth-child delays on scroll
- Pulsing green dots for ACTIVE status, blue pulse for MAX uptime, grey for not included
- Blinking block cursor at the end of each card's tag line
- Cyan scan-line sweeps through the terminal body on hover
- Bigger, more readable content: €22px price size, 15px descriptions, generous padding
- MOST POPULAR badge on PRO in solid cyan

Why it matters:
The terminal windows are now genuinely impressive — human-readable content, purposeful animations (pulse, blink, scan), and a clear visual hierarchy that makes the three tiers feel like a live dashboard rather than a price list. First-time visitors now get an immediate "WOAH" from the section.

Next:
- Commit and deploy to projectcreation.net when ready

Tags:
- pricing
- animation
- ui
- who-section
- terminal

## 2026-06-09 19:57 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added "PICK THIS IF:" decision section to all three terminal cards (CORE, PRO, MAX)
- Each card now has 3 plain-language bullet points helping users self-select the right tier
- New CSS classes: `who-line-label` (muted uppercase header) and `who-line-check` (light decision bullets)
- Extended sequential line-reveal nth-child delays from 9 to 14 to cover the additional lines

Why it matters:
Users now have enough information inside the cards to make a decision without leaving the section — the terminals tell you what each plan includes AND who it's actually for.

Next:
- Commit and deploy to projectcreation.net when ready

Tags:
- pricing
- ui
- who-section
- copy

## 2026-06-09 20:08 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Added ProjectCipher to Core plan as a limited inclusion (4 terminals, 1 workspace, built-in providers only, no team features or orchestrator)
- Pro plan now explicitly supports up to 2 workspaces; Max plan now explicitly supports unlimited workspaces
- Updated PROJECTCREATION.md (brand source of truth) to reflect all three tiers' Cipher limits
- Updated pricing.html: Core Cipher row now shows an amber "LIMITED" dot and pulsing amber indicator; all three cards show terminal/workspace count detail lines (↳ 4 terminals · 1 workspace, etc.)
- Max card's detail line renders in faint cyan to visually distinguish unlimited capacity
- Updated projects.html ProjectCipher section: replaced "Twelve AI agents" with "Up to twelve" and added a clear tier breakdown line (Core: 4 · Pro: 8 · Max: 12)

Why it matters:
Users can now see exactly what ProjectCipher access looks like at each tier without leaving the pricing section. The amber LIMITED indicator makes the Core restriction clear at a glance without feeling punishing — it's included, just capped. The source-of-truth doc (PROJECTCREATION.md) and every public-facing surface are now aligned.

Next:
- Commit and deploy to projectcreation.net when ready

Tags:
- pricing
- projectcipher
- tiers
- workspaces
- copy

## 2026-06-09 20:38 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Removed the "weird chart" ghost-stairs element from the // 02 heading
- Completely redesigned // 03 — The Climb section with an A+B hybrid approach:
  - Upgrade Track: horizontal timeline with three glowing nodes (CORE/PRO/MAX), animated fill line that extends left→right on scroll, hover callouts that expand per tier
  - Mission Control Terminal: FEATURE_SNAPSHOT.cfg terminal panel replacing the flat grid table
  - Terminal rows reveal sequentially on scroll (staggered 55ms per cell, 320ms per section)
  - Section headers (// scanning products...) typewrite character by character on reveal
  - Row hover scan-line: all cells in a hovered row highlight together via JS
  - Column tab switcher (CORE/PRO/MAX) with PRO highlighted by default
  - Climb node hover → automatically switches the highlighted column in the table below
  - ProjectCipher now shows amber ◐ LIMITED for Core, green [OK] for Pro/Max
  - [OK] / [--] indicators throughout replace plain text checkmarks

Why it matters:
The climb section went from three flat static boxes + a generic grid to a fully animated, interactive system dashboard that matches the ProjectCreation terminal aesthetic. Users can hover tier nodes, see callouts with tier highlights, watch the table reveal itself, and switch column focus — all without leaving the section.

Next:
- Commit and deploy to projectcreation.net when ready

Tags:
- pricing
- animation
- ui
- climb
- feature-table
- interactive
- redesign

## 2026-06-09 20:29 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Completed the Tier Focus Bar View JS IIFE in pricing-animations.js
- Replaced broken grid-based snap terminal logic with new switchTier system
- Tab clicks and climb node hover now animate tier transitions (fade out → update content + bars → fade in)
- IntersectionObserver stagger reveals rows and sections on scroll, animating bars from 0 to target width
- Typewriter scan header updates on every tier switch
- bar-active / bar-limited / bar-off classes applied per tier from data attributes on each row
- fmtVal helper wraps [OK], [--], and limited values in colour-coded spans

Why it matters:
The // 03 section now has a fully interactive feature comparison — visitors can click tier tabs or hover the upgrade track nodes to switch the focused view, with smooth animated transitions. This makes the pricing page feel like a live product demo rather than a static table, consistent with the ProjectCreation terminal aesthetic.

Next:
- Visual QA pass on the tier transitions and bar animations
- Check climb node hover → tab sync across all three tiers
- Commit and deploy when ready

Tags:
- pricing
- interactive
- animations
- tier-focus
- snap-terminal

## 2026-06-09 20:34 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added orchestrator rate limit to Pro plan: 10 uses per hour in ProjectCipher
- Max plan now explicitly states unlimited orchestrator usage
- Updated PROJECTCREATION.md tier definitions accordingly
- pricing.html — Pro who-terminal card: added "↳ orchestrator: 10 uses/hr" detail line
- pricing.html — Pro "Pick this if" copy updated to reflect limited headroom, not unlimited
- pricing.html — Climb node Pro callout updated to "Orchestrator (10/hr) & custom CLI"
- pricing.html — Snap feature table Orchestrator row: Pro now shows limited (amber bar, 55%, ◐ 10 uses/hr), Max shows unlimited active
- projects.html — ProjectCipher tier breakdown line updated with orchestrator limits

Why it matters:
Adds a meaningful differentiation between Pro and Max for power users who rely on the orchestrator heavily. Pro is still fully capable for most builders; Max removes the ceiling entirely for those who need it.

Next:
- Visual QA of Orchestrator row in the snap feature table across all three tiers
- Commit and deploy when ready

Tags:
- pricing
- projectcipher
- orchestrator
- tier-limits

## 2026-06-09 20:38 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Clarified Core plan ProjectCipher limits across all files:
  - 1 active workspace at a time (not just "1 workspace")
  - Unlimited saved/starred workspace configs allowed
  - No orchestrator access explicitly stated
- Updated PROJECTCREATION.md Core tier definition
- pricing.html — Core who-terminal card: added three detail lines (1 active workspace, unlimited saved workspaces, no orchestrator)
- pricing.html — Core climb node callout: updated workspace wording + added saved workspaces/no orchestrator line
- pricing.html — Snap feature Orchestrator row Core val unchanged ([--]) but ProjectCipher row Core updated to "1 active ws"
- projects.html — tier breakdown updated with full Core limits

Why it matters:
The distinction between "active workspace" and "saved workspace configs" is important UX — Core users aren't artificially blocked from organising their setups, they just run one at a time. This also makes the upgrade path to Pro (2 active workspaces + orchestrator) clearer and more motivating.

Next:
- Visual QA on Core who-terminal card (detail lines may push height)
- Commit and deploy when ready

Tags:
- pricing
- projectcipher
- core-plan
- workspace-limits

## 2026-06-09 20:42 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Renamed "Future products" to "Launch priority" across all files
- Snap feature table: Max = active (day one), Pro = limited (after Max), Core = limited (after Pro) — bars and statuses updated accordingly
- Max who-terminal card: "Early access" status line renamed to "Launch priority"
- Max climb node callout: updated to "Launch priority — every new product, day one"
- PROJECTCREATION.md: Max tier bullet rewritten to describe the rollout order explicitly

Why it matters:
"Future products" implied a binary — you either get it or you don't. "Launch priority" frames it as a rollout sequence: Max gets everything day one, Pro follows, Core follows after. Every tier eventually gets access; Max just gets there first.

Next:
- Commit and deploy when ready

Tags:
- pricing
- launch-priority
- max-plan
- tier-framing

## 2026-06-09 20:45 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Launch priority row: Core changed from limited (amber) to off ([--]) — matches Cloud sync treatment
- PROJECTCREATION.md updated to clarify Core has no priority guarantee on new releases

Tags:
- pricing
- core-plan
- launch-priority

## 2026-06-09 20:55 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Completely rebuilt // 04 Get Started section as a Deploy Panel + Handshake Protocol hybrid
- Three tier selector cards (CORE / PRO / MAX) with animated armed/standby states and pulsing glow on active
- Handshake split: CLIENT.terminal on the left, PROJECTCREATION.sys on the right
- Animated beam stream between terminals — two glowing data beams flow in opposite directions continuously
- Clicking a tier card arms it, flashes the stream, and updates both terminals with that tier's real specs
- Terminal lines fade+slide in sequentially; sys terminal delays slightly after stream reconnects
- CTA button updates its label (INITIALIZE CORE/PRO/MAX TRIAL →) to match selected tier
- Pulsing outer ring on CTA, letter-spacing expands on hover
- Full scroll-reveal: terminals fade in, CTA slides up from below
- All theme variants (red, green, purple) fully wired — beams, armed glow, CTA, cursor all respect theme

Why it matters:
The conversion section now feels like activating a real system rather than clicking a button. Users engage with their tier choice through an interactive console before committing — making the CTA feel like a natural conclusion to the flow rather than an arbitrary prompt.

Next:
- Commit and deploy when ready

Tags:
- pricing
- get-started
- cta
- interactive
- animations
- handshake

## 2026-06-09 21:05 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Consistency audit across all pricing surfaces and PROJECTCREATION.md
- Core pricing card: added missing ProjectCipher entry (4t · 1 active workspace · no orchestrator)
- Pro pricing card: expanded Cipher line to show workspaces and orchestrator cap (8t · 2 workspaces · orchestrator 10/hr)
- Max pricing card: updated stale "Future products at launch" → "Launch priority — new products day one"
- PROJECTCREATION.md: corrected hosting platform from Netlify to Cloudflare Pages
- Committed, built, and deployed to production

Why it matters:
Every surface now shows the same accurate information. No tier is missing its Cipher details, no outdated copy remains, and the source-of-truth file matches what the website shows.

Tags:
- audit
- consistency
- pricing
- projectcipher

## 2026-06-09 21:12 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Second consistency audit pass — found and fixed two remaining gaps in Max tier displays
- Max who-terminal card: detail line now reads "12 terminals · unlimited workspaces · unlimited orchestrator" (matches how Core and Pro each state their orchestrator status)
- Max pricing card: Cipher line now reads "12t · unlimited workspaces · unlimited orchestrator" (matches Pro's format of listing all three specs)
- Committed, built, deployed to production

Tags:
- audit
- consistency
- max-plan
- projectcipher

## 2026-06-10 12:00 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Reworked the pricing page layout: removed the redundant "Get Started" section and reordered the remaining sections so the plan-comparison cards lead, followed by the audience breakdown and the feature roadmap
- The yearly/monthly billing toggle now updates pricing everywhere on the page, including the audience cards and the roadmap track, not just the main plan cards

Why it matters:
The pricing page is simpler and easier to scan, and switching to yearly billing now gives a consistent picture across the whole page instead of just one section.

Next:
- None — feature complete

Tags:
- pricing
- redesign
- ui

## 2026-06-10 12:05 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed the command palette and project status panel so their accent colors follow the site's selected color theme instead of always showing the default blue
- Verified all theme options render correctly across both panels

Why it matters:
Visual consistency across the whole site, regardless of which theme a visitor picks.

Next:
- None

Tags:
- theming
- ui-fix

## 2026-06-10 12:20 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Swapped the order of the pricing page sections so "Who this is for" now leads and the plan-comparison cards follow
- Removed the price tags from the "Who this is for" cards so visitors see the audience breakdown first before any pricing

Why it matters:
Leads with the "is this for me?" framing instead of pricing up front, which should reduce early drop-off, while pricing is still front-and-center on the very next section.

Next:
- None

Tags:
- pricing
- ui
- redesign

## 2026-06-10 12:30 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- The CORE, PRO, and MAX tier names in the "Who this is for" section now use the site's accent color, matching the rest of the page's styling and following the selected color theme

Why it matters:
Small visual consistency tweak so tier names stand out and match the site's theme system.

Next:
- None

Tags:
- pricing
- ui

## 2026-06-10 12:50 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Added hover animations to the pricing cards: a glowing scanline sweeps down each card on hover, and the "Includes" list lights up sequentially as it passes
- Added a small live "process feed" line at the bottom of each pricing card that types out and cycles through tier-specific status messages (workspace, orchestrator, cipher), simulating an active terminal session
- Both effects follow the site's color theme and respect reduced-motion preferences

Why it matters:
Makes the pricing cards feel more alive and on-brand with the terminal/CLI aesthetic, without changing the existing card layout or pricing logic.

Next:
- None

Tags:
- pricing
- ui
- animation

## 2026-06-10 13:00 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Removed the glowing scanline hover effect from the pricing cards — found distracting in practice
- Kept the sequential "Includes" list reveal and the live process feed line on hover, which tested well

Why it matters:
Keeps the pricing cards feeling alive without the busier scan animation getting in the way.

Next:
- None

Tags:
- pricing
- ui
- animation

## 2026-06-10 13:10 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Removed the closing tagline ("For builders finding their pace.", etc.) from each terminal card in the "Who this is for" section
- Pricing cards in section 02 now lift slightly with a soft shadow on hover for a more tactile feel

Why it matters:
Trims redundant copy from the audience cards and adds a small interactive touch to the pricing cards.

Next:
- None

Tags:
- pricing
- ui
- animation

## 2026-06-10 13:20 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed the "Most Popular" badge on the Pro tier in section 03's track: hovering no longer enlarges the glowing dot underneath it
- Hovering the Pro node now slightly enlarges the "Most Popular" badge itself instead

Why it matters:
Cleaner hover feedback on the climb track — the glow no longer looks like it's bleeding out from behind the badge.

Next:
- None

Tags:
- pricing
- ui

## 2026-06-10 13:30 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Cleanup pass on the pricing page stylesheet: removed leftover `.who-line-tag` styles (base + theme overrides) that were no longer used after the earlier tagline removal

Why it matters:
Keeps the stylesheet free of dead code from prior pricing page changes.

Next:
- None

Tags:
- pricing
- cleanup

## 2026-06-10 15:02 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: creation-feed

Changed:
- Added a new standalone Community page with a Discord hub card and follow links for X, YouTube, and TikTok (placeholder links for now).
- Updated the Community nav link site-wide to point to the new page.

Why it matters:
Gives people a real front door to find other vibe coders and creators around ProjectCreation, with Discord as the main hangout spot.

Next:
- Swap in the real Discord invite and social handles once shared.

Tags:
- community
- discord
- social

## 2026-06-10 21:55 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Reordered the pricing page so the plan/price cards (with the monthly/yearly toggle) appear first, followed by the "who this is for" breakdown
- Replaced "MOST POPULAR" badges with "RECOMMENDED" across the pricing page
- Simplified technical wording on the pricing page into plain language a new visitor can follow
- Replaced an unverifiable uptime stat on the top-tier card with a clearer queue-priority note
- Marked ProjectBuilt as a fully available product across the homepage and projects page, with a working call-to-action and updated stats

Why it matters:
The pricing page now leads with the actual decision (which plan, what it costs) and explains things in everyday language instead of jargon, while ProjectBuilt joins ProjectCipher and ProjectWord as a live, ready-to-use product.

Next:
- Revisit the proof/trust section of the pricing page (deferred for now)

Tags:
- pricing
- projectbuilt
- ux

## 2026-06-10 22:05 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Did a full consistency pass across the pricing, home, and projects pages after the recent pricing rebuild
- Replaced a few remaining shorthand terms in the pricing page's small live-status indicators with plain wording

Why it matters:
Confirms the pricing and product pages are consistent and ready for visitors, with no leftover technical shorthand or stale "coming soon" language.

Next:
- None — ready for review

Tags:
- pricing
- qa
- consistency

## 2026-06-10 22:20 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Site-wide accuracy pass across all pages, not just pricing
- Fixed a homepage line that overstated ProjectCipher's agent count as a flat "twelve," now matches the accurate "up to twelve" wording used elsewhere

Why it matters:
Keeps the homepage and product page descriptions honest and consistent with the actual tier-by-tier limits shown on pricing.

Next:
- None for this pass

Tags:
- qa
- consistency
- copy

## 2026-06-11 09:10 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Confirmed ProjectWord cloud sync is fully live and updated copy on the pricing and projects pages to reflect that, removing "coming soon" / "when live" hedging
- Aligned the pricing page's feature snapshot so ProjectBuilt access is described consistently across Pro and Max

Why it matters:
The pricing page no longer undersells a feature that's actually shipped, and tier comparisons read consistently end to end.

Next:
- None for this pass

Tags:
- pricing
- projectword
- copy

## 2026-06-11 11:53 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Granted a Max-tier subscription to a tester account for ProjectWord access

Why it matters:
Lets a tester try ProjectWord's full feature set ahead of public availability.

Next:
- Gather tester feedback on ProjectWord

Tags:
- projectword
- subscriptions
- testing

## 2026-06-11 12:05 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed the pricing page's tier comparison terminal so quickly switching between Core/Pro/Max tabs always lands on the tier you actually clicked, even mid-animation

Why it matters:
Rapid tab switching no longer leaves the highlighted tab out of sync with the displayed feature details.

Next:
- None for this pass

Tags:
- pricing
- bugfix
- ux

## 2026-06-11 12:30 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed the standalone community page and its styles to start that section over
- Pointed all "Community" nav links back to the existing newsletter section on the homepage

Why it matters:
Clears the slate for a redesigned community page without leaving any broken links in the meantime.

Next:
- Redesign the community page from scratch

Tags:
- community
- cleanup

## 2026-06-11 18:30 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Rebuilt community.html from scratch: hero with Discord CTA, channel-culture
  grid (#goals-2026, #build-log, #showcase, #accountability, #wins, #stuck),
  a live build-log feed, a builder spotlight grid, and a "why join" section
- Added a Cloudflare Pages function (api/discord-feed) that pulls recent
  messages from configured Discord channels with sample-data fallback
- Added assets/community.css and assets/community.js for feed rendering and
  an optional live online-member count
- Repointed the Community nav link across all pages to /community.html

Why it matters:
Gives the community page a real identity centered on the Discord server,
with live content pulled from the build-log and showcase channels once
configured.

Next:
- Wire up real Discord bot token, channel IDs, server ID, and invite link
- Decide on a curation rhythm for the builder spotlight

Tags:
- community
- discord
- live-feed

## 2026-06-11 19:10 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added scroll-triggered entrance animations to the community page's
  channel grid: typewriter section label, fade-in heading, and a
  staggered "terminal window opening" border-trace + glitch-decode
  effect on each channel hashtag
- Added per-card hover interactions: a live message preview that
  swaps the description for a sample Discord message, a border
  retrace, a blinking corner cursor, subtle 3D tilt following the
  cursor, and a pulsing/spiking activity dot
- All effects respect prefers-reduced-motion

Why it matters:
Makes the community page's "inside the server" section feel alive and
matches the terminal/system aesthetic, reinforcing that Discord is a
living space.

Next:
- Wire up real Discord bot token, channel IDs, server ID, and invite link

Tags:
- community
- animation
- ui

## 2026-06-11 19:30 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed a stray blue line artifact on the community page's channel
  cards: the entrance border-trace SVG overlay now fades out and
  hands off to the card's normal border once it finishes, and the
  hover re-trace (which caused the artifact under the 3D tilt) was
  removed

Why it matters:
Removes a visual glitch on the channel showcase cards while keeping
the hover tilt, live message preview, and other interactions intact.

Tags:
- community
- bugfix
- ui

## 2026-06-11 19:45 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed the "border trace" SVG animation on the community page's
  channel cards (the blue line that drew around each card on entrance)
- Cards now simply fade/slide in on scroll, keeping the typewriter
  label, glitch hashtags, hover live-message preview, tilt, and
  activity dots

Why it matters:
The border-trace effect didn't read well visually; entrance is now
simpler and cleaner.

Tags:
- community
- ui
- cleanup

## 2026-06-11 20:00 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added a "spin-in" entrance effect to the community page's channel
  cards: a short cyan light sweeps rapidly around each card's border
  on reveal, decelerating and fading out smoothly (CSS conic-gradient
  + animated custom property, ease-out timing)
- Disabled under prefers-reduced-motion

Why it matters:
Gives the channel grid a more premium, polished entrance without
the earlier "spinning blue line" artifact.

Tags:
- community
- animation
- ui

## 2026-06-11 20:10 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- The channel card spin-in entrance now matches the user's selected
  theme color (cyan/red/green/purple) via a --spin-color CSS variable

Tags:
- community
- animation
- theming

## 2026-06-11 20:20 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- The community page channel cards' hover "live message" preview now
  decodes/deciphers character-by-character (matching the scramble
  effect used on the homepage's "Digital Craftsmanship" headline)
  instead of a plain opacity crossfade

Tags:
- community
- animation
- ui

## 2026-06-11 16:02 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced the placeholder community-member messages in the
  community page's "LIVE FROM #BUILD-LOG" feed with real
  ProjectDiver-style updates about ProjectCreation's own recent
  changes (both the static fallback and the API sample data)

Why it matters:
The build-log feed now reflects actual ProjectCreation development
updates instead of generic sample chatter, matching its purpose.

Tags:
- community
- content

## 2026-06-11 19:05 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Redesigned the community page's "LIVE FROM #BUILD-LOG" section with
  a fuller terminal feel: typewriter section tag + decode-in heading
  on scroll, sequential traffic-light dots, and a connection status
  badge ("connected" / "sample data")
- Each feed entry now types itself out in sequence with a blinking
  cursor, shows a live-updating relative timestamp, highlights inline
  code terms, and reveals a "view on Discord" link on hover
- New entries from the live feed get a brief highlight flash; added a
  trailing terminal cursor and a "tail -f #build-log on Discord" CTA
  below the terminal, all theme-color matched

Why it matters:
Turns the build-log feed from a static list into an interactive,
"alive" terminal that mirrors the rest of the page's hacker/terminal
aesthetic.

Tags:
- community
- animation
- ui

## 2026-06-11 19:28 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Wired the community page's live build-log and showcase feeds up to
  the real Discord server by configuring the site's hosting
  environment with the bot credentials and channel references needed
  to read recent messages

Why it matters:
The "LIVE FROM #BUILD-LOG" and builder spotlight sections can now
pull real messages instead of sample data, once the site is
redeployed.

Next:
- Redeploy the site so the new configuration takes effect

Tags:
- community
- infrastructure

## 2026-06-11 19:32 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed the live build-log feed: ProjectDiver posts updates as rich
  embeds rather than plain text, so the feed endpoint now pulls a
  readable summary from each entry's "Changed" field instead of
  discarding them as empty
- Verified end-to-end against the real Discord server locally — the
  build-log feed now returns real, live entries

Why it matters:
The "LIVE FROM #BUILD-LOG" section will show genuine project updates
once redeployed, instead of falling back to sample data.

Next:
- Redeploy the site so the fix and live config take effect
- Builder spotlight (#showcase) still needs Discord's Message Content
  intent enabled before it can show real community messages

Tags:
- community
- bugfix
- infrastructure

## 2026-06-11 19:50 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added a `dev:live` script that runs the site locally with the real
  Pages Functions and live Discord credentials enabled, so the
  build-log feed updates locally instead of showing static content
- Removed the hardcoded sample build-log messages from the community
  page and the API fallback, replacing them with a single neutral
  "connecting" placeholder shown only if the live feed is unreachable

Why it matters:
The build-log feed on the community page now reflects real, current
updates both locally and once deployed, instead of frozen sample text.

Tags:
- community
- dev-tooling
- infrastructure

## 2026-06-11 22:04 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Widened the build-log terminal on the community page to span the
  full section width instead of being capped to a narrow column

Why it matters:
The live feed now uses the available space, making messages easier
to read on wider screens.

Tags:
- community
- ui

## 2026-06-11 22:27 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Shipped the rebuilt community page with a live, animated build-log
  feed connected to the project's Discord channel
- Pushed all changes to GitHub and deployed to production

Why it matters:
Anyone visiting the community page can now watch real build progress
update automatically, without refreshing.

Tags:
- community
- deploy
- live-feed

## 2026-06-12 09:35 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Hid the blinking section-tag cursor on the build-log section once
  its typewriter entrance animation finishes

Why it matters:
The leftover blinking cursor next to the heading looked unintentional
once the animation was done.

Tags:
- community
- ui
- animation

## 2026-06-12 09:40 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Build-log feed now caps at 5 entries (newest on top, oldest drops
  off automatically) instead of 6
- Added retry logic to the live feed loader so a slow or briefly
  failed Discord fetch on first load doesn't get stuck on "sample data"

Why it matters:
Keeps the feed from getting crowded while making the "connecting"
placeholder self-heal instead of sticking around.

Tags:
- community
- live-feed
- reliability

## 2026-06-12 10:17 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed the "Builder spotlight / Shipped this week" section from
  the community page and its sample-data card rendering
- Renumbered the following section from // 04 to // 03

Why it matters:
The spotlight section was placeholder content pulled from sample
data; removing it keeps the page focused on the live build-log feed.

Tags:
- community
- ui
- cleanup

## 2026-06-12 19:13 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Reworked the community page channel graph so cards collapse by default and expand to full size on hover/focus, fitting the whole graph on screen.
- Made the spokes connecting the build-log hub to every channel card always visible instead of only on hover.
- Replaced the orbiting dot animation with shooting-star comet effects that periodically streak from the hub out to each card.

Why it matters:
The community graph now fits within the viewport and the build-log connections read as a constant, lively part of the layout instead of a hidden hover detail.

Next:
- Visually verify the new hover/expand and comet timing in a real browser across breakpoints.

Tags:
- community
- ui
- animation

## 2026-06-12 19:24 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Redesigned the community page channel graph from large text cards to a compact icon-node constellation (matching the homepage hero graph style).
- Added a side detail panel that shows the full channel description and a live-message preview, updating on hover/focus of each node.
- Reworked the supporting CSS and JS (panel crossfade, entrance animation, reduced-motion fallback) to match the new layout.

Why it matters:
The graph now reads as a clean, branded network diagram instead of a stack of oversized boxes, while still surfacing each channel's full description through the side panel.

Next:
- Visually verify hover/focus interactions and mobile layout in a real browser.

Tags:
- community
- ui
- redesign

## 2026-06-12 00:00 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Made the nav "Project Status" sensors panel update live while open instead of only on click.
- "X ago" offline timestamps now tick every second from cached data, and the connection list refetches every 15 seconds so online/offline state updates without reopening the panel.

Why it matters:
Project status in the header now stays accurate to the second while the panel is open, removing the need to click the sensor icon twice to see a refreshed time.

Next:
- Check the connected app's heartbeat updates if "last active" still looks stale after this fix.

Tags:
- ui
- nav
- status
- fix

## 2026-06-12 19:37 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed leftover glow/dot artifacts from the community page channel-network graph hover effect
- Realigned the graph's connecting line coordinates to match the icon-node layout
- Added a "construct" animation so connecting lines now draw themselves outward from whichever node is hovered, instead of just fading in
- Rebuilt the site and verified the new behavior is served locally

Why it matters:
The hover interaction on the community graph now feels intentional and polished instead of showing stray light artifacts before the lines appeared.

Next:
- Visual confirmation of the hover animation in-browser

Tags:
- ui
- community
- graph
- animation
- bugfix

## 2026-06-12 19:41 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed the small pulsing activity dots from every node in the community page channel-network graph and detail panel
- Removed their idle pulse and "spike" flash animations and the interval that randomly triggered them
- Rebuilt and verified the served output no longer includes any trace of these elements

Why it matters:
These dots were left flashing briefly after un-hovering a node, which looked unpolished. Removing them entirely cleans up the hover interaction.

Next:
- Visual confirmation in-browser

Tags:
- ui
- community
- graph
- cleanup

## 2026-06-12 19:48 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Bumped cache-busting version query strings for the community page stylesheet and script so browsers fetch the latest files instead of a stale cached copy
- Rebuilt and re-served locally, then automated a headless browser pass: hovered a graph node, released, and inspected the live DOM/CSS state frame-by-frame
- Confirmed no leftover dot elements, classes, or inline styles remain on the graph edges or nodes after un-hovering

Why it matters:
A stale cached script/stylesheet was the most likely reason the previous dot-removal fix wasn't visible after a refresh. The automated pass confirms the underlying code itself is clean.

Next:
- Confirm in-browser after a fresh load that the dots no longer appear

Tags:
- ui
- community
- graph
- cache
- verification

## 2026-06-12 19:57 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Found and fixed the real source of the lingering "dot flicker" on the community channel-network graph: the faint ring-connector lines had a dotted stroke pattern, and the hover-dim transition made those dots visibly fade back in after moving the mouse away.
- Removed the dotted pattern so the ring connectors render as plain thin lines, with no visible flicker after hover.
- Re-verified with frame-by-frame headless browser screenshots across the full hover/un-hover sequence.

Why it matters:
This was the actual cause of the "twinkling dots" the dashed pattern combined with the hover-dim fade made the ring lines blink. The graph now stays clean and steady before, during, and after hovering any node.

Next:
- Continue polishing the channel-network section as needed.

Tags:
- ui
- community
- graph
- verification
- fix

## 2026-06-12 20:30 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Found the actual root cause of the lingering "dots" on the community channel-network graph: when un-hovering a node, the two connector lines tied to that node would briefly render as a string of small dashes/dots for about a second before settling, due to a leftover animation property not resetting cleanly.
- Fixed the reset so those connector lines snap back to a solid line instantly with no dash/dot artifacts.
- Verified frame-by-frame with headless browser screenshots and raw style dumps across the full hover/un-hover sequence; confirmed the lines now look identical at every point in time.

Why it matters:
This closes out the channel-network hover polish entirely, no more flicker, dashes, or "dots" anywhere in the graph before, during, or after interaction.

Next:
- Move on to the next section of the community page.

Tags:
- ui
- community
- graph
- verification
- fix

## 2026-06-12 19:55 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Pushed and deployed the live project-status sensors panel fix and the redesigned community page channel graph to the live site.

Why it matters:
The "Project Status" indicator now stays accurate to the second on the live site, and the community page now has its new constellation-style channel graph live.

Next:
- None planned

Tags:
- deploy
- ui
- status

## 2026-06-12 20:51 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Rewrote the hover descriptions for all six community channels (build-log, goals-2026, showcase, wins, stuck, accountability) to explain what each channel is for and why it matters, instead of short one-line summaries.
- Updated the default detail panel text shown on page load to match.

Why it matters:
The side panel felt empty when hovering a channel node. The new copy gives visitors a real reason to care about each channel and fills the space with useful context instead of whitespace.

Next:
- Gather feedback on the new copy and adjust tone if needed.

Tags:
- ui
- community
- copy
- graph

## 2026-06-12 21:23 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Pushed today's community page fixes (edge hover flicker fix, expanded channel descriptions) to GitHub.
- Deployed the latest build live.

Why it matters:
Wraps up today's community page polish — fixes and copy updates are now live for everyone.

Next:
- Gather feedback on the new channel descriptions.

Tags:
- deploy
- community
- ui

## 2026-06-13 10:02 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Rebuilt the community page's channel network graph to use the same draggable, physics-based engine as the home page network (same node/line styling, spring layout, drag-and-release).
- Kept the channel set (build-log, goals, showcase, wins, stuck, accountability) and the hover detail panel on the right, now driven by the new graph.
- Removed the old hover-only edge-lighting animation system and its now-unused CSS/JS.

Why it matters:
The two network graphs on the site now share one consistent look and interaction model, while the community page keeps its channel-specific info panel.

Next:
- Spot-check the new graph on mobile and smaller breakpoints.

Tags:
- community
- ui
- graph

## 2026-06-13 10:10 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added a short intro paragraph under the "Live from #build-log" heading on the community page, explaining what the build-log is and why it's there.

Why it matters:
Gives new visitors quick context that the feed is a real accountability/transparency log of ongoing work, not just a list of messages.

Next:
- Continue polishing the community page sections.

Tags:
- community
- ui
- copy

## 2026-06-13 10:18 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced the sequential typewriter reveal of the build-log feed's first load with a smooth, staggered fade/slide-in for all entries at once.
- Kept the typewriter effect for new entries that arrive while the feed is already visible.

Why it matters:
The initial view of the build-log felt clunky and overwhelming with each line typing out one after another — a single soft fade-in reads as far calmer on first load.

Next:
- Continue polishing the community page sections.

Tags:
- community
- ui
- animation

## 2026-06-13 10:26 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed a layout jump on the community page's build-log feed: the feed used to start with a single placeholder line, then snap to its full 5-line height the instant live data loaded, shoving the rest of the page down.
- Replaced the single placeholder with 5 sized placeholder lines matching the real feed's height, so the feed reserves its final size from first paint and the fade-in reveal plays smoothly with no jump.

Why it matters:
The reload "glitch" was a layout shift, not the fade animation itself — reserving the right amount of space up front makes the reveal feel smooth instead of janky.

Next:
- Continue polishing the community page sections.

Tags:
- community
- ui
- bugfix

## 2026-06-13 10:45 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Found the real cause of the build-log feed "drop down" glitch on the community page using a screen recording: the reserved placeholder space was sized for ~2 lines of text, but most real entries wrap to 3 lines at typical widths, so the feed still snapped taller right before the fade-in.
- Increased the reserved height per entry so it matches the real wrapped text, confirmed in a headless browser that the feed height no longer changes when the live entries load and fade in.

Why it matters:
The fade-in animation was already correct — the visible "glitch" was the box resizing under it. With sizing fixed, the reveal now reads as one smooth fade with no jump.

Next:
- None — this closes out the build-log reveal polish.

Tags:
- community
- ui
- bugfix

## 2026-06-13 10:34 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Found the real cause of the build-log feed "drop down" glitch: the feed lines were briefly rendered at full visibility with their reserved empty space before the fade-in animation kicked in, creating a flash right before the smooth reveal.
- Fixed by having every feed line start invisible from the very first paint, so the fade-in is the only thing that ever makes them appear — no more flash beforehand.
- Verified frame-by-frame with a headless browser: opacity now ramps cleanly from 0 to 1 with zero flash.

Why it matters:
This was the actual source of the "everything drops down" glitch the previous fix didn't fully catch — the page now loads in cleanly with one smooth fade, no flicker.

Next:
- Keep an eye on live build-log updates to confirm the typewriter effect for new entries still feels right alongside this change.

Tags:
- community
- ui
- animation
- bugfix

## 2026-06-13 11:08 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Redesigned the "Three reasons builders stick around" section on the community page as a connected circuit: each reason is now a node with a terminal-style icon box, linked by dashed lines with a traveling pulse that flows from card to card and down into the "Join the Discord" button.
- Added hover interactions — nodes and cards light up with the accent color, and the pulse speeds up under your cursor.
- Verified the new layout across desktop and mobile, and respected reduced-motion preferences.

Why it matters:
This turns a static "why join" list into a small interactive moment that echoes the network-graph visuals used elsewhere on the site, making the case for joining feel more alive.

Next:
- Watch for feedback on the new section and consider extending the circuit motif to other parts of the community page if it lands well.

Tags:
- community
- ui
- animation
- redesign

## 2026-06-13 11:14 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Expanded the "Why be here" circuit section into a full diagram: PCB-style corner brackets on each card, dashed arrows with arrowheads connecting the three reasons left-to-right, and a shared bus underneath where all three converge and drop into the centered "Join the Discord" button.
- Multiple pulses now travel the circuit simultaneously (cards, bus, and the final drop into the button), each lighting up the button with a glow when they arrive.
- On mobile the layout collapses into a single vertical chain with downward arrows, still ending at the centered button.

Why it matters:
The earlier version felt too static for the "circuit flow" idea — this version makes the connections and motion much more visible and ties all three reasons visually into the call to action.

Next:
- Get feedback on the busier circuit look and tune pulse timing/density if it feels too noisy.

Tags:
- community
- ui
- animation
- redesign


## 2026-06-13 11:23 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Reworked the "Three reasons builders stick around" cards into bigger, boxier panels with more breathing room
- Removed all the traveling pulse-dot animations along the connector lines
- Added a hover/focus "decipher" effect that scrambles in extra detail text explaining the benefit of each card
- Enlarged the "Join the Discord" call-to-action button

Why it matters:
Makes the section feel more spacious, intentional, and rewarding to explore instead of cluttered with moving dots.

Next:
- Keep gathering feedback on the redesigned community page

Tags:
- community
- ui
- animation
- redesign


## 2026-06-13 11:35 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Rebuilt the connector lines below the "Why be here" cards as three separate traces, each routing cleanly from its own card into the "Join the Discord" button instead of one line spanning the whole row
- Restyled all connector lines (between cards and into the button) as glowing blue circuit-board traces with a flowing animation

Why it matters:
The connectors now read as an intentional circuit diagram funneling into the call to action, rather than a stray line crossing the section.

Next:
- Keep gathering feedback on the redesigned community page

Tags:
- community
- ui
- animation
- redesign


## 2026-06-13 11:39 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Reduced the height of the "Why be here" cards so they don't feel stretched with empty space
- Made the "Join the Discord" button noticeably bigger

Why it matters:
The section now feels more compact and proportionate instead of stretched out.

Next:
- Keep gathering feedback on the redesigned community page

Tags:
- community
- ui
- layout


## 2026-06-13 11:44 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Tightened the gap between the "Why be here" heading and the cards so the cards sit a bit higher
- Confirmed the hover decipher effect and animated circuit traces still work correctly with the new spacing

Why it matters:
Gives the section more breathing room overall while keeping the interactive hover effects intact.

Next:
- Keep gathering feedback on the redesigned community page

Tags:
- community
- ui
- layout


## 2026-06-13 11:49 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Increased the vertical and horizontal spacing around the "Why be here" section (section padding, heading-to-cards gap, gap between cards, and the circuit trace area) without resizing the cards or button themselves

Why it matters:
The section now feels noticeably more spacious and less cramped while keeping the visual elements the same size.

Next:
- Keep gathering feedback on the redesigned community page

Tags:
- community
- ui
- layout


## 2026-06-13 12:14 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added a new "Join the build" call-to-action section right after the hero, now numbered // 01, with a typewriter-revealed heading, a deciphering subtext, an animated terminal-style command line, and a big glowing "Join the Discord" button with expanding circuit-style rings
- Renumbered the existing sections: "Inside the server" is now // 02, "Live from #build-log" is // 03, and "Why be here" is // 04

Why it matters:
Gives visitors an immediate, animated invitation to join the Discord right after the hero, before walking them through the rest of the community page.

Next:
- Keep gathering feedback on the redesigned community page

Tags:
- community
- ui
- animation
- cta


## 2026-06-13 12:22 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Replaced the floating corner brackets on the "Join the build" CTA section with a full frame that draws itself in around the block once the section comes into view
- Added faint ambient pulse dots scattered across the section's background grid for extra life

Why it matters:
Makes the new CTA section feel more like a terminal window powering on, with a livelier background.

Next:
- Keep gathering feedback on the redesigned community page

Tags:
- community
- ui
- animation
- cta


## 2026-06-13 12:25 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Slowed the "Join the Discord" button's pulse rings to a single heartbeat-style pulse every 3.5 seconds instead of three overlapping continuous pulses
- Fixed the button hover effect on both CTA buttons to expand evenly from the center on all sides, instead of shifting up and to the left

Why it matters:
The pulse is now a calmer, intentional heartbeat rather than a distracting constant animation, and hover feels more solid and centered.

Next:
- Keep gathering feedback on the redesigned community page

Tags:
- community
- ui
- animation
- cta


## 2026-06-13 12:29 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Wired up all "Join Discord" style buttons and links on the community page (hero, the new "Join the build" CTA, the build-log "tail -f" link, and the "Why be here" CTA) to the real server invite, opening in a new tab

Why it matters:
Visitors can now actually join the community from any of the call-to-action buttons instead of clicking dead links.

Next:
- Keep gathering feedback on the redesigned community page

Tags:
- community
- links
- discord

## 2026-06-13 12:38 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Made the community page's themed accent colors fully consistent — the channel panel icon/live-message text, the connector traces leading to the Discord CTA, the card hover glow/corners/icon, and the "Join the build" hero (frame border, ambient dots, terminal text, button pulse rings and hover glow) all now follow the site's active color theme instead of staying blue.

Why it matters:
- The community page's color theme switcher now applies consistently across every animated/interactive element, so the whole page feels cohesive no matter which theme a visitor picks.

Next:
- Continue polishing community page details as they come up.

Tags:
- community
- theming
- ui

## 2026-06-14 21:16 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- The homepage's animated background (log stream / code rain behind the hero manifesto) now follows the active color theme instead of always rendering blue.
- Removed the scripted "boot sequence" terminal animation above the tools section. The tool cards now simply fade and slide in smoothly once they scroll into view.

Why it matters:
- The whole homepage now feels consistent with whichever theme color a visitor picks, and the tools section loads in with a cleaner, less busy entrance.

Next:
- Keep an eye out for any other hardcoded blue accents that should follow the theme.

Tags:
- homepage
- theming
- ui
- animation

## 2026-06-14 21:25 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Removed the always-blue focus highlight on the homepage newsletter email field so it no longer clashes with the active color theme.

Why it matters:
- Typing an email into the "Stay in the Feed" box no longer shows a mismatched blue outline when a different theme color is selected.

Next:
- None for now.

Tags:
- homepage
- newsletter
- ui

## 2026-06-14 21:42 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- The animated visuals inside the "Tools for the Next Epoch" cards (ProjectCipher's character rain, ProjectWord's waveform, ProjectBuilt's blueprint dot grid) now follow the active color theme instead of always rendering blue. Pulled the theme-color logic into one shared helper reused across all of the homepage's animations.

Why it matters:
- Every animated element on the homepage — background, tool cards, and more — now matches whichever accent color a visitor picks, for a fully consistent themed experience.

Next:
- None for now.

Tags:
- homepage
- theming
- ui
- animation

## 2026-06-14 21:35 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Found and removed the real source of the blue focus outline on the homepage newsletter email field — it was coming from the form-styling plugin's default focus ring, separate from the border color fixed earlier. Rebuilt the production output so the fix is live on the local preview.

Why it matters:
- Clicking into the email field no longer shows any leftover blue ring, on any theme.

Next:
- None for now.

Tags:
- homepage
- newsletter
- ui

## 2026-06-14 21:50 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed the "Who is this for?" pricing card hover effects on the pricing page — the terminal-style border glow, header/footer dividers, scan-line sweep, status dots, title/label text, the "Start ___" call-to-action link, the Max card's "12 terminals · unlimited workspaces · unlimited orchestrator · highest priority in queue" detail line, and the popular badge now all use one shared theme-color variable instead of a hardcoded blue.

Why it matters:
- Hovering any of the three pricing cards now consistently shows the visitor's chosen accent color everywhere, with far less duplicated CSS to keep in sync going forward.

Next:
- None for now.

Tags:
- pricing
- theming
- ui
- animation

## 2026-06-14 21:58 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed the "Climb" section of the pricing page (the Core/Pro/Max progress track, its "RECOMMENDED" badge, hover callouts, and the Mission Control terminal's tier tabs, highlighted column, row-hover states, and feature bars/cursors) so every one of these now uses the visitor's chosen accent color instead of always rendering blue.

Why it matters:
- The pricing page's climb track and comparison terminal now feel like part of the same themed page no matter which accent color a visitor picks — completing the theme-consistency pass across the whole pricing page.

Next:
- None for now.

Tags:
- pricing
- theming
- ui

## 2026-06-14 22:05 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed the "Why be here" cards on the community page so they no longer change size on hover
- Reserved enough space for the longest reveal text up front so all three cards stay a consistent, fixed size

Why it matters:
- Hovering one card used to permanently resize all three cards in the row, which felt buggy and inconsistent

Next:
- Continue monitoring theme consistency across remaining pages

Tags:
- community
- ui
- bugfix

## 2026-06-15 10:37 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Made text selection highlight color follow the active site theme instead of always showing blue
- Added matching selection colors for the default, red, green, and purple themes

Why it matters:
- Selecting text now feels consistent with whichever theme the user has chosen via the top-right toggle

Next:
- Continue monitoring theme consistency across remaining pages

Tags:
- ui
- theme
- enhancement

## 2026-06-15 10:50 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed text selection still showing blue on non-default themes
- The blue color came from a Tailwind selection utility on the body with higher CSS specificity than the new theme rules; raised specificity so theme-based selection colors now win

Why it matters:
- Selection color now correctly matches the active theme (red, green, purple) instead of always falling back to blue

Next:
- Continue monitoring theme consistency across remaining pages

Tags:
- ui
- theme
- bugfix

## 2026-06-15 11:05 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: build-log

Changed:
- Found that the local preview server serves the built "dist" output, so prior CSS edits weren't actually reaching the page
- Rebuilt the production output and bumped the site stylesheet's cache-busting version across all pages
- Verified with an automated browser check that text selection color now correctly matches each theme (default, red, green, purple)

Why it matters:
- The theme-based selection color fix now actually takes effect on the live local preview and was confirmed working end-to-end

Next:
- Continue monitoring theme consistency across remaining pages

Tags:
- ui
- theme
- bugfix

## 2026-06-15 11:25 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Fixed the theme switcher on the Projects and Account pages by adding a small shared script that powers the button, instead of loading the full homepage bundle (which would have duplicated existing account logic on those pages)
- Improved color contrast on the background-animation toggle button in the Vision section and added proper accessibility labeling/state attributes
- Added pause/resume behavior to a second background canvas animation so it stops running when its section is off-screen or the browser tab is hidden, reducing unnecessary work
- Compressed and resized the two large project thumbnail images used on the Projects page, added explicit width/height to prevent layout shift, and kept full-size originals for the larger screenshot views
- Reviewed the two Supabase schema files for the profiles table against the live database and marked the older, out-of-date one with a clear "superseded" note for future reference
- Bumped the site stylesheet cache-busting version across all pages and rebuilt the production output

Why it matters:
- Visitors on the Projects and Account pages can now use the theme switcher, background contrast meets accessibility guidelines, animations no longer run wastefully off-screen, and project pages load noticeably lighter images

Next:
- Continue working through remaining audit findings

Tags:
- ui
- accessibility
- performance
- bugfix

## 2026-06-15 14:20 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added unique meta descriptions and Open Graph/Twitter card tags to all main pages, fixed the homepage title tag, and added schema.org Organization/WebSite structured data via an external script (kept CSP-safe with no inline scripts)
- Marked all auth pages (sign in, sign up, forgot/reset password, verify, account) as noindex so search engines focus on the main brand pages
- Added a small SVG site favicon (matching the dark/cyan visual language) and linked it from every page
- Added "skip to main content" links, marked decorative pulse-dots and background graph SVGs as aria-hidden, and lightened purple/red theme text colors on a few links for better contrast
- Standardized the Sign In/Create Account nav breakpoint and the Vision link target across pages, added the missing footer to the Account and Projects pages, promoted the Projects hero to an h1, and demoted the pricing tier card titles to h3
- Bumped the site stylesheet cache-busting version across all pages and rebuilt the production output

Why it matters:
- These changes directly improve how the site is discovered and represented in search results and link previews, while also making navigation and key UI elements clearer for screen reader and keyboard users

Next:
- Continue working through remaining audit findings

Tags:
- seo
- accessibility
- ui
- bugfix

## 2026-06-15 11:34 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Extracted the duplicated Supabase project config out of six auth-related scripts into one shared config file, loaded before each page's own script
- Removed redundant `!important` overrides on the nav avatar hide/show styles after confirming plain specificity already resolves the rule conflict
- Added cache-busting version query strings to several previously unversioned stylesheet and script references across all pages
- Reviewed two older Supabase setup SQL files against the numbered migrations; kept them as-is since they're either still the referenced current schema or not yet covered by a migration
- Updated placeholder footer links on the homepage with a clear "coming soon" treatment, and pointed the community feed's "View on Discord" links at the live Discord invite
- Added proper ARIA popup/expanded states to the terminal, status, and account menu buttons, with matching JS updates so they toggle correctly when each panel opens and closes
- Rebuilt the production output and verified the build completes cleanly

Why it matters:
- Cleans up duplicated config and styling so future auth or theming changes are easier and less error-prone, while improving cache control and screen-reader support for interactive nav elements

Next:
- Continue working through remaining audit findings

Tags:
- bugfix
- accessibility
- refactor
- cleanup

## 2026-06-15 12:30 — ProjectCreation

Status: Done
Visibility: public-auto
Public channel: creation-feed

Changed:
- Shipped a full audit pass to the live site: SEO meta tags, Open Graph data, favicon, and structured data; accessibility improvements (skip links, ARIA roles, contrast fixes); performance fixes (gated animations, optimized images); and cross-page consistency fixes (footers, nav, headings)
- Pushed to GitHub main and deployed to production via wrangler

Why it matters:
- The site is now properly discoverable and indexable by search engines, more accessible, and more consistent across pages — a meaningful step toward ranking well for brand searches

Next:
- Monitor search indexing and consider adding a sitemap.xml/robots.txt if not already present

Tags:
- seo
- deploy
- milestone

## 2026-06-15 14:00 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added robots.txt and sitemap.xml (wired into the build so they ship to the live site)
- Added canonical link tags to all public pages
- Added Open Graph and Twitter share images (with dimensions and alt text) plus theme-color branding across every page
- Extended structured data (schema.org JSON-LD) from the homepage to the Projects, Pricing, and Community pages

Why it matters:
- Closes the remaining gaps from the earlier SEO audit — search engines now have a sitemap/robots file to crawl, every page has a canonical URL, and social shares get a proper preview image instead of a blank card

Next:
- Consider commissioning dedicated 1200x630 share images per page instead of reusing one screenshot

Tags:
- seo
- marketing

## 2026-06-15 14:30 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Homepage hero now states what ProjectCreation actually is (a suite of builder tools) in a line under the tagline
- Replaced two dead, non-functional buttons ("Initialize Flow" / "Read Docs") in the homepage vision section with working Create Account and Explore Tools links
- Fixed dead "Download" buttons on the ProjectCipher and ProjectWord product sections (previously linked nowhere) to point to signup
- Added Projects and Community links to the homepage footer so the community/Discord is reachable from every page
- Added an FAQ section to the pricing page covering trial terms, tier switching, monthly vs yearly billing, and tool access per tier

Why it matters:
- Closes several broken or dead-end paths in the conversion flow and gives first-time visitors and pricing-page skeptics the answers and next step they need before signing up

Next:
- Consider real trust signals (user counts, testimonials) once available — flagged but not fabricated

Tags:
- marketing
- conversion
- copy

## 2026-06-15 19:10 — ProjectCreation

Status: In progress
Visibility: public-auto
Public channel: build-log

Changed:
- Added preconnect hints for Google Fonts on every page (faster font loading)
- Added a custom branded 404 page
- Extended structured data so the Projects and Pricing pages describe each tool and plan more fully for search engines
- Added width/height to a remaining product illustration to prevent layout shift
- Tightened a few page titles and descriptions on account-related pages for clarity and search quality

Why it matters:
Small technical SEO and performance touches that help pages load faster, look better in search results, and give visitors a proper landing page instead of a generic error if they hit a broken link.

Next:
- Consider an apple touch icon / web app manifest once a suitable icon asset exists

Tags:
- seo
- performance
- technical
