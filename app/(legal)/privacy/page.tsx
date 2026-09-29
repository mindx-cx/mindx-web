import type { Metadata } from 'next';
import { LegalPage } from '@/components/sections/LegalPage';
import { legalPages } from '@/content/legal';
import { pageMetadata } from '@/content/seo';

export const metadata: Metadata = pageMetadata({
  path: '/privacy',
  title: `${legalPages['privacy'].title} — MindX`,
  description: legalPages['privacy'].description,
});

export default function PrivacyPage() {
  return <LegalPage page="privacy" path="/privacy" />;
}
