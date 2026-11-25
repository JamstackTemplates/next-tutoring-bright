// Subject icons, one per subject, in the shared pencil-and-offset-fill style. Decorative.
import type { SubjectIcon as IconName } from '../../content/subjects';
import { Inked, Line } from './ink';

const ICONS: Record<IconName, () => React.ReactNode> = {
  abc: () => <>
    <Inked d="M4 22h18v18H4Z" fill="fill-pencil-red" thin />
    <Inked d="M24 22h18v18H24Z" fill="fill-bulb" thin />
    <Inked d="M14 4h18v18H14Z" fill="fill-pencil-blue" thin />
    <text x="13" y="37" textAnchor="middle" className="art-text" fontSize="14">a</text>
    <text x="33" y="37" textAnchor="middle" className="art-text" fontSize="14">b</text>
    <text x="23" y="19" textAnchor="middle" className="art-text" fontSize="14">c</text>
  </>,
  nib: () => <>
    <Inked d="M24 4c8 8 12 18 10 26l-10 14-10-14C12 22 16 12 24 4Z" fill="fill-pencil-orange" thin />
    <Line d="M24 20v18M24 20a2.5 2.5 0 1 0 .1 0" thin />
  </>,
  abacus: () => <>
    <Inked d="M5 6h38v36H5Z" fill="fill-wood" thin />
    <Line d="M9 16h30M9 26h30M9 36h30" thin />
    {[[12, 16, 'fill-pencil-red'], [18, 16, 'fill-pencil-red'], [16, 26, 'fill-pencil-blue'], [22, 26, 'fill-pencil-blue'], [28, 26, 'fill-pencil-blue'], [14, 36, 'fill-bulb']]
      .map(([cx, cy, fill]) => <g key={`${cx}-${cy}`}><circle cx={cx as number} cy={cy as number} r="3" className={fill as string} /><circle cx={cx as number} cy={cy as number} r="3" className="ln-thin" /></g>)}
  </>,
  'set-square': () => <>
    <Inked d="M6 42V6l36 36Z" fill="fill-pencil-green/50" thin />
    <Line d="M12 36V20l16 16Z" thin />
    <text x="32" y="18" className="art-text" fontSize="13">x²</text>
  </>,
  'open-book': () => <>
    <Inked d="M24 12C18 8 10 8 4 10v28c6-2 14-2 20 2Z" fill="fill-sheet" thin />
    <Inked d="M24 12c6-4 14-4 20-2v28c-6-2-14-2-20 2Z" fill="fill-sheet" thin />
    <Line d="M9 18h10M9 24h10M29 18h10M29 24h8" thin />
    <text x="28" y="36" className="art-text" fontSize="14" style={{ fill: 'var(--pencil-purple)' }}>“</text>
  </>,
  beaker: () => <>
    <Inked d="M15 4h18v14l9 20c1 3-1 6-4 6H10c-3 0-5-3-4-6l9-20Z" fill="fill-pencil-green/40" thin />
    <Line d="M12 4h24M10 30h28" thin />
    <circle cx="20" cy="36" r="2" className="ln-thin" /><circle cx="28" cy="33" r="1.5" className="ln-thin" />
  </>,
  stopwatch: () => <>
    <Inked d="M24 10a16 16 0 1 0 .1 0Z" fill="fill-bulb" thin />
    <Line d="M20 4h8M24 4v6M37 12l3-3M24 26V16M24 26l6 5" thin />
  </>,
  'quote-book': () => <>
    <Inked d="M8 6h28c2 0 4 2 4 4v30H12c-2 0-4-2-4-4Z" fill="fill-pencil-purple/45" thin />
    <Line d="M8 36c0-2 2-4 4-4h28" thin />
    <text x="16" y="28" className="art-text" fontSize="20">“ ”</text>
  </>,
  curve: () => <>
    <Line d="M6 4v38h38" thin />
    <path d="M8 38c8-2 10-26 18-26s8 18 16 20" className="ln" style={{ stroke: 'var(--pencil-blue)' }} />
    <text x="28" y="12" className="art-text" fontSize="11">dy/dx</text>
  </>,
  molecule: () => <>
    <Inked d="M24 8l12 7v14l-12 7-12-7V15Z" fill="fill-pencil-orange/40" thin />
    <Line d="M36 15l8-4M12 29l-8 4M24 36v8" thin />
    <circle cx="44" cy="11" r="2.5" className="fill-pencil-red" /><circle cx="4" cy="33" r="2.5" className="fill-pencil-blue" />
  </>,
};

export function SubjectIcon({ icon, className = 'h-12 w-12' }: { icon: IconName; className?: string }) {
  const Draw = ICONS[icon];
  return <svg viewBox="-2 -2 52 52" className={className} aria-hidden="true" focusable="false"><Draw /></svg>;
}
