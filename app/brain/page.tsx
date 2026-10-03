import Image from 'next/image';
import { CircleCheck, PackageX, TrendingDown, Truck, UserRound } from 'lucide-react';
import { CTABand } from '@/components/layout/CTABand';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { IntegrationLogo, LevelPill } from '@/components/sections/IntegrationCards';
import { PageHero } from '@/components/sections/PageHero';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { Illustrative } from '@/components/ui/Illustrative';
import { Section } from '@/components/ui/Section';
import { howAct, howConnect, howCta, howFaq, howFaqTitle, howFind, howHero, howTrust, howWatch } from '@/content/brain';
import { byLevel } from '@/content/integrations';
import { pageMetadata, seo } from '@/content/seo';
import { ctas } from '@/content/site';
import { cn } from '@/lib/cn';

export const metadata = pageMetadata(seo.brain);

// One colour per kind of finding, the same mapping as Home's problem cards.
const KIND = {
  revenue: { icon: TrendingDown, fg: 'text-signal-revenue', bg: 'bg-signal-revenue/10' },
  fulfilment: { icon: Truck, fg: 'text-signal-fulfilment', bg: 'bg-signal-fulfilment/10' },
  product: { icon: PackageX, fg: 'text-signal-product', bg: 'bg-signal-product/10' },
  customer: { icon: UserRound, fg: 'text-muted-fg', bg: 'bg-surface' },
} as const;

/** Text column of a two-column section: serif heading, then paragraphs. */
function SplitText({ title, body }: { title: string; body: readonly string[] }) {
  return (
    <div className="max-w-[520px]">
      <h2 className="t-h2 text-fg">{title}</h2>
      {body.map((p) => (
        <p key={p} className="mt-4 text-[17px] leading-relaxed text-fg">
          {p}
        </p>
      ))}
    </div>
  );
}

const shopify = byLevel('brain')[0];

// How it works (route /brain). CHANGED 3 Oct 2026 (Rajesh): Connect / Find /
// Act with product cards, in place of the old dark page of text boxes. Every
// example uses Shopify data only, because that is all the Brain reads today.
export default function HowItWorksPage() {
  return (
    <>
      <Breadcrumbs name="How it works" path={seo.brain.path} />

      <PageHero
        eyebrow={howHero.eyebrow}
        title={
          <>
            {howHero.titleLead} <span className="text-brand">{howHero.titleBrand}</span>
          </>
        }
        subtitle={howHero.subtitle}
        primaryCta={ctas.brainScan}
        secondaryCta={howHero.secondaryCta}
      />

      {/* Connect */}
      <Section theme="cream2" className="border-t border-line">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SplitText title={howConnect.title} body={howConnect.body} />
          <div className="relative rounded-card border border-line bg-white p-5 shadow-card">
            <Illustrative label={howConnect.cardNote} />
            <p className="pr-28 text-[15px] font-semibold text-fg">{howConnect.cardTitle}</p>
            <ul className="mt-4 divide-y divide-line">
              {[shopify, ...byLevel('support')].map((item) => (
                <li key={item.name} className="flex items-center gap-3 py-3">
                  <IntegrationLogo item={item} size={32} />
                  <span className="flex-1 text-[15px] text-fg">{item.name}</span>
                  <LevelPill level={item.level} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Find */}
      <Section theme="cream">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative order-2 rounded-card border border-line bg-white p-4 shadow-card lg:order-1">
            <Illustrative />
            <p className="px-1 pb-3 pr-28 text-[15px] font-semibold text-fg">{howFind.cardTitle}</p>
            <ul className="space-y-2.5">
              {howFind.rows.map((row) => {
                const kind = KIND[row.kind];
                const Icon = kind.icon;
                return (
                  <li key={row.title} className="grid grid-cols-[36px_minmax(0,1fr)_auto] items-start gap-3 rounded-row border border-line p-3">
                    <span className={cn('flex h-9 w-9 items-center justify-center rounded-row', kind.bg, kind.fg)}>
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2 font-medium text-fg">
                        {row.title}
                        <span className="rounded-pill border border-line px-2 py-px text-xs font-medium text-fg">{row.pill}</span>
                      </p>
                      <p className="mt-1 text-[13.5px] leading-snug text-muted-fg">{row.body}</p>
                      <p className="mt-2 inline-flex items-center gap-1.5 rounded-pill bg-surface py-0.5 pl-2 pr-2.5 text-xs text-muted-fg">
                        <Image src="/logos/shopify.svg" alt="" width={14} height={14} className="h-3.5 w-3.5" />
                        {row.source}
                      </p>
                    </div>
                    <span className="hidden whitespace-nowrap rounded-ctl bg-chrome px-3 py-2 text-[13px] font-medium text-white sm:inline-block">
                      {row.action}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <SplitText title={howFind.title} body={howFind.body} />
          </div>
        </div>
      </Section>

      {/* Act */}
      <Section theme="cream2" className="border-t border-line">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <SplitText title={howAct.title} body={howAct.body} />
          <div className="relative rounded-card border border-line bg-white p-6 shadow-card">
            <Illustrative />
            <p className="ml-auto mt-6 w-fit max-w-[85%] rounded-[18px] rounded-br-[4px] bg-brand px-4 py-2.5 font-medium text-white">
              {howAct.question}
            </p>
            <div className="mt-5 grid grid-cols-[32px_minmax(0,1fr)] gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-pill bg-brand text-[11px] font-bold text-white" aria-hidden="true">
                MX
              </span>
              <div className="space-y-3 text-[15px] leading-relaxed text-fg">
                {howAct.answer.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p className="text-small text-muted-fg">{howAct.source}</p>
                <span className="inline-block rounded-ctl bg-surface px-3 py-2 text-[13px] font-medium text-fg">{howAct.action}</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* What it keeps an eye on */}
      <Section theme="cream">
        <div className="max-w-text">
          <h2 className="t-h2 text-fg">{howWatch.title}</h2>
          <p className="mt-3 text-[16px] text-muted-fg">{howWatch.body}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {howWatch.areas.map((area) => {
            const kind = KIND[area.icon];
            const Icon = kind.icon;
            return (
              <div key={area.title} className="rounded-card border border-line bg-white p-6 shadow-card">
                <span className={cn('flex h-10 w-10 items-center justify-center rounded-row', kind.bg, kind.fg)}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[17px] font-semibold text-fg">{area.title}</h3>
                <ul className="mt-3 space-y-2">
                  {area.examples.map((ex) => (
                    <li key={ex} className="text-[14.5px] leading-snug text-muted-fg">
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </Section>

      {/* What you can count on */}
      <Section theme="cream2" className="border-t border-line">
        <h2 className="t-h2 text-fg">{howTrust.title}</h2>
        <dl className="mt-8 border-t border-line">
          {howTrust.items.map((item) => (
            <div key={item.title} className="grid gap-2 border-b border-line py-5 md:grid-cols-[minmax(0,320px)_minmax(0,1fr)] md:gap-8">
              <dt className="flex items-start gap-2.5 text-[16px] font-semibold text-fg">
                <CircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden="true" />
                {item.title}
              </dt>
              <dd className="max-w-[62ch] text-[15.5px] text-muted-fg">{item.body}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* FAQ */}
      <Section theme="cream">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]">
          <h2 className="t-h2 text-fg">{howFaqTitle}</h2>
          <FAQAccordion items={howFaq} />
        </div>
      </Section>

      <CTABand heading={howCta.heading} body={howCta.body} secondaryCta={null} />
    </>
  );
}
