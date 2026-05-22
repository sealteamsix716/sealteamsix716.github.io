# BUILD BRIEF — Seal Team Six Website

> This is the detailed creative + technical spec. Read `CLAUDE.md` first for project context and guardrails, then this file, then look at every image in `/images/`. After that, present your plan and questions and WAIT for Dan's "go" before building.
>
> **Approved design lives in `/design/`** (the Claude Design comp) — treat it as the visual source of truth and mirror `design/tokens.jsx` + `design/styles.css`. **Mascot is finalized:** four approved poses in `/images/` (`Mascot_V1`–`V4.png`); see CLAUDE.md for the pose→section mapping. Do NOT draw an SVG seal.

---

## 0. Your role

You are a **top-0.01% web designer and front-end engineer** — the kind who wins awards (Awwwards SOTD, FWA). You build cinematic, distinctive, performance-obsessed sites. You do NOT ship generic contractor-template work: no stock hero with a centered headline over a faded photo, no Bootstrap card soup. Every section should feel intentional and premium. Use the `frontend-design` skill (and `theme-factory` if helpful) as your foundation.

The mission: a sealcoating company's website that makes a Buffalo driveway contractor look like a national premium brand — rugged, tactical, and unmistakably high-end.

---

## 1. The "blow them away" bar (acceptance criteria)

The build is successful only if:
1. The hero is genuinely cinematic with a real **3D element** (Three.js) — not a static image.
2. The **tactical-premium** aesthetic is consistent and confident (asphalt black + safety yellow, industrial type, road-line motifs).
3. **Before/after** work is shown with an interactive draggable slider.
4. **Sarge the Seal** chatbot works end-to-end: scripted flow → collects lead → submits to Formspree → confirmation.
5. Real photos are used well (compressed, lazy-loaded, lightbox gallery).
6. Fully responsive (mobile-first), **Lighthouse 90+**, WCAG AA, SEO + LocalBusiness schema in place.
7. It deploys cleanly to `https://sealteamsix716.github.io` and looks flawless on a phone.

---

## 2. Art direction

- **Palette:** asphalt black `#0B0B0D`/`#141417` base; **safety yellow `#FFD200`** primary accent; concrete grays `#6B7076`/`#9AA0A6`; road-line white `#F4F4F5`; optional hi-vis green glow `#C8FF00` (sparingly, for "freshly sealed" highlights).
- **Type:** bold condensed/industrial display (Anton / Archivo Black / Oswald); a stencil face (e.g. Black Ops One or Stardos Stencil) for small accents ONLY; clean grotesk body (Inter / Sora / Manrope). Big, confident type scale.
- **Texture & detail:** subtle asphalt grain, painted road-line dashes and stencil arrows as section dividers, hazard-stripe accents, faint HUD/targeting reticles and grid lines for the tactical feel. Keep it tasteful — texture supports, never clutters.
- **Motion:** scroll-driven reveals, parallax depth, magnetic/tilt hover on cards, a sealcoat "wet gloss" sheen effect. Everything respects `prefers-reduced-motion`.
- **Copy voice:** confident, rugged, local pride, light tactical flavor. Examples: "Buffalo's driveways, locked down." / "Mission-grade sealcoating." / "Sharp lines. Zero excuses." / "Deploying crews across WNY." Don't overdo the puns.

---

## 3. Page structure (single-page scroll; build sub-pages only if it strengthens SEO)

1. **Sticky nav** — logo left; links (Services, Our Work, Why Us, Service Area, Contact); a phone CTA ("716-907-8259") and a primary "Free Estimate" button that opens the Sarge chatbot. Condenses on scroll; full-screen mobile menu.
2. **Hero (3D)** — full viewport. Headline e.g. **"BUFFALO'S DRIVEWAYS, LOCKED DOWN."** Subhead: "Sealcoating · Crack Filling · Line Striping — residential & commercial, done mission-tight." Two CTAs: "Get a Free Estimate" (opens Sarge) + "See Our Work" (scrolls to gallery). See §4 for the 3D spec.
3. **Trust bar** — quick credibility strip: "Locally owned · Since 2022 · Free Estimates · Residential + Commercial · ADA Striping." Subtle count-up animation.
4. **Services** — grid of cards with custom icons: Sealcoating, Crack Filling, Line Striping (incl. ADA), Hot Asphalt / Patching, Concrete (via partner), Winter: Snow Plowing & Salting. 3D tilt on hover, one-line benefit each.
5. **Before / After** — interactive draggable comparison slider(s) using the matched pairs in §6. This is a centerpiece — make it beautiful and obvious.
6. **Gallery** — masonry/grid of the finished "money shots" with a lightbox. Lazy-load. Group by Residential / Luxury / Commercial / Schools if it reads well.
7. **Why Seal Team Six** — differentiators: premium materials, razor-sharp lines, on-time crews, locally owned WNY, free estimates, residential → commercial → schools. Iconography + tactical framing.
8. **Service area** — Buffalo + WNY suburbs (e.g. Clarence). Stylized WNY map or graphic, list of towns for SEO.
9. **Testimonials** — scaffold the section with clearly-labeled placeholder quotes (no real reviews yet); make it trivial for Dan to swap in real ones. Do not fabricate named reviews.
10. **CTA band** — "Ready to lock down your driveway? Free estimate, no obligation." → opens Sarge / scrolls to contact.
11. **Contact** — real phone (`tel:716-907-8259` + click-to-text), email (`Seal.Team.Six.Snow@gmail.com`), Formspree contact form, hours, service area, Facebook link.
12. **Footer** — logo, nav, contact, social (facebook.com/SealTeamSix.716), copyright.

---

## 4. The 3D hero (Three.js)

Design a cinematic 3D scene that says "freshly sealed asphalt." Concept options (pick the strongest, or combine):
- A dark **asphalt road/driveway plane receding to a horizon**, with a glossy sealcoat "wet" reflection sweeping across it, animated painted yellow center-line dashes, and a faint HUD grid overhead. Subtle camera parallax tied to mouse/scroll.
- Floating low-poly **safety cones** and a sealcoat wand, with volumetric light and dust particles.
- A rotating, beveled 3D **Seal Team Six badge** rendered from the logo, with metallic/matte materials under a spotlight.

Requirements: 60fps on a mid laptop, lightweight geometry, lazy-init (don't block first paint), pause when offscreen, full **reduced-motion** and mobile fallback (swap to a static cinematic image — e.g. `parking-lot-line-striping-night.jpg` — if WebGL is unavailable or motion is reduced).

---

## 5. "Ask Sarge" chatbot (scripted, static-friendly)

**Launcher:** floating button bottom-right, safety-yellow, Sarge's face, gentle pulse, label "Ask Sarge · Free Estimate." Opens a chat panel with Sarge's avatar and a tactical-but-friendly tone.

**Persona:** Sarge the Seal — a no-nonsense-but-warm squad leader. Brief, encouraging, a little tactical flavor. Example greeting: "Sarge here, Seal Team Six. I'll get your free estimate locked in — takes about 30 seconds. What can we seal up for you?"

**Flow (deterministic branching; buttons where possible, text where needed):**
1. Service → [Sealcoating] [Crack Filling] [Line Striping] [Multiple / Not sure]
2. Property type → [Residential] [Commercial] [HOA / School] [Other]
3. Approx size → [Small (1–2 cars)] [Medium (3–4)] [Large] [Big commercial lot] [Not sure] (adapt wording to property type)
4. Location → ZIP code or town (text)
5. Timeline → [ASAP] [This month] [This season] [Just getting pricing]
6. Name (text) → 7. Phone (text, validated) → 8. Email (text, validated)
9. Preferred contact → [Call] [Text] [Email]
10. Anything else? (optional text)
11. **Recap** the answers → "Send to the crew" button → submit to **Formspree** → success message: "Locked in! The Seal Team Six crew will reach out within 24 hours. Mission accepted." (Sarge salute.) Handle the error case gracefully with the phone/email as fallback.

**Technical:** vanilla JS, no external AI/API. Submit via `fetch` POST to `https://formspree.io/f/FORMSPREE_FORM_ID` (placeholder constant Dan will fill). Persist progress in `localStorage` so a returning visitor isn't restarted. Fully keyboard-accessible, ARIA live region for messages, focus management, mobile-friendly (panel goes near-full-screen on small viewports).

**Sarge artwork (FINALIZED):** use the real mascot PNGs in `/images/` — `Mascot_V3.png` for the chat launcher, `Mascot_V1.png` (already transparent) for CTAs, `Mascot_V2.png` for the hero, `Mascot_V4.png` for the footer/confirmation. Chroma-key the solid green out of V2/V3/V4 first. Do NOT create an SVG seal.

---

## 6. Image inventory (in `/images/`)

**Logo:** `seal-team-six-logo.jpg` (black/gray badge, safety-yellow accents, two crew silhouettes — derive favicon + nav logo from this).

**Before / after pairs:**
- `auto-shop-parking-lot-before.jpg` ↔ `auto-shop-parking-lot-after.jpg` (commercial lot: cracked/faded → fresh black)
- `country-driveway-sealcoating-before.jpg` ↔ `country-driveway-sealcoating-after.jpg` (long rural tree-lined driveway)
- `residential-garage-driveway-before.jpg` ↔ `residential-garage-driveway-after.jpg` (yellow house, detached garage)
- `parking-lot-striping-before.jpg` ↔ `parking-lot-striping-after.jpg` (ADA lot — pairing is tentative; verify before pairing publicly)

**Finished "money shots" (standalone):**
- `residential-driveway-sealcoating-1.jpg` (modern gray house, glossy driveway, orange chalk line)
- `residential-driveway-sealcoating-2.jpg` (tan ranch, long fresh driveway)
- `luxury-home-driveway-sealcoating-1.jpg` (brick estate, long drive)
- `luxury-home-driveway-sealcoating-2.jpg` (brick estate, basketball hoop)
- `luxury-home-driveway-sealcoating-3.jpg` (curved estate driveway, manicured landscaping)
- `commercial-storefront-sealcoating.jpg` (blue smoke-shop storefront, cones, fresh asphalt)
- `commercial-parking-lot-striping-1.jpg` (convenience-store lot, crisp yellow lines + arrows)
- `commercial-parking-lot-striping-2.jpg` (mural wall, bold yellow directional arrow)
- `commercial-parking-lot-striping-3.jpg` (wide convenience-store lot, yellow striping)
- `residential-parking-lot-sealcoating.jpg` (residential parking pad, yellow stalls, trees)
- `school-parking-lot-ada-striping.jpg` (school, blue/red wall, blue+yellow ADA striping)
- `school-driveway-sealcoating.jpg` (charter school, long fresh lot)
- `parking-lot-line-striping-night.jpg` (night shot, razor-sharp white/yellow lines — excellent dramatic hero / section backdrop)

All photos: write descriptive `alt` text, compress + generate WebP, set explicit width/height to avoid layout shift, lazy-load below the fold.

---

## 7. SEO & technical

- Title + meta description tuned for "driveway sealcoating Buffalo NY" and related local terms.
- Open Graph + Twitter card (use a strong finished-driveway photo).
- JSON-LD: `LocalBusiness` (name, areaServed = Buffalo/WNY, telephone, email, sameAs Facebook) + `Service` entries for each service.
- `sitemap.xml`, `robots.txt`, favicon set, web manifest.
- Semantic landmarks, one `<h1>`, logical heading order.
- `.gitignore` for `.DS_Store`, `node_modules/`, OS/editor cruft.

---

## 8. Deploy (do this after Dan approves the build)

1. Reconcile the existing remote README **before** adding files: `git fetch origin` then `git checkout -B main origin/main`.
2. Build the site with `index.html` at the repo root and assets under `/images`, `/css`, `/js`, `/assets`.
3. Replace the placeholder `README.md` with a short real project README.
4. `git add .` → `git commit -m "Build Seal Team Six website"` → `git push -u origin main`.
5. GitHub Pages auto-publishes a `*.github.io` user repo from `main` root — live at **https://sealteamsix716.github.io** within ~1 minute. Confirm, then tell Dan to hard-refresh.

Give Dan each git command one at a time and wait for confirmation, per his working style.
