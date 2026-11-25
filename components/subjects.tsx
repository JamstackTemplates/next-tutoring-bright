// Subjects page sections. Copy lives in app/subjects/page.tsx; subject data in content/subjects.ts.
import type { ReactNode } from 'react';
import { formatPrice, pricing } from '../content/pricing';
import { subjects } from '../content/subjects';
import { yearBands, type YearBand } from '../content/year-bands';
import { SubjectIcon } from './art/subject-icon';
import { Tick } from './art/decor';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

/** Year-band jump links drawn as a row of pencil tabs. */
export function BandTabs({ label }: { label: string }) {
  return <nav aria-label={label} className="ruled pb-10">
    <ul className="wrap margin-pad flex flex-wrap gap-x-3 gap-y-3">
      {yearBands.map((band, index) => <li key={band.id} style={{ transform: `rotate(${[-1.5, 1, -0.5, 1.5, -1][index]}deg)` }}>
        <a href={`#${band.id}`} className="group inline-flex items-center no-underline">
          <span className="rounded-l-md border-2 border-r-0 border-ink py-1.5 pr-3 pl-4 font-display font-extrabold" style={{ background: `color-mix(in srgb, var(--pencil-${band.colour}) 30%, var(--sheet))`, boxShadow: `inset 6px 0 0 var(--pencil-${band.colour})` }}>
            {band.label}
          </span>
          <span className="border-y-2 border-ink bg-wood px-2 py-1.5 font-hand text-[1.05rem]">{band.years}</span>
          <span aria-hidden="true" className="h-[2.95rem] w-5 bg-ink [clip-path:polygon(0_0,100%_50%,0_100%)] group-hover:w-7 motion-safe:transition-[width]" />
        </a>
      </li>)}
    </ul>
  </nav>;
}

/** One year band as an exercise-book contents page. */
export function BandSection({ band, index, timetableLabel }: { band: YearBand; index: number; timetableLabel: string }) {
  const list = subjects.filter(subject => subject.bands.includes(band.id));
  return <section id={band.id} aria-labelledby={`${band.id}-heading`} className={`${index % 2 ? 'graph' : 'ruled'} scroll-mt-4 border-t-2 border-rule/60 py-14`}>
    <div className="wrap margin-pad">
      <div className="border-l-[10px] pl-5 md:pl-7" style={{ borderColor: `var(--pencil-${band.colour})` }}>
        <p className="font-hand text-xl text-margin">{band.years}, {band.ages.toLowerCase()}</p>
        <h2 id={`${band.id}-heading`} className="text-[clamp(2rem,4.4vw,3.1rem)]">{band.label}</h2>
        <p className="mt-2 max-w-2xl text-lg text-muted">{band.blurb}</p>
        <ol className="mt-8 grid gap-7">
          {list.map(subject => <li key={subject.id} className="grid grid-cols-[3rem_1fr] gap-x-4 gap-y-1 sm:grid-cols-[3.5rem_1fr]">
            <SubjectIcon icon={subject.icon} className="row-span-3 h-12 w-12 sm:h-14 sm:w-14" />
            <div className="flex items-baseline gap-3">
              <h3 className="font-display text-[1.45rem] leading-tight font-extrabold">{subject.name}</h3>
              <span aria-hidden="true" className="hidden min-w-8 flex-1 translate-y-[-.3rem] border-b-[3px] border-dotted border-muted/60 sm:block" />
              <p className="hidden shrink-0 text-right font-display text-xl font-extrabold tabular-nums sm:block">
                {formatPrice(subject.groupPrice)} <span className="font-sans text-base font-normal text-muted">/ {subject.sessionMinutes} min</span>
              </p>
            </div>
            <p className="font-bold sm:hidden">{formatPrice(subject.groupPrice)} per {subject.sessionMinutes}-minute group session</p>
            <p className="max-w-2xl">{subject.summary}</p>
            <div className="col-start-2 flex flex-wrap items-center gap-x-4 gap-y-2">
              <ul className="font-hand flex flex-wrap gap-x-4 text-[1.15rem] text-muted" aria-label={`${subject.name} topics`}>
                {subject.topics.map(topic => <li key={topic} className="before:mr-1.5 before:text-margin before:content-['✎']">{topic}</li>)}
              </ul>
              <SiteLink href={`/timetable/?band=${band.id}&subject=${subject.id}`} className="pencil-link text-[.95rem]">
                {timetableLabel}<span className="sr-only"> for {subject.name}, {band.years}</span>
              </SiteLink>
            </div>
          </li>)}
        </ol>
      </div>
    </div>
  </section>;
}

export function AllBands({ timetableLabel }: { timetableLabel: string }) {
  return <>{yearBands.map((band, index) => <BandSection key={band.id} band={band} index={index} timetableLabel={timetableLabel} />)}</>;
}

/* ── Group or one-to-one worksheet ─────────────────────── */

function CompareSection({ children }: ContentProps) {
  return <section aria-labelledby="compare-heading" className="band-case py-16 md:py-20">
    <div className="wrap">{children}</div>
  </section>;
}
function CompareHeading({ children }: ContentProps) {
  return <h2 id="compare-heading" className="text-[clamp(2rem,4.4vw,3.1rem)] text-on-case">{children}</h2>;
}
function CompareIntroduction({ children }: ContentProps) {
  return <p className="mt-3 max-w-xl text-lg text-on-case-muted">{children}</p>;
}
function CompareTable({ rows }: { rows: { label: string; group: ReactNode; oneToOne: ReactNode }[] }) {
  const lowest = Math.min(...subjects.map(subject => subject.groupPrice));
  const highest = Math.max(...subjects.map(subject => subject.groupPrice));
  return <div className="sheet-ruled mt-8 overflow-x-auto rounded-[.3rem_.6rem_.4rem_.5rem] p-3.5 text-ink sm:-rotate-[.6deg] sm:p-8">
    <table className="w-full border-collapse text-left text-sm sm:text-base">
      <caption className="sr-only">Group classes compared with one-to-one sessions</caption>
      <thead>
        <tr className="font-display text-base sm:text-xl">
          <td className="w-[22%] sm:w-1/4" />
          <th scope="col" className="pr-2 pb-3 font-extrabold sm:pr-4">Group class</th>
          <th scope="col" className="pb-3 font-extrabold">One-to-one</th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-t-2 border-dashed border-rule">
          <th scope="row" className="py-2.5 pr-2 font-hand text-[1.05rem] font-normal text-margin sm:py-3 sm:pr-4 sm:text-[1.2rem]">Price</th>
          <td className="py-2.5 pr-2 font-bold sm:py-3 sm:pr-4">{formatPrice(lowest)}–{formatPrice(highest)} per session, by subject</td>
          <td className="py-2.5 font-bold sm:py-3">{formatPrice(pricing.oneToOne.price)} per {pricing.oneToOne.minutes} minutes, any subject</td>
        </tr>
        {rows.map(row => <tr key={row.label} className="border-t-2 border-dashed border-rule">
          <th scope="row" className="py-2.5 pr-2 font-hand text-[1.05rem] font-normal text-margin sm:py-3 sm:pr-4 sm:text-[1.2rem]">{row.label}</th>
          <td className="py-2.5 pr-2 sm:py-3 sm:pr-4">{row.group}</td>
          <td className="py-2.5 sm:py-3">{row.oneToOne}</td>
        </tr>)}
      </tbody>
    </table>
    <p className="mt-4 text-[.95rem] text-muted">Prices in Australian dollars, GST included. {pricing.invoiceNote} The learning check is free.</p>
  </div>;
}
export const Compare = Object.assign(CompareSection, { Heading: CompareHeading, Introduction: CompareIntroduction, Table: CompareTable });

/* ── Every session includes ───────────────────────────── */

function IncludesSection({ children }: ContentProps) {
  return <section aria-labelledby="includes-heading" className="ruled py-16">
    <div className="wrap margin-pad grid items-center gap-8 md:grid-cols-[1fr_auto]">{children}</div>
  </section>;
}
function IncludesHeading({ children }: ContentProps) {
  return <h2 id="includes-heading" className="max-w-md text-[clamp(2rem,4.4vw,3.1rem)]">{children}</h2>;
}
function IncludesList({ children }: ContentProps) {
  return <ul className="note max-w-sm rotate-2 p-7 pr-12 font-hand text-[1.4rem] leading-snug">{children}</ul>;
}
function IncludesItem({ children }: ContentProps) {
  return <li className="flex gap-3 py-1.5"><Tick className="mt-1 h-6 w-6 shrink-0" />{children}</li>;
}
export const Includes = Object.assign(IncludesSection, { Heading: IncludesHeading, List: IncludesList, Item: IncludesItem });
