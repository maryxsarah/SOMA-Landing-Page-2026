import type { MetadataRoute } from 'next';
import { AI_CRAWLERS, BASE_URL, PARENT_URL } from '@/lib/seo/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
      { userAgent: '*', allow: '/', disallow: ['/auth', '/api/'] },
    ],
    sitemap: [`${BASE_URL}/sitemap.xml`],
    host: PARENT_URL,
  };
}
