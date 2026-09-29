import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/LegalPage';
import { legalPages } from '@/content/legal';
import { pageMetadata } from '@/content/seo';

export const metadata: Metadata = pageMetadata({
  path: '/acceptable-use',
  title: `${legalPages['acceptable-use'].title} — MindX`,
  description: legalPages['acceptable-use'].description,
});

export default function AcceptableUsePage() {
  return <LegalPage page="acceptable-use" path="/acceptable-use" />;
}
