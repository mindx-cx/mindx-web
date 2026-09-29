import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/LegalPage';
import { legalPages } from '@/content/legal';
import { pageMetadata } from '@/content/seo';

export const metadata: Metadata = pageMetadata({
  path: '/subprocessors',
  title: `${legalPages['subprocessors'].title} — MindX`,
  description: legalPages['subprocessors'].description,
});

export default function SubprocessorsPage() {
  return <LegalPage page="subprocessors" path="/subprocessors" />;
}
