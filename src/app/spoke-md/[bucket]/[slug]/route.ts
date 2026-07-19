import { BASE_URL } from '@/lib/seo/constants';
import { spokeToMarkdown } from '@/marketing/spokes/markdown';
import { findSpoke, SPOKES, spokePath } from '@/marketing/spokes/registry';
import type { SpokeBucket } from '@/marketing/spokes/types';

/**
 * Markdown twin route. The edge proxy rewrites `<route>.md` and
 * `Accept: text/markdown` requests here.
 */

export function generateStaticParams() {
  return SPOKES.map((s) => {
    const [, bucket, slug] = spokePath(s).split('/');
    return { bucket, slug };
  });
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ bucket: string; slug: string }> },
) {
  const { bucket, slug } = await ctx.params;
  const spoke = findSpoke(bucket as SpokeBucket, slug);
  if (!spoke) return new Response('Not found', { status: 404 });

  return new Response(spokeToMarkdown(spoke, BASE_URL), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'X-Robots-Tag': 'noindex',
      Vary: 'Accept',
    },
  });
}
