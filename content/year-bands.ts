// Year bands: how subjects and timetable sessions are grouped by year level.
// Order matters: bands display youngest to oldest on the ruler, Subjects and the timetable filters.

/** Pencil colours available for bands; each maps to a CSS token `--pencil-<colour>`. */
export const pencilColours = ['red', 'orange', 'green', 'blue', 'purple'] as const;
export type PencilColour = typeof pencilColours[number];

export interface YearBand {
  /** Stable URL-safe ID, used in /subjects/#<id> and ?band=<id>. */
  id: string;
  /** Short name, e.g. "Primary". */
  label: string;
  /** Year levels as displayed, e.g. "Years 3–6". */
  years: string;
  /** Typical ages as displayed. */
  ages: string;
  /** First and last year on the ruler (0 = Prep). Used to draw the bracket. */
  from: number;
  to: number;
  /** One sentence for the Subjects page. */
  blurb: string;
  colour: PencilColour;
}

export const yearBands: YearBand[] = [
  {
    id: 'foundation-2', label: 'Early years', years: 'Prep–Year 2', ages: 'Ages 5–8', from: 0, to: 2, colour: 'red',
    blurb: 'Letter sounds, first readers and number sense, taught in groups of four with lots of praise and plenty of practice.',
  },
  {
    id: 'years-3-6', label: 'Primary', years: 'Years 3–6', ages: 'Ages 8–12', from: 3, to: 6, colour: 'orange',
    blurb: 'The years where reading turns into writing and tables turn into fractions. We fill the gaps before high school.',
  },
  {
    id: 'years-7-8', label: 'Junior secondary', years: 'Years 7–8', ages: 'Ages 12–14', from: 7, to: 8, colour: 'green',
    blurb: 'New school, new teachers, algebra. Small groups that keep the momentum going, plus selective entry preparation.',
  },
  {
    id: 'years-9-10', label: 'Middle secondary', years: 'Years 9–10', ages: 'Ages 14–16', from: 9, to: 10, colour: 'blue',
    blurb: 'Essays, equations and practical reports: the skills that make choosing VCE subjects a real choice.',
  },
  {
    id: 'vce', label: 'VCE', years: 'Years 11–12', ages: 'Ages 16–18', from: 11, to: 12, colour: 'purple',
    blurb: 'Ninety-minute sessions in groups of five, built around the study design, practice exams and timing.',
  },
];
