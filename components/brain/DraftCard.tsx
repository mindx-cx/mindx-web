import { Mail } from 'lucide-react';
import { Section, SectionHeader } from '@/components/ui/Section';
import { draftSection } from '@/content/brainHome';

/**
 * The approval card. This is the section that answers the real objection --
 * "is it going to email my customers without asking me" -- so the draft is
 * shown in full, with the recipient count on the button rather than hidden
 * behind it.
 */
export function DraftCard({ theme = 'cream' }: { theme?: 'cream' | 'cream2' } = {}) {
  const { draft } = draftSection;
  return (
    <Section theme={theme} className={theme === 'cream2' ? 'border-y border-line' : undefined} reveal>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center">
        <SectionHeader title={draftSection.title} body={draftSection.body} />

        <div className="rounded-card border border-line bg-white p-4 shadow-card">
          <div className="grid grid-cols-[36px_1fr] items-center gap-3 border-b border-line pb-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-row bg-surface">
              <Mail className="h-[18px] w-[18px] text-brand" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-[13px] text-muted-fg">
                To: <span className="text-fg">{draft.to}</span>
              </p>
              <p className="truncate text-[15px] font-semibold text-fg">{draft.subject}</p>
            </div>
          </div>

          <div className="space-y-3 py-4 text-small leading-relaxed text-fg">
            {draft.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="flex items-center gap-2 border-t border-line pt-3">
            <button
              type="button"
              disabled
              className="rounded-ctl bg-brand px-4 py-2 text-[14px] font-medium text-white disabled:opacity-100"
            >
              {draft.primary}
            </button>
            <button
              type="button"
              disabled
              className="rounded-ctl border border-line px-4 py-2 text-[14px] font-medium text-muted-fg disabled:opacity-100"
            >
              {draft.secondary}
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
