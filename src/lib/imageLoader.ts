import type { ImageLoaderProps } from 'next/image';
import { BASE_PATH } from './asset';

/**
 * The built-in next/image loader omits basePath inside the `url=` query param,
 * so /_next/image 400s when the site is mounted under a basePath.
 */
export default function basePathImageLoader({ src, width, quality }: ImageLoaderProps) {
  const prefixed = src.startsWith('/') ? `${BASE_PATH}${src}` : src;
  return `${BASE_PATH}/_next/image?url=${encodeURIComponent(prefixed)}&w=${width}&q=${quality ?? 75}`;
}
