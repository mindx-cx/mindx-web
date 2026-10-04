import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/layout/Logo';
import { CookieSettingsLink } from '@/components/layout/CookieSettingsLink';
import { BetaForm } from '@/components/beta/BetaForm';
import { BetaLink } from '@/components/beta/BetaLink';
import { pageMetadata } from '@/content/seo';
import {
  betaCta,
  betaExample,
  betaFinal,
  betaForm,
  betaHero,
  betaIdea,
  betaNav,
  betaProblem,
  betaSeo,
  betaWho,
  betaWhy,
} from '@/content/beta';

export const metadata = pageMetadata(betaSeo);

/**
 * /beta: landing page for the ChatGPT Ads beta test (4 Oct 2026).
 *
 * One job: ChatGPT ad -> qualified Shopify merchant -> beta signup. A
 * pre-approval page: Shopify approval is pending, so nothing here offers a
 * store connection, an install or a scan (see content/beta.ts). It has its own
 * header and footer (the site's are hidden on this path in app/layout.tsx), and
 * the home page is untouched.
 */
export default function BetaPage() {
  return (
    <>
      <BetaHeader />
      <Hero />
      <Problem />
      <Idea />
      <Example />
      <Why />
      <Who />
      <Signup />
      <Final />
      <BetaFooter />
    </>
  );
}

const primaryClass =
  'inline-flex h-12 items-center justify-center rounded-ctl bg-brand px-7 text-[16px] font-semibold text-white transition-colors hover:bg-brand-dark';

function BetaHeader() {
  return (
    <header
      className="sticky z-40 bg-chrome"
      style={{ top: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className="mx-auto flex h-14 max-w-container items-center justify-between gap-4 px-4 md:px-6">
        <Logo />
        <nav aria-label="Beta page" className="hidden items-center md:flex">
          {betaNav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-sm px-3 py-2 text-[14px] font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <BetaLink
          href={betaCta.href}
          where="nav"
          className="inline-flex h-9 items-center rounded-ctl bg-brand px-4 text-[14px] font-medium text-white transition-colors hover:bg-brand-dark"
        >
          Join Beta
        </BetaLink>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream pb-16 pt-14 md:pb-24 md:pt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 h-[360px] w-[640px] max-w-full -translate-x-1/2 rounded-pill bg-brand/10 blur-[110px]"
      />
      <div className="container-x relative">
        <div className="mx-auto max-w-[780px] text-center">
          <span className="mx-auto mb-7 flex h-[76px] w-[76px] items-center justify-center rounded-pill bg-brand shadow-[0_18px_50px_-12px_rgba(0,98,255,0.55)]">
            <Image src="/brand/mindx-ai-mark-white.svg" alt="" width={46} height={29} className="h-auto w-[46px]" priority />
          </span>
          <h1 className="t-display text-balance text-fg">
            <span className="block">{betaHero.titleLead}</span>
            <span className="block text-brand">{betaHero.titleBrand}</span>
          </h1>
          <p className="t-body-l mx-auto mt-6 max-w-[600px] text-muted-fg">{betaHero.subtitle}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <BetaLink href={betaCta.href} where="hero" className={`${primaryClass} w-full sm:w-auto`}>
              {betaCta.label}
            </BetaLink>
            <BetaLink
              href={betaHero.secondary.href}
              where="hero_secondary"
              className="inline-flex h-12 items-center justify-center px-4 text-[15px] font-medium text-fg hover:text-brand"
            >
              {betaHero.secondary.label} →
            </BetaLink>
          </div>
          <p className="mt-4 text-small text-subtle-fg">{betaHero.trust}</p>
        </div>
      </div>
    </section>
  );
}

/** Many signals -> one Brain -> one thing that matters. Not a dashboard. */
function Problem() {
  return (
    <section className="border-t border-line bg-cream-2 py-16 md:py-24">
      <div className="container-x">
        <h2 className="t-h2 mx-auto max-w-[760px] text-balance text-center text-fg">{betaProblem.title}</h2>

        <div className="mx-auto mt-12 grid max-w-[960px] items-center gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-10">
          <ul className="flex flex-wrap justify-center gap-2 md:justify-end">
            {betaProblem.signals.map((signal) => (
              <li
                key={signal}
                className="rounded-pill border border-line bg-white px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-fg shadow-card"
              >
                {signal}
              </li>
            ))}
          </ul>

          <div aria-hidden="true" className="flex flex-col items-center justify-center gap-3 md:flex-row">
            <span className="h-8 w-px bg-line md:h-px md:w-10" />
            <span className="flex h-16 w-16 items-center justify-center rounded-pill bg-brand shadow-[0_14px_40px_-12px_rgba(0,98,255,0.55)]">
              <Image src="/brand/mindx-ai-mark-white.svg" alt="" width={38} height={24} className="h-auto w-[38px]" />
            </span>
            <span className="h-8 w-px bg-line md:h-px md:w-10" />
          </div>

          <div className="mx-auto w-full max-w-[320px] rounded-card border border-line bg-white p-5 shadow-card md:mx-0">
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-muted-fg">{betaProblem.butLabel}</p>
            <p className="mt-2 font-display text-[24px] leading-snug text-fg">{betaProblem.question}</p>
          </div>
        </div>

        <p className="t-body-l mx-auto mt-12 max-w-[620px] text-center text-fg">{betaProblem.lead}</p>
      </div>
    </section>
  );
}

function Idea() {
  return (
    <section id="brain" className="scroll-mt-16 border-t border-line bg-cream py-16 md:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-[760px] text-center">
          <h2 className="t-h2 text-balance text-fg">{betaIdea.title}</h2>
          {betaIdea.body.map((p) => (
            <p key={p} className="t-body-l mt-5 text-muted-fg">
              {p}
            </p>
          ))}
        </div>

        <ol id="how" className="mx-auto mt-12 grid max-w-[1000px] scroll-mt-20 gap-4 md:grid-cols-3">
          {betaIdea.steps.map((step) => (
            <li key={step.title} className="rounded-card border border-line bg-white p-6 shadow-card">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand">{step.title}</p>
              <p className="mt-2 text-[16px] leading-relaxed text-fg">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Example() {
  return (
    <section className="border-t border-line bg-cream-2 py-16 md:py-24">
      <div className="container-x">
        <h2 className="t-h2 text-balance text-center text-fg">{betaExample.title}</h2>

        <figure className="mx-auto mt-10 max-w-[560px]">
          <div className="rounded-card border border-line bg-white p-6 shadow-card md:p-7">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-pill bg-surface px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-fg">
                {betaExample.badge}
              </span>
              <span className="rounded-pill bg-signal-revenue/10 px-2.5 py-1 text-[11px] font-semibold text-signal-revenue">
                Sales
              </span>
            </div>
            <p className="mt-4 font-display text-[26px] leading-snug text-fg">{betaExample.finding}</p>
            <p className="mt-5 text-[14px] font-semibold text-fg">{betaExample.why}</p>
            <ul className="mt-2 grid gap-1.5">
              {betaExample.evidence.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[15px] text-fg">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-pill bg-brand" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-line pt-4 text-[15px] leading-relaxed text-muted-fg">
              {betaExample.conclusion}
            </p>
          </div>
          <figcaption className="mt-4 text-center">
            <span className="block text-[15px] text-fg">{betaExample.caption}</span>
            <span className="mt-1 block text-[13px] font-medium text-muted-fg">{betaExample.label}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="border-t border-line bg-cream py-16 md:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="t-h2 text-balance text-fg">{betaWhy.title}</h2>
          {betaWhy.body.map((p) => (
            <p key={p} className="t-body-l mt-5 text-muted-fg">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Who() {
  return (
    <section className="border-t border-line bg-cream-2 py-16 md:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-[720px]">
          <h2 className="t-h2 text-balance text-center text-fg">{betaWho.title}</h2>
          <ul className="mx-auto mt-10 grid max-w-[560px] gap-3">
            {betaWho.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-3 rounded-ctl border border-line bg-white px-4 py-3 text-[16px] text-fg"
              >
                <span aria-hidden="true" className="mt-[3px] text-brand">
                  ✓
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Signup() {
  return (
    <section id="beta" className="scroll-mt-16 border-t border-line bg-cream py-16 md:py-24">
      <div className="container-x">
        <div className="mx-auto max-w-[520px]">
          <div className="text-center">
            <h2 className="t-h2 text-balance text-fg">{betaForm.title}</h2>
            <p className="t-body-l mt-4 text-muted-fg">{betaForm.subtitle}</p>
          </div>
          <div className="mt-8">
            <BetaForm />
          </div>
        </div>
      </div>
    </section>
  );
}

function Final() {
  return (
    <section className="bg-chrome py-16 text-white md:py-20">
      <div className="container-x text-center">
        <h2 className="t-h2 mx-auto max-w-[720px] text-balance">
          <span className="block">{betaFinal.titleLead}</span>
          <span className="block text-white/70">{betaFinal.titleBrand}</span>
        </h2>
        <BetaLink href={betaCta.href} where="final" className={`${primaryClass} mt-8`}>
          {betaCta.label}
        </BetaLink>
      </div>
    </section>
  );
}

function BetaFooter() {
  return (
    <footer className="bg-chrome">
      <div className="mx-auto flex max-w-container flex-col items-center justify-between gap-3 border-t border-white/10 px-4 py-6 text-[13px] text-white/60 md:flex-row md:px-6">
        <span>© 2026 MindX AI</span>
        <div className="flex items-center gap-5">
          <Link href="/privacy/" className="hover:text-white">
            Privacy
          </Link>
          <Link href="/terms/" className="hover:text-white">
            Terms
          </Link>
          <CookieSettingsLink label="Cookie settings" className="hover:text-white" />
        </div>
      </div>
    </footer>
  );
}
