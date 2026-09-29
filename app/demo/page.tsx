import { LeadForm } from '@/components/forms/LeadForm';
import { HeroBackdrop } from '@/components/sections/Hero';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { withPlaceholders } from '@/components/ui/Placeholder';
import { demoPage as copy } from '@/content/scanDemo';
import { pageMetadata, seo } from '@/content/seo';

export const metadata = pageMetadata(seo.demo);

// Book a demo (A8 row 13, B9.4): form, then the Cal.com calendar when
// NEXT_PUBLIC_CAL_LINK is set. In waitlist mode /demo redirects to /waitlist?intent=demo.
export default function DemoPage() {
  return (
    <>
      <Breadcrumbs name="Book a demo" path={seo.demo.path} />
      <section className="relative overflow-hidden bg-hero-page pb-24 pt-36 text-white md:pb-32 md:pt-44">
        <HeroBackdrop />
        <div className="container-x relative grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="lg:pt-4">
            <p className="t-eyebrow text-mint-400">{copy.eyebrow}</p>
            <h1 className="t-h1 mt-4">{copy.title}</h1>
            <p className="t-body-l mt-5 text-blue-50">{copy.body}</p>
            <div className="mt-10 rounded-card border border-white/15 bg-white/[.06] p-5">
              <h2 className="font-semibold">{copy.contactsTitle}</h2>
              <dl className="mt-3 grid gap-2 text-small sm:grid-cols-2">
                {copy.contacts.map((c) => (
                  <div key={c.label}>
                    <dt className="text-gray-300">{c.label}</dt>
                    <dd>
                      <a href={`mailto:${c.value}`} className="rounded-sm font-semibold text-white underline underline-offset-2">
                        {c.value}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-gray-300">{withPlaceholders(copy.contactsNote)}</p>
            </div>
          </div>
          <div className="rounded-card bg-white p-6 text-ink-950 shadow-mock md:p-8">
            <LeadForm type="demo" />
          </div>
        </div>
      </section>
    </>
  );
}
