import { NextRequest, NextResponse } from 'next/server';

/**
 * Edge proxy (Next 16: `export function proxy`). Three jobs:
 *  1. Optional basic-auth gate for staging (skip when env unset) with a
 *     public allowlist — crawler surface must never sit behind auth.
 *  2. Markdown rewrites: `<route>.md` or `Accept: text/markdown` → md twins.
 *  3. Crawlable-noindex app routes by X-Robots-Tag header (never
 *     robots-disallow them — a disallowed page can still rank).
 *
 * NEVER create middleware.ts alongside this file — in Next 16 having both
 * hangs every request.
 */

const SPOKE_BUCKET_RE = /^\/(features|for|how-to|alternatives|compare)\/([^/]+?)(\.md)?$/;
const PUBLIC_PATHS = ['/robots.txt', '/sitemap.xml', '/llms.txt', '/opengraph-image'];
const NOINDEX_ROUTES = ['/auth', '/dashboard', '/editor'];

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

  // 2. Markdown twins.
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

  // 3. Crawlable-noindex for future app routes.
  if (NOINDEX_ROUTES.some((p) => pathname.startsWith(p))) {
    const res = NextResponse.next();
    res.headers.set('X-Robots-Tag', 'noindex, nofollow, nocache');
    return res;
  }

  return NextResponse.next();
}

export const config = {
  // Excludes _next/static, _next/image, favicon and /landing assets: the image
  // optimizer's internal self-fetch carries no auth header on a gated deploy.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|landing/).*)'],
};
