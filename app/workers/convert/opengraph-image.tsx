import { ogImage } from '@/lib/og';


// Static export renders this at build time rather than on request.
export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Turn questions into sales';

export default function Image() {
  return ogImage('Turn questions into sales');
}
