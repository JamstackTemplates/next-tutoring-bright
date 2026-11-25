// Small reusable stationery: stickers, doodles, a pencil divider and a paper clip. All decorative.
import { Inked, Line } from './ink';

const STAR = 'M0-20 5-6.9 19-6.2 8.1 2.6 11.8 16.2 0 8.5-11.8 16.2-8.1 2.6-19-6.2-5-6.9Z';

function scallop(radius: number, bumps: number, depth: number): string {
  const point = (r: number, a: number) => `${(r * Math.cos(a)).toFixed(2)} ${(r * Math.sin(a)).toFixed(2)}`;
  let d = `M${point(radius, 0)}`;
  for (let i = 0; i < bumps; i++) {
    const a = (i / bumps) * Math.PI * 2;
    const b = ((i + 1) / bumps) * Math.PI * 2;
    d += `Q${point(radius + depth, (a + b) / 2)} ${point(radius, b)}`;
  }
  return `${d}Z`;
}
const SCALLOP = scallop(25, 16, 5);

/** Gold-star sticker as an SVG group centred on 0,0 (about 60 units across). */
export function GoldStarShape() {
  return <g>
    <path d={SCALLOP} className="fill-star" transform="translate(2 2)" />
    <path d={SCALLOP} className="ln-thin" />
    <path d={STAR} className="fill-bulb" />
    <path d={STAR} className="ln-thin" />
    <path d="M-16-12a20 20 0 0 1 10-8" className="ln-thin" style={{ stroke: 'var(--sheet)' }} />
  </g>;
}

export function GoldStar({ className = 'h-14 w-14', rotate = -8 }: { className?: string; rotate?: number }) {
  return <svg viewBox="-34 -34 68 68" className={`sticker ${className}`} style={{ ['--rot' as string]: `${rotate}deg` }} aria-hidden="true" focusable="false">
    <GoldStarShape />
  </svg>;
}

export type DoodleKind = 'star' | 'spiral' | 'arrow' | 'smiley' | 'tick' | 'heart' | 'squiggle';

const DOODLES: Record<DoodleKind, string> = {
  star: STAR,
  spiral: 'M2 0c0 3-4 3-4 0s5-6 8-1-3 11-10 9S-14-6-6-11s19 0 18 10',
  arrow: 'M-20 10C-12-12 10-14 14 2c3 12-12 12-10 0 2-10 18-12 24-6m0 0-1-8m1 8-8 1',
  smiley: 'M0-16a16 16 0 1 0 .1 0ZM-6-4v2M6-4v2M-8 5c4 6 12 6 16 0',
  tick: 'M-14 0l9 10L16-14',
  heart: 'M0 12C-16 2-16-12-7-12c4 0 6 3 7 6 1-3 3-6 7-6 9 0 9 14-7 24Z',
  squiggle: 'M-22 0c4-8 8 8 12 0s8 8 12 0 8 8 12 0 6 6 8 2',
};

/** A pencil doodle for the page margin. `tone` is a Tailwind stroke utility. */
export function Doodle({ kind, className = 'h-10 w-10', tone = '' }: { kind: DoodleKind; className?: string; tone?: string }) {
  return <svg viewBox="-24 -24 48 48" className={className} aria-hidden="true" focusable="false">
    <path d={DOODLES[kind]} className={`ln ${tone}`} />
  </svg>;
}

/** A long pencil lying across the page, used as a section divider. */
export function PencilDivider({ className = '' }: { className?: string }) {
  const facets = 'M95 20H1078';
  return <div className={`wrap ${className}`} aria-hidden="true">
    <svg viewBox="0 0 1200 44" className="block h-auto w-full max-w-5xl" preserveAspectRatio="xMidYMid meet" focusable="false">
      <Inked d="M18 10c0-3 2-5 5-5h40v30H23c-3 0-5-2-5-5Z" fill="fill-sticky" />
      <Inked d="M63 5h32v30H63Z" fill="fill-rule" />
      <Line d="M71 6v28M79 6v28M87 6v28" thin />
      <Inked d="M95 5h985v30H95Z" fill="fill-bulb" />
      <Line d={facets} thin />
      <Inked d="M1080 5l58 13c3 1 3 3 0 4l-58 13Z" fill="fill-wood" />
      <path d="M1124 14.8l14 3.2c3 1 3 3 0 4l-14 3.2Z" className="fill-ink" />
      <Line d="M1080 5c6 4 6 26 0 30" thin />
      <Line d="M1160 30c6-14 22-16 24-6s-12 10-12 2 10-8 14-2" thin />
    </svg>
  </div>;
}

export function PaperClip({ className = 'h-16 w-6' }: { className?: string }) {
  return <svg viewBox="0 0 24 64" className={className} aria-hidden="true" focusable="false">
    <path d="M8 18V50c0 5 8 5 8 0V10c0-8-13-8-13 0v42c0 11 18 11 18 0V22" className="ln" style={{ stroke: 'var(--muted)' }} />
  </svg>;
}

/** A hand-drawn tick, e.g. for checklists. */
export function Tick({ className = 'h-5 w-5' }: { className?: string }) {
  return <svg viewBox="-18 -18 36 36" className={className} aria-hidden="true" focusable="false">
    <path d={DOODLES.tick} className="ln" style={{ stroke: 'var(--tick)', strokeWidth: 4 }} />
  </svg>;
}
