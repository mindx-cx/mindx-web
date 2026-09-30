import { launch } from '@/content/waitlist';
import { ogImage } from '@/lib/og';


// Static export renders this at build time rather than on request.
export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = `The Ecommerce Brain opens ${launch.dateLabel}`;

export default function Image() {
  return ogImage(`The Ecommerce Brain opens ${launch.dateLabel}`);
}
