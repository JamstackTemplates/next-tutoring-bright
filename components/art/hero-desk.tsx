// HeroDesk: a big lit lightbulb rising from an open exercise book, surrounded by a pencil, protractor,
// a stack of books, a sticky note, a gold star and floating pencil doodles. Decorative.
import { BulbShape } from './lightbulb';
import { GoldStarShape } from './decor';
import { Inked, Line } from './ink';

const leftPage = 'M320 432C262 404 166 400 82 420L60 542c92-22 190-14 260 14Z';
const rightPage = 'M320 432c58-28 154-32 238-12l22 122c-92-22-190-14-260 14Z';
const pageEdge = 'M60 542c92-22 190-14 260 14 70-28 168-36 260-14l3 10c-93-21-190-12-263 16-73-28-170-37-263-16Z';

function pageLines(side: 'left' | 'right') {
  return Array.from({ length: 5 }, (_, i) => {
    const y = 440 + i * 21;
    const d = `M${80 - i * 4} ${y}C160 ${y - 16} 262 ${y - 8} 318 ${y + 16}`;
    return <path key={i} d={d} className="ln-thin" style={{ stroke: 'var(--rule)' }}
      transform={side === 'right' ? 'translate(640 0) scale(-1 1)' : undefined} />;
  });
}

export function HeroDesk({ className = '' }: { className?: string }) {
  return <svg viewBox="0 0 640 600" className={className} role="img" aria-labelledby="hero-desk-title" focusable="false">
    <title id="hero-desk-title">A lit lightbulb rising from an open exercise book, with a pencil, books and a gold star</title>
    <defs>
      <radialGradient id="lamp-pool">
        <stop offset="0" style={{ stopColor: 'var(--bulb-glow)', stopOpacity: 1 }} />
        <stop offset=".65" style={{ stopColor: 'var(--bulb-glow)', stopOpacity: .55 }} />
        <stop offset="1" style={{ stopColor: 'var(--bulb-glow)', stopOpacity: 0 }} />
      </radialGradient>
    </defs>

    <circle cx="322" cy="230" r="250" fill="url(#lamp-pool)" className="bulb-halo" />

    {/* Protractor, behind the book on the left */}
    <g transform="translate(112 404) rotate(-10)">
      <path d="M-86 0a86 86 0 0 1 172 0Z" className="fill-pencil-blue/25" />
      <path d="M-86 0a86 86 0 0 1 172 0Z" className="ln" />
      <path d="M-40 0a40 40 0 0 1 80 0" className="ln-thin" />
      {Array.from({ length: 11 }, (_, i) => {
        const a = Math.PI - (i / 10) * Math.PI;
        const c = Math.cos(a), s = Math.sin(a);
        return <path key={i} d={`M${(86 * c).toFixed(1)} ${(-86 * s).toFixed(1)}L${(74 * c).toFixed(1)} ${(-74 * s).toFixed(1)}`} className="ln-thin" />;
      })}
    </g>

    {/* Stack of three books on the right */}
    <g transform="translate(470 288)">
      <Inked d="M0 70h146v40H0Z" fill="fill-pencil-red" />
      <Inked d="M10 34h128v36H10Z" fill="fill-pencil-green" />
      <Inked d="M-4 0h136v34H-4Z" fill="fill-primary" />
      <Line d="M18 82h58M26 46h40M10 12h70" thin />
      <Line d="M118 4v26M126 38v28M132 74v32" thin />
    </g>

    {/* Sticky note with a solved equation */}
    <g transform="translate(36 150) rotate(-9)">
      <path d="M0 0h132v108l-22 22H0Z" className="fill-paper-2" transform="translate(3 4)" />
      <path d="M0 0h132v108l-22 22H0Z" className="ln" style={{ fill: 'var(--paper-2)' }} />
      <path d="M132 108h-22v22" className="ln-thin" />
      <text x="16" y="56" className="art-text" fontSize="34">x = 4!</text>
      <path d="M16 72c26 6 60 4 92-4" className="ln-thin" style={{ stroke: 'var(--margin)' }} />
      <path d="M86 96l8 9 18-22" className="ln" style={{ stroke: 'var(--tick)' }} />
    </g>

    {/* Floating doodles */}
    <text x="160" y="96" className="art-text" fontSize="48" style={{ fill: 'var(--pencil-orange)' }} transform="rotate(-12 160 96)">½</text>
    <text x="466" y="86" className="art-text" fontSize="38" style={{ fill: 'var(--pencil-red)' }} transform="rotate(8 466 86)">ABC</text>
    <path d="M492 214c14-30 28-30 42 0s28 30 42 0" className="ln" style={{ stroke: 'var(--pencil-blue)', strokeWidth: 3.5 }} />
    <g transform="translate(64 314) rotate(-6)">
      <Inked d="M10 0h22v24l14 34c2 5-1 8-6 8H2c-5 0-8-3-6-8l14-34Z" fill="fill-pencil-green/40" />
      <Line d="M6 0h30M2 46h38" thin />
    </g>
    <path d="M232 160c-6-8 4-16 10-8s-8 18-16 8 6-24 18-16" className="ln-thin" style={{ stroke: 'var(--pencil-purple)' }} />

    {/* Open exercise book */}
    <path d={pageEdge} className="fill-line" />
    <path d={pageEdge} className="ln-thin" />
    <path d={leftPage} className="fill-sheet" />
    <path d={rightPage} className="fill-sheet" />
    {pageLines('left')}
    {pageLines('right')}
    <path d="M112 414l-16 116" className="ln-thin" style={{ stroke: 'var(--margin)' }} />
    <path d={leftPage} className="ln" />
    <path d={rightPage} className="ln" />
    <text x="132" y="460" className="art-text" fontSize="22" transform="rotate(-4 132 460)">y = 2x + 1</text>
    <path d="M410 470l10 11 22-26" className="ln" style={{ stroke: 'var(--tick)' }} />
    <text x="456" y="482" className="art-text" fontSize="20" style={{ fill: 'var(--margin)' }} transform="rotate(5 456 482)">great!</text>

    {/* Motion lines under the rising bulb */}
    <Line d="M286 418c4-8 4-16 0-24M354 418c-4-8-4-16 0-24M320 424v-16" thin />

    {/* The lightbulb moment */}
    <g className="hero-bulb" transform="translate(206 92) scale(4.75)">
      <BulbShape lit />
    </g>

    {/* Pencil lying across the front */}
    <g transform="translate(372 566) rotate(-20)">
      <Inked d="M-46-12c0-3 2-5 5-5h18v34h-18c-3 0-5-2-5-5Z" fill="fill-sticky" />
      <Inked d="M-23-17H0v34h-23Z" fill="fill-rule" />
      <Line d="M-16-16v32M-8-16v32" thin />
      <Inked d="M0-17h196v34H0Z" fill="fill-bulb" />
      <Line d="M2-6h192M2 6h192" thin />
      <Inked d="M196-17l50 15c3 1 3 3 0 4l-50 15Z" fill="fill-wood" />
      <path d="M232-6.2l14 4.2c3 1 3 3 0 4l-14 4.2Z" className="fill-ink" />
    </g>

    {/* Gold star sticker */}
    <g transform="translate(584 168) rotate(12) scale(1.3)"><GoldStarShape /></g>
  </svg>;
}
