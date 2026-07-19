'use client';

import Image, { type ImageProps } from 'next/image';
import basePathImageLoader from '@/lib/imageLoader';

/** basePath-aware next/image — use for ALL local images on the site. */
export const LocalImage = (props: Omit<ImageProps, 'loader'>) => (
  <Image loader={basePathImageLoader} {...props} />
);
