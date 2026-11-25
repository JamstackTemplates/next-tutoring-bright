/**
 * The signature lightbulb: a hand-drawn bulb whose filament is a pencil squiggle. Lit, the glass fills
 * with bulb yellow and pencil rays spread out. Drawn on a 48×64 grid so it can be reused at any size.
 */
export const BULB_GLASS = 'M24 4.5C12.5 4 5 12.8 5.3 23.2c.2 7.6 4.6 11.6 8.7 16.4 2 2.4 2.3 4.6 2.3 7.4h15.6c-.1-2.9.4-5.1 2.4-7.5 4-4.7 8.5-8.7 8.6-16.3C43 12.6 35.6 4.8 24 4.5Z';
const BULB_BASE = 'M16.4 47.2h15.4l-.3 9.6c-.1 1.4-1.2 2.2-2.6 2.2H19.2c-1.4 0-2.5-.8-2.6-2.2Z';
const BULB_TIP = 'M20.5 59.2c.4 2.4 1.7 3.3 3.5 3.3s3.1-.9 3.5-3.3';
const FILAMENT = 'M19.6 47V37.5c0-3.2-1.7-5.4.4-7.2 1.8-1.5 3 1.2 4 1.2s2.4-2.8 4.1-1.2c2 1.8.3 4 .3 7.2V47';
const SCREW = 'M16.8 50.5h14.6M17 53.8h14.2';
const RAYS = [
  'M24 -3.5v-6', 'M8.6 1.5 5 -3.2', 'M39.4 1.5 43 -3.2', 'M-1.2 14.5l-5.6-2', 'M49.2 14.5l5.6-2', 'M-1.6 28.4h-5.8', 'M49.6 28.4h5.8',
];

export function BulbShape({ lit, rays = true }: { lit: boolean; rays?: boolean }) {
  return <g className={lit ? 'bulb-lit' : 'bulb-unlit'}>
    {rays ? <g className="bulb-rays">
      {RAYS.map((d, i) => <path key={d} d={d} className="ln" style={{ ['--i' as string]: i }} />)}
    </g> : null}
    <path d={BULB_GLASS} className="bulb-glass" transform="translate(2.5 2.5)" />
    <path d={BULB_GLASS} className="ln" fill="none" />
    <path d={FILAMENT} className="ln-thin" />
    <path d={BULB_BASE} className="fill-rule" transform="translate(2 2)" />
    <path d={BULB_BASE} className="ln" fill="none" />
    <path d={SCREW} className="ln-thin" />
    <path d={BULB_TIP} className="ln" />
  </g>;
}

/** Small bulb for the wordmark and buttons. Decorative. */
export function LightbulbMark({ lit = true, className = 'h-8 w-6' }: { lit?: boolean; className?: string }) {
  return <svg viewBox="-9 -12 66 78" className={className} aria-hidden="true" focusable="false">
    <BulbShape lit={lit} />
  </svg>;
}

/** One bulb per place in a class: lit bulbs are open places. Text count must sit alongside. */
export function SpotBulbs({ capacity, open, className = '' }: { capacity: number; open: number; className?: string }) {
  return <span className={`spot-bulbs inline-flex items-end gap-[3px] ${className}`} aria-hidden="true">
    {Array.from({ length: capacity }, (_, index) => {
      const lit = index < open;
      return <svg key={index} viewBox="0 0 52 68" className="h-[1.35rem] w-[1.05rem]" focusable="false">
        <BulbShape lit={lit} rays={false} />
      </svg>;
    })}
  </span>;
}
