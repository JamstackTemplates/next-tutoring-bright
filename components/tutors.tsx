// Tutors page sections. Copy lives in app/tutors/page.tsx; tutor data in content/tutors.ts.
import type { ReactNode } from 'react';
import { tutors } from '../content/tutors';
import { GoldStar } from './art/decor';
import { TutorBadge } from './tutor-badge';

type ContentProps = { children: ReactNode };

/** The staffroom wall: every tutor's badge on a lanyard, staggered and tilted. */
export function StaffroomWall({ heading }: { heading: ReactNode }) {
  const tilts = [-2, 1.5, -1, 2, -1.5, 1];
  const offsets = ['', 'lg:mt-16', 'lg:mt-6', 'lg:-mt-6', 'lg:mt-10', ''];
  return <section aria-labelledby="wall-heading" className="lined pb-20">
    <div className="wrap">
      <h2 id="wall-heading" className="sr-only">{heading}</h2>
      <ul className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
        {tutors.map((tutor, index) => <li key={tutor.id} className={offsets[index]}>
          <TutorBadge tutor={tutor} tilt={tilts[index]} />
        </li>)}
      </ul>
    </div>
  </section>;
}

function ChoosingSection({ children }: ContentProps) {
  return <section aria-labelledby="choosing-heading" className="graph torn-top border-b-2 border-rule/60 py-16 md:py-20">
    <div className="wrap grid items-start gap-10 md:grid-cols-[.9fr_1.1fr]">{children}</div>
  </section>;
}
function ChoosingIntro({ heading, children }: ContentProps & { heading: ReactNode }) {
  return <div>
    <h2 id="choosing-heading" className="text-[clamp(2rem,4.4vw,3.1rem)]">{heading}</h2>
    <div className="mt-3 max-w-md text-lg text-muted">{children}</div>
  </div>;
}
function ChoosingList({ children }: ContentProps) {
  return <ol className="sheet-ruled grid gap-1 rounded-md p-6 sm:p-8">{children}</ol>;
}
function ChoosingItem({ title, children }: ContentProps & { title: ReactNode }) {
  return <li className="grid grid-cols-[3.5rem_1fr] items-start gap-3 py-3">
    <GoldStar className="h-12 w-12 sticker-settle" />
    <div>
      <h3 className="font-display text-[1.3rem] font-extrabold">{title}</h3>
      <p className="mt-1 leading-[1.75rem]">{children}</p>
    </div>
  </li>;
}
export const Choosing = Object.assign(ChoosingSection, { Intro: ChoosingIntro, List: ChoosingList, Item: ChoosingItem });
