import { ChevronDown } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';
import { stripPlaceholders, withPlaceholders } from '@/components/ui/Placeholder';

type FaqItem = { id: string; q: string; a: string };

/**
 * FAQ accordion (A7). Native <details> keeps it keyboard accessible with no
 * JavaScript. Emits FAQPage JSON-LD for the items on the page (A11).
 */
export function FAQAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <>
      <div className="divide-y divide-gray-200 rounded-card border border-gray-200 bg-white">
        {items.map((item) => (
          <details key={item.id} id={`faq-${item.id}`} className="group px-5 md:px-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-semibold text-ink-950 [&::-webkit-details-marker]:hidden">
              {item.q}
              <ChevronDown
                className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                aria-hidden="true"
              />
            </summary>
            <p className="pb-5 text-ink-700">{withPlaceholders(item.a)}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: items.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: stripPlaceholders(item.a) },
          })),
        }}
      />
    </>
  );
}
