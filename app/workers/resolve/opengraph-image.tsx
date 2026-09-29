import { ogImage } from '@/lib/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'The AI support worker that finishes the job';

export default function Image() {
  return ogImage('The AI support worker that finishes the job');
}
