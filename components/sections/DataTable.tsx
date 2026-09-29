import { withPlaceholders } from '@/components/ui/Placeholder';

type DataTableProps = {
  caption: string;
  columns: readonly string[];
  rows: readonly (readonly string[])[];
};

/**
 * Two-or-more column table (A7 ComparisonTable). A real <table> from md up;
 * stacked cards on mobile, so the page never scrolls sideways.
 */
export function DataTable({ caption, columns, rows }: DataTableProps) {
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
            {rows.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row" className="w-[32%] px-6 py-4 align-top font-semibold text-ink-950">
                      {cell}
                    </th>
                  ) : (
                    <td key={i} className="px-6 py-4 align-top text-ink-700">
                      {withPlaceholders(cell)}
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="space-y-3 md:hidden" aria-label={caption}>
        {rows.map((row) => (
          <li key={row[0]} className="rounded-card border border-gray-200 bg-white p-5">
            <p className="font-semibold text-ink-950">{row[0]}</p>
            {row.slice(1).map((cell, i) => (
              <p key={i} className="mt-1 text-ink-700">
                <span className="sr-only">{columns[i + 1]}: </span>
                {withPlaceholders(cell)}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </>
  );
}
