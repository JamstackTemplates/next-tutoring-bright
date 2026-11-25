'use client';

import { useEffect, useState } from 'react';
import type { Term } from '../content/timetable';
import { site } from '../lib/site';
import { displayDateRange, isoDateInZone, termStatus, termWeeks } from '../lib/timetable';

/**
 * Term dates as calendar tear-offs. Static output lists every term neutrally; in the browser the
 * current and next term (in the business time zone) are highlighted, refreshing every minute.
 */
export function TermStrip({ terms, currentLabel, nextLabel }: { terms: readonly Term[]; currentLabel: string; nextLabel: string }) {
  const [status, setStatus] = useState<{ current?: string; next?: string }>({});
  useEffect(() => {
    if (!site.timeZone) return;
    const update = () => setStatus(termStatus(terms, isoDateInZone(site.timeZone)));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [terms]);

  return <ol className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
    {terms.map((term, index) => {
      const flag = term.id === status.current ? currentLabel : term.id === status.next ? nextLabel : '';
      return <li key={term.id} className={`tape ${index % 2 ? 'tape-blue' : 'tape-yellow'} relative`} style={{ transform: `rotate(${[-2, 1.5, -1, 2, -1.5][index % 5]}deg)` }}>
        <div className={`sheet overflow-hidden rounded-sm text-center ${flag ? 'outline-[3px] outline-bulb' : ''}`}>
          <p className="bg-primary py-1.5 font-display font-extrabold text-on-primary">{term.label.split(',')[0]}</p>
          <p className="pt-2 font-display text-[1.65rem] leading-none font-black">{term.label.split(', ')[1]}</p>
          <p className="mt-1 text-[.95rem] font-bold">{displayDateRange(term.start, term.end)}</p>
          <p className="font-hand pb-3 text-[1.05rem] text-muted">{termWeeks(term)} weeks</p>
        </div>
        {flag || term.enrolmentNote ? <p className="font-hand mt-2 text-center text-[1.1rem] leading-tight text-margin" aria-live="polite">
          {flag}{flag && term.enrolmentNote ? ': ' : ''}{term.enrolmentNote}
        </p> : null}
      </li>;
    })}
  </ol>;
}
