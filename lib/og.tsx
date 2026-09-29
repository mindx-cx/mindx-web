import { ImageResponse } from 'next/og';

export const ogSize = { width: 1200, height: 630 };

/**
 * Open Graph image (A11): navy background, mint "MindX" eyebrow, the page H1
 * in white, 1200 × 630. Adapted to the blue brand palette.
 */
export function ogImage(title: string, eyebrow = 'MindX AI · The Ecommerce Brain') {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: 'linear-gradient(160deg, #071A45 0%, #0D2B6E 60%, #1358D0 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: '#6EE7B7' }} />
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 4, color: '#6EE7B7', textTransform: 'uppercase' }}>
            {eyebrow}
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: title.length > 48 ? 64 : 76, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#AEB8D2' }}>
          <span>themindx.ai</span>
          <span>AI Workers for Shopify</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
