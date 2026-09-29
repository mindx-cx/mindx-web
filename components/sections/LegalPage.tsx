import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { HeroBackdrop } from '@/components/sections/Hero';
import { withPlaceholders } from '@/components/ui/Placeholder';
import { legalCopy, legalPages, type LegalPageKey } from '@/content/legal';

/**
 * Legal page layout (A8 row 15): navy title band, then plain text. Pages with
 * a source file render the policy carried over from the current site
 * (read at build time; the HTML is our own reviewed content).
 */
export function LegalPage({ page, path: routePath }: { page: LegalPageKey; path: string }) {
  const meta = legalPages[page];
  const html = meta.file ? readFileSync(path.join(process.cwd(), 'content', 'legal', meta.file), 'utf8') : null;

  return (
    <>
      <Breadcrumbs name={meta.title} path={routePath} />
      <section className="relative overflow-hidden bg-navy-950 pb-12 pt-32 text-white md:pb-16 md:pt-40">
        <HeroBackdrop />
        <div className="container-x relative max-w-4xl">
          <p className="t-eyebrow text-mint-400">{legalCopy.eyebrow}</p>
          <h1 className="t-h1 mt-3">{meta.title}</h1>
          {meta.updated && (
            <p className="mt-3 text-small text-gray-300">
              {legalCopy.updatedLabel}: {meta.updated}
            </p>
          )}
        </div>
      </section>
      <section className="bg-white py-section-m md:py-16">
        <div className="container-x max-w-4xl">
          {html ? (
            <>
              <p className="mb-8 text-small text-ink-700">{withPlaceholders(legalCopy.reviewNotice)}</p>
              <div className="legal" dangerouslySetInnerHTML={{ __html: html }} />
            </>
          ) : (
            <div className="rounded-card border border-gray-200 bg-gray-50 p-6 md:p-8">
              <p className="t-h3">{meta.description}</p>
              <p className="mt-3 text-ink-700">{meta.purpose}</p>
              <p className="mt-6">{withPlaceholders(legalCopy.draftNotice)}</p>
            </div>
          )}
          <p className="mt-12 border-t border-gray-200 pt-6 text-small text-ink-700">{legalCopy.questions}</p>
        </div>
      </section>
    </>
  );
}
