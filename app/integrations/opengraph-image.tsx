import { ogImage } from '@/lib/og';


// Static export renders this at build time rather than on request.
export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Connect the tools your store already runs on.';

export default function Image() {
  return ogImage('Connect the tools your store already runs on.');
}
