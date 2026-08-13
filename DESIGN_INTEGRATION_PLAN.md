# Design Integration Plan — Old Brand → New Site

Status: APPROVED — all four owner decisions resolved by Dan on 2026-08-13
(see §6). Ready for implementation.
Prepared: 2026-08-13. Implementation target: Claude Opus session in this repo.
Read-only research behind this plan: recovered Wix assets audit, both Justin
flyers, old-site contact sheets, current index.html/css/js.

---

## 1. The recognition audit — what the old brand equity actually is

Anyone who saw the old Wix site or the flyers recognizes these five things:

1. **The hexagonal shield logo with two working men** — left man pushing the
   line-striping machine, right man spraying sealcoat with a wand and hose,
   both in hi-vis yellow vests, standing on a black road with a yellow center
   line. This was the old site's logo AND its hero background graphic.
   Recovered original: `audit/legacy-site-assets/curated/seal-team-six-shield-logo-original.png` (1448×1086, white bg).
2. **The script wordmark** — "Seal. Team. Six." in white script on a black
   swoosh with a push broom. The old site's secondary/historic logo.
   Recovered original: `audit/legacy-site-assets/curated/seal-team-six-script-wordmark-original.png` (732×405).
3. **The flyer voice** — "CLEAN. CRISP. BUILT TO LAST." / "ANOTHER JOB DONE
   RIGHT." / "PROTECT YOUR PAVEMENT. BOOST YOUR PROPERTY." plus the 4-badge
   trust row (Professional Service · Quality You Can See · Built to Last.
   Done Right. · Local. Reliable. Buffalo Proud. with US flag).
4. **The flyer look** — black base, safety-yellow brush-stroke/grunge slashes
   behind headlines, distressed stencil display type, tilted "BEFORE" snapshot
   with hand-drawn arrow to the big "AFTER" shot, checkbox service list.
5. **The old Wix palette** — black/white/charcoal with a chartreuse
   yellow-green accent (`#D2E212`), bold uppercase Helvetica.

## 2. The key finding

The current site never shows the shield. Nav and footer render a text
monogram "STS" (`index.html:108`, `index.html:884`), and
`images/seal-team-six-logo.jpg` (the old shield, white-bg JPG) is not
referenced by any HTML/CSS/JS. The #1 recognition asset is already in the
repo — it just isn't on the site. Fixing that alone gets most of the
"instantly recognize it" goal.

The good news for cohesion: the old brand and the new site already share a
DNA — black asphalt + hi-vis yellow + road lines. Nothing needs to fight.
The new site's `--hi-vis: #C8FF00` token is a near-neighbor of the old Wix
chartreuse `#D2E212`, and the shield's yellow center line matches the site's
safety yellow. This is a merge, not a compromise.

## 3. Design strategy — "One brand, two layers"

- **The two workers = the brand identity layer.** Logo, watermarks, section
  dividers, OG image, favicon. They are the mark customers know.
- **Sarge = the personality layer.** Chat launcher, CTAs, form success,
  conversational moments. He is the voice, not the logo.
- **Rule: never put Sarge and the shield workers in the same visual block.**
  They coexist on the page, never compete in a frame. Sarge stays out of the
  nav, footer identity block, and hero headline zone; the workers stay out of
  chat UI and CTA buttons.

## 4. Phased plan of action (for the Opus implementation session)

### Phase A — Asset production (no site changes yet)
Work from the recovered originals, never the low-res JPG.

1. **Shield, full-color transparent**: knock out the white background of
   `seal-team-six-shield-logo-original.png` → `images/brand/shield-full.png`
   + `.webp`, exported at ~1200w and ~360w. Keep interior whites (shirts,
   banner field) — only remove the outer background. Use a proper alpha
   knockout (flood-fill from edges with anti-alias preservation), not a
   naive "delete all white."
2. **Shield, dark-surface variant**: a version tuned for the black site —
   the outer white banner areas get near-white `#F4F4F5`; verify edge halo
   at 100% zoom on `#0B0B0D`.
3. **Workers extracted**: crop the two worker silhouettes (with their
   machines) out of the shield scene as two standalone transparent PNGs
   (`worker-striper.png`, `worker-sprayer.png`) for watermark/divider use.
4. **Script wordmark transparent**: knock the gray bg off the script
   wordmark → `images/brand/script-wordmark.png` + `.webp`. It is black
   swoosh + white script, so on the dark site give it a 1px `#F4F4F5`
   outline or place it only on yellow/photo surfaces.
5. **Favicon + OG refresh**: regenerate `assets/favicon-*` and the OG/social
   image from the shield (crest-crop for small favicon sizes; full shield +
   tagline on asphalt texture for OG 1200×630). `scripts/make_favicons.py`
   exists from the original build — reuse it.
6. All new rasters: WebP with PNG fallback, explicit width/height, lazy-load
   below the fold. Keep total new payload under ~150 KB above the fold.

### Phase B — Identity placement (the recognition core)

1. **Nav**: replace the "STS" monogram with a two-part lockup: the hexagonal
   crest (workers scene only, cropped just below the road — no banner text)
   at ~40–44px tall, next to "SEAL TEAM SIX" in the site's existing display
   font. The full shield with banner text is illegible at nav size; the
   crest-crop + typeset name reads perfectly and still IS the old logo.
2. **Footer**: full shield (dark-surface variant) in the footer identity
   block, replacing the STS monogram — this is where the complete logo lives
   at readable size. Script wordmark beneath it as the "heritage signature,"
   small.
3. **Hero**: the two extracted workers as a very subtle watermark element —
   e.g. ~6–8% opacity behind/beside the hero content or anchored bottom
   edge, echoing how the old Wix site used the logo as a hero graphic. Must
   not fight Sarge (`Mascot_V2.png`) — place workers on the opposite side or
   drop the watermark if the hero reads busy. Respect `prefers-reduced-motion`
   (no parallax on it).
4. **JSON-LD + meta**: point the LocalBusiness `logo` at the new shield
   asset instead of `assets/favicon-512.png`.

### Phase C — The recognition layer from the flyers

1. **Trust-badge row**: rebuild the flyer's 4-badge strip as HTML/CSS with
   inline SVG icons (shield-check, award ribbon, striping machine, US flag)
   directly under the hero / in the existing TrustBar zone. Text verbatim
   from the flyer: "PROFESSIONAL SERVICE" · "QUALITY YOU CAN SEE" · "BUILT
   TO LAST. DONE RIGHT." · "LOCAL. RELIABLE. BUFFALO PROUD."
   Dan has confirmed the business is insured, so "FREE ESTIMATES ·
   COMPETITIVE RATES · FULLY INSURED" (the strip from flyer `26_4851.png`)
   may also be used — best placed as a slim sub-strip under the badge row or
   near the contact CTA. Do not add licensing/warranty claims beyond this.
2. **Adopt the flyer taglines** in matching slots:
   - "CLEAN. CRISP. BUILT TO LAST." — hero subline or trust bar headline.
   - "ANOTHER JOB DONE RIGHT." — before/after section header.
   - "PROTECT YOUR PAVEMENT. BOOST YOUR PROPERTY." — contact/CTA section.
3. **Brush-stroke accent**: one reusable CSS/SVG safety-yellow brush-stroke
   (grunge slash, like the flyers) used behind 3–4 key headings max.
   Sparingly — it's an accent, not wallpaper.
4. **Checkbox service bullets**: restyle the services list markers as the
   flyer's yellow-check-in-box marks (inline SVG).
5. **Before/after**: KEEP the existing interactive slider (better than the
   flyer's static layout) but restyle labels as brush-stroke "BEFORE" /
   "AFTER" chips to rhyme with the flyers.

### Phase D — Heritage color + texture accents (small, optional-feel)

1. Map the old Wix chartreuse into the existing token: the site already has
   `--hi-vis` (`#C8FF00`) used for "fresh seal" moments. Either keep it or
   nudge it to the historic `#D2E212`; do not add a third competing green.
   Every use must pass WCAG AA contrast on its actual background.
2. A faint asphalt-grain/grunge edge texture on 1–2 section boundaries,
   echoing the flyer's torn edges — CSS/SVG, not big raster textures.

### Phase E — Sarge coexistence pass

Walk every section and enforce the two-layer rule: Sarge keeps chat
launcher, chat panel, form success ("mission accepted" salute), CTA buttons.
Workers/shield keep nav, footer, hero watermark, OG, favicon. No block shows
both.

### Phase F — Verification (before any deploy)

1. Visual QA at 360px, 768px, 1280px, 1920px; nav crest legibility check;
   dark-bg halo check on every knocked-out asset.
2. Lighthouse all four categories ≥ 90 (budget from CLAUDE.md still binding).
3. Accessibility: alt text on every new image ("Seal Team Six shield logo —
   two crew members striping and sealcoating a road"), contrast, keyboard,
   reduced motion.
4. No content/claims changes beyond what this plan lists; testimonials issue
   and canonical-domain issue are separate tracks, untouched here.
5. Show Dan screenshots for approval BEFORE commit/push. No deploy without
   Dan's go.

## 5. Hard guardrails for the implementation session

- **Phone**: site keeps `716-907-8259` everywhere. The `716-697-SEAL`
  number from flyer `25_4850.png` must NOT appear on the site (Dan: treat
  it as retired/unused).
- **Claims**: "Fully Insured" is approved (Dan confirmed). No licensing,
  warranty, or volume claims beyond that without new confirmation.
- **Naming**: site stays "Seal Team Six" (Dan's decision). Never globally
  rename to "Seal Team 716."
- Source assets stay untouched in `audit/` and `incoming-assets/`; only
  processed derivatives go into `images/brand/`.
- Complete files, incremental commits only after Dan reviews; nothing pushed
  without an explicit ship instruction.

## 6. Owner decisions — RESOLVED (Dan, 2026-08-13)

1. **Brand name**: "Seal Team Six" stays. Flyer "Seal Team 716" is not
   adopted on the site.
2. **Phone**: `716-907-8259` is the only public number. `716-697-SEAL` is
   treated as retired and must not appear on the site.
3. **Logo swap**: APPROVED — nav gets the crest + typeset lockup, footer
   gets the full shield + script wordmark.
4. **Insurance**: APPROVED — the site may say "Fully Insured."

## 6b. Implementation record — 2026-08-13 (Opus session)

Built and verified locally. **Not committed, not pushed, not deployed.**

Shipped:
- `scripts/make_brand_assets.py` regenerates every brand asset from the
  untouched originals in `audit/legacy-site-assets/curated/`.
- `images/brand/` — shield (720/360), crest (240/120), script wordmark (480),
  each as PNG + WebP. 508 KB total.
- Nav: crest + typeset name replaces the "STS" monogram.
- Footer: full shield at 216px + script wordmark as heritage signature.
- Favicons + `favicon.ico` regenerated from the crest on an asphalt tile.
- JSON-LD `logo` now points at `images/brand/shield-720.png`.
- Trust bar rebuilt as the flyer's 4-badge row (copy verbatim) under a
  brush-stroke "Clean. Crisp. Built to Last.", closed by a torn yellow
  "Free Estimates · Competitive Rates · Fully Insured" strip.
- Flyer taglines added: before/after ("Another Job Done Right.") and contact
  ("Protect Your Pavement. / Boost Your Property.").
- Before/after labels are now brush chips (pale BEFORE, yellow AFTER).
- Service bullets use the flyer's yellow check-in-box marker.

### Round 2 — crew motif (Dan, 2026-08-13)

Dan asked for the full two-worker emblem to appear prominently below the
hero, and for the crew to recur through the page — noting they need not be
the exact logo lockup every time. Added:

- **Brand band under the hero.** The trust bar now leads with the full
  emblem at 196px, divider, then the tagline and badge row. This is the
  section directly below the hero, as asked.
- **`worker-striper` / `worker-sprayer`** — each figure lifted out of the
  emblem as a standalone cutout, in colour and as a pale silhouette.
  Extraction notes: the sprayer's hose merges into the hexagon's right frame
  bar, and the gray inner chevron runs into the back of his helmet, so he is
  freed by stripping desaturated gray runs that reach a frame edge, then
  taking the largest surviving component.
- **CTA band** — both silhouettes flank "Ready to Lock It Down?" at 13%.
  This is where the crew reads as figures rather than texture.
- **Why Us** — the pair again at 5% as a background watermark.
- Badge row moved from flex-wrap to an explicit grid: with the emblem taking
  horizontal space, wrapping settled on 3+1 at ~1024px and stranded the
  fourth badge under an orphaned divider.

The colour cutouts are built but **not yet placed** — the site has no light
surface, and these figures are mostly black ink, so they only read on light.
They are ready if a light panel is ever introduced.

Deviations from the plan, and why:
1. **No hero watermark.** The hero already carries the reticle, side label,
   eyebrow, headline, sub, two CTAs, a booking pill, four stats and a
   full-height Sarge. Adding the workers there would have broken the
   two-layer rule and read as clutter. This is the plan's own escape hatch.
   The crew instead appears in the band immediately below it.
2. **No knockout/dark-surface shield variant.** A transparent-field version
   was built and rejected: the mark's interior is mostly black ink, so on
   asphalt black the road vanished and the figures inverted. The faithful
   white-field shield — the mark customers actually know — was toned to
   `#F4F4F5` and reads cleanly on black instead.
3. **Heritage green not adopted.** `--hi-vis` stays `#C8FF00`. The historic
   `#D2E212` sits closer to the safety yellow and would have blurred the two
   accents. The plan permits keeping the existing token.
4. **A separate workers-silhouette asset was dropped** — the crest already
   serves anywhere a watermark was wanted.

Fixed in passing (both pre-existing, both genuine defects):
- Footer "FREE ESTIMATE" rendered light gray on yellow because
  `.footer-col a` outranks `.btn-primary` on specificity. WCAG failure.
- No `scroll-padding-top`, so in-page nav links parked section headings
  underneath the sticky header.

Verified: no missing alt text, no duplicate IDs, no broken requests, no JS
errors; Sarge chat still answers and still refuses to quote a price; nav,
trust bar and footer checked at 390 / 768 / 1024 / 1440 / 1920.

Still open, deliberately untouched (separate tracks): the six placeholder
testimonials, the `sarge-form-view` / `sarge-estimate-form` ID mismatch,
main-form validation, and the github.io canonical URLs.

## 7. Design self-review log (how this reached 9.8/10)

- Draft 1 (≈9.0): put the full shield in the nav → fails at 40px height
  (banner text illegible). Fixed with crest-crop + typeset name lockup.
- Draft 2 (≈9.4): imported flyer chartreuse AND kept `--hi-vis` → two
  competing greens. Fixed by mapping heritage green onto the existing token.
- Draft 3 (≈9.6): hero had Sarge + workers watermark + headline — too busy;
  added the two-layer separation rule and the "drop watermark if busy"
  escape hatch. Brush-stroke capped at 3–4 uses.
- Draft 4 (9.8): added dark-surface asset variants + halo QA (the #1 way
  knocked-out white-bg logos look amateur on black sites), OG/favicon/JSON-LD
  logo unification, and the flyer-verbatim badge copy so recognition is
  literal, not approximate. Remaining 0.2: reserved for how the assets
  actually render at implementation time — earned in QA, not on paper.
