import type { Tutor } from '../content/tutors';
import { subjectById } from '../content/subjects';
import { TutorPortrait } from './art/tutor-portrait';

const strap: Record<Tutor['portrait']['badgeColour'], string> = {
  blue: 'var(--pencil-blue)', yellow: 'var(--bulb)', pink: 'var(--sticky)', green: 'var(--pencil-green)',
};

/** A clip-on name badge hanging from a lanyard. Compact badges show the fun fact; full ones add details. */
export function TutorBadge({ tutor, compact = false, tilt = 0, headingLevel = 3 }: {
  tutor: Tutor; compact?: boolean; tilt?: number; headingLevel?: 2 | 3;
}) {
  const Heading = `h${headingLevel}` as const;
  const colour = strap[tutor.portrait.badgeColour];
  return <article className="relative mx-auto max-w-sm pt-14" aria-labelledby={`tutor-${tutor.id}`}>
    {/* Lanyard and clip */}
    <div aria-hidden="true" className="absolute top-0 left-1/2 h-14 w-24 -translate-x-1/2">
      <span className="absolute top-0 left-2 h-12 w-3 origin-bottom -rotate-[24deg] rounded-sm" style={{ background: colour }} />
      <span className="absolute top-0 right-2 h-12 w-3 origin-bottom rotate-[24deg] rounded-sm" style={{ background: colour }} />
      <span className="absolute bottom-0 left-1/2 h-5 w-8 -translate-x-1/2 rounded-t-md border-2 border-ink bg-rule" />
    </div>
    <div className="sheet relative rounded-[.9rem_.7rem_1rem_.8rem] border-2 border-ink px-5 pt-5 pb-6 transition-transform hover:rotate-0" style={{ transform: `rotate(${tilt}deg)` }}>
      <span aria-hidden="true" className="absolute top-3 left-1/2 h-2 w-12 -translate-x-1/2 rounded-full border-2 border-ink bg-paper" />
      <div className="mt-3 flex items-center gap-4">
        <TutorPortrait portrait={tutor.portrait} className="h-24 w-24 shrink-0" />
        <div>
          <p className="font-hand text-[1.05rem] text-muted">Hello, my name is</p>
          <Heading id={`tutor-${tutor.id}`} className="font-display text-[1.6rem] leading-tight font-black">{tutor.name}</Heading>
          <p className="mt-0.5 font-bold" style={{ textDecoration: `underline ${colour} 3px`, textUnderlineOffset: '.25em' }}>{tutor.role}</p>
        </div>
      </div>
      {compact ? null : <>
        <p className="mt-4 text-[.95rem] text-muted">{tutor.qualifications}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Teaches">
          {tutor.subjects.map(id => <li key={id} className="pencil-tag" style={{ ['--tag' as string]: colour }}>{subjectById(id).name}</li>)}
        </ul>
        <p className="mt-4">{tutor.bio}</p>
      </>}
      <p className={`note ${tutor.portrait.badgeColour === 'pink' ? 'note-pink' : ''} mt-5 rotate-1 p-3.5 pr-7 font-hand text-[1.2rem] leading-snug`}>
        <span className="sr-only">Fun fact: </span>{tutor.funFact}
      </p>
    </div>
  </article>;
}
