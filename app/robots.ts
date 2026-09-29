import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/config';

// Spec C2, plus keeping crawlers out of form endpoints and the internal styleguide.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/styleguide'] }],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
