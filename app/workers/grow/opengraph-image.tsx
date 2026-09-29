import { ogImage } from '@/lib/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Marketing you only pay for when it works';

export default function Image() {
  return ogImage('Marketing you only pay for when it works');
}
