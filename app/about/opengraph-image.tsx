import { ogImage } from '@/lib/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = "We're building the brain every ecommerce business will run on";

export default function Image() {
  return ogImage("We're building the brain every ecommerce business will run on");
}
