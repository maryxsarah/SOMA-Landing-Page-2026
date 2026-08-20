import type { MetadataRoute } from 'next';
import { AI_CRAWLERS, BASE_URL, PARENT_URL } from '@/lib/seo/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: '/' })),
      // /auth is NOT disallowed on purpose: proxy.ts serves it with
      // `X-Robots-Tag: noindex`, and a crawler has to fetch the page to see
      // that header. Disallowing it instead would leave the URLs indexable
      // as bare links — exactly the failure the proxy comment warns about.
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: [`${BASE_URL}/sitemap.xml`],
    host: PARENT_URL,
  };
}
