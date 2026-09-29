import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/LegalPage';
import { legalPages } from '@/content/legal';
import { pageMetadata } from '@/content/seo';

export const metadata: Metadata = pageMetadata({
  path: '/terms',
  title: `${legalPages['terms'].title} — MindX`,
  description: legalPages['terms'].description,
});

export default function TermsPage() {
  return <LegalPage page="terms" path="/terms" />;
}
