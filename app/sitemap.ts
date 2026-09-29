import type { MetadataRoute } from 'next';
import { isWaitlist, siteUrl } from '@/lib/config';

// Spec C3, plus /waitlist. /brain-scan and /demo are left out while they
// redirect to the waitlist.
const routes = [
  '',
  '/brain',
  '/workers/resolve',
  '/workers/convert',
  '/workers/grow',
  ...(isWaitlist ? ['/waitlist'] : ['/brain-scan', '/demo']),
  '/pricing',
  '/trust',
  '/integrations',
  '/about',
  '/design-partners',
  '/faq',
  '/terms',
  '/privacy',
  '/dpa',
  '/subprocessors',
  '/acceptable-use',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${siteUrl}${r}`,
    lastModified: new Date(),
    changeFrequency: r === '' ? 'weekly' : 'monthly',
    priority: r === '' ? 1 : ['/brain-scan', '/waitlist', '/pricing'].includes(r) ? 0.9 : 0.7,
  }));
}
