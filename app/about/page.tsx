import Image from 'next/image';
import { CircleCheck, Layers, Linkedin, Workflow } from 'lucide-react';
import { CTABand } from '@/components/layout/CTABand';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Section } from '@/components/ui/Section';
import { about } from '@/content/company';
import { pageMetadata, seo } from '@/content/seo';

export const metadata = pageMetadata(seo.about);

const beliefIcons = [Layers, CircleCheck, Workflow];

// About (B9.1). CHANGED 3 Oct 2026 (Rajesh): a letter signed by both
// co-founders, a card for each, and three beliefs. Light cream page in the
// prototype's style, like Home: the old dark hero and the "Become a design
// partner" button (its page no longer exists) are gone.
export default function AboutPage() {
  const [first, second] = about.founders;

  return (
    <>
      <Breadcrumbs name="About" path={seo.about.path} />

      <Section theme="cream" className="pt-14 md:pt-20">
        <div className="mx-auto max-w-[780px]">
          <p className="t-eyebrow text-center text-muted-fg">{about.eyebrow}</p>
          <h1 className="t-h1 mt-3 text-center text-fg">
            {about.titleLead} <span className="text-brand">{about.titleBrand}</span>
          </h1>

          {/* The letter: one white card, written in "we", signed by both. */}
          <article className="mt-10 rounded-card border border-line bg-white px-6 py-8 shadow-card md:px-14 md:py-12">
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {about.founders.map((f) => (
                    <Image
                      key={f.name}
                      src={f.photo}
                      alt=""
                      width={56}
                      height={56}
                      className="h-14 w-14 rounded-pill border-2 border-white object-cover object-[50%_30%]"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-display text-[18px] leading-snug text-fg">
                    {first.name} and {second.name}
                  </p>
                  <p className="text-small text-muted-fg">Co-founders, MindX AI</p>
                </div>
              </div>
              <p className="text-xs uppercase tracking-[0.14em] text-muted-fg">{about.dateLabel}</p>
            </header>

            <div className="mt-8 space-y-5 font-display text-[18px] leading-[1.75] text-fg md:text-[19px]">
              <p>{about.greeting}</p>
              <p>{about.intro}</p>
              {about.letter.map((part) => (
                <p key={part.q}>
                  <strong className="font-medium">{part.q}</strong> {part.a}
                </p>
              ))}
              <p>{about.closing}</p>
            </div>

            <footer className="mt-10 border-t border-line pt-6">
              <p className="font-display text-[18px] italic text-fg">{about.signOff}</p>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {about.founders.map((f) => (
                  <div key={f.name}>
                    <p className="font-display text-[19px] font-medium text-fg">{f.name}</p>
                    <p className="text-small text-muted-fg">{f.role}</p>
                  </div>
                ))}
              </div>
              <a
                href={`mailto:${about.contactEmail}`}
                className="mt-5 inline-block text-small font-medium text-brand hover:underline"
              >
                {about.contactEmail}
              </a>
            </footer>
          </article>
        </div>
      </Section>

      <Section theme="cream" className="pt-0 md:pt-0">
        <div className="mx-auto max-w-[780px]">
          <h2 className="t-h2 text-fg">{about.foundersTitle}</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {about.founders.map((f) => (
              <div key={f.name} className="flex flex-col gap-4 rounded-card border border-line bg-white p-6 shadow-card">
                <div className="flex items-center gap-4">
                  <Image
                    src={f.photo}
                    alt={f.name}
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-pill object-cover object-[50%_30%]"
                  />
                  <div>
                    <p className="text-[17px] font-semibold text-fg">{f.name}</p>
                    <p className="text-small text-muted-fg">{f.role}</p>
                  </div>
                </div>
                <p className="text-[15px] leading-relaxed text-fg">{f.bio}</p>
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-small font-medium text-brand hover:underline"
                >
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                  <span className="sr-only">profile of {f.name}</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section theme="cream" className="pt-0 md:pt-0">
        <div className="mx-auto max-w-[780px]">
          <h2 className="t-h2 text-fg">{about.beliefsTitle}</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {about.beliefs.map((belief, i) => {
              const Icon = beliefIcons[i];
              return (
                <div key={belief} className="rounded-card border border-line bg-white p-6 shadow-card">
                  <span className="flex h-10 w-10 items-center justify-center rounded-row bg-surface text-brand">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="mt-4 font-display text-[19px] leading-snug text-fg">{belief}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      <CTABand heading={about.ctaHeading} body={about.ctaBody} secondaryCta={null} />
    </>
  );
}
