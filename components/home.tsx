// Home page sections. Copy is written in app/page.tsx; these own markup, layout, art and data lookups.
import type { CSSProperties, ReactNode } from 'react';
import { addressLine, business, phoneHref } from '../content/business';
import { quotes, resultsDisclaimer, stats } from '../content/results';
import { homePlannerSessionIds, sessions, weekdayNames } from '../content/timetable';
import { tutors } from '../content/tutors';
import { yearBands } from '../content/year-bands';
import { mapDirectionsUrl } from '../lib/maps';
import { displayRange } from '../lib/timetable';
import { CentreMap } from './art/centre-map';
import { Doodle, PaperClip } from './art/decor';
import { HeroDesk } from './art/hero-desk';
import { LightbulbMark } from './art/lightbulb';
import { ResultsChart } from './art/results-chart';
import { SubjectIcon } from './art/subject-icon';
import { YearRuler } from './art/year-ruler';
import { ContactButton } from './contact-button';
import { OpenBadge } from './open-badge';
import { BandTag, Spots } from './session-slot';
import { SiteLink } from './site-link';
import { TutorBadge } from './tutor-badge';
import { subjectById } from '../content/subjects';

type ContentProps = { children: ReactNode };
const area = (name: string): CSSProperties => ({ gridArea: name });

/* ── 1. Hero ─────────────────────────────────────────────── */

function HeroSection({ children }: ContentProps) {
  return <section aria-labelledby="hero-heading" className="ruled relative overflow-hidden">
    <div className="wrap margin-pad relative grid gap-x-6 pt-8 pb-12 md:pt-14 md:pb-16 [grid-template-areas:'note''heading''intro''actions''art''facts'] md:grid-cols-[1.05fr_.95fr] md:[grid-template-areas:'note_art''heading_art''intro_art''actions_art''facts_art']">
      {children}
      <div style={area('art')} className="relative -mx-2 mt-6 md:mt-0 md:-mr-24 md:self-center lg:-mr-40">
        <HeroDesk className="mx-auto block h-auto w-[92%] max-w-[40rem] md:w-full" />
      </div>
    </div>
  </section>;
}
function HeroNote({ children }: ContentProps) {
  return <p style={area('note')} className="margin-note mb-3 md:mb-4 md:-ml-[6.8rem] md:w-[4.8rem] md:text-[.95rem] xl:-ml-[10.4rem] xl:w-[8.4rem] xl:text-[1.15rem] md:-rotate-6 md:text-right">{children}</p>;
}
function HeroHeading({ children }: ContentProps) {
  return <h1 id="hero-heading" style={area('heading')} className="text-[clamp(2.75rem,7.4vw,6rem)] leading-[.98] font-black tracking-[-.02em]">{children}</h1>;
}
function HeroIntroduction({ children }: ContentProps) {
  return <p style={area('intro')} className="mt-5 max-w-[34rem] text-[clamp(1.08rem,1.5vw,1.28rem)] leading-[1.6]">{children}</p>;
}
function HeroActions({ children }: ContentProps) {
  return <div style={area('actions')} className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">{children}</div>;
}
function HeroPrimary({ children }: ContentProps) {
  return <ContactButton>{children}</ContactButton>;
}
function HeroSecondary({ children, href }: ContentProps & { href: string }) {
  return <SiteLink href={href} className="pencil-link text-lg">{children}</SiteLink>;
}
function HeroFacts({ children }: ContentProps) {
  return <ul style={area('facts')} className="font-hand mt-8 grid max-w-md gap-1 text-[1.35rem] leading-snug md:mt-10">{children}</ul>;
}
function HeroFact({ children }: ContentProps) {
  return <li className="flex items-center gap-2"><Doodle kind="tick" className="h-5 w-5 shrink-0" tone="[stroke:var(--tick)]" />{children}</li>;
}
export const Hero = Object.assign(HeroSection, {
  Note: HeroNote, Heading: HeroHeading, Introduction: HeroIntroduction, Actions: HeroActions,
  Primary: HeroPrimary, Secondary: HeroSecondary, Facts: HeroFacts, Fact: HeroFact,
});

/** A pencil-highlighted word or phrase inside headings. */
export function Highlight({ children }: ContentProps) {
  return <span className="hl">{children}</span>;
}

/* ── 2. Year-level ruler ─────────────────────────────────── */

function YearLevelsSection({ children }: ContentProps) {
  return <section aria-labelledby="year-levels-heading" className="graph torn-top border-y-2 border-rule/60 py-14 md:py-16">
    <div className="wrap">
      {children}
      <div className="mt-8 md:mt-10">
        <YearRuler bands={yearBands} hrefFor={band => `/subjects/#${band.id}`} />
      </div>
    </div>
  </section>;
}
function YearLevelsHeading({ children }: ContentProps) {
  return <h2 id="year-levels-heading" className="max-w-2xl text-[clamp(2rem,4.4vw,3.25rem)]">{children}</h2>;
}
function YearLevelsIntroduction({ children }: ContentProps) {
  return <p className="mt-3 max-w-xl text-lg text-muted">{children}</p>;
}
export const YearLevels = Object.assign(YearLevelsSection, { Heading: YearLevelsHeading, Introduction: YearLevelsIntroduction });

/* ── 3. How it starts ────────────────────────────────────── */

function StepsSection({ children }: ContentProps) {
  return <section aria-labelledby="steps-heading" className="ruled py-16 md:py-20">
    <div className="wrap margin-pad">{children}</div>
  </section>;
}
function StepsHeading({ children }: ContentProps) {
  return <h2 id="steps-heading" className="text-[clamp(2rem,4.4vw,3.25rem)]">{children}</h2>;
}
function StepsList({ children }: ContentProps) {
  return <ol className="relative mt-10 grid gap-12 md:gap-14">{children}</ol>;
}
function Step({ number, title, children, aside }: ContentProps & { number: number; title: ReactNode; aside?: ReactNode }) {
  return <li className="relative grid gap-5 md:grid-cols-[minmax(0,34rem)_1fr] md:items-start">
    <div className="relative pl-16 md:pl-0">
      <span aria-hidden="true" className="absolute top-[-.4rem] left-0 font-display text-[3.5rem] leading-none font-black text-margin md:-left-[6.2rem] md:w-20 md:text-right md:text-[5rem]">{number}</span>
      <h3 className="text-[1.65rem] font-extrabold"><span className="sr-only">Step {number}: </span>{title}</h3>
      <p className="mt-2 text-lg leading-[2rem]">{children}</p>
      {number < 3 ? <svg viewBox="0 0 120 70" aria-hidden="true" className="absolute -bottom-14 left-24 hidden h-14 w-28 md:block">
        <path d="M6 6c20 50 70 60 100 40m0 0-14-2m14 2-4 14" className="ln-thin" style={{ stroke: 'var(--muted)' }} />
      </svg> : null}
    </div>
    {aside ? <aside className="note max-w-64 -rotate-2 p-5 pr-8 font-hand text-[1.35rem] leading-snug md:mt-2 md:ml-8">{aside}</aside> : null}
  </li>;
}
export const Steps = Object.assign(StepsSection, { Heading: StepsHeading, List: StepsList, Step });

/* ── 4. This week at the centre ──────────────────────────── */

function WeekSection({ children }: ContentProps) {
  const planned = homePlannerSessionIds.map(id => sessions.find(session => session.id === id)!);
  return <section aria-labelledby="week-heading" className="band-case overflow-hidden py-16 md:py-20">
    <div className="wrap grid items-center gap-10 lg:grid-cols-[.8fr_1.2fr]">
      <div>{children}</div>
      <div className="relative lg:rotate-[1.5deg]">
        {/* Spiral binding */}
        <div aria-hidden="true" className="absolute inset-x-6 -top-3 z-10 flex justify-between">
          {Array.from({ length: 14 }, (_, i) => <span key={i} className="h-7 w-3 rounded-full border-[3px] border-on-case-muted bg-case" />)}
        </div>
        <ol className="sheet-ruled relative rounded-[.3rem_.3rem_.6rem_.4rem] px-4 pt-8 pb-4 text-ink sm:px-6">
          {planned.map(session => {
            const subject = subjectById(session.subject);
            return <li key={session.id} className="session grid grid-cols-[3.4rem_1fr] items-center gap-x-3 gap-y-1 border-b-2 border-dashed border-rule py-3 last:border-0 sm:grid-cols-[4.2rem_1fr_auto]">
              <span className="row-span-2 rounded-md bg-primary py-1.5 text-center font-display font-extrabold text-on-primary sm:row-span-1">
                <abbr title={weekdayNames[session.day]} className="no-underline">{weekdayNames[session.day].slice(0, 3)}</abbr>
              </span>
              <span className="flex min-w-0 items-center gap-2.5">
                <SubjectIcon icon={subject.icon} className="hidden h-9 w-9 shrink-0 xs:block" />
                <span className="min-w-0">
                  <span className="block font-bold leading-snug">{subject.name}</span>
                  <span className="flex flex-wrap items-center gap-2 text-[.92rem] text-muted">
                    <span className="tabular-nums">{displayRange(session.start, session.end)}</span>
                    <BandTag id={session.band} />
                  </span>
                </span>
              </span>
              <Spots session={session} className="sm:justify-end" />
            </li>;
          })}
        </ol>
      </div>
    </div>
  </section>;
}
function WeekHeading({ children }: ContentProps) {
  return <h2 id="week-heading" className="text-[clamp(2rem,4.4vw,3.25rem)] text-on-case">{children}</h2>;
}
function WeekIntroduction({ children }: ContentProps) {
  return <p className="mt-4 max-w-md text-lg text-on-case-muted">{children}</p>;
}
function WeekLink({ children, href }: ContentProps & { href: string }) {
  return <p className="mt-6"><SiteLink href={href} className="pencil-link text-lg">{children}</SiteLink></p>;
}
export const Week = Object.assign(WeekSection, { Heading: WeekHeading, Introduction: WeekIntroduction, Link: WeekLink });

/* ── 5. Featured tutors ─────────────────────────────────── */

function TutorsSection({ children, link }: ContentProps & { link: ReactNode }) {
  const featured = tutors.filter(tutor => tutor.featured);
  return <section aria-labelledby="tutors-heading" className="ruled overflow-hidden py-16 md:py-20">
    <div className="wrap margin-pad">
      <div className="flex flex-wrap items-end justify-between gap-4">{children}</div>
      <div aria-hidden="true" className="relative mt-10 hidden h-6 md:block">
        <svg viewBox="0 0 1000 40" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-10 w-full"><path d="M0 6C200 40 300 40 500 20s320-20 500 10" className="ln-thin" style={{ stroke: 'var(--pencil-red)', strokeWidth: 4 }} /></svg>
      </div>
      <ul className="mt-6 grid gap-10 sm:grid-cols-2 md:mt-0 lg:grid-cols-3">
        {featured.map((tutor, index) => <li key={tutor.id} className={index === 1 ? 'md:mt-12' : index === 2 ? 'md:mt-4' : ''}>
          <TutorBadge tutor={tutor} compact tilt={[-2, 1.5, -1][index]} />
        </li>)}
      </ul>
      <div className="mt-10">{link}</div>
    </div>
  </section>;
}
function TutorsHeading({ children }: ContentProps) {
  return <h2 id="tutors-heading" className="text-[clamp(2rem,4.4vw,3.25rem)]">{children}</h2>;
}
function TutorsLink({ children, href }: ContentProps & { href: string }) {
  return <SiteLink href={href} className="pencil-link text-lg">{children}</SiteLink>;
}
export const FeaturedTutors = Object.assign(TutorsSection, { Heading: TutorsHeading, Link: TutorsLink });

/* ── 6. Results ─────────────────────────────────────────── */

function ResultsSection({ children, quote = 'quote-parent-ava' }: ContentProps & { quote?: string }) {
  const chosen = quotes.find(item => item.id === quote) ?? quotes[0];
  return <section aria-labelledby="results-heading" className="band-hl torn-top py-16 md:py-20">
    <div className="wrap grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="order-2 lg:order-1">
        <div className="tape tape-blue relative -rotate-2"><ResultsChart className="h-auto w-full max-w-xl" /></div>
      </div>
      <div className="order-1 lg:order-2">
        {children}
        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          {stats.map(stat => <div key={stat.id}>
            <dt className="sr-only">{stat.label}</dt>
            <dd className="font-display text-[clamp(2.5rem,5vw,3.6rem)] leading-none font-black">{stat.value}</dd>
            <dd className="mt-1.5 font-bold leading-snug">{stat.label}</dd>
            <dd className="mt-1 text-[.85rem] text-muted">{stat.note}</dd>
          </div>)}
        </dl>
        <figure className="note note-pink mt-10 max-w-md rotate-1 p-6 pr-10">
          <blockquote className="font-hand text-[1.45rem] leading-snug">“{chosen.quote}”</blockquote>
          <figcaption className="mt-3 text-[.95rem] font-bold">{chosen.attribution}</figcaption>
        </figure>
        <p className="mt-6 max-w-lg text-[.9rem] text-muted">{resultsDisclaimer}</p>
      </div>
    </div>
  </section>;
}
function ResultsHeading({ children }: ContentProps) {
  return <h2 id="results-heading" className="text-[clamp(2rem,4.4vw,3.25rem)]">{children}</h2>;
}
function ResultsLink({ children, href }: ContentProps & { href: string }) {
  return <p className="mt-4"><SiteLink href={href} className="pencil-link text-lg">{children}</SiteLink></p>;
}
export const ResultsBand = Object.assign(ResultsSection, { Heading: ResultsHeading, Link: ResultsLink });

/* ── 7. Find us ─────────────────────────────────────────── */

export function HoursCard({ title }: { title: ReactNode }) {
  return <div className="sheet-ruled relative rounded-[.3rem_.6rem_.4rem_.5rem] p-6 pt-7">
    <div className="absolute -top-5 right-6"><PaperClip className="h-14 w-5" /></div>
    <h3 className="font-hand text-[1.5rem] font-normal text-margin">{title}</h3>
    <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-bulb/35 px-3 py-1 font-bold" role="status">
      <LightbulbMark className="h-5 w-4" />
      <OpenBadge hours={business.hours} />
    </p>
    <table className="mt-4 w-full">
      <caption className="sr-only">Centre hours, Melbourne time</caption>
      <tbody>
        {business.hours.map(entry => <tr key={entry.day} className="border-b border-rule/70 last:border-0">
          <th scope="row" className="py-1.5 pr-4 text-left">{entry.day}</th>
          <td className="py-1.5 text-right font-bold tabular-nums">{entry.opens ? `${entry.opens}–${entry.closes}` : 'Closed'}</td>
        </tr>)}
      </tbody>
    </table>
    <p className="mt-3 text-[.85rem] text-muted">Times shown in Melbourne time.</p>
  </div>;
}

function FindUsSection({ children, hoursTitle }: ContentProps & { hoursTitle: ReactNode }) {
  return <section aria-labelledby="find-us-heading" className="graph border-y-2 border-rule/60 py-16 md:py-20">
    <div className="wrap grid items-start gap-10 lg:grid-cols-[1.1fr_.9fr]">
      <div>
        {children}
        <div className="sheet mt-8 -rotate-1 rounded-md p-3"><CentreMap className="h-auto w-full" /></div>
      </div>
      <HoursCard title={hoursTitle} />
    </div>
  </section>;
}
function FindUsHeading({ children }: ContentProps) {
  return <h2 id="find-us-heading" className="text-[clamp(2rem,4.4vw,3.25rem)]">{children}</h2>;
}
function FindUsAddress() {
  return <address className="mt-4 text-lg not-italic">
    <span className="font-bold">{business.address.street}</span><br />
    {business.address.locality} {business.address.region} {business.address.postcode}, {business.landmark}<br />
    <a className="text-link" href={phoneHref()}>{business.phone}</a>
  </address>;
}
function FindUsDirections({ children }: ContentProps) {
  return <>
    <p className="mt-3 max-w-xl text-muted">{business.directions}</p>
    <p className="mt-3"><a className="pencil-link" href={mapDirectionsUrl(addressLine())}>{children}</a></p>
  </>;
}
export const FindUs = Object.assign(FindUsSection, { Heading: FindUsHeading, Address: FindUsAddress, Directions: FindUsDirections });

/* ── 8. Closing call to action ──────────────────────────── */

function ClosingSection({ children }: ContentProps) {
  return <section aria-labelledby="closing-heading" className="band-case py-16 md:py-24">
    <div className="wrap">
      <div className="tape tape-yellow sheet-ruled relative mx-auto grid max-w-4xl items-center gap-6 rounded-sm px-6 py-10 text-ink sm:grid-cols-[auto_1fr] sm:px-12 sm:-rotate-1">
        <LightbulbMark className="mx-auto h-32 w-24 sm:h-40 sm:w-30" />
        <div>{children}</div>
      </div>
    </div>
  </section>;
}
function ClosingHeading({ children }: ContentProps) {
  return <h2 id="closing-heading" className="text-[clamp(1.9rem,4vw,3rem)]">{children}</h2>;
}
function ClosingText({ children }: ContentProps) {
  return <p className="mt-3 max-w-xl text-lg">{children}</p>;
}
function ClosingAction({ children }: ContentProps) {
  return <div className="mt-6"><ContactButton>{children}</ContactButton></div>;
}
export const Closing = Object.assign(ClosingSection, { Heading: ClosingHeading, Text: ClosingText, Action: ClosingAction });

