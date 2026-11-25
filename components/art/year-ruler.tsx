// YearRuler: a wooden school ruler marked Prep to 12, with a coloured pencil bracket per year band.
// Each bracket's label links to that band. On small screens the ruler stands upright.
import type { YearBand } from '../../content/year-bands';
import { SiteLink } from '../site-link';

const x = (year: number) => 60 + year * (880 / 12);
const tick = (year: number) => (year === 0 ? 'Prep' : String(year));

export function YearRuler({ bands, hrefFor }: { bands: readonly YearBand[]; hrefFor: (band: YearBand) => string }) {
  const minor = Array.from({ length: 12 * 4 }, (_, i) => 60 + ((i + 1) * 880) / 48).filter((_, i) => (i + 1) % 4 !== 0);
  return <>
    {/* Wide screens: horizontal ruler with brackets and labels underneath */}
    <div className="relative hidden md:block">
      <svg viewBox="0 0 1000 128" className="block h-auto w-full" aria-hidden="true" focusable="false">
        <rect x="12" y="12" width="980" height="72" rx="8" className="fill-wood-dark" />
        <rect x="8" y="8" width="980" height="72" rx="8" className="fill-wood ln" />
        <path d="M20 22c180 4 400-2 600 2s300-2 356 0" className="ln-thin" style={{ stroke: 'var(--wood-dark)', opacity: .6 }} />
        <path d="M20 66c240-3 520 3 960-2" className="ln-thin" style={{ stroke: 'var(--wood-dark)', opacity: .5 }} />
        {minor.map(position => <path key={position} d={`M${position} 8v12`} className="ln-thin" />)}
        {Array.from({ length: 13 }, (_, year) => <g key={year}>
          <path d={`M${x(year)} 8v24`} className="ln" />
          <text x={x(year)} y="56" textAnchor="middle" fontSize="19" fontWeight="700" style={{ fill: 'var(--ink)', fontFamily: 'var(--font-sans)' }}>{tick(year)}</text>
        </g>)}
        {bands.map(band => {
          const x1 = x(band.from) - 26, x2 = x(band.to) + 26;
          return <path key={band.id} d={`M${x1} 96c0 8 2 12 8 12H${x2 - 8}c6 0 8-4 8-12M${(x1 + x2) / 2} 108v12`}
            fill="none" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" style={{ stroke: `var(--pencil-${band.colour})` }} />;
        })}
      </svg>
      <ul className="relative mt-1 h-24">
        {bands.map(band => {
          const centre = ((x(band.from) + x(band.to)) / 2 / 1000) * 100;
          return <li key={band.id} className="absolute top-0 w-44 -translate-x-1/2 text-center" style={{ left: `${centre}%` }}>
            <SiteLink href={hrefFor(band)} className="group block rounded-md px-2 py-1 no-underline">
              <span className="block font-display text-xl font-extrabold group-hover:underline group-hover:decoration-wavy">{band.label}</span>
              <span className="font-hand block text-lg text-muted">{band.years}</span>
            </SiteLink>
          </li>;
        })}
      </ul>
    </div>

    {/* Small screens: upright ruler */}
    <ol className="relative grid gap-2 pl-14 md:hidden">
      <li aria-hidden="true" className="absolute inset-y-0 left-0 w-10 rounded-md border-2 border-ink bg-wood"
        style={{ backgroundImage: 'repeating-linear-gradient(to bottom, var(--ink) 0 2px, transparent 2px 14px)', backgroundSize: '14px 100%', backgroundRepeat: 'no-repeat' }} />
      {bands.map(band => <li key={band.id}>
        <SiteLink href={hrefFor(band)} className="flex items-baseline justify-between gap-3 rounded-r-md border-l-[6px] py-2 pr-2 pl-3 no-underline"
          style={{ borderColor: `var(--pencil-${band.colour})` }}>
          <span className="font-display text-lg font-extrabold">{band.label}</span>
          <span className="font-hand text-lg text-muted">{band.years}</span>
        </SiteLink>
      </li>)}
    </ol>
  </>;
}
