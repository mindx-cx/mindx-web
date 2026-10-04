import { readFileSync } from 'node:fs';
import path from 'node:path';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { withPlaceholders } from '@/components/ui/Placeholder';
import { legalCopy, legalPages, type LegalPageKey } from '@/content/legal';

/**
 * Legal page layout. CHANGED 4 Oct 2026 (Rajesh): light cream title like the
 * rest of the site, then the policy in one white card -- contents on the
 * left (sticky on wide screens), the numbered sections on the right. The
 * `.legal` styles in globals.css do the two-column layout.
 *
 * Pages with a source file render the policy carried over from the previous
 * site (read at build time; the HTML is our own reviewed content). That text
 * still names "MindX Digital Softwares Inc." and the old Starter/Growth/Scale
 * plans and needs legal review before launch; the note about it used to show
 * to visitors and now lives only here.
 */
export function LegalPage({ page, path: routePath }: { page: LegalPageKey; path: string }) {
  const meta = legalPages[page];
  const html = meta.file ? readFileSync(path.join(process.cwd(), 'content', 'legal', meta.file), 'utf8') : null;

  return (
    <>
      <Breadcrumbs name={meta.title} path={routePath} />
      <section className="bg-cream pb-10 pt-14 md:pb-12 md:pt-20">
        <div className="container-x max-w-6xl">
          <p className="t-eyebrow text-muted-fg">{legalCopy.eyebrow}</p>
          <h1 className="t-h1 mt-3 text-fg">{meta.title}</h1>
          {meta.updated && (
            <p className="mt-3 text-small text-muted-fg">
              {legalCopy.updatedLabel}: {meta.updated}
            </p>
          )}
        </div>
      </section>
      <section className="bg-cream pb-section-m md:pb-section">
        <div className="container-x max-w-6xl">
          {html ? (
            <div className="legal rounded-card border border-line bg-white p-6 shadow-card md:p-10" dangerouslySetInnerHTML={{ __html: html }} />
          ) : (
            <div className="rounded-card border border-line bg-white p-6 shadow-card md:p-8">
              <p className="t-h3 text-fg">{meta.description}</p>
              <p className="mt-3 text-muted-fg">{meta.purpose}</p>
              <p className="mt-6 text-fg">{withPlaceholders(legalCopy.draftNotice)}</p>
            </div>
          )}
          <p className="mt-8 text-small text-muted-fg">{legalCopy.questions}</p>
        </div>
      </section>
    </>
  );
}
