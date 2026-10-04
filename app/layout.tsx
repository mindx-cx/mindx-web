import type { Metadata, Viewport } from 'next';
import { Newsreader } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import type { ReactNode } from 'react';
import { AnalyticsProvider } from '@/components/layout/AnalyticsProvider';
import { AttributionCapture } from '@/components/layout/AttributionCapture';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { RevealObserver } from '@/components/layout/RevealObserver';
import { JsonLd } from '@/components/seo/JsonLd';
import { pageMetadata, seo } from '@/content/seo';
import { announcementScript } from '@/lib/announcement';
import { organizationLd } from '@/lib/structuredData';
import { siteUrl } from '@/lib/config';
// The shared MindX design tokens (colours, fonts, shape). Loaded before the
// site's own CSS, which reads every colour from them through tailwind.config.
import '../public/brand/mindx-tokens.css';
import './globals.css';

// Geist is the prototype's face. The `geist` package ships the files, so it is
// self-hosted like the rest -- a static export must not reach out to a font CDN
// on first paint.

// Headline face (display, h1, h2, stats): a serif, as in the prototype, used
// only for headlines; everything else stays Geist. Variable font with its
// optical-size axis, so large headlines get the display cut.
const newsreader = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  variable: '--font-newsreader',
  display: 'swap',
});

// Site defaults (home page, B11.1). Inner pages override with pageMetadata()
// from content/seo.ts; Open Graph images come from opengraph-image.tsx files.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...pageMetadata(seo.home),
};

export const viewport: Viewport = {
  themeColor: '#0C1A3A',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // suppressHydrationWarning: the head script adds classes/attributes to <html> before React loads.
    <html lang="en" className={`${GeistSans.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        {/* Before first paint: mark JS as on (enables scroll reveal) and apply announcement dismissal. */}
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add('js');${announcementScript}` }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[70] rounded-btn bg-blue-600 px-4 py-2 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <JsonLd data={organizationLd} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieBanner />
        <RevealObserver />
        <AttributionCapture />
        <AnalyticsProvider />
      </body>
    </html>
  );
}
