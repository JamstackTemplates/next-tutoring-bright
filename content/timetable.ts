// Term dates and the weekly class timetable. The owner edits this file most often:
// - when a learner joins or leaves a class, change that session's `enrolled` count
// - each year, add the new terms (Monday start, ISO dates)
// Open places are shown as "at the time of publishing"; places are confirmed only when the centre replies.

export const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const;
export type Weekday = typeof weekdays[number];

export const weekdayNames: Record<Weekday, string> = {
  mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday',
};

export interface Room {
  id: string;
  name: string;
}

export const rooms: Room[] = [
  { id: 'edison', name: 'Edison room' },
  { id: 'curie', name: 'Curie room' },
  { id: 'lovelace', name: 'Lovelace room' },
];

export interface Term {
  /** Stable ID such as 2027-t1. */
  id: string;
  label: string;
  /** ISO date (YYYY-MM-DD) of the first Monday. */
  start: string;
  /** ISO date of the last day of classes (Friday or Saturday). */
  end: string;
  /** Optional short note shown under the term. */
  enrolmentNote?: string;
}

export const terms: Term[] = [
  { id: '2026-t4', label: 'Term 4, 2026', start: '2026-10-05', end: '2026-12-12' },
  { id: '2027-t1', label: 'Term 1, 2027', start: '2027-02-01', end: '2027-04-03', enrolmentNote: 'Enrolment enquiries open' },
  { id: '2027-t2', label: 'Term 2, 2027', start: '2027-04-19', end: '2027-06-26' },
  { id: '2027-t3', label: 'Term 3, 2027', start: '2027-07-12', end: '2027-09-18' },
  { id: '2027-t4', label: 'Term 4, 2027', start: '2027-10-04', end: '2027-12-11' },
];

export interface Session {
  /** Stable URL-safe ID: <day>-<subject>-<HHMM>. */
  id: string;
  day: Weekday;
  /** 24-hour HH:MM, inside the centre hours for that day. */
  start: string;
  end: string;
  /** Subject ID; length must equal the subject's sessionMinutes. */
  subject: string;
  /** Year-band ID; must be one of the subject's bands. */
  band: string;
  /** Tutor ID; the tutor must teach the subject. */
  tutor: string;
  /** Room ID. */
  room: string;
  /** Places in the class: 1–6. */
  capacity: number;
  /** Learners enrolled: 0 to capacity. Capacity minus enrolled = open places. */
  enrolled: number;
}

export const sessions: Session[] = [
  { id: 'mon-early-reading-1600', day: 'mon', start: '16:00', end: '17:00', subject: 'early-reading', band: 'foundation-2', tutor: 'priya-raman', room: 'curie', capacity: 4, enrolled: 3 },
  { id: 'mon-secondary-maths-1630', day: 'mon', start: '16:30', end: '17:30', subject: 'secondary-maths', band: 'years-7-8', tutor: 'tom-nguyen', room: 'edison', capacity: 6, enrolled: 6 },
  { id: 'mon-vce-english-1800', day: 'mon', start: '18:00', end: '19:30', subject: 'vce-english', band: 'vce', tutor: 'maya-okafor', room: 'lovelace', capacity: 5, enrolled: 3 },
  { id: 'tue-primary-maths-1600', day: 'tue', start: '16:00', end: '17:00', subject: 'primary-maths', band: 'years-3-6', tutor: 'lena-fischer', room: 'edison', capacity: 6, enrolled: 4 },
  { id: 'tue-science-1630', day: 'tue', start: '16:30', end: '17:30', subject: 'science', band: 'years-9-10', tutor: 'sam-whitlock', room: 'curie', capacity: 6, enrolled: 5 },
  { id: 'tue-vce-methods-1800', day: 'tue', start: '18:00', end: '19:30', subject: 'vce-methods', band: 'vce', tutor: 'tom-nguyen', room: 'edison', capacity: 5, enrolled: 5 },
  { id: 'wed-primary-writing-1600', day: 'wed', start: '16:00', end: '17:00', subject: 'primary-writing', band: 'years-3-6', tutor: 'jordan-ellis', room: 'lovelace', capacity: 6, enrolled: 2 },
  { id: 'wed-secondary-english-1700', day: 'wed', start: '17:00', end: '18:00', subject: 'secondary-english', band: 'years-9-10', tutor: 'maya-okafor', room: 'curie', capacity: 6, enrolled: 4 },
  { id: 'wed-vce-chemistry-1800', day: 'wed', start: '18:00', end: '19:30', subject: 'vce-chemistry', band: 'vce', tutor: 'sam-whitlock', room: 'edison', capacity: 5, enrolled: 2 },
  { id: 'thu-primary-maths-1600', day: 'thu', start: '16:00', end: '17:00', subject: 'primary-maths', band: 'foundation-2', tutor: 'lena-fischer', room: 'curie', capacity: 4, enrolled: 4 },
  { id: 'thu-secondary-maths-1700', day: 'thu', start: '17:00', end: '18:00', subject: 'secondary-maths', band: 'years-9-10', tutor: 'tom-nguyen', room: 'edison', capacity: 6, enrolled: 3 },
  { id: 'thu-secondary-english-1700', day: 'thu', start: '17:00', end: '18:00', subject: 'secondary-english', band: 'years-7-8', tutor: 'jordan-ellis', room: 'lovelace', capacity: 6, enrolled: 5 },
  { id: 'fri-selective-entry-1600', day: 'fri', start: '16:00', end: '17:30', subject: 'selective-entry', band: 'years-7-8', tutor: 'lena-fischer', room: 'lovelace', capacity: 6, enrolled: 6 },
  { id: 'sat-early-reading-0900', day: 'sat', start: '09:00', end: '10:00', subject: 'early-reading', band: 'foundation-2', tutor: 'priya-raman', room: 'curie', capacity: 4, enrolled: 2 },
  { id: 'sat-primary-writing-0930', day: 'sat', start: '09:30', end: '10:30', subject: 'primary-writing', band: 'years-3-6', tutor: 'jordan-ellis', room: 'lovelace', capacity: 6, enrolled: 3 },
  { id: 'sat-vce-methods-1100', day: 'sat', start: '11:00', end: '12:30', subject: 'vce-methods', band: 'vce', tutor: 'tom-nguyen', room: 'edison', capacity: 5, enrolled: 3 },
  { id: 'sat-science-1100', day: 'sat', start: '11:00', end: '12:00', subject: 'science', band: 'years-7-8', tutor: 'sam-whitlock', room: 'curie', capacity: 6, enrolled: 1 },
];

/** Sessions shown in the Home page planner, in order. */
export const homePlannerSessionIds = [
  'mon-early-reading-1600', 'tue-primary-maths-1600', 'wed-primary-writing-1600',
  'wed-vce-chemistry-1800', 'thu-secondary-maths-1700', 'sat-science-1100',
];
