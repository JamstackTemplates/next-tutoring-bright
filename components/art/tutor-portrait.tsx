// TutorPortrait: a parametric line-drawn head and shoulders, driven by content/tutors.ts portrait fields.
import type { Tutor } from '../../content/tutors';
import { Inked, Line } from './ink';

const badgeFill: Record<Tutor['portrait']['badgeColour'], string> = {
  blue: 'fill-pencil-blue', yellow: 'fill-bulb', pink: 'fill-sticky', green: 'fill-pencil-green',
};

const HAIR_BACK: Partial<Record<Tutor['portrait']['hair'], string>> = {
  long: 'M30 46c-4-24 10-36 30-36s34 12 30 36l4 44H26Z',
  curly: 'M26 50c-8-6-6-18 2-20-2-10 8-18 16-14 4-8 18-8 22 0 8-4 18 4 16 14 8 2 10 14 2 20 4 8-2 16-8 14H34c-6 2-12-6-8-14Z',
  bob: 'M30 46c-2-22 12-34 30-34s32 12 30 34l2 22H28Z',
};
const HAIR_FRONT: Record<Tutor['portrait']['hair'], string> = {
  long: 'M36 44c4-16 14-24 26-22 10 2 20 10 22 24-10-6-22-10-32-12-6 2-12 6-16 10Z',
  curly: 'M36 38c2-10 14-16 24-12 10-4 22 2 24 12-6 0-10-4-12-6-4 4-12 6-18 2-6 4-12 6-18 4Z',
  bob: 'M34 46c2-18 14-26 26-26s24 8 26 26c-8-4-14-12-16-18-8 10-22 16-36 18Z',
  short: 'M34 44c-2-18 10-28 26-28 14 0 26 8 26 26-4-6-10-10-16-10-10 0-24 4-36 12Z',
  bun: 'M34 44c2-16 12-24 26-24s24 8 26 24c-8-8-18-12-26-12s-18 4-26 12ZM50 8a10 10 0 1 0 20 0 10 10 0 1 0-20 0Z',
  crop: 'M36 40c0-14 10-22 24-22s24 8 24 22c-6-6-14-8-24-8s-18 2-24 8Z',
};

export function TutorPortrait({ portrait, className = 'h-28 w-28' }: { portrait: Tutor['portrait']; className?: string }) {
  const skin = { fill: `var(--skin-${portrait.skin})` };
  return <svg viewBox="0 0 120 120" className={className} style={{ clipPath: 'circle(49.5%)' }} aria-hidden="true" focusable="false">
    <circle cx="60" cy="60" r="56" className="fill-paper-2" />
    {HAIR_BACK[portrait.hair] ? <path d={HAIR_BACK[portrait.hair]} style={{ fill: 'var(--hair)' }} /> : null}
    <Inked d="M14 120c2-22 18-34 46-34s44 12 46 34Z" fill={badgeFill[portrait.badgeColour]} />
    <path d="M50 78v12c4 6 16 6 20 0V78Z" style={skin} />
    <Line d="M50 80v10c4 6 16 6 20 0V80M48 92l12 10 12-10" thin />
    <path d="M60 22c16 0 24 12 24 28s-10 30-24 30-24-14-24-30 8-28 24-28Z" style={skin} />
    <path d="M60 22c16 0 24 12 24 28s-10 30-24 30-24-14-24-30 8-28 24-28Z" className="ln" />
    <path d={HAIR_FRONT[portrait.hair]} style={{ fill: 'var(--hair)' }} />
    <Line d="M52 52v2M68 52v2M53 66c4 4 10 4 14 0" />
    <Line d="M60 56c-1 3-2 5 0 6" thin />
    {portrait.accessory === 'glasses' ? <Line d="M44 53a7 6 0 1 0 14 0 7 6 0 1 0-14 0ZM62 53a7 6 0 1 0 14 0 7 6 0 1 0-14 0ZM58 53h4M44 52l-6-2M76 52l6-2" thin /> : null}
    {portrait.accessory === 'earrings' ? <g><circle cx="36" cy="62" r="3.5" className="fill-bulb" /><circle cx="84" cy="62" r="3.5" className="fill-bulb" /></g> : null}
    {portrait.accessory === 'pencil' ? <g transform="translate(80 30) rotate(55)">
      <Inked d="M0-3h26v6H0Z" fill="fill-bulb" thin offset={1} /><path d="M26-3l7 3-7 3Z" className="fill-wood" />
    </g> : null}
    <circle cx="60" cy="60" r="56" className="ln" />
  </svg>;
}
