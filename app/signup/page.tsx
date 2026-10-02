import { LeadForm } from '@/components/forms/LeadForm';
import { HeroBackdrop } from '@/components/sections/Hero';
import { pageMetadata, seo } from '@/content/seo';

export const metadata = pageMetadata({
  ...seo.brainScan,
  title: 'Get Your Free Brain Scan',
  path: '/signup',
});

export default function SignupPage() {
  return (
    <section className="relative overflow-hidden bg-hero-page pb-24 pt-36 text-white md:pb-32 md:pt-44">
      <HeroBackdrop />
      <div className="container-x relative grid items-start gap-12 lg:grid-cols-2">
        <div className="lg:pt-4">
          <p className="t-eyebrow text-mint-400">MindX AI · Free Brain Scan</p>
          <h1 className="t-h1 mt-4">
            Connect your store. See what MindX finds.
          </h1>
          <p className="t-body-l mt-5 text-blue-50">
            MindX scans your Shopify store and shows you the things worth your attention right now. Takes minutes, not days.
          </p>
          <p className="mt-6 text-small text-gray-300">
            Read-only access · No customer messages · No credit card
          </p>
        </div>
        <div className="rounded-card bg-white p-6 text-ink-950 shadow-mock md:p-8">
          <LeadForm type="brain_scan" />
        </div>
      </div>
    </section>
  );
}
