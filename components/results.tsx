// Results page sections. Copy lives in app/results/page.tsx; figures and stories in content/results.ts.
import type { ReactNode } from 'react';
import { quotes, resultsDisclaimer, stats, stories } from '../content/results';
import { subjectById } from '../content/subjects';
import { GoldStar, Tick } from './art/decor';
import { SubjectIcon } from './art/subject-icon';

type ContentProps = { children: ReactNode };

/** Three oversized figures, each circled in pencil. */
export function StatCircles({ heading }: { heading: ReactNode }) {
  return <section aria-labelledby="stats-heading" className="ruled pb-16">
    <div className="wrap margin-pad">
      <h2 id="stats-heading" className="sr-only">{heading}</h2>
      <dl className="grid gap-10 sm:grid-cols-3">
        {stats.map((stat, index) => <div key={stat.id} className="relative">
          <dt className="sr-only">{stat.label}</dt>
          <dd className="relative inline-block px-6 py-4">
            <svg viewBox="0 0 200 110" preserveAspectRatio="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
              <path d={['M20 60C10 20 80 4 140 10s60 50 30 80-120 20-150-16c-6-8-6-20 4-30', 'M30 70C6 40 50 6 120 8s80 40 60 70-110 30-150 0', 'M16 50C24 14 100 2 160 18s40 74-30 84S10 90 18 44'][index]}
                className="ln" style={{ stroke: ['var(--margin)', 'var(--pencil-blue)', 'var(--tick)'][index], strokeWidth: 3 }} />
            </svg>
            <span className="relative font-display text-[clamp(3.25rem,7vw,5rem)] leading-none font-black">{stat.value}</span>
          </dd>
          <dd className="mt-3 text-lg font-bold leading-snug">{stat.label}</dd>
          <dd className="mt-1 text-[.9rem] text-muted">{stat.note}</dd>
        </div>)}
      </dl>
    </div>
  </section>;
}

/** Progress stories as before/after exercise-book spreads. */
function StoriesSection({ children }: ContentProps) {
  return <section aria-labelledby="stories-heading" className="graph torn-top border-y-2 border-rule/60 py-16 md:py-20">
    <div className="wrap">{children}
      <ul className="mt-10 grid gap-12">
        {stories.map((story, index) => {
          const subject = subjectById(story.subject);
          return <li key={story.id} className={index % 2 ? 'md:pl-16' : 'md:pr-16'}>
            <article aria-labelledby={`story-${story.id}`} className="relative">
              <h3 id={`story-${story.id}`} className="mb-3 flex items-center gap-3 font-display text-[1.5rem] font-extrabold">
                <SubjectIcon icon={subject.icon} className="h-10 w-10" />
                <span>{story.learner} <span className="font-sans text-base font-normal text-muted">{subject.name}</span></span>
              </h3>
              <div className="grid overflow-hidden rounded-md border-2 border-ink shadow-[4px_6px_0_-1px_var(--shadow)] sm:grid-cols-2" style={{ transform: `rotate(${index % 2 ? 0.6 : -0.6}deg)` }}>
                <div className="sheet-ruled relative border-b-2 border-dashed border-rule p-6 sm:border-r-2 sm:border-b-0 sm:pl-14" style={{ boxShadow: 'none' }}>
                  <span aria-hidden="true" className="absolute inset-y-0 left-9 hidden w-0.5 bg-margin sm:block" />
                  <p className="font-hand text-[1.1rem] text-margin">Before</p>
                  <p className="font-hand mt-1 text-[1.4rem] leading-snug text-muted line-through decoration-margin/60 decoration-2">{story.before}</p>
                </div>
                <div className="sheet-ruled relative p-6 pr-16" style={{ boxShadow: 'none' }}>
                  <p className="font-hand text-[1.1rem] text-tick">After</p>
                  <p className="font-hand mt-1 text-[1.4rem] leading-snug">{story.after}</p>
                  <span className="absolute top-3 right-3"><GoldStar className="h-12 w-12 sticker-settle" rotate={12} /></span>
                  <span className="absolute right-5 bottom-4"><Tick className="h-7 w-7" /></span>
                </div>
              </div>
            </article>
          </li>;
        })}
      </ul>
    </div>
  </section>;
}
function StoriesHeading({ children }: ContentProps) {
  return <h2 id="stories-heading" className="text-[clamp(2rem,4.4vw,3.1rem)]">{children}</h2>;
}
function StoriesIntroduction({ children }: ContentProps) {
  return <p className="mt-2 max-w-xl text-lg text-muted">{children}</p>;
}
export const Stories = Object.assign(StoriesSection, { Heading: StoriesHeading, Introduction: StoriesIntroduction });

/** Family quotes as sticky notes on a highlighter band. */
export function QuoteNotes({ heading }: { heading: ReactNode }) {
  return <section aria-labelledby="quotes-heading" className="band-hl py-16 md:py-20">
    <div className="wrap">
      <h2 id="quotes-heading" className="text-[clamp(2rem,4.4vw,3.1rem)]">{heading}</h2>
      <ul className="mt-10 grid gap-10 md:grid-cols-3">
        {quotes.map((quote, index) => <li key={quote.id} className={index === 1 ? 'md:mt-10' : ''}>
          <figure className={`note ${index === 1 ? 'note-pink' : ''} h-full p-7 pr-10`} style={{ transform: `rotate(${[-2, 1.5, -1][index]}deg)` }}>
            <blockquote className="font-hand text-[1.45rem] leading-snug">“{quote.quote}”</blockquote>
            <figcaption className="mt-4 font-bold">{quote.attribution}</figcaption>
          </figure>
        </li>)}
      </ul>
    </div>
  </section>;
}

function MeasureSection({ children }: ContentProps) {
  return <section aria-labelledby="measure-heading" className="ruled py-16 md:py-20">
    <div className="wrap margin-pad grid items-start gap-12 lg:grid-cols-[1.2fr_.8fr]">{children}</div>
  </section>;
}
function MeasureList({ heading, children }: ContentProps & { heading: ReactNode }) {
  return <div>
    <h2 id="measure-heading" className="text-[clamp(2rem,4.4vw,3.1rem)]">{heading}</h2>
    <ul className="mt-8 grid gap-8">{children}</ul>
  </div>;
}
function MeasureItem({ note, title, children }: ContentProps & { note: ReactNode; title: ReactNode }) {
  return <li className="relative">
    <p className="margin-note mb-1 md:absolute md:-left-[6.8rem] md:w-[4.8rem] md:-rotate-6 md:text-right md:text-[.95rem] xl:-left-[10.4rem] xl:w-[8.4rem] xl:text-[1.15rem]">{note}</p>
    <h3 className="font-display text-[1.45rem] font-extrabold">{title}</h3>
    <p className="mt-1 max-w-xl text-lg leading-[2rem]">{children}</p>
  </li>;
}
/** The disclaimer, boxed like a teacher's note at the bottom of a page. */
function MeasureDisclaimer({ heading }: { heading: ReactNode }) {
  return <aside aria-labelledby="disclaimer-heading" className="relative rounded-md border-[3px] border-margin bg-sheet p-6 lg:mt-24 lg:rotate-1">
    <h2 id="disclaimer-heading" className="font-hand text-[1.6rem] font-normal text-margin">{heading}</h2>
    <p className="mt-2 text-lg">{resultsDisclaimer}</p>
  </aside>;
}
export const Measure = Object.assign(MeasureSection, { List: MeasureList, Item: MeasureItem, Disclaimer: MeasureDisclaimer });
