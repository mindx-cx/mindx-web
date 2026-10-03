import { Section } from '@/components/ui/Section';
import { knowsYourStore } from '@/content/brainHome';

/**
 * The closing argument. On cream, not chrome: the CTA band directly below is
 * already chrome, and two dark sections in a row read as one undifferentiated
 * slab rather than as a statement followed by an invitation.
 */
export function KnowsYourStore({ theme = 'cream' }: { theme?: 'cream' | 'cream2' } = {}) {
  return (
    <Section theme={theme} className={theme === 'cream2' ? 'border-y border-line' : undefined} reveal>
      <div className="mx-auto max-w-text text-center">
        <h2 className="t-h2 text-fg">
          {knowsYourStore.lead} <span className="text-brand">{knowsYourStore.brand}</span>
        </h2>
        <p className="t-body-l mt-5 text-muted-fg">{knowsYourStore.body}</p>
      </div>
    </Section>
  );
}
