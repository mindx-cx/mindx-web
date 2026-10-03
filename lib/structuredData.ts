// Structured data (spec C4).
import { site } from '@/content/site';
import { siteUrl } from './config';

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.legalName,
  alternateName: site.name,
  url: siteUrl,
  // CHANGED 3 Oct 2026: the MindX AI app icon (white MX on blue), as a PNG
  // because search engines want a raster logo of at least 112 px.
  // The PNG this pointed at was the old headset mark, and it was deleted
  // with it -- leaving the organisation's logo in search results and
  // social cards pointing at a file that is not there. Note that nginx
  // answers missing paths with the 404 page at status 200, so this broke
  // silently rather than 404ing where anyone would notice.
  logo: `${siteUrl}/brand/mindx-ai-icon-512.png`,
  email: site.contactEmail,
  description: 'MindX is the Ecommerce Brain for Shopify merchants.',
};

export const softwareApplicationLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MindX',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '49',
    highPrice: '499',
    offerCount: '3',
  },
  description:
    'The Ecommerce Brain for Shopify, with MindX Resolve, an AI customer-service worker priced at $0.90 per resolved conversation.',
};
