// Structured data (spec C4).
import { site } from '@/content/site';
import { siteUrl } from './config';

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.legalName,
  alternateName: site.name,
  url: siteUrl,
  // CHANGED: the spec's /logo.svg doesn't exist yet; uses the MX icon.
  logo: `${siteUrl}/brand/mx-mark.png`,
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
