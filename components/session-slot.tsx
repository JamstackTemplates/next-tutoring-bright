import { rooms, weekdayNames, type Session } from '../content/timetable';
import { subjectById } from '../content/subjects';
import { firstName, tutorById } from '../content/tutors';
import { yearBands } from '../content/year-bands';
import { displayRange, openSpots, spotsLabel } from '../lib/timetable';
import { SpotBulbs } from './art/lightbulb';
import { SubjectIcon } from './art/subject-icon';

export function bandOf(id: string) {
  const band = yearBands.find(item => item.id === id);
  if (!band) throw new Error(`Unknown year band ${id}`);
  return band;
}

export function BandTag({ id, className = '' }: { id: string; className?: string }) {
  const band = bandOf(id);
  return <span className={`pencil-tag ${className}`} style={{ ['--tag' as string]: `var(--pencil-${band.colour})` }}>{band.years}</span>;
}

/** Places as a row of bulbs plus the words. Lit bulbs are open places. */
export function Spots({ session, className = '' }: { session: Session; className?: string }) {
  const open = openSpots(session);
  return <span className={`flex flex-wrap items-center gap-x-2 gap-y-1 ${className}`}>
    <SpotBulbs capacity={session.capacity} open={open} />
    <span className={`text-[.9rem] font-bold ${open ? 'text-tick' : 'text-muted'}`}>{spotsLabel(session)}</span>
  </span>;
}

/** A lesson slot in the timetable planner. */
export function SessionSlot({ session, headingLevel = 3 }: { session: Session; headingLevel?: 3 | 4 }) {
  const subject = subjectById(session.subject);
  const tutor = tutorById(session.tutor);
  const room = rooms.find(item => item.id === session.room)?.name ?? session.room;
  const Heading = `h${headingLevel}` as const;
  return <article className="session sheet relative rounded-[.3rem_.6rem_.4rem_.5rem] border-l-[6px] p-3.5 pl-3"
    style={{ borderLeftColor: `var(--pencil-${bandOf(session.band).colour})` }}
    data-band={session.band} data-subject={session.subject}>
    <div className="flex items-start justify-between gap-2">
      <p className="font-display text-[1.05rem] font-extrabold tabular-nums text-primary-ink lg:text-[.98rem]">
        <span className="sr-only">{weekdayNames[session.day]}, </span>{displayRange(session.start, session.end)}
      </p>
      <SubjectIcon icon={subject.icon} className="h-9 w-9 shrink-0 -mt-1 lg:h-8 lg:w-8" />
    </div>
    <Heading className="mt-1 font-sans text-[1.02rem] leading-snug font-bold">{subject.name}</Heading>
    <BandTag id={session.band} className="mt-1.5" />
    <p className="mt-2 text-[.92rem] text-muted">With {firstName(tutor)}, {room}</p>
    <Spots session={session} className="mt-2" />
  </article>;
}
