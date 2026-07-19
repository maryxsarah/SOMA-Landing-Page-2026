---
name: landing-satellites
description: Build a marketing landing + SEO satellite (hub-and-spoke) site from zero — Next.js App Router, viewport zoom scale model, typed spoke registry with Owns/Avoids anti-cannibalization, JSON-LD, markdown twins + llms.txt, basePath reverse-proxy mounting, PostHog/GA4 analytics with UTM attribution. Use when asked to create a landing page, marketing site, SEO satellites/spokes, or deploy a product site from scratch.
---

# Landing + SEO satellites: from-zero site build

Battle-tested system from two shipped production sites (a hub + ~20 spokes each,
mounted under `domain.com/tools/<product>` behind a reverse proxy). This skill is
self-contained: every pattern is embedded in `references/` — no other repo needed.

## Reference files (read the one you need before writing that layer)

- `references/scale-and-ui.md` — viewport zoom scale model (the `.ld` system), Container, nav, footer, CTA button
- `references/landing-page.md` — the hub page itself: section stack/narrative order, section anatomy, hero rules, design inputs (design-system-spec/one-pager path AND Figma path), copy principles, mobile
- `references/waitlist.md` — pre-launch waitlist mode: CTA mode switch, form with honeypot/attribution, API route, storage options, launch flip
- `references/spoke-system.md` — SpokeDef typed registry, dynamic routes, renderer, markdown twins, guardrail tests
- `references/seo-core.md` — constants, per-archetype metadata, JSON-LD builders, sitemap/robots/llms.txt, OG image
- `references/infra-analytics.md` — next.config, basePath helpers, edge proxy, PostHog/GA4 façade, UTM attribution

## Tech stack (install exactly this, nothing more)

```
next@^16          # App Router, output: 'standalone'
react@^19  react-dom@^19
typescript@^5
tailwindcss@^4  @tailwindcss/postcss   # CSS-first: `@import 'tailwindcss'`, NO tailwind.config.js
clsx  tailwind-merge                   # the cn() helper
posthog-js                             # only analytics dep; GA4 = injected gtag script
jest  @swc/jest  jest-environment-jsdom  # guardrail tests (CI gate)
```

Fonts: self-host the body face as woff2 via `@font-face` in globals.css
(`font-display: swap`); load the display/serif face via `next/font/google` with a
`--font-*` CSS variable. Images: `next/image` + custom basePath-aware loader
(see infra reference — the default loader 400s under basePath).

`src/lib/cn.ts`:
```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

## Architecture in one paragraph

One **hub** (the landing at `/`) plus **spokes** in archetype buckets:
`features/`, `how-to/`, `for/` (personas), `alternatives/`, optionally `compare/`
and `glossary/`. Every spoke is a data object (`SpokeDef`) in ONE typed registry;
pages, footer sitemap, sitemap.xml, llms.txt, and markdown twins all derive from
that registry — adding a spoke is adding one object. Guardrail tests run per
spoke in CI. The site lives IN the app repo (not a separate marketing repo) and
is mounted at a public path via reverse proxy + `basePath` env var.

## Build order (from empty dir to deployed)

0. **Inputs**: collect the design source (Figma OR a design-system spec in the
   repo + positioning one-pager + reference site — see `references/landing-page.md`
   "Design inputs") and decide launch mode (`live` vs `waitlist` —
   `references/waitlist.md`). Both choices shape every CTA and copy register.
1. **Scaffold**: `create-next-app` (TS, App Router, no src-dir opinions — use `src/`),
   Tailwind v4 via PostCSS, `cn()`, fonts, `globals.css` with `@import 'tailwindcss'`.
2. **SEO core first** (`src/lib/seo/`): constants (BASE_URL, BRAND, FORBIDDEN_*),
   `pageMetadata()` with per-archetype title templates, JSON-LD builders with
   stable `@id`s. Everything else imports from here. → `references/seo-core.md`
3. **Landing scale + DS** (`src/components/landing/`): `landing.css` with the
   `.ld` zoom model + design tokens as CSS vars, `Container`, `StickyNav`,
   `AcidButton` (CTA with built-in `landing_cta_click` tracking), `Footer`.
   → `references/scale-and-ui.md`
4. **Hub**: `src/app/page.tsx` = Server Component, `pageMetadata({archetype:'hub'})`,
   org/website/app/webpage JSON-LD, then a `<LandingPage/>` section composer
   (~10–25 small section components stacked in the proven narrative order —
   hero → demo → proof → features → problem → how-it-works → deep-dives →
   objection/trust → personas → pricing → FAQ → final CTA). If the app has
   auth, logged-in redirect is a CLIENT effect (`AuthRedirect`), never a server
   `redirect()` — the landing must stay SSR-crawlable. → `references/landing-page.md`
5. **Spoke system** (`src/marketing/spokes/`): types → registry → per-bucket
   dynamic routes → one `SpokePage` renderer → markdown twins → guardrail tests.
   → `references/spoke-system.md`
6. **Crawler surface**: `sitemap.ts` (hard-coded lastModified — never `new Date()`),
   `robots.ts` (AI crawlers explicitly allowed), `llms.txt` route, OG image via
   `next/og` ImageResponse. → `references/seo-core.md`
7. **Infra**: `next.config.ts` (standalone + conditional basePath), `asset()`/
   `isAtPath()` helpers, edge `proxy.ts` (markdown rewrites + optional basic-auth
   gate), analytics façade + `AnalyticsBinder` + UTM attribution.
   → `references/infra-analytics.md`
8. **Waitlist (if pre-launch)**: `LAUNCH_MODE` switch, `WaitlistForm` +
   `/api/waitlist` route with honeypot + UTM attribution on every row,
   `waitlist_submit/success` events. → `references/waitlist.md`
9. **Deploy**: Docker from `output: 'standalone'` → Cloud Run (or any container
   host); prod env sets `NEXT_PUBLIC_BASE_PATH=/tools/<product>` and
   `NEXT_PUBLIC_SITE_ORIGIN=https://domain.com/tools/<product>`; parent domain
   reverse-proxies that path to the service (a standalone domain simply leaves
   basePath unset everywhere). Dev leaves basePath unset.

## The rules that make it work (do not skip)

**Anti-cannibalization is the core discipline.** Each spoke declares `owns[]`
(queries it claims) and `avoids[]` (queries that belong to a sibling spoke, a
sister product, or the parent domain). Maintain `FORBIDDEN_KEYWORDS` (terms the
parent/sibling ranks for — must never appear in title surfaces) and
`FORBIDDEN_CLAIMS` (legally risky promises like "copyright-free", "no strikes" —
must never appear anywhere). Both enforced by tests in CI. If you cannot phrase
a page so a sibling site would never rank for it, do not build the page.

**One registry, many surfaces.** Never keep parallel hand-synced lists of pages
(footer list + sitemap list + schema list drift apart — proven failure mode).
Footer columns, sitemap.xml, llms.txt, and md-twins all iterate `SPOKES`.

**Three-surface invariant** (when the product also has a docs/FAQ system): the
spoke persuades a human, the doc answers the agent, the spoke links the doc.
Every spoke has a `.md` twin at `<route>.md`, appears in llms.txt, and its FAQ
answers are lifted verbatim from the docs source (or inlined if no docs exist) —
a model reading either surface gets the same claim.

**Internal linking matrix** (hand-authored in-body links, descriptive anchors —
never "click here" / "learn more"):

| From | Links to |
|---|---|
| Hub | all features, top alternatives, top use-cases, pricing |
| Feature | hub, 2 sibling features, 1 most-relevant alternative |
| Alternative | hub, 2 sibling alternatives, 1 feature (competitor's weakest spot) |
| Use-case | hub, 2–3 relevant features, pricing |
| How-to / glossary | the feature page where the thing lives |

**Honesty in comparison pages**: singular-alternative format with an explicit
"keep <competitor> if…" section; comparison table rows are `{dim, them, us}` and
must be fair — this is what makes them citable by LLMs.

**Metadata quality gates** (enforced by tests where possible): meta description
110–170 chars; title from the archetype template; H1 carries the target query;
lead paragraph carries `data-speakable`.

## Definition of done

- `npm run build` green; `npm test` green (guardrail suite runs per spoke).
- Every spoke reachable from footer; sitemap.xml and llms.txt list all spokes.
- `curl -H 'Accept: text/markdown' <spoke-url>` returns the md twin.
- View-source on hub and one spoke of each archetype: JSON-LD parses (paste into
  Google Rich Results test), canonical correct, OG image resolves.
- With `NEXT_PUBLIC_BASE_PATH` set, all images/fonts/links still resolve
  (the #1 prod-only breakage class).
- Lighthouse SEO ≥ 95 on hub + one spoke.
