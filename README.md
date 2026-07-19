# SOMA Landing

Marketing hub + SEO satellite (hub-and-spoke) site. Next.js 16 App Router,
Tailwind v4, TypeScript. Currently a **technical skeleton** — copy, design
tokens and spokes are placeholders marked `TODO(brand)`.

## Commands

```bash
npm run dev     # local dev (no basePath)
npm run build   # production build (output: standalone)
npm test        # spoke guardrail tests (CI gate)
```

## Architecture

- **Hub** — `src/app/page.tsx` → `src/components/landing/LandingPage.tsx`
  stacks section components from `src/components/landing/sections/`.
- **Spokes** — one `SpokeDef` object per satellite page in
  `src/marketing/spokes/registry.ts`. Pages (`/features/*`, `/how-to/*`,
  `/for/*`, `/alternatives/*`), footer sitemap, `sitemap.xml`, `llms.txt` and
  markdown twins ALL derive from that one registry — adding a page is adding
  one object. Never keep parallel page lists.
- **SEO core** — `src/lib/seo/` (constants, per-archetype metadata, JSON-LD
  builders with stable `@id`s). `FORBIDDEN_KEYWORDS` / `FORBIDDEN_CLAIMS`
  are enforced by `spokes.test.ts` in CI.
- **Markdown twins** — every spoke serves `text/markdown` at `<route>.md` and
  via `Accept: text/markdown` (rewrites in `src/proxy.ts`).
- **Scale model** — the landing is authored at 1440 and scales via CSS `zoom`
  (`.ld` in `src/components/landing/landing.css`). Below 1280px: real
  responsive layout, no zoom.
- **Analytics** — façade `src/lib/analytics.ts` (PostHog + GA4, each leg
  no-op unless its env is set), UTM attribution in `src/lib/attribution.ts`,
  every CTA fires `landing_cta_click` via `CtaButton`.
- **Waitlist** — `NEXT_PUBLIC_LAUNCH_MODE=waitlist|live` flips every CTA
  (`src/lib/launch.ts`). Form: honeypot + time gate + UTM on every row;
  API: `src/app/api/waitlist/route.ts` (storage is a TODO stub).
- **Mounting** — standalone by default; to mount under a parent domain path
  set `NEXT_PUBLIC_BASE_PATH` + `NEXT_PUBLIC_SITE_ORIGIN` (see `.env.example`).
  Raw asset paths must go through `asset()` / `LocalImage` (basePath traps).

## Before launch

- Replace every `TODO(brand)` (tokens in `landing.css`, names/domain in
  `src/lib/seo/constants.ts`, hero/OG copy).
- Replace the `sample-feature` spoke with real spokes; fill
  `owns[]`/`avoids[]` for each — the anti-cannibalization contract.
- Wire waitlist storage (email provider or DB) in the API route.
- Bump `APP_DATE_MODIFIED` and sitemap `LAST_MODIFIED` on real content changes.
