import { ogImage } from '@/lib/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Build MindX with us';

export default function Image() {
  return ogImage('Build MindX with us');
}
