import { ogImage } from '@/lib/og';


// Static export renders this at build time rather than on request.
export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Start free. Pro $10, Max $50, Ultra $100 a month.';

export default function Image() {
  return ogImage('Start free. Pro $10, Max $50, Ultra $100 a month.');
}
