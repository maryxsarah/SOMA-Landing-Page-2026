import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMetadata } from '@/lib/seo/metadata';
import { findSpoke, spokePath, spokesInBucket } from '@/marketing/spokes/registry';
import { SpokePage } from '@/marketing/spokes/SpokePage';

export function generateStaticParams() {
  return spokesInBucket('alternatives').map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(ctx: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await ctx.params;
  const spoke = findSpoke('alternatives', slug);
  if (!spoke) return {};
  return pageMetadata({
    archetype: 'alternative',
    subject: spoke.subject,
    description: spoke.description,
    path: spokePath(spoke),
  });
}

export default async function AlternativeSpoke(ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const spoke = findSpoke('alternatives', slug);
  if (!spoke) notFound();
  return <SpokePage spoke={spoke} />;
}
