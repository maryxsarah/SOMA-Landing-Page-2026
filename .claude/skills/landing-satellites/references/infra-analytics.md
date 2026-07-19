# Infra (basePath mounting, proxy, deploy) + analytics

## Mounting model

The site deploys as its own service but is publicly served under a path on the
parent domain (`domain.com/tools/<product>`) via reverse proxy. Locally it runs
at root. One env var switches:

- prod build: `NEXT_PUBLIC_BASE_PATH=/tools/<product>`,
  `NEXT_PUBLIC_SITE_ORIGIN=https://domain.com/tools/<product>`
- dev: both unset.

## next.config.ts

```ts
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'standalone',                      // Docker / Cloud Run deploy
  ...(BASE_PATH ? { basePath: BASE_PATH, assetPrefix: BASE_PATH } : {}),
  poweredByHeader: false,
  images: { deviceSizes: [640, 768, 1024, 1280, 1440, 1920, 2560, 3840], minimumCacheTTL: 31536000 },
  async headers() {
    return [
      { source: '/(.*)', headers: [
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ] },
      // long-cache decorative asset dirs:
      { source: '/landing/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ];
  },
};
```

Add `sharp` as a runtime dep for on-the-fly AVIF/WebP in standalone mode.

## The basePath trap list (the #1 prod-only breakage class)

Next auto-prefixes: `<Link>`, `<Image>`, `useRouter().push`, `next/font`,
`_next/*`. Next does NOT prefix: raw `<img src>`, `window.location` reads and
writes, CSS `url()`, inline `@font-face`. Route everything in the second list
through helpers — `src/lib/asset.ts`:

```ts
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prefix a public-asset or app-route path with the runtime basePath.
 *  Absolute URLs and data: URIs pass through unchanged. */
export function asset(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) return path;
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
}

/** basePath-aware pathname check — the browser's pathname INCLUDES the
 *  basePath, so naive startsWith checks pass on dev and fail on prod. */
export function isAtPath(appRoute: string): boolean {
  if (typeof window === 'undefined') return false;
  const route = appRoute.startsWith('/') ? appRoute : `/${appRoute}`;
  return window.location.pathname.startsWith(`${BASE_PATH}${route}`);
}
```

`next/image` extra trap: the built-in loader omits basePath inside the `url=`
query param, so `/_next/image` 400s in prod. Fix with a custom loader:

```ts
// src/lib/imageLoader.ts
export default function basePathImageLoader({ src, width, quality }: ImageLoaderProps) {
  const prefixed = src.startsWith('/') ? `${BASE_PATH}${src}` : src;
  return `${BASE_PATH}/_next/image?url=${encodeURIComponent(prefixed)}&w=${width}&q=${quality ?? 75}`;
}
// LocalImage.tsx: 'use client' thin wrapper <Image loader={basePathImageLoader} {...props} />
```

## Edge proxy — `src/proxy.ts` (Next 16: `export function proxy`; older: middleware)

Three jobs in one matcher:

1. **Optional basic-auth gate** for staging (`BASIC_AUTH_USER`/`BASIC_AUTH_PASS`
   env; skip when unset) with a public allowlist: `robots.txt`, `sitemap.xml`,
   `llms.txt`, docs/media paths — crawler surface must never sit behind auth.
2. **Markdown rewrites**: requests ending `.md` OR carrying
   `Accept: text/markdown` (and not `text/html`) rewrite to the md-twin routes —
   spokes to `/spoke-md/<bucket>/<slug>` (bucket regex
   `features|for|how-to|alternatives|compare`), docs to their raw route.
3. **noindex app routes by header**: tag `/editor`, `/dashboard`, `/auth` with
   `X-Robots-Tag: noindex, nofollow, nocache` (crawlable-noindex, not
   robots-disallow).

Matcher excludes `_next/static`, `_next/image`, `favicon.ico`, and the
decorative asset dir (the image optimizer's internal self-fetch carries no auth
header on a gated deploy — including it breaks every image behind basic auth).

**Never create both `middleware.ts` and `proxy.ts`** — in Next 16 having both
hangs every request, and the error surfaces only in `.next/dev/logs/`.

## Deploy

Dockerfile from the standalone output (`node server.js`), deploy to Cloud Run or
any container host; Cloudflare (or similar) in front caches `_next/image`
variants and immutable assets. The parent domain's proxy maps
`/tools/<product>/*` → the service.

## Analytics: one façade, two destinations, consent-correct

Three files. Every product surface calls ONLY the façade.

### `src/lib/posthog.ts` — the only posthog-js import

```ts
posthog.init(POSTHOG_KEY, {
  api_host: POSTHOG_HOST,          // first-party reverse proxy host, e.g. https://j.domain.com → us.i.posthog.com (dodges ad-blockers)
  ui_host: 'https://us.posthog.com',
  autocapture: false,              // explicit taxonomy only
  capture_pageview: false,         // SPA: façade fires $pageview per route change
  capture_pageleave: true,
  persistence: 'localStorage+cookie',
  session_recording: { maskAllInputs: true, maskTextSelector: '[data-sensitive]' },
});
```

SSR-guarded, idempotent init; export failure-isolated `posthogCapture/Identify/
Reset/DistinctId` wrappers (a tracking layer must never be a hot-path failure).

### `src/lib/analytics.ts` — the façade

```ts
export function track(event: string, params: TrackParams = {}): void {
  const stamped = { app: APP_NAME, ...params };   // stamp every event with the product
  gtagSafe('event', event, stamped);              // GA4 leg: no-op unless NEXT_PUBLIC_GA4_MEASUREMENT_ID
  posthogCapture(event, stamped);                 // PostHog leg: no-op unless NEXT_PUBLIC_POSTHOG_KEY
}
export function identify(userId: string, profile: IdentifyProfile = {}): void {
  const props = { plan: profile.plan, original_utm_source: profile.originalUtmSource, /* … */ };
  gtagSafe('set', 'user_id', userId);
  gtagSafe('set', 'user_properties', props);
  posthogIdentify(userId, props);
}
export function pageView(path: string, search?: string): void {
  const params = { app: APP_NAME, page_path: path, page_search: search ?? '', page_location: window?.location.href };
  gtagSafe('event', 'page_view', params);
  posthogCapture('$pageview', params);
}
// + setUserProps, reset() on logout, analyticsEnabled()
```

`gtagSafe` lazy-installs a `dataLayer` stub and swallows errors. GA4 config with
`send_page_view: false` — page views fire manually so both legs agree.

### `src/lib/attribution.ts` — UTM capture (the payoff of satellite pages)

First-touch (`<product>_original_attribution`, written once, sticky) +
last-touch (overwritten each campaign visit). Capture
`utm_source/medium/campaign/content/term` from `window.location.search`; empty
UTMs never overwrite stored ones; localStorage in try/catch (Safari private
mode). `readOriginalAttribution()` feeds `identify()` at signup — signups cohort
by the spoke/campaign that brought them.

### `src/components/AnalyticsBinder.tsx` — mount once in root providers

- `useEffect` boot: `initPostHog()`.
- On `usePathname()` change: read `window.location.search` directly (avoids a
  `useSearchParams` Suspense boundary), `captureAttribution(search)`, then
  `pageView(pathname, search)`.
- On auth state change: `identify(user.id, readOriginalAttribution())` guarded
  by a `lastIdentified` ref; `reset()` on logout.
- Renders the GA4 gtag `<Script>` pair only when the measurement id env is set,
  with a Consent Mode v2 bootstrap: all four consent signals default `denied`,
  `wait_for_update: 500`, replay stored consent from localStorage before first
  `config`.
- Pause session recording on `/auth/*` routes.

### Funnel events

The CTA component fires `landing_cta_click {label, href, path, variant}` on
every marketing CTA (see scale-and-ui reference). With `pageView` + UTM
attribution + `identify`, that is the complete landing funnel:
spoke page_view → landing_cta_click → signup (identified with original UTM).

Env summary: `NEXT_PUBLIC_POSTHOG_KEY` (+optional `NEXT_PUBLIC_POSTHOG_HOST`),
`NEXT_PUBLIC_GA4_MEASUREMENT_ID` (optional), `NEXT_PUBLIC_BASE_PATH`,
`NEXT_PUBLIC_SITE_ORIGIN`, staging-only `BASIC_AUTH_USER/PASS`.
