// Timetable page sections. Copy lives in app/timetable/page.tsx; data in content/timetable.ts.
import type { ReactNode } from 'react';
import { terms } from '../content/timetable';
import { SpotBulbs } from './art/lightbulb';
import { TermStrip } from './term-strip';

type ContentProps = { children: ReactNode };

function TermsSection({ children, currentLabel, nextLabel }: ContentProps & { currentLabel: string; nextLabel: string }) {
  return <section aria-labelledby="terms-heading" className="graph border-y-2 border-rule/60 py-12">
    <div className="wrap">
      {children}
      <div className="mt-10"><TermStrip terms={terms} currentLabel={currentLabel} nextLabel={nextLabel} /></div>
    </div>
  </section>;
}
function TermsHeading({ children }: ContentProps) {
  return <h2 id="terms-heading" className="text-[clamp(1.8rem,3.6vw,2.6rem)]">{children}</h2>;
}
function TermsIntroduction({ children }: ContentProps) {
  return <p className="mt-2 max-w-2xl text-muted">{children}</p>;
}
export const TermDates = Object.assign(TermsSection, { Heading: TermsHeading, Introduction: TermsIntroduction });

export function WeekPlanner({ children, heading }: ContentProps & { heading: ReactNode }) {
  return <section aria-labelledby="planner-heading" className="lined py-14">
    <div className="wrap">
      <h2 id="planner-heading" className="mb-8 text-[clamp(1.8rem,3.6vw,2.6rem)]">{heading}</h2>
      {children}
    </div>
  </section>;
}

/** The bulb key and the one-to-one note, written in the margin style. */
function KeySection({ children }: ContentProps) {
  return <section aria-labelledby="key-heading" className="band-hl py-14">
    <div className="wrap grid items-start gap-10 md:grid-cols-2">{children}</div>
  </section>;
}
function KeyExplainer({ heading, children }: ContentProps & { heading: ReactNode }) {
  return <div className="sheet rounded-md p-6 -rotate-1">
    <h2 id="key-heading" className="text-[1.8rem]">{heading}</h2>
    <dl className="mt-4 grid gap-3">{children}</dl>
  </div>;
}
function KeyItem({ open, capacity, children }: ContentProps & { open: number; capacity: number }) {
  return <div className="grid grid-cols-[7.5rem_1fr] items-center gap-3">
    <dt><SpotBulbs capacity={capacity} open={open} /><span className="sr-only">{open} of {capacity} bulbs lit</span></dt>
    <dd>{children}</dd>
  </div>;
}
function KeyNote({ heading, children }: ContentProps & { heading: ReactNode }) {
  return <div className="note note-pink rotate-1 p-7 pr-10">
    <h2 className="text-[1.8rem]">{heading}</h2>
    <div className="mt-3 grid gap-4 text-lg">{children}</div>
  </div>;
}
export const SpotsKey = Object.assign(KeySection, { Explainer: KeyExplainer, Item: KeyItem, Note: KeyNote });
