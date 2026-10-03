'use client';

import { useEffect, useState } from 'react';

type CountdownProps = {
  isoDate: string;
  labels: readonly string[]; // Days, Hours, Min, Sec
  doneLabel: string;
  srLabel: string;
};

function parts(ms: number): number[] {
  const s = Math.max(0, Math.floor(ms / 1000));
  return [Math.floor(s / 86400), Math.floor((s % 86400) / 3600), Math.floor((s % 3600) / 60), s % 60];
}

/**
 * Countdown to launch. Renders "--" on the server (the time differs between
 * server and browser) and starts ticking once loaded.
 */
export function Countdown({ isoDate, labels, doneLabel, srLabel }: CountdownProps) {
  const target = new Date(isoDate).getTime();
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const update = () => setRemaining(target - Date.now());
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  if (remaining !== null && remaining <= 0) {
    return <p className="t-h3 text-mint-400">{doneLabel}</p>;
  }

  const values = remaining === null ? null : parts(remaining);
  return (
    <div>
      <p className="sr-only">{srLabel}</p>
      <ul aria-hidden="true" className="flex justify-center gap-2 sm:gap-3">
        {labels.map((label, i) => (
          <li
            key={label}
            className="flex w-[72px] flex-col items-center rounded-card border border-white/15 bg-white/[.08] py-3 backdrop-blur sm:w-20"
          >
            <span className="font-display text-h2-m font-medium tabular-nums text-white md:text-h2">
              {values ? String(values[i]).padStart(2, '0') : '--'}
            </span>
            <span className="mt-1 text-xs font-semibold uppercase tracking-wide text-gray-300">{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
