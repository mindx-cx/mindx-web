import { integrationStrip } from '@/content/brainHome';

/** A quiet band of names between the hero and the first real section. */
export function IntegrationStrip() {
  return (
    <section className="border-y border-line bg-white/60 py-6">
      <div className="container-x flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-subtle-fg">{integrationStrip.label}</p>
        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {integrationStrip.items.map((item) => (
            <li key={item} className="text-[15px] font-semibold text-muted-fg">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
