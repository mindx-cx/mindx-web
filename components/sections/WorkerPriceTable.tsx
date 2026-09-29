import { Chip } from '@/components/ui/Chip';
import { WorkerTile } from '@/components/ui/WorkerTile';
import { pricingSections as copy, workerPrices } from '@/content/pricing';
import type { WorkerId } from '@/content/site';

const workerIds: Record<string, WorkerId> = {
  'MindX Resolve': 'resolve',
  'MindX Convert': 'convert',
  'MindX Grow': 'grow',
};

/** AI Worker pricing (A7 WorkerPriceTable): table on desktop, stacked cards on mobile. */
export function WorkerPriceTable() {
  return (
    <>
      <div className="hidden overflow-hidden rounded-card border border-gray-200 bg-white md:block">
        <table className="w-full text-left">
          <caption className="sr-only">{copy.workersTitle}</caption>
          <thead className="bg-gray-50">
            <tr>
              {copy.workerColumns.map((c) => (
                <th key={c} scope="col" className="px-6 py-4 text-small font-semibold text-ink-700">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {workerPrices.map((w) => (
              <tr key={w.worker}>
                <th scope="row" className="px-6 py-4">
                  <span className="flex items-center gap-3 font-semibold text-ink-950">
                    <WorkerTile worker={workerIds[w.worker]} size="sm" />
                    {w.worker}
                  </span>
                </th>
                <td className="px-6 py-4 font-semibold text-ink-950">{w.price}</td>
                <td className="px-6 py-4 text-ink-700">{w.when}</td>
                <td className="px-6 py-4">
                  <Chip tone={w.status === 'Live' ? 'live' : 'soon'}>{w.status}</Chip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="space-y-3 md:hidden" aria-label={copy.workersTitle}>
        {workerPrices.map((w) => (
          <li key={w.worker} className="rounded-card border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-3 font-semibold">
                <WorkerTile worker={workerIds[w.worker]} size="sm" />
                {w.worker}
              </span>
              <Chip tone={w.status === 'Live' ? 'live' : 'soon'}>{w.status}</Chip>
            </div>
            <p className="mt-3 font-semibold">{w.price}</p>
            <p className="text-small text-ink-700">
              {copy.workerColumns[2]}: {w.when}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
