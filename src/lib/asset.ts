export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/**
 * Prefix a public-asset or app-route path with the runtime basePath.
 * Next auto-prefixes <Link>, <Image>, router.push, next/font and _next/* —
 * but NOT raw <img src>, window.location, CSS url(), inline @font-face.
 * Route everything from the second list through this helper.
 * Absolute URLs and data: URIs pass through unchanged.
 */
export function asset(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * basePath-aware pathname check — the browser's pathname INCLUDES the
 * basePath, so naive startsWith checks pass on dev and fail on prod.
 */
export function isAtPath(appRoute: string): boolean {
  if (typeof window === 'undefined') return false;
  const route = appRoute.startsWith('/') ? appRoute : `/${appRoute}`;
  return window.location.pathname.startsWith(`${BASE_PATH}${route}`);
}
