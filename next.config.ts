import type { NextConfig } from 'next';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  // Docker / Cloud Run need standalone; on Vercel the platform handles output
  // itself (VERCEL env is set during vercel build).
  ...(process.env.VERCEL ? {} : { output: 'standalone' as const }),
  turbopack: { root: __dirname },
  ...(BASE_PATH ? { basePath: BASE_PATH, assetPrefix: BASE_PATH } : {}),
  poweredByHeader: false,
  images: {
    deviceSizes: [640, 768, 1024, 1280, 1440, 1920, 2560, 3840],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      // Decorative landing assets are filename-versioned (hero-v2.webp) — immutable.
      {
        source: '/landing/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
