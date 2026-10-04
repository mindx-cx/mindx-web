import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { messages } from '@/content/messages';
import { ctas } from '@/content/site';

// 404 (A8 row 16, B10.5).
// CHANGED 4 Oct 2026 (Rajesh): new look like the other pages (cream ground,
// serif headline), no more "Brain Scan" line. The way home is the blue
// button; early access is the soft one beside it.
export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-cream py-24 text-fg">
      <div className="container-x">
        <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
          <p className="t-eyebrow text-muted-fg">Page not found</p>
          <h1 className="t-h1 mt-3">{messages.notFound}</h1>
          <p className="t-body-l mt-5 text-muted-fg">It may have moved. Try the home page.</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button href="/" variant="brand" arrow={false}>
              Go to the home page
            </Button>
            <Link
              href={ctas.brainScan.href}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-ctl bg-surface px-7 py-3.5 text-[15px] font-semibold leading-5 text-fg transition-colors duration-150 hover:bg-muted-bg"
            >
              {ctas.brainScan.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
