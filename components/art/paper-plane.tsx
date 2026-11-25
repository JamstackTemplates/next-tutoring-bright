// LostPaperPlane: a paper aeroplane folded from ruled paper looping off the page, with a dotted
// pencil trail toward a tiny State Library dome. Used on the 404 page.
import { Inked, Line } from './ink';

export function LostPaperPlane({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 720 320" className={className} aria-hidden="true" focusable="false">
    <path d="M30 270C120 300 180 150 260 170s40 110 120 90S470 60 560 80" className="ln" style={{ strokeDasharray: '2 14', strokeWidth: 4 }} />
    <g transform="translate(560 80) rotate(-18)">
      <Inked d="M0 0 140-40 40 26Z" fill="fill-sheet" />
      <Inked d="M40 26 140-40 58 46Z" fill="fill-rule" />
      <Line d="M40 26 34 60 58 46" />
      <Line d="M20 -2 110-30M30 6 120-32" thin className="[stroke:var(--rule)]" />
      <path d="M14 -6 26 10" className="ln-thin" style={{ stroke: 'var(--margin)' }} />
    </g>
    <g transform="translate(20 222)">
      <Inked d="M0 60V30h70v30Z" fill="fill-sheet" thin />
      <Inked d="M14 30c0-22 42-22 42 0Z" fill="fill-pencil-green/50" thin />
      <Line d="M35 9V2M10 60V38M24 60V38M38 60V38M52 60V38" thin />
    </g>
    <text x="120" y="120" className="art-text" fontSize="26" style={{ fill: 'var(--margin)' }} transform="rotate(-6 120 120)">wheee…</text>
  </svg>;
}
