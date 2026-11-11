import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/config';

// Static export renders this at build time rather than on request.
export const dynamic = 'force-static';

// Spec C3. /brain-scan and /demo are left out while they redirect to /signup.
// CHANGED 11 Nov 2026: /workers/*, /waitlist, /trust, /dpa, /subprocessors and
// /acceptable-use were removed from the site, so they are not listed.
const routes = [
  '',
  '/brain',
  '/signup',
  '/pricing',
  '/integrations',
  '/about',
  '/terms',
  '/privacy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${siteUrl}${r}`,
    lastModified: new Date(),
    changeFrequency: r === '' ? 'weekly' : 'monthly',
    priority: r === '' ? 1 : ['/signup', '/pricing'].includes(r) ? 0.9 : 0.7,
  }));
}
