import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo/constants';
import { SPOKES, spokePath } from '@/marketing/spokes/registry';
import { routing, localizedPath } from '@/i18n/routing';

/**
 * Hard-coded, bumped on real content changes. NEVER `new Date()` — a
 * lastModified that changes every deploy trains Google to ignore it.
 * changeFrequency omitted — Google ignores it.
 */
const LAST_MODIFIED = '2026-08-20';

/** Builds one sitemap entry per locale for a given unprefixed (English) path,
 * each carrying `alternates.languages` pointing at every other locale's
 * variant plus `x-default` → the unprefixed URL. */
function localizedEntries(path: string, priority: number): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${BASE_URL}${localizedPath(l, path)}`]),
  );
  languages['x-default'] = `${BASE_URL}${path}`;
  return routing.locales.map((locale) => ({
    url: `${BASE_URL}${localizedPath(locale, path)}`,
    lastModified: LAST_MODIFIED,
    priority,
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...localizedEntries('/', 1),
    ...SPOKES.flatMap((s) => localizedEntries(spokePath(s), 0.8)),
    ...localizedEntries('/privacy', 0.3),
    ...localizedEntries('/terms', 0.3),
  ];
}
