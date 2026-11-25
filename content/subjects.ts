// Subjects taught at the centre. Prices are whole Australian dollars per group session, GST included.
// One-to-one pricing is shared by every subject and lives in content/pricing.ts.

export const subjectIcons = ['abc', 'nib', 'abacus', 'set-square', 'open-book', 'beaker', 'stopwatch',
  'quote-book', 'curve', 'molecule'] as const;
export type SubjectIcon = typeof subjectIcons[number];

export type Format = 'group' | 'one-to-one';

export interface Subject {
  /** Stable URL-safe ID, used by sessions, tutors and ?subject=<id>. */
  id: string;
  name: string;
  /** Year-band IDs from content/year-bands.ts where this subject is offered. */
  bands: string[];
  /** One sentence describing the subject. */
  summary: string;
  /** Three or four topics covered. */
  topics: string[];
  formats: Format[];
  /** Length of a group session in minutes; timetable sessions must match. */
  sessionMinutes: number;
  /** AUD per group session, GST included. Must be below the one-to-one price. */
  groupPrice: number;
  /** Drawing from components/art/subject-icon.tsx. */
  icon: SubjectIcon;
}

const both: Format[] = ['group', 'one-to-one'];

export const subjects: Subject[] = [
  {
    id: 'early-reading', name: 'Early reading & phonics', bands: ['foundation-2'], icon: 'abc',
    summary: 'From letter sounds to reading a whole page aloud, at the learner’s own pace.',
    topics: ['Letter sounds', 'Blending and decoding', 'Sight words', 'Reading aloud with confidence'],
    formats: both, sessionMinutes: 60, groupPrice: 45,
  },
  {
    id: 'primary-writing', name: 'Writing workshop', bands: ['years-3-6'], icon: 'nib',
    summary: 'Getting ideas out of heads and onto the page, then making them better.',
    topics: ['Sentences that flow', 'Persuasive and narrative pieces', 'Spelling patterns', 'Editing your own work'],
    formats: both, sessionMinutes: 60, groupPrice: 45,
  },
  {
    id: 'primary-maths', name: 'Maths foundations', bands: ['foundation-2', 'years-3-6'], icon: 'abacus',
    summary: 'Number sense that sticks, with hands-on materials before pencil and paper.',
    topics: ['Number sense', 'Times tables', 'Fractions and decimals', 'Worded problems'],
    formats: both, sessionMinutes: 60, groupPrice: 45,
  },
  {
    id: 'secondary-maths', name: 'Secondary maths', bands: ['years-7-8', 'years-9-10'], icon: 'set-square',
    summary: 'Algebra without the fear: worked examples first, then lots of guided practice.',
    topics: ['Algebra', 'Linear and quadratic graphs', 'Geometry and trigonometry', 'Probability'],
    formats: both, sessionMinutes: 60, groupPrice: 52,
  },
  {
    id: 'secondary-english', name: 'English & essay writing', bands: ['years-7-8', 'years-9-10'], icon: 'open-book',
    summary: 'Reading closely and writing clearly, with feedback on every paragraph.',
    topics: ['Text analysis', 'Essay structure', 'Persuasive language', 'Vocabulary'],
    formats: both, sessionMinutes: 60, groupPrice: 52,
  },
  {
    id: 'science', name: 'Science', bands: ['years-7-8', 'years-9-10'], icon: 'beaker',
    summary: 'Big ideas explained simply, and practical reports that earn their marks.',
    topics: ['Scientific method', 'Chemistry basics', 'Forces and energy', 'Writing up a practical'],
    formats: both, sessionMinutes: 60, groupPrice: 52,
  },
  {
    id: 'selective-entry', name: 'Selective entry exam prep', bands: ['years-7-8'], icon: 'stopwatch',
    summary: 'Calm, timed practice for the Year 8 selective entry exam, one section at a time.',
    topics: ['Reasoning', 'Numerical reasoning', 'Reading comprehension', 'Timed writing'],
    formats: both, sessionMinutes: 90, groupPrice: 60,
  },
  {
    id: 'vce-english', name: 'VCE English', bands: ['vce'], icon: 'quote-book',
    summary: 'Sharper analysis and arguments that hold up under exam conditions.',
    topics: ['Analytical response', 'Argument analysis', 'Creating texts', 'Exam timing'],
    formats: both, sessionMinutes: 90, groupPrice: 64,
  },
  {
    id: 'vce-methods', name: 'VCE Mathematical Methods', bands: ['vce'], icon: 'curve',
    summary: 'Functions, calculus and probability, practised until the exam feels familiar.',
    topics: ['Functions and graphs', 'Calculus', 'Probability distributions', 'Exam technique'],
    formats: both, sessionMinutes: 90, groupPrice: 64,
  },
  {
    id: 'vce-chemistry', name: 'VCE Chemistry', bands: ['vce'], icon: 'molecule',
    summary: 'From moles to mechanisms, with practical reports marked against the study design.',
    topics: ['Stoichiometry', 'Equilibrium', 'Organic chemistry', 'Practical reports'],
    formats: both, sessionMinutes: 90, groupPrice: 64,
  },
];

export function subjectById(id: string): Subject {
  const subject = subjects.find(item => item.id === id);
  if (!subject) throw new Error(`Unknown subject ${id}`);
  return subject;
}
