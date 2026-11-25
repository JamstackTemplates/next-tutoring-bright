'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { rooms, weekdayNames, type Session } from '../content/timetable';
import { subjects } from '../content/subjects';
import { tutorById } from '../content/tutors';
import { yearBands } from '../content/year-bands';
import {
  displayRange, filterFromQuery, filterSessions, filterToQuery, openSpots, sessionsByDay, type TimetableFilter,
} from '../lib/timetable';
import { SessionSlot } from './session-slot';

const bandIds = yearBands.map(band => band.id);
const subjectIds = subjects.map(subject => subject.id);

/**
 * The weekly timetable as a school planner. Without JavaScript every session renders, grouped by day,
 * and the filters stay hidden. With JavaScript, year-band and subject filters appear; ?band= and
 * ?subject= set the starting view and stay in the address bar so filtered views can be shared.
 */
export function TimetableBoard({ sessions, emptyMessage, emptyAction }: {
  sessions: readonly Session[]; emptyMessage: ReactNode; emptyAction: ReactNode;
}) {
  const [enhanced, setEnhanced] = useState(false);
  const [filter, setFilter] = useState<TimetableFilter>({ band: '', subject: '' });

  useEffect(() => {
    setFilter(filterFromQuery(window.location.search, bandIds, subjectIds));
    setEnhanced(true);
  }, []);

  const update = (next: TimetableFilter) => {
    setFilter(next);
    const url = `${window.location.pathname}${filterToQuery(next)}${window.location.hash}`;
    window.history.replaceState(window.history.state, '', url);
  };

  const shown = useMemo(() => filterSessions(sessions, filter), [sessions, filter]);
  const days = sessionsByDay(shown);
  const subjectChoices = filter.band ? subjects.filter(subject => subject.bands.includes(filter.band)) : subjects;

  return <div data-enhanced={enhanced ? 'true' : 'false'}>
    <div className="js-only band-case mb-10 rounded-[.8rem_1.2rem_.9rem_1.4rem] border-b-[6px] border-case-2 p-5 sm:p-6">
      <fieldset>
        <legend className="font-hand text-[1.25rem] text-on-case">Year level</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          <Chip name="band" value="" checked={!filter.band} onChange={() => update({ band: '', subject: filter.subject })}>All years</Chip>
          {yearBands.map(band => <Chip key={band.id} name="band" value={band.id} colour={`var(--pencil-${band.colour})`} checked={filter.band === band.id}
            onChange={() => update({ band: band.id, subject: subjects.find(s => s.id === filter.subject)?.bands.includes(band.id) ? filter.subject : '' })}>{band.years}</Chip>)}
        </div>
      </fieldset>
      <fieldset className="mt-5">
        <legend className="font-hand text-[1.25rem] text-on-case">Subject</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          <Chip name="subject" value="" checked={!filter.subject} onChange={() => update({ ...filter, subject: '' })}>All subjects</Chip>
          {subjectChoices.map(subject => <Chip key={subject.id} name="subject" value={subject.id} checked={filter.subject === subject.id}
            onChange={() => update({ ...filter, subject: subject.id })}>{subject.name}</Chip>)}
        </div>
      </fieldset>
      <p className="mt-5 font-bold text-on-case" role="status" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? 'class' : 'classes'}{shown.length === sessions.length ? '' : ` of ${sessions.length}`}
      </p>
    </div>

    {shown.length === 0 ? <div className="note mx-auto max-w-md -rotate-1 p-7 pr-10 text-center">
      <p className="font-hand text-[1.5rem] leading-snug">{emptyMessage}</p>
      <p className="mt-4">{emptyAction}</p>
    </div> : <div className="planner no-print grid gap-x-4 gap-y-8 lg:grid-cols-6">
      {days.map(({ day, sessions: list }) => <section key={day} aria-labelledby={`day-${day}`}
        className={list.length ? '' : 'hidden lg:block'}>
        <h2 id={`day-${day}`} className="mb-3 flex items-baseline justify-between rounded-t-lg border-b-4 border-primary bg-sheet px-3 pt-2 pb-1 font-display text-[1.35rem] font-black lg:text-[1.2rem]">
          <span className="lg:hidden">{weekdayNames[day]}</span>
          <abbr title={weekdayNames[day]} className="hidden no-underline lg:inline">{weekdayNames[day].slice(0, 3)}</abbr>
          <span className="font-hand text-base font-normal text-muted">{list.length ? `${list.length} ${list.length === 1 ? 'class' : 'classes'}` : 'none'}</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {list.map(session => <SessionSlot key={session.id} session={session} />)}
          {list.length ? null : <p className="font-hand px-3 text-lg text-muted">No classes match.</p>}
        </div>
      </section>)}
    </div>}

    {/* Print view: a plain table with places as numbers. */}
    <table className="print-table hidden w-full border-collapse text-left text-sm">
      <caption className="mb-2 text-left font-bold">Weekly timetable (open places at the time of publishing)</caption>
      <thead><tr><th>Day</th><th>Time</th><th>Subject</th><th>Year level</th><th>Tutor</th><th>Room</th><th>Open places</th></tr></thead>
      <tbody>
        {sessionsByDay(sessions).flatMap(({ sessions: list }) => list).map(session => <tr key={session.id}>
          <td>{weekdayNames[session.day]}</td>
          <td>{displayRange(session.start, session.end)}</td>
          <td>{subjects.find(subject => subject.id === session.subject)?.name}</td>
          <td>{yearBands.find(band => band.id === session.band)?.years}</td>
          <td>{tutorById(session.tutor).name}</td>
          <td>{rooms.find(room => room.id === session.room)?.name}</td>
          <td>{openSpots(session)} of {session.capacity}</td>
        </tr>)}
      </tbody>
    </table>
  </div>;
}

function Chip({ name, value, checked, onChange, colour, children }: {
  name: string; value: string; checked: boolean; onChange: () => void; colour?: string; children: ReactNode;
}) {
  return <label className="relative inline-flex cursor-pointer">
    <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
    <span className="inline-flex min-h-10 items-center gap-2 rounded-[.45rem_.7rem_.5rem_.8rem] border-2 border-on-case/40 px-3 py-1.5 font-bold text-on-case peer-checked:border-bulb peer-checked:bg-bulb peer-checked:text-[var(--hl-text)] peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-bulb hover:border-on-case">
      {colour ? <span aria-hidden="true" className="h-2.5 w-5" style={{ background: colour, clipPath: 'polygon(0 0,70% 0,100% 50%,70% 100%,0 100%)' }} /> : null}
      {children}
    </span>
  </label>;
}

