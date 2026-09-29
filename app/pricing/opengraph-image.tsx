import { ogImage } from '@/lib/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Pay for the Brain. Pay workers only for results.';

export default function Image() {
  return ogImage('Pay for the Brain. Pay workers only for results.');
}
