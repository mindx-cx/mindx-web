import { ProblemCards } from '@/components/brain/ProblemCards';
import { LeadForm } from '@/components/forms/LeadForm';
import { Section } from '@/components/ui/Section';
import { pageMetadata, seo } from '@/content/seo';
import { isWaitlist } from '@/lib/config';

export const metadata = pageMetadata({
  ...seo.brainScan,
  title: isWaitlist ? 'Get Early Access to MindX' : 'Get Your Free Brain Scan',
  path: '/signup',
});

// CHANGED 3 Oct 2026 (Rajesh): light cream page like the rest of the site.
// Until Shopify approves the app (waitlist mode) real stores can't connect,
// so the page offers early access: email + store URL, then a confirmation,
// with a sample Brain Scan below. In live mode the form leads on to the
// product's sign-up.
const copy = isWaitlist
  ? {
      eyebrow: 'MindX AI · Early access',
      lead: 'Be among the first',
      brand: 'to see what MindX finds.',
      body: "MindX is opening to Shopify stores in the next few weeks. Leave your email and store, and we'll invite you as soon as your store can connect.",
      steps: [
        { title: 'Join early access', body: 'Your work email and your Shopify store.' },
        { title: 'Get your invite', body: 'We email you as soon as your store can connect.' },
        { title: 'See your Brain Scan', body: 'Connect Shopify, read-only, and see the 3 things worth your attention.' },
      ],
    }
  : {
      eyebrow: 'MindX AI · Free Brain Scan',
      lead: 'Connect your store.',
      brand: 'See what MindX finds.',
      body: 'MindX reads your Shopify store and shows you the things worth your attention right now. It takes minutes, not days.',
      steps: [
        { title: 'Tell us where to look', body: 'Your work email and your Shopify store.' },
        { title: 'Create your free account', body: 'Then connect Shopify, read-only, in one click.' },
        { title: 'See your Brain Scan', body: 'The 3 things worth your attention, in minutes.' },
      ],
    };

export default function SignupPage() {
  return (
    <>
      <Section theme="cream" className="pt-14 md:pt-20">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
          <div className="lg:pt-2">
            <p className="t-eyebrow text-muted-fg">{copy.eyebrow}</p>
            <h1 className="t-h1 mt-3 text-fg">
              {copy.lead} <span className="text-brand">{copy.brand}</span>
            </h1>
            <p className="t-body-l mt-5 max-w-[540px] text-muted-fg">{copy.body}</p>
            <ol className="mt-10 max-w-[540px] space-y-5">
              {copy.steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-pill bg-brand text-[14px] font-semibold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-[17px] font-semibold text-fg">{step.title}</p>
                    <p className="text-[15px] text-muted-fg">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-10 text-small text-muted-fg">Read-only access · No customer messages · No credit card</p>
          </div>
          <div className="rounded-card border border-line bg-white p-6 shadow-card md:p-8">
            <LeadForm type="brain_scan" />
          </div>
        </div>
      </Section>

      {/* What a Brain Scan looks like, while stores wait to connect.
          Illustrative sample data; swap for test-store screenshots. */}
      <ProblemCards theme="cream2" />
    </>
  );
}
