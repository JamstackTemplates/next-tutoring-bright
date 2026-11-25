// Tutors. Exactly three are `featured` on the Home page. Every tutor holds a current Working with
// Children Check (stated once on /tutors/). Portraits are drawn, never photographs.

export const hairStyles = ['bob', 'short', 'curly', 'bun', 'long', 'crop'] as const;
export const accessories = ['glasses', 'pencil', 'earrings', 'none'] as const;
export const skinTones = ['light', 'warm', 'tan', 'brown', 'deep'] as const;
export const badgeColours = ['blue', 'yellow', 'pink', 'green'] as const;

export interface Tutor {
  /** Stable URL-safe ID, used by timetable sessions. */
  id: string;
  name: string;
  role: string;
  /** Subject IDs from content/subjects.ts this tutor teaches. */
  subjects: string[];
  qualifications: string;
  /** One or two sentences. */
  bio: string;
  funFact: string;
  /** Shown on the Home page; exactly three tutors. */
  featured: boolean;
  /** Drawing parameters for components/art/tutor-portrait.tsx. */
  portrait: {
    hair: typeof hairStyles[number];
    skin: typeof skinTones[number];
    accessory: typeof accessories[number];
    badgeColour: typeof badgeColours[number];
  };
}

export const tutors: Tutor[] = [
  {
    id: 'maya-okafor', name: 'Maya Okafor', role: 'Centre director, English',
    subjects: ['secondary-english', 'vce-english'], qualifications: 'BA (English), MTeach',
    bio: 'Maya taught English in Melbourne high schools for twelve years before opening Lightbulb. She reads every learner’s first essay herself.',
    funFact: 'Has read every book on the VCE text list, twice.', featured: true,
    portrait: { hair: 'curly', skin: 'deep', accessory: 'earrings', badgeColour: 'yellow' },
  },
  {
    id: 'tom-nguyen', name: 'Tom Nguyen', role: 'Maths lead',
    subjects: ['secondary-maths', 'vce-methods'], qualifications: 'BSc (Mathematics), Grad Dip Ed',
    bio: 'Tom likes the moment a formula stops being a rule and starts making sense. He keeps three different explanations ready for every topic.',
    funFact: 'Can do a Rubik’s cube faster than he can explain it.', featured: true,
    portrait: { hair: 'short', skin: 'warm', accessory: 'glasses', badgeColour: 'blue' },
  },
  {
    id: 'priya-raman', name: 'Priya Raman', role: 'Early literacy specialist',
    subjects: ['early-reading', 'primary-writing'], qualifications: 'BEd (Primary), literacy intervention certificate',
    bio: 'Priya has spent a decade helping young readers crack the code. Her sessions are full of games, sound cards and very proud faces.',
    funFact: 'Keeps a jar of “brave words” for every learner.', featured: true,
    portrait: { hair: 'long', skin: 'brown', accessory: 'none', badgeColour: 'pink' },
  },
  {
    id: 'sam-whitlock', name: 'Sam Whitlock', role: 'Science teacher',
    subjects: ['science', 'vce-chemistry'], qualifications: 'BSc (Chemistry), MTeach',
    bio: 'Sam explains chemistry with kitchen examples and draws a lot of diagrams. Practical reports are a speciality.',
    funFact: 'Once made a volcano that set off the fire alarm.', featured: false,
    portrait: { hair: 'crop', skin: 'light', accessory: 'pencil', badgeColour: 'green' },
  },
  {
    id: 'lena-fischer', name: 'Lena Fischer', role: 'Primary maths and selective entry',
    subjects: ['primary-maths', 'selective-entry'], qualifications: 'BEd (Primary Maths)',
    bio: 'Lena uses blocks, number lines and real objects until the idea clicks, then moves to paper. Calm under exam pressure, and good at passing that on.',
    funFact: 'Teaches fractions with pizza boxes.', featured: false,
    portrait: { hair: 'bun', skin: 'light', accessory: 'glasses', badgeColour: 'yellow' },
  },
  {
    id: 'jordan-ellis', name: 'Jordan Ellis', role: 'Writing and study skills',
    subjects: ['primary-writing', 'secondary-english', 'selective-entry'], qualifications: 'BA (Creative Writing), Grad Dip Ed',
    bio: 'Jordan helps learners find something to say and the words to say it. Also our go-to for planners, revision timetables and study habits.',
    funFact: 'Writes a six-word story every morning.', featured: false,
    portrait: { hair: 'bob', skin: 'tan', accessory: 'pencil', badgeColour: 'blue' },
  },
];

export function tutorById(id: string): Tutor {
  const tutor = tutors.find(item => item.id === id);
  if (!tutor) throw new Error(`Unknown tutor ${id}`);
  return tutor;
}

export const firstName = (tutor: Tutor) => tutor.name.split(' ')[0];
