import { ImageResponse } from 'next/og';
import { PRICING } from '@/lib/pricing';
import { BRAND } from '@/lib/seo/constants';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `${BRAND.productFull} — ${BRAND.tagline}`;

/**
 * Server-rendered OG card so brand strings can't drift from code. This root
 * image is the fallback referenced by pageMetadata for every page.
 *
 * Palette follows the kinetic v7 homepage (deep violet -> near-black, with
 * the periwinkle accent), NOT the light "vapor" palette of the previous
 * site: this card is what people actually see when the link is pasted into
 * a DM, and the growth plan runs through creators sharing exactly that way.
 * An off-brand card is a wasted impression at the highest-intent moment.
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
          background: 'radial-gradient(130% 100% at 50% -10%, #3B2B70 0%, #201A45 42%, #0C0A16 100%)',
          color: '#F3F4FA',
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
              'radial-gradient(circle at 32% 28%, #FFFFFF 0%, #C9D6FF 30%, #8FAEF8 60%, #3B2B70 100%)',
          }}
        />
        <div style={{ fontSize: 28, color: '#8FAEF8', fontFamily: 'sans-serif' }}>
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
              background: '#8FAEF8',
              color: '#14102B',
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
              border: '1px solid rgba(255,255,255,0.28)',
              color: '#C6C9DC',
              fontSize: 24,
              fontFamily: 'sans-serif',
            }}
          >
            {`Free ${PRICING.trialDays}-day trial · $${PRICING.monthly}/mo · iPhone`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
