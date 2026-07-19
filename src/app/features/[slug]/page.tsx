import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo/metadata';
import { findSpoke, spokePath, spokesInBucket } from '@/marketing/spokes/registry';
import { SpokePage } from '@/marketing/spokes/SpokePage';

export function generateStaticParams() {
  return spokesInBucket('features').map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(ctx: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await ctx.params;
  const spoke = findSpoke('features', slug);
  if (!spoke) return {};
  return pageMetadata({
    archetype: 'feature',
    subject: spoke.subject,
    description: spoke.description,
    path: spokePath(spoke),
  });
}

export default async function FeatureSpoke(ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const spoke = findSpoke('features', slug);
  if (!spoke) notFound();
  return <SpokePage spoke={spoke} />;
}
