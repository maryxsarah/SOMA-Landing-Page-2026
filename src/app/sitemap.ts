import type { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo/constants';
import { SPOKES, spokePath } from '@/marketing/spokes/registry';

/**
 * Hard-coded, bumped on real content changes. NEVER `new Date()` — a
 * lastModified that changes every deploy trains Google to ignore it.
 * changeFrequency omitted — Google ignores it.
 */
const LAST_MODIFIED = '2026-07-19';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: LAST_MODIFIED, priority: 1 },
    ...SPOKES.map((s) => ({
      url: `${BASE_URL}${spokePath(s)}`,
      lastModified: LAST_MODIFIED,
      priority: 0.8,
    })),
  ];
}
