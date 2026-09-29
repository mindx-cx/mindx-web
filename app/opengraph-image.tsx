import { ogImage } from '@/lib/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Your whole store, in one brain. AI workers that do the work.';

export default function Image() {
  return ogImage('Your whole store, in one brain. AI workers that do the work.');
}
