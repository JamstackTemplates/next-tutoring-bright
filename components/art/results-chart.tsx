// ResultsChart: a classroom sticker chart, rows of gold stars filling up week by week, with a
// hand-drawn line climbing across it. Decorative; the figures it celebrates are in text beside it.
import { GoldStarShape } from './decor';
import { Line } from './ink';

const weeks = 8;
const rows = ['Reading', 'Writing', 'Maths', 'Asking'];
// Stars earned per row by week: grows over the term.
const earned = [6, 5, 7, 4];

export function ResultsChart({ className = '' }: { className?: string }) {
  const cell = 40, left = 108, top = 72;
  return <svg viewBox="0 0 440 310" className={className} aria-hidden="true" focusable="false">
    <rect x="10" y="12" width="420" height="290" rx="6" className="fill-line" />
    <rect x="6" y="8" width="420" height="290" rx="6" className="fill-sheet" />
    <rect x="6" y="8" width="420" height="290" rx="6" className="ln" />
    <text x="24" y="40" className="art-text" fontSize="24">My star chart</text>
    <path d="M24 48c40 3 90 2 130-2" className="ln-thin" style={{ stroke: 'var(--margin)' }} />
    {Array.from({ length: weeks }, (_, w) => <text key={w} x={left + w * cell + cell / 2} y={top - 6} textAnchor="middle" className="art-text" fontSize="14">{`wk ${w + 1}`}</text>)}
    {rows.map((row, r) => <g key={row}>
      <text x="22" y={top + r * cell + 26} className="art-text" fontSize="19">{row}</text>
      {Array.from({ length: weeks }, (_, w) => <rect key={w} x={left + w * cell} y={top + r * cell} width={cell} height={cell} className="ln-thin" style={{ stroke: 'var(--rule)' }} />)}
      {Array.from({ length: earned[r] }, (_, w) => <g key={w} transform={`translate(${left + w * cell + cell / 2} ${top + r * cell + cell / 2}) rotate(${(w * 37 + r * 11) % 30 - 15}) scale(.52)`}>
        <GoldStarShape />
      </g>)}
    </g>)}
    <path d={`M${left} ${top + 4 * cell + 40}h${weeks * cell}`} className="ln-thin" />
    <Line d={`M${left + 8} ${top + 4 * cell + 34}c40-4 70-10 100-16s60-4 90-14 60-8 90-20 20-6 30-10`} className="[stroke:var(--tick)] [stroke-width:3.5]" />
    <path d={`M${left + weeks * cell - 14} ${top + 4 * cell + 6}l10-2-4 10`} className="ln" style={{ stroke: 'var(--tick)', strokeWidth: 3.5 }} />
  </svg>;
}
