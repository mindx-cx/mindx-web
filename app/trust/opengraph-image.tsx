import { ogImage } from '@/lib/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Autonomy you control';

export default function Image() {
  return ogImage('Autonomy you control');
}
