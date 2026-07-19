import { ImageResponse } from 'next/og';
import { BRAND } from '@/lib/seo/constants';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${BRAND.productFull} — ${BRAND.tagline}`;

/**
 * Server-rendered OG card so brand strings can't drift from code. This root
 * image is the fallback referenced by pageMetadata for every page.
 * DS palette: mist gradient bg, vapor ink, sky accent, orb motif.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(180deg, #EAF1F7 0%, #F6F7F7 100%)',
          color: '#101315',
          fontFamily: 'serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: 90,
            top: 130,
            width: 240,
            height: 240,
            borderRadius: 999,
            background:
              'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #D2E1EE 32%, #86ABCB 62%, #2B4A63 100%)',
          }}
        />
        <div style={{ fontSize: 28, color: '#565F66', fontFamily: 'sans-serif' }}>
          {`( ${BRAND.productFull} )`}
        </div>
        <div style={{ fontSize: 92, fontWeight: 500, lineHeight: 1.05, marginTop: 24, maxWidth: 820 }}>
          {BRAND.tagline}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 48 }}>
          <div
            style={{
              padding: '12px 28px',
              borderRadius: 999,
              background: '#3E6A8C',
              color: '#FFFFFF',
              fontSize: 24,
              fontWeight: 600,
              fontFamily: 'sans-serif',
            }}
          >
            {BRAND.productShort}
          </div>
          <div
            style={{
              padding: '12px 28px',
              borderRadius: 999,
              border: '1px solid #CBD1D5',
              color: '#565F66',
              fontSize: 24,
              fontFamily: 'sans-serif',
            }}
          >
            AI health agent for all your wearables
          </div>
        </div>
      </div>
    ),
    size,
  );
}
