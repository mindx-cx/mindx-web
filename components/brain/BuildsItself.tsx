import { MessageCircleQuestion } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { buildsItself } from '@/content/brainHome';

/**
 * The question list. Each row is the prototype's list item: a 36px icon tile,
 * the text, and a trailing hint, on a 36px / 1fr / auto grid.
 */
export function BuildsItself({ theme = 'cream' }: { theme?: 'cream' | 'cream2' } = {}) {
  return (
    <Section theme={theme} className={theme === 'cream2' ? 'border-y border-line' : undefined} reveal>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-center">
        <SectionHeader title={buildsItself.title} body={buildsItself.body} />
        <ul className="space-y-3">
          {buildsItself.questions.map((question) => (
            <li
              key={question}
              className="grid grid-cols-[36px_1fr_auto] items-center gap-3 rounded-row border border-line bg-white p-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-row bg-surface">
                <MessageCircleQuestion className="h-[18px] w-[18px] text-brand" aria-hidden="true" />
              </span>
              <span className="text-[15px] leading-snug text-fg">{question}</span>
              <span className="text-xs text-subtle-fg">1 credit</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
