# Project status — Seal Team Six website

**Audit date: 2026-08-15.** Every line below was verified against the live
site or the repository on that date, not carried over from earlier notes.
This file supersedes `SEAL_TEAM_6_HANDOFF.md` (last updated 2026-08-12) as the
current-state record.

---

## 1. Deployment — all green

| | |
|---|---|
| Live URL | https://sealteamsix716.com |
| Repo | `sealteamsix716/sealteamsix716.github.io`, branch `main`, root |
| Head commit | `1deac55` |
| Working tree | clean; local and `origin/main` in sync |
| Pages build | `built` |

**HTTPS works.** Let's Encrypt certificate, valid 13 Aug → 11 Nov 2026,
covering the apex and `www`. Serving over HTTP/2. `https://www.` redirects to
the apex over HTTPS. No mixed content anywhere on the page.

**One gap remains:** GitHub's `https_enforced` is still `false`. The
certificate is fine; nothing is *forcing* visitors onto it. Consequences:

- `http://sealteamsix716.com` returns 200 over plain HTTP — no redirect.
- `https://sealteamsix716.github.io` redirects to **`http://`**, downgrading
  anyone following an old link.

Fix is one checkbox: repo Settings → Pages → Enforce HTTPS. Not a code change.

## 2. Live health — clean

Verified at 1440px and 390px, after scrolling the full page:

- 0 JavaScript errors, 0 console errors, 0 failed requests, 0 mixed content
- 0 horizontal overflow, exactly one `<h1>`, no duplicate element IDs
- 31 images, **0 missing alt text**, 0 broken images
- 0 unlabelled form fields across both estimate forms
- Nav sits on one row at every width from 360 to 2560px

**Core Web Vitals (median of 3 runs, live):**

| | LCP | CLS |
|---|---|---|
| Desktop | 332 ms | 0.051 |
| Mobile | 284 ms | 0.069 |

Both comfortably inside Google's thresholds (LCP < 2500 ms, CLS < 0.10).

**Page weight:** 750 KB mobile / 4.2 MB desktop *fully scrolled with every
gallery image loaded*. Initial load is 656 KB mobile / 2.5 MB desktop. The
desktop figure is dominated by Three.js at 1.24 MB for the hero effect — it is
correctly skipped on mobile.

## 3. What is built and working

- **Brand:** legacy shield in nav (crest lockup) and footer (full mark plus
  the historic script wordmark). Favicons regenerated from the shield.
- **Flyer identity:** four-badge trust row with the crew's own wording, torn
  yellow "Free Estimates · Competitive Rates · Fully Insured" strip,
  brush-stroke headings, check-in-box service bullets.
- **Our Work:** 3 before/after pairs, each registered onto a common viewpoint
  by `scripts/align_before_after.py`; 12 curated gallery photographs.
- **Service-area map:** generated from real coordinates by
  `scripts/make_wny_map.py` — 20 towns, true 10/20/30-mile rings, Lake Erie,
  the Niagara River, Grand Island. Hovering a town pill lights its map dot.
- **Forms:** both submit to Formspree `mgoqkqqd`, with shared accessible
  validation in `js/form-validate.js`. Delivery to
  `Seal.Team.Six.Snow@gmail.com` was confirmed by a live test on 2026-08-13.
- **Sarge chatbot:** 161 runtime entries, answers without quoting prices,
  labelled AUTOMATED with the crew's real 24-hour reply time.
- **SEO:** canonical, Open Graph, Twitter, LocalBusiness + 6 Service JSON-LD,
  sitemap and robots all pointing at `https://sealteamsix716.com`.
- **PWA install prompt disabled** (`display: browser`) — it offered an
  "app" that was only the website in a frame.

## 4. Open items, highest risk first

### 4.1 Fabricated testimonials — the one real liability

Six `.testimonial-card` entries are live. They are not obviously
placeholder to a visitor: each carries a five-star rating, a specific name
("Mike R."), a town and category ("Clarence · Residential"), and a source
badge reading **"Facebook"**. There is an HTML comment marking them as
samples, but no visitor sees HTML comments.

Presenting invented reviews as real customer feedback, attributed to a named
platform, is a genuine advertising-standards problem, not just a content
to-do. **Recommend: replace with real quotes, or remove the section, before
any advertising push.** Even two or three genuine reviews would do.

### 4.2 Enforce HTTPS

See §1. One checkbox. Owner action.

### 4.3 Unverified business claims still on the page

Live and unconfirmed: "Fully Insured" (Dan approved 2026-08-13), "Since
2022", "24h est. response", "100% owner on-site", "2-coat application",
"Cures in 24 hrs". These are ordinary contractor claims but each is a promise
to a customer. Worth a once-over with Justin.

### 4.4 Documentation drift

- `CLAUDE.md` still describes the Formspree ID as an unfilled placeholder
  (`FORMSPREE_FORM_ID`); it has been live as `mgoqkqqd` since 2026-08-13.
- `sarge-knowledge-base.md` holds 19 questions; the runtime
  `js/knowledge-base.js` holds 161. The Markdown is a stale draft and should
  be regenerated from the JS or marked superseded.
- `BUILD_BRIEF.md`, `CLAUDE_DESIGN_PROMPT.md`, `CLAUDE_CODE_BUILD_PROMPT.md`
  are historical build artefacts, not current instructions.

## 5. Deliberately outside the repo

Kept untracked on purpose — reviewed but not published:

| Folder | Size | Note |
|---|---|---|
| `audit/` | 136 MB | Recovered Wix asset audit + originals |
| `Recovered_Wix_Assets_2026-08-12/` | 126 MB | Untouched recovery package |
| `incoming-assets/` | 33 MB | Justin's texted job photos |
| `SEAL_TEAM_6_HANDOFF.md` | — | Superseded by this file |

Only approved derivatives were copied into `images/`. The ADA striping photo
is cropped to the stall layout because the wide frame shows a named tenant's
storefront, and permission to feature a client by name is the owner's call.

## 6. Contact facts as published

- Main line **716-907-8259** — 7 links (nav, hero, contact, footer, form
  fallbacks)
- Office **716-907-8258** — 1 link, footer foot, last-resort wording
- Email **Seal.Team.Six.Snow@gmail.com**
- The retired **716-697-SEAL** from the older flyer does not appear anywhere.
