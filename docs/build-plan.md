# Operation Faded — Technical Build Plan (V1 Prototype)

Prepared by Fruitbowl. This is a technical planning document, not build output — no scaffolding,
packages, branches, or production code have been created yet. It translates the approved
`docs/discovery.md`, `docs/brief.md`, and `docs/visual-direction.md` (Direction C — "Faces Behind
the Fades") into a concrete implementation plan for the speculative V1 homepage prototype. It is
written to be self-contained: a fresh Claude Code session should be able to implement the
prototype from this document alone, without needing the conversation history that produced it.

## 1. Repository / Current-State Assessment

Inspected directly before any recommendation was made (read-only):

- **Branch**: `main`, in sync with `origin/main`. One commit on record:
  `e6d8625 chore: initialize Operation Faded project`.
- **No app scaffolding exists at all.** There is no `package.json`, no framework, no build
  tooling of any kind. The repository currently contains only:
  - `README.md` — states the project is "at the very start of its process" and that no technology
    stack has been chosen yet.
  - `.gitignore` — pre-emptively lists `node_modules/`, `.next/`, `dist/`, `build/`, `out/`. This
    anticipates a JS/Next-style stack but does not commit to one.
  - `docs/` — `discovery.md`, `brief.md`, `visual-direction.md`, and `docs/research/instagram/`
    (8 PNG screenshots).
- **`docs/` is entirely untracked.** `git status` reports `?? docs/` for the whole directory —
  discovery.md, brief.md, and visual-direction.md (including the Section 16 revision from the
  most recent planning pass) have never been committed to `main`. This is a repository-hygiene
  gap that predates the technical planning phase, not a conflict with any approved decision. See
  §12 (Git/Branch Strategy) for how an implementation session must handle this — **it requires the
  user's explicit approval before anything is committed to `main`.**
- **Asset check.** Three of the eight screenshots under `docs/research/instagram/` were opened
  directly during this planning pass. They are full desktop-browser screenshots of the Instagram
  profile and individual posts — UI chrome (the app's nav rail, comment threads, like counts)
  surrounds the actual post image in most of them. The post imagery itself is reasonable quality
  but screenshot-compressed, not a source file. This confirms visual-direction §9's framing
  ("screenshot-derived, not official source") is accurate, and means **every homepage image slot
  needs an explicit crop/extract step during implementation** — none of the 8 files can be dropped
  in directly as a finished asset.
- **No material conflict found** between the repository's current (empty) state and the approved
  discovery/brief/visual-direction documents. The repository is simply pre-build, exactly as
  `README.md`'s own status note describes.

## 2. Recommended Stack

**Next.js — the current stable major release at implementation time — with the App Router,
TypeScript, Tailwind CSS v4**, deployed to **Vercel**, package manager **npm**. No CMS, no
database, no backend/API routes: content is fully static, authored in typed TypeScript modules.

The Next.js version is deliberately not pinned to a specific number. At the time this plan was
written, Next.js 16 is the current stable major release, and that is the natural starting point —
but the fixed decisions are **App Router, TypeScript, Tailwind CSS v4, and npm**, not an exact
Next.js version. An implementation session should scaffold against whatever is the current stable
major release when it runs, unless it hits a concrete, specific repository or tooling
compatibility problem that gives a real reason to pin an older version — in which case it should
report that reason rather than silently downgrading.

**Why this is the simplest sensible fit, not a fashionable default:**
- Vercel deployment is effectively zero-config for Next.js — this directly satisfies "straightforward
  Vercel deployment" better than any alternative stack would.
- `next/image` provides responsive, optimized, lazy-loaded images out of the box — directly serves
  both the performance and responsive-image requirements against a photography-limited asset set
  where every byte matters.
- `next/font` self-hosts Google Fonts at build time (no external font request at runtime,
  `font-display: swap` by default) — serves the performance and typography plan (§7) without extra
  tooling or a manual font-hosting setup.
- The App Router's file-based routing means the brief's explicitly-permitted-but-not-required
  second page (brief §5) is a new `app/<route>/page.tsx`, not a restructure — directly satisfies
  "clean enough architecture that the prototype can be refined later without a rewrite."
- Tailwind CSS v4 gives a working design-token/utility system quickly, without hand-rolling a
  bespoke design system — proportionate to a one-page prototype, per the brief's own scope
  discipline (brief §5, §10).
- Nothing here is exotic: no animation library, no state-management library, no CMS. This is a
  deliberately boring stack, in line with "avoid unnecessary infrastructure" and "avoid adding
  technologies simply because they are fashionable."

**Not recommended and why:** a plain static HTML/CSS site would be simpler still, but would lose
`next/image` optimization and the App Router's clean growth path to a second page — a real cost
against a photography-constrained, potentially-growing prototype. A heavier framework (e.g. a
custom Node/Express backend, a headless CMS) would add real infrastructure this static,
speculative, single-audience prototype does not need.

## 3. Proposed File/Folder Architecture

```
app/
  layout.tsx          — root layout: font setup, <html>/<body> shell, metadata, grain-texture wrapper
  page.tsx             — composes homepage sections in narrative order
  globals.css           — Tailwind directives + CSS custom-property design tokens
  favicon.ico / icon assets
  opengraph-image       — generated OG image (see §10)
components/
  layout/
    SiteHeader.tsx       — wordmark + a single "Book" link; not a full navigation bar
  sections/
    Hero.tsx
    TeamSection.tsx       — "Meet the Faces" (Elliot + Bailey)
    WorkSection.tsx
    ServicesSection.tsx
    SocialProofSection.tsx
    OfferSection.tsx      — FADED25
    InstagramBridge.tsx
    SiteFooter.tsx
  ui/
    Button.tsx            — shared CTA styling; every instance points at Squire or Instagram
    GrainOverlay.tsx       — the recreated tileable grain/noise texture
    RevealOnScroll.tsx     — the one client component; IntersectionObserver-driven reveal
    PortraitCard.tsx
    PriceRow.tsx
    ReviewBlock.tsx
    FloatingBookButton.tsx — the compact floating CTA (see §8)
content/
  site-content.ts         — single typed source of truth for team, services, reviews, offer copy,
                             business info, and external URLs (see §5)
public/
  images/                 — cropped/optimized derived assets (see §6)
    wordmark.*
    hero.*
    team/
      elliot.*
      bailey.*
    work/
    instagram/
```

Sections are React components composed once, in order, inside `app/page.tsx` — they are not
separate routes. The homepage is the entire V1 prototype; a second page, if ever justified, would
be added as a new route directory under `app/` without touching this structure.

## 4. Component Architecture

- `app/page.tsx` imports and renders each `sections/*` component in the approved narrative order:
  Hero → Meet the Faces → The Work → Services → Social Proof → FADED25 → Instagram Bridge →
  Footer. Treated as a narrative, not eight uniform blocks — Work and Instagram Bridge are
  deliberately lighter-weight than Hero and Team, matching visual-direction §7's priority markers
  ("Essential — highest priority" vs. "Recommended, not essential").
- `SiteHeader` is minimal by design: the wordmark and a single booking link, no multi-item nav
  menu — there is nothing else on the page to navigate to.
- Each `sections/*` component pulls its copy/data from `content/site-content.ts` rather than
  hardcoding strings, so uncertain-content rules (§5) are enforced once, structurally, rather than
  re-decided per component.
- `ui/RevealOnScroll` is the **only** client component (`"use client"`) needed for the motion plan
  (§8) — everything else can remain a server component, keeping shipped JavaScript minimal.
- `ui/Button` is the single CTA component reused everywhere a booking or Instagram link appears,
  so link targets, `rel`/`target` attributes, and visual styling stay consistent by construction
  rather than by convention.

**Team-led without becoming a founders' page.** Direction C is explicitly team-led (visual-
direction §4) but the subject of the site is Faded — the shop, team, work, atmosphere, and
experience — not Elliot and Bailey individually. This is enforced architecturally, not just
stylistically:
- The Team section is one section of eight in the narrative, sized generously (visual-direction
  §7 marks it highest-priority) but not the page's framing device.
- Hero copy, page `<title>`/metadata, and the footer all speak as "Faded" (the shop), never as
  "Elliot and Bailey's site" or "our founders."
- The proven section heading — "Meet the faces behind the fades" — is used verbatim (brief §6),
  not replaced with generic "About the Owners" framing, which would tip toward a founders'-page
  read rather than a team-trust moment inside a shop-led narrative.

## 5. Content / Data Approach

All copy and structured content lives in a single typed module, `content/site-content.ts`,
sourced only from confirmed facts in `docs/discovery.md` and `docs/brief.md`. This is deliberately
a plain TypeScript object, not a CMS — proportionate to a one-page, non-recurring-content
prototype (brief §5 explicitly excludes "anything requiring ongoing content the client would need
to maintain immediately").

Rules enforced by the shape of the data itself, so a component can't accidentally violate them:

- **FADED25.** `offer.eligibilityText` is a single neutral string (e.g. "Ask in-shop or check
  current terms on booking") — there is no boolean or enum field that could represent "new clients
  only" vs. "all clients," because that decision has not been made by Faded (brief §8, discovery
  §11). The code itself (`FADED25`) and the real mechanism (via Squire) are shown as fact; the
  eligibility terms are not.
- **Pricing.** `services[]` simply has no Beard Trim entry in V1. It is omitted, not included with
  a placeholder or a guessed value — discovery §2/§16 documents a genuine £10-vs-£15 conflict that
  should not be resolved by guessing.
- **Team.** `team[]` contains exactly two entries: Elliot and Bailey, confirmed co-owners
  (discovery §2). Each entry has only `name`, `title` ("Co-Owner"), and the proven framing copy —
  no invented biography, years of experience, or specialty claims. Jake, Josh, and Will are **not**
  included in V1: their current active status is an open question in discovery §16, and the brief
  gives no confirmed roster beyond Elliot and Bailey.
- **Reviews.** `reviews.google` and `reviews.squire` are two separate typed objects
  (`{ rating, count }` each), rendered in visually distinct blocks, labelled by platform. There is
  no code path that sums or averages them into a single number (discovery §11, brief §5 — "never a
  fabricated combined number"). Component copy avoids phrasing like "as of today" or "current
  rating" that would imply the counts are live-fetched — they are discovery-snapshot figures and
  should read that way (e.g. a quiet "via Google" / "via Squire" label is sufficient; no need for
  an explicit "as of [date]" caveat that would look like a bug to a first-time visitor, but the
  copy must never claim real-time freshness it doesn't have).
- **Business info.** Address, phone, and hours come directly from discovery §2, used verbatim in
  the footer and in structured data (§10) — no invented details (postcode formatting, hours
  outside what's documented, etc.).
- **External URLs.** The real Squire booking link and the real Instagram profile URL (both
  confirmed in discovery §2) are stored once as constants and reused by every CTA — never
  retyped per-component.

## 6. Asset Implementation Plan

Governed by the policy already approved in `docs/visual-direction.md` (§9, §16): real Faded assets
first, derived assets clearly labelled internally, no generic stock unless genuinely unavoidable,
and every image slot structured so a future Fruitbowl-shot replacement drops in without a
redesign.

| Asset | Source | Treatment |
|---|---|---|
| Wordmark | Cropped from the cleanest available boxed "FADED." lockup among the 8 screenshots (the FADED25 offer-post screenshot has a large, clean rendering of it) | Crop tightly, clean up background, export as PNG (and an SVG trace if it cleans up well) to `public/images/wordmark.*`. Store used directly; store never presented as an official source logo file — internally documented (a short note in this file's asset table is sufficient provenance record) as a prototype-derived crop, per the approved wordmark policy. |
| Hero image | The shopfront screenshot ("Weekend is loading" post), or a cropped work-in-progress shot if the shopfront crop is too UI-chrome-heavy to use cleanly | Crop out UI chrome, grade to the monochrome/grain-consistent system, export as an optimized JPG/WebP, sized for both portrait (mobile) and wide (desktop) crops via `object-position` |
| Elliot & Bailey portraits | Cropped from the team-intro carousel screenshots (grey-seamless-backdrop, mid-cut, name+title overlay format) | Crop to a consistent portrait aspect ratio, grade to match the shared monochrome/grain treatment, store under `public/images/team/` |
| Work section imagery | Work-in-progress crops from the available screenshots (the services-list post's accompanying photo, the "Do Not Disturb" mid-cut photo) | Small strip/grid of 2–3 images, deliberately light in volume — visual-direction §7 explicitly wants this section to read as "intentional, not unfinished" rather than padded out |
| Review content | The real transcribed 5-star review quote and rating figures | Used as real text content pulled into `site-content.ts`, not as an image |
| FADED25 presentation | Not a reused screenshot image | Rebuilt as a designed card using the shared design tokens (§7) and the real code/copy — avoids relying on a second compressed graphic and keeps the card visually consistent with the rest of the page |
| Instagram Bridge tiles | Small crops from the profile/grid-overview screenshot | Used clearly as "more like this on Instagram" reference tiles, linking out to the real profile — not presented as full-resolution content |
| Grain/noise texture | **Not** reused from any screenshot's pixels — visual-direction §11 is explicit that screenshot grain is too compressed to tile or scale cleanly | Recreated from scratch as a small tileable noise PNG or an inline SVG `feTurbulence` filter, applied via CSS |

All derived images are stored under `public/images/`, optimized (WebP preferred where quality
allows) and rendered through `next/image`. The raw screenshots stay only in
`docs/research/instagram/` as source reference — none are shipped to the deployed app unprocessed.

**This is real implementation work, not a data-entry step.** Extracting 8+ individual, correctly
cropped and graded assets out of 8 multi-element screenshots takes deliberate image-editing time
and is called out as its own build-sequence stage (§13, Stage 4) rather than assumed to happen
incidentally while building components. The exact screenshot-to-asset mapping above is based on
direct inspection of 3 of the 8 files during this planning pass; the remaining files should be
opened and matched to the table above at the start of Stage 4, not assumed sight-unseen.

## 7. Typography, Colour, Texture Implementation

- **Display typeface**: **Anton**, loaded via `next/font/google`. Chosen as the default because
  its extreme condensation is the closest cousin to the boxed "FADED." wordmark's own compressed
  lockup. Archivo Black and Bebas Neue (visual-direction §10's other two approved substitutes)
  remain valid one-line swaps in the font config if the client prefers a less extreme display face
  later — this is a config change, not a rebuild.
- **Body/utility typeface**: **Inter**, loaded via `next/font/google`, used for both body copy and
  small tracked utility labels (uppercase + letter-spaced via a Tailwind utility class), matching
  visual-direction §10's hierarchy.
- **Fallback stack**: `system-ui, -apple-system, "Segoe UI", sans-serif` behind both font
  variables, so a failed/slow font load still renders a reasonable typeface, not an unstyled
  default serif.
- **Both fonts are explicitly documented, in the UI (a short internal comment near the font
  config) and in this plan, as prototype substitutes — not confirmed Faded brand fonts**, per
  visual-direction §10/§16.
- **Colour tokens** — CSS custom properties defined in `globals.css` and exposed to Tailwind via
  theme extension:
  - `--color-bg`: off-black (approx. `#0B0B0C`), dominant background.
  - `--color-fg`: off-white (approx. `#F4F3F1`), dominant text colour.
  - `--color-surface`: a mid-grey drawn from the studio-backdrop tone, for cards/sections that
    need to sit apart from the primary background.
  - `--color-muted`: a lighter grey, reserved for secondary/tertiary text only.
  - No accent colour is introduced. The brand is strictly monochrome (discovery §7); inventing a
    colour accent would work against "recognisably Faded, not generically premium."
- **Grain/noise**: implemented as a CSS pseudo-element (`::before` on the relevant section/wrapper)
  using the recreated tileable texture (§6), low opacity, with a slow animated `background-position`
  drift for atmosphere. Kept off small UI controls and body-text-heavy areas to protect legibility,
  per visual-direction §11.
- **Image grading**: photography is graded to the shared monochrome/consistent-contrast look
  during asset preparation (§6, Stage 4) rather than via a runtime CSS filter on every image — one
  consistent grading pass is cheaper at runtime and easier to keep visually consistent than
  filtering each `next/image` instance independently.
- **Contrast**: the off-white-on-off-black pairing is checked against WCAG AA (≥4.5:1 for body
  text, ≥3:1 for large display text) once the exact token hex values are finalized in
  implementation — included explicitly in the QA checklist (§14).

This is deliberately a small token set — enough for consistency across roughly eight sections, not
a full multi-theme design system, in line with the brief's own scope discipline.

## 8. Responsive Strategy

Mobile and desktop are treated as equal first-class targets throughout (visual-direction §13), using
Tailwind's mobile-first breakpoints.

- **Hero**: portrait-oriented crop and `object-position` on mobile, a wider crop on desktop, using
  the same underlying graded image where the subject allows it.
- **Team**: cards behave as a simple horizontal scroll-snap row on mobile (no carousel library —
  native CSS `scroll-snap-type`), and a side-by-side grid on desktop.
- **Work**: a simple grid/strip on both breakpoints, reflowing from a short horizontal strip
  (mobile) to a small grid (desktop).
- **Services**: a single scannable vertical list at all breakpoints — never a wide table requiring
  horizontal scroll, per visual-direction §13.
- **Social Proof**: stacked review blocks on mobile, side-by-side on desktop.
- **FADED25**: one designed card, full-width with generous padding on mobile, a constrained-width
  centered card on desktop — never a banner or popup.
- **Footer**: stacked utility information (address/hours/phone/map) on mobile, a simple
  multi-column layout on desktop.
- **Booking CTA behaviour — evaluated explicitly, not defaulted to a persistent bar.** A
  full-width sticky bottom bar present on every screen risks reading as an advert banner, which
  cuts against Direction C's calmer, trust-through-people feel (visual-direction §4's "emotional
  feel: trust through people," not a hard-sell poster direction). The recommendation is a
  **compact, corner-anchored floating "Book" button** (`ui/FloatingBookButton.tsx`) — not a
  full-width bar — that:
  - stays hidden while the hero (which already carries the primary CTA) is in view,
  - appears once the visitor scrolls past the hero,
  - hides again once the footer (which repeats a "Book" link) enters view, avoiding two
    simultaneous booking prompts on screen at once.

  This keeps booking persistently reachable, satisfying brief §4's "do" requirement, without the
  page feeling like it's advertising at the visitor on every scroll.

## 9. Motion Strategy

The lightest sensible implementation of the motion approved in visual-direction §12, with content
visible by default in every case — motion is progressive enhancement, never a gate on visibility
(a JS failure or `prefers-reduced-motion` must never hide content).

- **Grain drift**: a pure CSS `@keyframes` animation on `background-position`, slow and subtle,
  applied to the hero/section grain overlay.
- **Grain-to-clear reveal**: `ui/RevealOnScroll.tsx`, the one client component in the app, uses
  `IntersectionObserver` to toggle a CSS class when team/work images enter the viewport, driving a
  CSS transition (blur/opacity) rather than a JS-driven animation library.
- **Hover states**: a CSS transition (slight scale/grain shift) on team cards, scoped to
  `@media (hover: hover)` so it is a no-op on touch devices rather than a sticky/stuck hover state.
- **Explicitly not used**: parallax scrolling, scroll-jacking, elaborate showreel-style
  transitions, or any general-purpose animation library — all explicitly ruled out in
  visual-direction §12 as generic-agency tropes that work against the "real Selby barbershop"
  feel.
- **`prefers-reduced-motion`**: every transition/animation declaration above is wrapped in
  `@media (prefers-reduced-motion: no-preference)`; the reduced-motion default state must be fully
  usable and complete (static grain, no reveal transition — content simply visible, no hover
  scale) rather than a degraded experience.

## 10. Accessibility / Performance Approach

A practical, credible V1 standard — not an enterprise compliance exercise (per the user's explicit
scoping instruction):

- **Semantic HTML**: `header`, `main`, and one `section` per homepage section, each with a real
  heading (`h2`) tied via `aria-labelledby` where the visible heading text itself isn't
  sufficient; exactly one `h1` on the page, in the hero.
- **Keyboard accessibility**: every interactive element (booking CTAs, the Instagram Bridge links,
  the floating book button) is a real `<a>` or `<button>`, never a `<div onClick>`, so keyboard
  and screen-reader behaviour comes for free.
- **Focus states**: a visible, brand-consistent focus outline (off-white ring against the
  off-black background) — never `outline: none` without a replacement.
- **Contrast**: verified against the token pairing defined in §7.
- **Alt text**: every real photograph (portraits, work-in-progress shots, hero image) gets
  descriptive alt text (e.g. "Elliot, co-owner, cutting a client's hair" rather than a filename or
  generic "photo"); purely decorative grain/texture overlays get `alt=""`.
- **Reduced motion**: respected throughout, per §9.
- **Responsive images**: `next/image` with explicit `sizes`, lazy-loaded for everything below the
  fold, `priority` set only on the hero image.
- **Image optimization**: source assets pre-optimized during §6's asset-prep stage; `next/image`
  handles responsive/format serving on top of that.
- **Font loading**: `next/font` self-hosts both typefaces at build time — no external font request,
  `font-display: swap` behaviour by default.
- **Avoiding unnecessary JavaScript**: the app ships one client component
  (`RevealOnScroll`) beyond what Next.js requires by default. No animation library, no
  carousel library, no client-side state management — everything else is a server component.

## 11. SEO / Metadata Baseline

A sensible prototype baseline, deliberately not overbuilt for a speculative, non-live V1:

- **Title**: built from confirmed facts only, e.g. "Faded Barbers Selby — Book Your Next Cut" —
  no invented taglines presented as Faded's own.
- **Meta description**: references Selby, the barbershop, and Squire-based booking, again using
  only confirmed discovery facts.
- **Open Graph metadata**: an OG image generated from the derived wordmark/hero crop (Next.js
  `opengraph-image` file convention), plus standard `og:title`/`og:description`.
- **Favicon**: derived from the wordmark mark asset (§6).
- **Local-business structured data**: a `LocalBusiness` JSON-LD block using only confirmed facts
  from discovery §2 — name, address (50 Micklegate, Selby YO8 4EQ), phone (07960 614359), opening
  hours (Tue–Sat; Thu/Fri to 8pm; Sat from 8am; closed Mon/Sun), and a `sameAs` link to the real
  Instagram profile.
- **Deliberately omitted**: `AggregateRating` structured data. Google/Squire review counts are
  discovery-snapshot figures (§5), not live/verifiable data, and structured data asserting a
  rating is expected to stay accurate/current — adding it here would create exactly the kind of
  fabricated-precision risk discovery §11 and brief §5 both warn against.
- **Not built for V1**: sitemap.xml complexity beyond Next's defaults, internationalization, or
  any SEO tooling beyond the above — disproportionate to a one-page speculative prototype.

## 12. Git / Branch Strategy

**The repository currently has an unresolved hygiene issue that must be surfaced and approved
before any implementation work touches it**: `docs/` (discovery.md, brief.md, visual-direction.md,
and the Instagram research images) is entirely untracked on `main` (§1).

The recommendation is to commit `docs/` to `main` first — the approved source-of-truth documents
belong on `main`, and doing this first keeps the feature branch's diff focused on implementation
rather than mixing in a large docs commit. **This is a recommendation only, not a standing
authorization.** An implementation session must not commit anything to `main` on its own
initiative simply because this build plan suggests it. It must stop, present the recommendation
(that `docs/` should be committed to `main` before branching), and wait for the user's explicit
approval before making that commit. Only after that approval — or an explicit alternative
instruction from the user — should it proceed.

Once `main` is confirmed clean and in the state the user has approved:

- **Feature branch name**: **`build/v1-homepage-prototype`**.
- Work happens exclusively on that branch.
- Commit at each build-sequence stage (§13) — not one large commit at the end — so history is
  reviewable and any stage can be reverted independently.
- Push the feature branch and rely on Vercel's automatic preview deployment per push, **if** the
  repository is already linked to a Vercel project. This has not been confirmed in this planning
  session — an implementation session should check for this (e.g. a `vercel.json`, or ask the
  user) rather than assume it.
- **Never merge to `main` without explicit user approval** — this applies to the `docs/` commit
  discussed above and to the eventual feature-branch merge alike.
- If an implementation session finds anything unexpected when it starts (uncommitted changes it
  didn't make, a branch that isn't `main`, anything that looks like it could be someone else's
  in-progress work), it must stop and report before modifying the repository at all.

## 13. Incremental Build Sequence

Each stage should be committed and verified before moving to the next.

1. **Repo hygiene.** Surface the `docs/` commit recommendation (§12) and obtain explicit user
   approval before committing anything to `main`. Once approved: commit `docs/` to `main`, then
   create the `build/v1-homepage-prototype` feature branch.
   *Verify: `git status` is clean on `main` after the approved commit; the feature branch exists
   and is checked out; the `main` commit only happened after explicit approval was given.*
2. **Scaffold.** Initialize Next.js (current stable major release) with TypeScript, App Router,
   and Tailwind CSS v4; base config (`tsconfig.json`, ESLint, Tailwind theme skeleton).
   *Verify: `npm run dev` serves a blank page locally; `npm run build` completes with no errors.*
3. **Tokens, fonts, grain shell.** Implement `globals.css` design tokens (§7), wire up
   `next/font` for Anton + Inter, build `GrainOverlay`, and assemble the root `layout.tsx` shell.
   *Verify: fonts render correctly (check the network tab shows self-hosted font files, not a
   Google Fonts request), colour tokens apply correctly, grain texture is visible and subtle.*
4. **Asset preparation.** Open all 8 files in `docs/research/instagram/`, confirm the mapping in
   §6's table (adjusting it if a file's content differs from what this plan assumed), crop/export/
   grade/optimize every planned asset into `public/images/`.
   *Verify: every image slot named in §6 has a corresponding optimized file; file sizes are
   reasonable (a few hundred KB at most per image); grading is visually consistent across assets.*
5. **`content/site-content.ts`.** Populate the typed content module directly from
   `docs/discovery.md` and `docs/brief.md`, following every rule in §5.
   *Verify: no fact in the file traces back to anything other than discovery/brief; Beard Trim is
   absent; FADED25 eligibility text is neutral; Google/Squire reviews are separate objects; team
   array contains only Elliot and Bailey.*
6. **Header + Hero.** Build `SiteHeader` and `Hero`, wired to real content and the real Squire URL.
   *Verify: passes the brief's own 15-second "feel" test on first load; CTA opens the real Squire
   booking link; layout is responsive at common mobile and desktop widths.*
7. **Meet the Faces.** Build `TeamSection` with Elliot and Bailey.
   *Verify: real copy only, reveal-on-scroll works, portraits have descriptive alt text, cards are
   keyboard-reachable.*
8. **The Work.** Build `WorkSection` with the deliberately light image set.
   *Verify: reads as an intentional, confident short section — not as an empty or broken one.*
9. **Services.** Build `ServicesSection` with the pipe-separated list style from the real
   Instagram content.
   *Verify: no Beard Trim price present; list is a simple scannable vertical list on mobile, no
   horizontal scroll anywhere.*
10. **Social Proof.** Build `SocialProofSection`.
    *Verify: Google and Squire ratings/counts shown in clearly separate, labelled blocks; the real
    review quote is used verbatim; no combined/summed number appears anywhere.*
11. **FADED25.** Build `OfferSection`.
    *Verify: eligibility wording is neutral; the real code and Squire link are present; it renders
    as one designed card, not a banner or popup.*
12. **Instagram Bridge + Footer.** Build `InstagramBridge` and `SiteFooter`.
    *Verify: outbound Instagram link is correct and opens in a new tab; footer address/hours/phone
    match discovery §2 exactly; a "Book" link is present in the footer.*
13. **Responsive refinement pass.** Walk every section at common breakpoints (narrow mobile,
    large mobile, tablet, desktop).
    *Verify: no horizontal scroll anywhere on the page; the booking CTA is always reasonably
    reachable; text never overflows its container.*
14. **Motion pass.** Implement grain drift, `RevealOnScroll` transitions, hover states, and
    `FloatingBookButton` behaviour per §8–§9.
    *Verify: `prefers-reduced-motion` is respected end-to-end (toggle the OS setting and re-check
    the whole page); no janky scroll performance; the floating button appears/hides at the right
    scroll positions and never overlaps the footer's own CTA.*
15. **Accessibility / performance pass.** Run Lighthouse (or equivalent) and a manual keyboard-only
    walkthrough of the entire page.
    *Verify: reasonable Lighthouse scores across categories (targeting roughly 90+ where realistic
    for a media-heavy page); every interactive element is reachable and operable via keyboard
    alone; screen-reader landmarks make sense (spot-check with a screen reader or the accessibility
    tree in devtools).*
16. **SEO / metadata.** Implement title, description, Open Graph metadata, favicon, and the
    `LocalBusiness` JSON-LD block per §11.
    *Verify: metadata renders correctly (view source, and/or a social-card debugger); JSON-LD
    validates and contains only confirmed facts.*
17. **Final QA.** Full pass against the brief's success criteria (brief §3) and the known
    limitations list (§15 below) — confirm nothing has silently drifted from the approved
    documents during implementation.
    *Verify: a fresh read-through against brief §3's four success criteria and against
    visual-direction §16's "safe to handle provisionally" list, confirming each provisional item
    is still handled the way this plan specifies.*
18. **Push feature branch.** Push `build/v1-homepage-prototype`, confirm the Vercel preview build
    succeeds (if Vercel is linked — see §12), and report the preview URL.
    *Verify: preview build is green; the preview URL loads and matches local behaviour.*
    **Do not merge to `main` at this stage, or at any stage, without explicit user approval.**

## 14. Verification / QA Checklist

A consolidated checklist for final sign-off, pulling together the per-stage verifications above:

- [ ] `npm run build` succeeds with no errors or warnings that indicate a real problem.
- [ ] No horizontal scroll on any section at any common breakpoint.
- [ ] Booking CTA reachable from the hero, the floating button (post-hero scroll), and the footer.
- [ ] Keyboard-only pass: every interactive element reachable and operable, visible focus states
      throughout.
- [ ] `prefers-reduced-motion` fully respected — content complete and readable with motion off.
- [ ] Google and Squire reviews shown separately, never summed; real review quote used verbatim.
- [ ] No Beard Trim price anywhere in the shipped content.
- [ ] FADED25 eligibility copy is neutral — no "new clients only" or "new and existing" claim.
- [ ] Team section contains only Elliot and Bailey, with no invented biographical detail.
- [ ] Every real photograph has descriptive alt text; decorative grain has `alt=""`.
- [ ] All external links (Squire, Instagram) point at the real, confirmed URLs from discovery §2.
- [ ] JSON-LD `LocalBusiness` data matches discovery §2 exactly; no `AggregateRating` present.
- [ ] Wordmark and any other derived asset is internally documented as prototype-derived, not
      presented anywhere as an official Faded source file.
- [ ] Lighthouse (or equivalent) run across performance/accessibility/best-practices/SEO, with any
      low score investigated and explained (not silently ignored).
- [ ] Full re-read against brief §3's four success criteria before calling V1 complete.

## 15. Known Limitations / Open Items (V1)

These remain provisional in V1 by design, per the already-approved visual-direction §16 policy —
they are not blockers unless implementation surfaces a genuine new technical reason:

- Screenshot-resolution imagery for team and work photography (no source-quality files exist yet).
- A temporary, prototype-derived wordmark, if a clean crop requires it — clearly labelled
  internally, never presented as Faded's official source logo.
- Substitute typography (Anton + Inter) — not confirmed as Faded's actual brand fonts.
- Deliberately light Work-section photography — an honest reflection of the current asset gap, not
  an implementation shortfall.
- FADED25 eligibility terms remain unresolved — V1 uses neutral wording only.
- The disputed Beard Trim price is omitted rather than guessed.
- Google and Squire review counts are discovery-snapshot figures, not live-fetched data — the
  implementation must not imply real-time accuracy.

## 16. Genuine Technical Risks

- **`docs/` is uncommitted on `main`.** Must be resolved, with explicit user approval, before a
  feature branch is cut (§12) — flagged here again because it is the one item that could otherwise
  get silently bypassed under time pressure during implementation.
- **No scaffolding exists yet.** The first real build-sequence stage is a full project setup, not
  an incremental addition to existing tooling — this makes Stage 2 (§13) higher-effort than a
  typical "add a feature" stage, and worth budgeting time for accordingly.
- **Asset mapping is not fully confirmed.** Only 3 of the 8 screenshots in
  `docs/research/instagram/` were opened during this planning pass; the full mapping in §6 is a
  reasonable inference from those 3 plus the descriptions already recorded in visual-direction §9,
  but should be treated as provisional until Stage 4 confirms it against all 8 files directly.
- **Derived-asset quality ceiling.** Wordmark and portrait quality at hero/card display scale is
  capped by screenshot resolution — an already-accepted, already-documented risk (visual-direction
  §16), not a new one, but worth re-surfacing here since it's the risk most likely to visibly
  affect the finished prototype's polish.
- **Vercel project linkage is unconfirmed.** Whether this repository is already connected to a
  Vercel project (for automatic preview deployments per push) has not been verified in this
  planning session — an implementation session should check this explicitly rather than assume it
  at Stage 18.
