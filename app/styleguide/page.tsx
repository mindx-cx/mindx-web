import type { Metadata } from 'next';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Chip } from '@/components/ui/Chip';
import { Illustrative } from '@/components/ui/Illustrative';
import { Placeholder } from '@/components/ui/Placeholder';
import { Section, SectionHeader } from '@/components/ui/Section';
import { WorkerTile } from '@/components/ui/WorkerTile';
import type { WorkerId } from '@/content/site';

// Internal review page for the design system. Not linked, not indexed,
// and excluded from the sitemap in Phase 7.
export const metadata: Metadata = {
  title: 'Styleguide — MindX',
  robots: { index: false, follow: false },
};

const swatches = [
  ['navy-950', 'bg-navy-950'],
  ['navy-900', 'bg-navy-900'],
  ['navy-800', 'bg-navy-800'],
  ['navy-700', 'bg-navy-700'],
  ['blue-600', 'bg-blue-600'],
  ['blue-500', 'bg-blue-500'],
  ['blue-200', 'bg-blue-200'],
  ['blue-50', 'bg-blue-50'],
  ['mint-400', 'bg-mint-400'],
  ['ink-950', 'bg-ink-950'],
  ['ink-700', 'bg-ink-700'],
  ['gray-50', 'bg-gray-50'],
  ['gray-200', 'bg-gray-200'],
  ['gray-300', 'bg-gray-300'],
  ['gray-500', 'bg-gray-500'],
  ['worker-brain', 'bg-worker-brain'],
  ['worker-resolve', 'bg-worker-resolve'],
  ['worker-convert', 'bg-worker-convert'],
  ['worker-grow', 'bg-worker-grow'],
  ['success', 'bg-success'],
  ['warning', 'bg-warning'],
  ['danger', 'bg-danger'],
  ['discovery', 'bg-discovery'],
] as const;

const workerFamily: { id: WorkerId; name: string; role: string }[] = [
  { id: 'brain', name: 'MindX Brain', role: 'Blue · the platform' },
  { id: 'resolve', name: 'MindX Resolve', role: 'Teal · customer service' },
  { id: 'convert', name: 'MindX Convert', role: 'Orange · sales' },
  { id: 'grow', name: 'MindX Grow', role: 'Purple · marketing' },
];

export default function StyleguidePage() {
  return (
    <>
      <Section theme="dark" className="pt-32 md:pt-40">
        <SectionHeader
          as="h1"
          onDark
          eyebrow="Internal"
          title="Design system"
          body="Spec A5 and A7 tokens and components, in the current themindx.ai blue palette."
        />
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="inverse">Inverse</Button>
          <Button variant="ghost" href="/pricing">
            See pricing
          </Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Chip tone="live" onDark>Live</Chip>
          <Chip tone="beta" onDark>Beta</Chip>
          <Chip tone="soon">Coming later</Chip>
          <Chip tone="neutral" onDark>Neutral</Chip>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card theme="dark" className="relative">
            <Illustrative />
            <h3 className="t-h3">Dark card</h3>
            <p className="mt-2 text-gray-300">Cards on dark backgrounds use navy-900 with a navy-700 border.</p>
          </Card>
        </div>
      </Section>

      <Section theme="light">
        <h2 className="t-h2">Type scale</h2>
        <div className="mt-8 space-y-4">
          <p className="t-display">Display</p>
          <p className="t-h1">Heading 1</p>
          <p className="t-h2">Heading 2</p>
          <p className="t-h3">Heading 3</p>
          <p className="t-body-l">Body large for hero subheadlines.</p>
          <p>Body text for paragraphs.</p>
          <p className="text-small text-gray-500">Small text for footnotes and captions.</p>
          <p className="t-eyebrow text-blue-600">Eyebrow</p>
          <p className="t-stat">$829</p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button tone="light" variant="secondary">
            Secondary on light
          </Button>
          <Button tone="light" variant="ghost" href="/pricing">
            See pricing
          </Button>
          <Chip tone="live">Live</Chip>
          <Chip tone="beta">Beta</Chip>
          <Chip tone="soon">Coming later</Chip>
          <Chip>Neutral</Chip>
        </div>

        <p className="mt-10">
          Founding program for <Placeholder>[25]</Placeholder> US Shopify brands at <Placeholder>[$199/month]</Placeholder>.
        </p>
      </Section>

      <Section theme="dark">
        <SectionHeader
          onDark
          eyebrow="Worker family"
          title="One color and tile per AI Worker"
          body="Tiles repeat the platform story wherever workers appear: nav, cards, pricing and product pages."
        />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {workerFamily.map((w) => (
            <li key={w.id}>
              <Card theme="dark" className="h-full">
                <WorkerTile worker={w.id} size="lg" />
                <h3 className="t-h3 mt-4">{w.name}</h3>
                <p className="mt-1 text-small text-gray-300">{w.role}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section theme="light">
        <SectionHeader
          eyebrow="Status"
          title="Semantic colors"
          body="Outcome status in mocks and the product. Never reused as worker colors."
        />
        <div className="mt-8 flex flex-wrap gap-2">
          <Chip tone="success">Resolved</Chip>
          <Chip tone="warning">Needs approval</Chip>
          <Chip tone="danger">Escalated to human</Chip>
          <Chip tone="info">In progress</Chip>
          <Chip tone="discovery">AI suggestion</Chip>
        </div>
      </Section>

      <Section theme="gray">
        <h2 className="t-h2">Colors</h2>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {swatches.map(([name, cls]) => (
            <li key={name}>
              <div className={`h-16 rounded-card border border-gray-200 ${cls}`} />
              <p className="mt-2 text-xs text-gray-500">{name}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <Card className="relative">
            <Illustrative />
            <h3 className="t-h3">Light card</h3>
            <p className="mt-2 text-gray-500">Borders, no shadows.</p>
          </Card>
        </div>
      </Section>
    </>
  );
}
