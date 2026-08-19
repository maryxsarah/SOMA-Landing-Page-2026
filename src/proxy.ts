import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';

/**
 * Edge proxy (Next 16: `export function proxy`). Five jobs:
 *  1. Optional basic-auth gate for staging (skip when env unset) with a
 *     public allowlist — crawler surface must never sit behind auth.
 *  2. Markdown rewrites: `<route>.md` or `Accept: text/markdown` → md twins.
 *     English-only by design (see SPOKE_BUCKET_RE comment below) — never
 *     matches a locale-prefixed path.
 *  3. Bypass next-intl for root-level unprefixed routes (sitemap, robots,
 *     llms.txt, OG image, spoke-md) that live outside app/[locale].
 *  4. Locale negotiation/redirect (next-intl) for everything else.
 *  5. Crawlable-noindex app routes by X-Robots-Tag header (never
 *     robots-disallow them — a disallowed page can still rank), applied on
 *     top of next-intl's response rather than a competing one.
 *
 * NEVER create middleware.ts alongside this file — in Next 16 having both
 * hangs every request.
 */

const SPOKE_BUCKET_RE = /^\/(features|for|how-to|alternatives|compare)\/([^/]+?)(\.md)?$/;
const PUBLIC_PATHS = [
  '/robots.txt',
  '/sitemap.xml',
  '/llms.txt',
  '/opengraph-image',
  // AASA + friends: locale-rewriting (or auth-gating) /.well-known/
  // 404s apple-app-site-association and silently kills the app's
  // universal links (email-confirmation deep link regression).
  '/.well-known',
];
const NOINDEX_ROUTES = ['/auth', '/dashboard', '/editor'];

const intlMiddleware = createIntlMiddleware(routing);

// Non-default locale prefixes only (`en` is unprefixed, `as-needed`).
const LOCALE_PREFIX_RE = new RegExp(
  `^/(${routing.locales.filter((l) => l !== routing.defaultLocale).join('|')})(?=/|$)`,
);
const stripLocalePrefix = (pathname: string) => pathname.replace(LOCALE_PREFIX_RE, '') || '/';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Staging basic-auth gate.
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASS;
  if (user && pass && !PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    const header = req.headers.get('authorization') ?? '';
    const expected = `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`;
    if (header !== expected) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="staging"' },
      });
    }
  }

  // 2. Markdown twins — deliberately English-only: SPOKE_BUCKET_RE anchors
  // the bucket name directly after the leading `/`, so a locale-prefixed
  // path (`/ru/features/x`) never matches and falls through to step 3 as a
  // normal localized page request instead. No per-locale markdown twins
  // exist yet — this is intentional scope, not a gap.
  const accept = req.headers.get('accept') ?? '';
  const wantsMarkdown =
    pathname.endsWith('.md') || (accept.includes('text/markdown') && !accept.includes('text/html'));
  if (wantsMarkdown) {
    const match = pathname.match(SPOKE_BUCKET_RE);
    if (match) {
      const url = req.nextUrl.clone();
      url.pathname = `/spoke-md/${match[1]}/${match[2]}`;
      return NextResponse.rewrite(url);
    }
  }

  // 3. Root-level unprefixed routes bypass next-intl entirely — they live
  // outside app/[locale] (sitemap.ts, robots.ts, llms.txt/route.ts,
  // opengraph-image.tsx, spoke-md/[bucket]/[slug]/route.ts) and next-intl
  // would otherwise try to locale-negotiate/rewrite them into a
  // [locale]-nested path that doesn't exist, 404ing every one of them.
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p)) || pathname.startsWith('/spoke-md')) {
    return NextResponse.next();
  }

  // 4. Locale negotiation/redirect/rewrite for everything else.
  const intlResponse = intlMiddleware(req);

  // 5. Crawlable-noindex for future app routes — mutate next-intl's own
  // response rather than building a second one, so there's never a "which
  // response wins" conflict.
  if (NOINDEX_ROUTES.some((p) => stripLocalePrefix(pathname).startsWith(p))) {
    intlResponse.headers.set('X-Robots-Tag', 'noindex, nofollow, nocache');
  }
  return intlResponse;
}

export const config = {
  // Excludes _next/static, _next/image, favicon and /landing, /media,
  // /assets: the image optimizer's internal self-fetch carries no auth
  // header on a gated deploy, and — separately — any public/ static file
  // that reaches next-intl's middleware gets rewritten to a locale-prefixed
  // path that doesn't exist (e.g. /media/x.webp -> /en/media/x.webp, 404),
  // since these live at the true root, not under app/[locale].
  matcher: ['/((?!_next/static|_next/image|favicon.ico|landing/|media/|assets/).*)'],
};
