// Results shown on Home and /results/. Use first names and year levels only for learners, and roles
// (never full names) for quotes. Keep the disclaimer: we never promise marks, ATARs or exam results.

export interface Stat {
  id: string;
  /** Short display value, e.g. "96%". */
  value: string;
  label: string;
  /** Where the figure comes from (survey, period, sample). */
  note: string;
}

export interface Story {
  id: string;
  /** First name and year only, e.g. "Ava, Year 2". */
  learner: string;
  /** Subject ID from content/subjects.ts. */
  subject: string;
  before: string;
  after: string;
}

export interface Quote {
  id: string;
  quote: string;
  /** A role such as "Parent of a Year 2 learner", never a full name. */
  attribution: string;
  /** Subject ID from content/subjects.ts. */
  subject: string;
}

export const stats: Stat[] = [
  { id: 'families-recommend', value: '96%', label: 'of families would recommend us', note: 'End-of-term survey, Term 3 2026, 142 responses' },
  { id: 'reading-growth', value: '+2', label: 'reading levels in a term, on average', note: 'Prep–Year 2 learners with two or more terms, 2026' },
  { id: 'confidence', value: '4 in 5', label: 'learners feel more confident asking questions', note: 'Learner check-in, Term 3 2026' },
];

export const stories: Story[] = [
  { id: 'ava-reading', learner: 'Ava, Year 2', subject: 'early-reading',
    before: 'Guessed words from the pictures and hid her reader in her bag.',
    after: 'Read her first chapter book aloud to the whole family.' },
  { id: 'kai-maths', learner: 'Kai, Year 8', subject: 'secondary-maths',
    before: 'Froze at the sight of an x.',
    after: 'Explains linear equations to his younger sister, and gets them right.' },
  { id: 'noor-writing', learner: 'Noor, Year 5', subject: 'primary-writing',
    before: 'Three sentences, then stuck.',
    after: 'A two-page persuasive piece on why the school needs a reading dog.' },
  { id: 'leo-methods', learner: 'Leo, Year 12', subject: 'vce-methods',
    before: 'Lost marks on every exam for timing.',
    after: 'Finished his practice exams with ten minutes to check.' },
];

export const quotes: Quote[] = [
  { id: 'quote-parent-ava', subject: 'early-reading', attribution: 'Parent of a Year 2 learner',
    quote: 'Ava used to dread reading time. Now she reads the cereal box, the street signs, everything.' },
  { id: 'quote-student-leo', subject: 'vce-methods', attribution: 'Year 12 student',
    quote: 'Tom never made me feel slow. He just found another way to explain it.' },
  { id: 'quote-parent-kai', subject: 'secondary-maths', attribution: 'Parent of a Year 8 learner',
    quote: 'The progress notes after each session meant we always knew what to practise at home.' },
];

/** Shown wherever results appear. */
export const resultsDisclaimer =
  'Stories and figures are from our own records and surveys. Every learner is different, and we don’t promise particular marks, ATARs or exam results.';
