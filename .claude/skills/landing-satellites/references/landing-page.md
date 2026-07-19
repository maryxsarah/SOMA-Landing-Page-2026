# The landing page itself: section stack, anatomy, Figma workflow

## The proven section order (narrative arc)

The hub is a stack of ~15–25 small section components. The order is a sales
narrative, not a feature list — keep the arc even if you rename sections:

```
1.  Hero            — one promise, one CTA, fits the first screen
2.  HeroDemo        — the product actually moving (video/animated screenshot)
3.  SocialProof     — logos / numbers / quotes (thin strip, not a wall)
4.  MarqueeStrip    — scrolling keyword/benefit ribbon (energy, not info)
5.  FeaturesBento   — the capability map at a glance (bento grid)
6.  Problem         — name the pain in the visitor's words
7.  HowItWorks      — 3–4 numbered steps, each mapping to a real UI action
8.  Feature deep-dives — one section per money feature (2–4 sections,
                      alternate text/media sides; each may link its spoke)
9.  Trust section   — licensing / security / compliance — whatever the
                      category's #1 objection is, answered head-on
10. SeeItInAction   — second demo placement for scrollers who skipped #2
11. WhoItsFor       — personas (each may link its /for/ spoke)
12. Ecosystem       — sister products / integrations (cross-sell)
13. CtaSection      — mid-funnel CTA band
14. PricingSection  — cards on the landing itself (not a separate page at MVP)
15. Faq             — native <details>, first open; FAQPage JSON-LD on the hub
16. ReadyBand       — final full-width CTA band, one line + button
17. Footer          — registry-driven sitemap (see scale-and-ui reference)
```

Cutting for a smaller product: keep 1, 2, 5 or 8, 7, 9, 14, 15, 16, 17.
The two non-negotiables besides hero/pricing/FAQ: **a moving demo above the
fold area** and **the objection section (#9)** — they carry conversion.

## Section anatomy rules

- One file per section in `src/components/landing/sections/`, each ≤250 lines.
  The composer (`LandingPage.tsx`) only stacks them — no logic.
- Repeating header pattern: `Eyebrow` (`( label )` in `text-white/50`) + H2 in
  the display serif (`.ld-serif`) + optional one-line sub. Consistency here is
  what makes 20 sections read as one page.
- Each section is `<section id="...">` — nav anchors (`/#features`, `/#pricing`,
  `/#faq`) must land somewhere real.
- Media side alternates left/right between consecutive deep-dive sections.
- All colors/spacing through the `.ld` CSS vars or Tailwind tokens — zero
  hardcoded hex in section files (grep-check: `#[0-9a-fA-F]{3,6}` in sections/
  should return nothing).

## Hero rules

- Must fit the first screen at every width — that is exactly what the `.ld`
  zoom `svh` term guarantees; size the hero in the design frame's budget
  (`nav + gap + hero = the svh divisor`).
- One H1 (the category promise, carries the primary query), one lead
  (`data-speakable`, 1–2 citable sentences), ONE primary CTA (AcidButton lg,
  optionally `shimmer`). Secondary link max ("See how it works ↓").
- No carousel, no two competing CTAs, no autoplaying sound.

## Design inputs: two paths

### Path A — no Figma: design system spec + one-pager + reference site

When the design lives as a design-system definition in the repo (tokens/spec
authored for Claude Code) plus a positioning one-pager and an example of a
previous site:

1. **Tokens first.** Read the design-system spec BEFORE writing any section.
   Materialize it as the `.ld` CSS vars + Tailwind theme in one place
   (`landing.css`); every section consumes vars, never literal values. If the
   DS spec is incomplete (no spacing scale, no type ramp), derive the missing
   scale from what exists and write it BACK into the spec file — the spec stays
   the single source of truth, not your components.
2. **One-pager → section map.** The one-pager is the copy source of truth:
   extract promise (→ hero H1), pains (→ Problem section), capabilities
   (→ FeaturesBento + deep-dives), objections (→ trust section), audience
   (→ WhoItsFor), offer (→ Pricing/waitlist). Map every one-pager claim to
   exactly one section before writing JSX; anything unmapped goes to FAQ or
   gets cut. Never invent product claims the one-pager doesn't back.
3. **Reference site → pattern audit, not copy source.** Screenshot the old
   site (or open it in the browser tools). Extract: what sections it had,
   which felt load-bearing, nav/footer structure, tone. Explicitly list what
   you are deliberately NOT carrying over. Do not inherit its copy or its CSS.
4. **Self-review loop replaces Figma comparison.** After each section:
   screenshot at the canonical width + 375, judge against the DS spec
   (spacing rhythm, type ramp, contrast), fix, move on. Batch-review the full
   page at the end at 1440/1920/375.

### Path B — Figma exists

1. Confirm you have the CURRENT file key with the owner — stale duplicates of
   landing files are common and look plausible.
2. `get_screenshot` the frame before building each section; compare visually
   after building (before/after screenshots for review).
3. Colors, gradients, radii, fonts: `get_variable_defs` for EXACT values — the
   defaults/fallbacks visible in design context are frequently wrong.
4. Copy text is NOT source of truth in Figma — designers paste lorem-adjacent
   drafts. Re-verify every headline/claim against the product truth (docs,
   plan limits) before shipping; run body copy against FORBIDDEN_CLAIMS.
5. Images/illustrations/animations: export from Figma (`download_assets`) into
   `/public/landing/` — that dir gets immutable 1-year cache headers, so
   filename-version assets (`hero-v2.webp`) when replacing.
6. Design frames usually exist at 2–3 widths (e.g. 1920/1440/375). Build the
   canonical width exactly; the zoom model covers between/above; the mobile
   frame drives the <1280 responsive layout (real reflow, not zoom).

## Copy principles (the ones that survived review)

- Open every section in the visitor's job, not the product's feature name:
  "The music drops when you speak" beats "Auto-ducking engine".
- Numbers beat adjectives; verbs beat nouns on CTAs ("Put music under my
  voice", not "Get started").
- FAQ answers on the hub follow the same rule as spokes: lifted from (or
  consistent with) the docs — one claim, every surface.
- Pricing section: show the free tier honestly (its real caps), mark one plan
  as the default choice, li-level feature diffs only (no giant matrix).

## Mobile (<1280)

The zoom model does NOT apply below 1280 — build real responsive: nav becomes
burger/sheet, bento 4→2→1 columns, deep-dive sections stack media-under-text,
marquee stays (it's cheap), tables become stacked cards. Test at 375 exactly
(the design's mobile frame), not just "looks fine narrower".

## Performance/quality bar for the landing

- Every image through the basePath-aware `LocalImage`; hero media preloaded;
  below-fold media `loading="lazy"`.
- Videos: muted, `playsInline`, poster set, `prefers-reduced-motion` honored
  (pause marquee/shimmer/autoplay).
- The landing is a Server Component tree — client components only where there
  is interaction (nav, FAQ details, CTA tracking, AuthRedirect).
- Lighthouse on the hub: Performance ≥ 90, SEO ≥ 95, a11y ≥ 95 (focus visible,
  contrast ≥ 4.5:1, aria-labels on icon-only buttons).
