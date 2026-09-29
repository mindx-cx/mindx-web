import { cn } from '@/lib/cn';

type Level = { name: string; cells: readonly string[] };

type AutonomyTableProps = {
  caption: string;
  /** First column heading, then one heading per cell. */
  columns: readonly string[];
  levels: readonly Level[];
};

function Steps({ filled, total }: { filled: number; total: number }) {
  return (
    <span aria-hidden="true" className="flex gap-1">
      {Array.from({ length: total }, (_, i) => (
        <span key={i} className={cn('h-2 w-5 rounded-pill', i < filled ? 'bg-blue-600' : 'bg-gray-200')} />
      ))}
    </span>
  );
}

/**
 * Autonomy levels (A7 AutonomyTable) with a stepped visual that fills up as
 * the level rises. Used with 3 levels on /workers/resolve and 6 on /trust.
 */
export function AutonomyTable({ caption, columns, levels }: AutonomyTableProps) {
  const total = levels.length;
  return (
    <>
      <div className="hidden overflow-hidden rounded-card border border-gray-200 bg-white md:block">
        <table className="w-full text-left">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={col} scope="col" className="px-6 py-4 text-small font-semibold text-ink-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {levels.map((level, i) => (
              <tr key={level.name}>
                <th scope="row" className="px-6 py-4 align-top">
                  <span className="block font-semibold text-ink-950">{level.name}</span>
                  <span className="mt-2 block">
                    <Steps filled={i + 1} total={total} />
                  </span>
                  <span className="sr-only">
                    Level {i + 1} of {total}
                  </span>
                </th>
                {level.cells.map((cell, j) => (
                  <td key={j} className="px-6 py-4 align-top text-ink-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ol className="space-y-3 md:hidden" aria-label={caption}>
        {levels.map((level, i) => (
          <li key={level.name} className="rounded-card border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-ink-950">{level.name}</p>
              <Steps filled={i + 1} total={total} />
            </div>
            {level.cells.map((cell, j) => (
              <p key={j} className="mt-1 text-ink-700">
                <span className="font-medium text-ink-950">{columns[j + 1]}: </span>
                {cell}
              </p>
            ))}
          </li>
        ))}
      </ol>
    </>
  );
}
