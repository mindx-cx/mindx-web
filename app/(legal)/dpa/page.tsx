import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/LegalPage';
import { legalPages } from '@/content/legal';
import { pageMetadata } from '@/content/seo';

export const metadata: Metadata = pageMetadata({
  path: '/dpa',
  title: `${legalPages['dpa'].title} — MindX`,
  description: legalPages['dpa'].description,
});

export default function DpaPage() {
  return <LegalPage page="dpa" path="/dpa" />;
}
