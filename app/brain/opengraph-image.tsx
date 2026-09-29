import { ogImage } from '@/lib/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'The brain your business never had';

export default function Image() {
  return ogImage('The brain your business never had');
}
