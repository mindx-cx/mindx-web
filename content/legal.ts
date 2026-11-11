// Legal pages (spec B10.3). Privacy Policy and Terms of Service carry over the
// text published on the current themindx.ai site (content/legal/*.html) so
// nothing linked from the Shopify App Store breaks.
//
// CHANGED 11 Nov 2026: the /dpa, /subprocessors and /acceptable-use pages
// were removed. They only showed draft placeholders. The Terms (7.1) and the
// Privacy Policy (section 21) say a DPA is available on request at
// support@themindx.ai.

export type LegalPageKey = 'terms' | 'privacy';

export const legalPages: Record<
  LegalPageKey,
  { title: string; description: string; updated?: string; file?: string; purpose?: string }
> = {
  terms: {
    title: 'Terms of Service',
    description: 'The terms that govern your use of MindX.',
    updated: '11 November 2026',
    file: 'terms.html',
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How MindX collects, uses and protects personal data.',
    updated: '11 November 2026',
    file: 'privacy.html',
  },
};

export const legalCopy = {
  eyebrow: 'Legal',
  updatedLabel: 'Last updated',
  draftNotice: '[Lawyer to provide the final text before launch.]',
  questions: 'Questions about this page? Email founders@themindx.com.',
} as const;
