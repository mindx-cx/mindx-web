// Legal pages (spec B10.3). Privacy Policy and Terms of Service carry over the
// text published on the current themindx.ai site (content/legal/*.html) so
// nothing linked from the Shopify App Store breaks. The other three need a
// lawyer's text before launch.

export type LegalPageKey = 'terms' | 'privacy' | 'dpa' | 'subprocessors' | 'acceptable-use';

export const legalPages: Record<
  LegalPageKey,
  { title: string; description: string; updated?: string; file?: string; purpose?: string }
> = {
  terms: {
    title: 'Terms of Service',
    description: 'The terms that govern your use of MindX.',
    updated: 'October 28, 2025',
    file: 'terms.html',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How MindX collects, uses and protects personal data.',
    updated: '24 June 2026',
    file: 'privacy.html',
  },
  dpa: {
    title: 'Data Processing Agreement',
    description: 'The data processing terms for merchants using MindX.',
    purpose: 'Merchants will ask for it.',
  },
  subprocessors: {
    title: 'Subprocessors',
    description: 'The third parties that help MindX run the service.',
    purpose: 'Lists the AI and hosting providers that process data for MindX.',
  },
  'acceptable-use': {
    title: 'Acceptable Use Policy',
    description: 'What merchants may not use MindX for.',
    purpose: 'Sets out what merchants may not use MindX for.',
  },
};

export const legalCopy = {
  eyebrow: 'Legal',
  updatedLabel: 'Last updated',
  draftNotice: '[Lawyer to provide the final text before launch.]',
  questions: 'Questions about this page? Email founders@themindx.com.',
} as const;
