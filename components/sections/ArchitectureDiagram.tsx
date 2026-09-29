import { ArrowDown, Headset, Mail, MessageCircle, ShoppingBag, Truck, TrendingUp, Undo2, type LucideIcon } from 'lucide-react';
import { Chip } from '@/components/ui/Chip';
import { WorkerTile } from '@/components/ui/WorkerTile';
import type { WorkerId } from '@/content/site';

type DiagramProps = {
  tools: readonly string[];
  brainChips: readonly string[];
  caption: string;
};

type DiagramWorker = { id: WorkerId; name: string; live: boolean; icon: LucideIcon; fill: string };

const toolIcons: LucideIcon[] = [ShoppingBag, MessageCircle, Truck, Undo2, Mail];

const workers: DiagramWorker[] = [
  { id: 'resolve', name: 'MindX Resolve', live: true, icon: Headset, fill: 'fill-worker-resolve' },
  { id: 'convert', name: 'MindX Convert', live: true, icon: ShoppingBag, fill: 'fill-worker-convert' },
  { id: 'grow', name: 'MindX Grow', live: false, icon: TrendingUp, fill: 'fill-worker-grow' },
];

// Desktop geometry (viewBox 1100 x 480).
const TOOL_W = 200;
const BRAIN_X = 340;
const BRAIN_W = 420;
const BRAIN_Y = 20;
const BRAIN_H = 400;
const WORKER_X = 900;
const WORKER_W = 200;
const toolY = [60, 140, 220, 300, 380];
const workerY = [120, 220, 320];
const converge = (y: number) => 220 + (y - 220) * 0.55;

/**
 * Spec A7 ArchitectureDiagram: tools → MindX Brain (5 chips) → workers, with a
 * loop back into the Brain. Data "flows" along the lines (CSS dash animation,
 * off with reduced motion). Stacks vertically below md.
 */
export function ArchitectureDiagram({ tools, brainChips, caption }: DiagramProps) {
  const label = `Diagram: ${tools.join(', ')} feed MindX Brain (${brainChips.join(', ')}), which powers ${workers
    .map((w) => w.name)
    .join(', ')}. ${caption}`;

  return (
    <figure>
      {/* Desktop */}
      <svg viewBox="0 0 1100 480" role="img" aria-label={label} className="hidden h-auto w-full md:block">
        <defs>
          <marker id="mx-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" className="fill-blue-600" />
          </marker>
        </defs>

        {/* Tool → Brain connectors */}
        {toolY.map((y) => {
          const d = `M${TOOL_W} ${y} C ${TOOL_W + 70} ${y}, ${BRAIN_X - 70} ${converge(y)}, ${BRAIN_X} ${converge(y)}`;
          return (
            <g key={`t${y}`}>
              <path d={d} className="fill-none stroke-gray-200" strokeWidth={2} />
              <path d={d} className="mx-flow fill-none stroke-blue-500" strokeWidth={2} />
            </g>
          );
        })}

        {/* Brain → worker connectors */}
        {workerY.map((y, i) => {
          const d = `M${BRAIN_X + BRAIN_W} ${converge(y)} C ${BRAIN_X + BRAIN_W + 70} ${converge(y)}, ${WORKER_X - 70} ${y}, ${WORKER_X} ${y}`;
          return (
            <g key={`w${y}`}>
              <path d={d} className="fill-none stroke-gray-200" strokeWidth={2} strokeDasharray={workers[i].live ? undefined : '4 6'} />
              {workers[i].live && <path d={d} className="mx-flow fill-none stroke-blue-500" strokeWidth={2} />}
            </g>
          );
        })}

        {/* Outcome loop back into the Brain */}
        <path
          d={`M1000 ${workerY[2] + 34} C 1000 470, 570 478, ${BRAIN_X + BRAIN_W / 2} ${BRAIN_Y + BRAIN_H + 4}`}
          className="mx-flow-slow fill-none stroke-blue-600"
          strokeWidth={2}
          markerEnd="url(#mx-arrow)"
        />

        {/* Tools */}
        {tools.map((tool, i) => {
          const Icon = toolIcons[i] ?? ShoppingBag;
          const y = toolY[i];
          return (
            <g key={tool}>
              <rect x={0} y={y - 25} width={TOOL_W} height={50} rx={12} className="fill-white stroke-gray-200" strokeWidth={1.5} />
              <Icon x={16} y={y - 9} width={18} height={18} className="text-blue-600" aria-hidden="true" />
              <text x={44} y={y + 5} className="fill-ink-950 text-[15px] font-semibold">
                {tool}
              </text>
            </g>
          );
        })}

        {/* Brain */}
        <rect
          x={BRAIN_X - 6}
          y={BRAIN_Y - 6}
          width={BRAIN_W + 12}
          height={BRAIN_H + 12}
          rx={26}
          className="animate-pulse fill-none stroke-mint-400/60"
          strokeWidth={2}
        />
        <rect x={BRAIN_X} y={BRAIN_Y} width={BRAIN_W} height={BRAIN_H} rx={22} className="fill-navy-950" />
        <text x={BRAIN_X + BRAIN_W / 2} y={BRAIN_Y + 44} textAnchor="middle" className="fill-white text-[22px] font-bold">
          MindX Brain
        </text>
        {brainChips.map((chip, i) => {
          const y = BRAIN_Y + 72 + i * 62;
          return (
            <g key={chip}>
              <rect x={BRAIN_X + 30} y={y} width={BRAIN_W - 60} height={46} rx={12} className="fill-navy-850 stroke-white/10" />
              <circle cx={BRAIN_X + 52} cy={y + 23} r={4} className="fill-mint-400" />
              <text x={BRAIN_X + 68} y={y + 28} className="fill-white text-[15px] font-medium">
                {chip}
              </text>
            </g>
          );
        })}

        {/* Workers */}
        {workers.map((w, i) => {
          const y = workerY[i];
          const Icon = w.icon;
          return (
            <g key={w.id} opacity={w.live ? 1 : 0.75}>
              <rect
                x={WORKER_X}
                y={y - 32}
                width={WORKER_W}
                height={64}
                rx={14}
                className={w.id === 'resolve' ? 'fill-white stroke-worker-resolve' : 'fill-white stroke-gray-200'}
                strokeWidth={w.id === 'resolve' ? 2.5 : 1.5}
                strokeDasharray={w.live ? undefined : '5 5'}
              />
              <rect x={WORKER_X + 14} y={y - 16} width={32} height={32} rx={8} className={w.fill} />
              <Icon x={WORKER_X + 22} y={y - 8} width={16} height={16} className="text-white" aria-hidden="true" />
              <text x={WORKER_X + 58} y={y - 2} className="fill-ink-950 text-[15px] font-semibold">
                {w.name}
              </text>
              <text x={WORKER_X + 58} y={y + 17} className="fill-gray-500 text-[12px] font-medium">
                {w.live ? 'Live now' : 'Coming later'}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Mobile: stacked */}
      <div className="md:hidden">
        <ul className="flex flex-wrap gap-2">
          {tools.map((tool, i) => {
            const Icon = toolIcons[i] ?? ShoppingBag;
            return (
              <li key={tool} className="inline-flex items-center gap-2 rounded-pill border border-gray-200 bg-white px-3 py-1.5 text-small font-semibold">
                <Icon className="h-4 w-4 text-blue-600" aria-hidden="true" />
                {tool}
              </li>
            );
          })}
        </ul>
        <ArrowDown className="mx-auto my-3 h-5 w-5 text-blue-600" aria-hidden="true" />
        <div className="rounded-card bg-navy-950 p-5 text-white ring-2 ring-mint-400/50 ring-offset-2 ring-offset-gray-50">
          <p className="text-center text-body-l-m font-bold">MindX Brain</p>
          <ul className="mt-4 space-y-2">
            {brainChips.map((chip) => (
              <li key={chip} className="flex items-center gap-3 rounded-btn border border-white/10 bg-navy-850 px-3 py-2 text-small">
                <span className="h-2 w-2 rounded-pill bg-mint-400" aria-hidden="true" />
                {chip}
              </li>
            ))}
          </ul>
        </div>
        <ArrowDown className="mx-auto my-3 h-5 w-5 text-blue-600" aria-hidden="true" />
        <ul className="space-y-2">
          {workers.map((w) => (
            <li key={w.id} className="flex items-center gap-3 rounded-card border border-gray-200 bg-white p-3">
              <WorkerTile worker={w.id} size="sm" />
              <span className="flex-1 font-semibold">{w.name}</span>
              <Chip tone={w.live ? 'live' : 'soon'}>{w.live ? 'Live now' : 'Coming later'}</Chip>
            </li>
          ))}
        </ul>
      </div>

      <figcaption className="mt-6 text-center text-small text-ink-700">{caption}</figcaption>
    </figure>
  );
}
