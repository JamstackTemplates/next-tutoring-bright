// Pure timetable helpers shared by pages, the browser filters and tests.
import { weekdays, type Session, type Term, type Weekday } from '../content/timetable.ts';

export const clockPattern = /^([01]\d|2[0-3]):[0-5]\d$/;

/** Minutes since midnight for HH:MM. */
export function toMinutes(value: string): number {
  return Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
}

/** "16:00" → "4:00pm"; "09:30" → "9:30am". */
export function displayTime(value: string): string {
  const hours = Number(value.slice(0, 2));
  const suffix = hours >= 12 ? 'pm' : 'am';
  return `${((hours + 11) % 12) + 1}:${value.slice(3)}${suffix}`;
}

export function displayRange(start: string, end: string): string {
  return `${displayTime(start)}–${displayTime(end)}`;
}

export function openSpots(session: Pick<Session, 'capacity' | 'enrolled'>): number {
  return Math.max(0, session.capacity - session.enrolled);
}

/** Public wording for a class's places. Never implies a place is reserved or confirmed. */
export function spotsLabel(session: Pick<Session, 'capacity' | 'enrolled'>): string {
  const open = openSpots(session);
  if (open === 0) return 'Full · waitlist enquiries welcome';
  return open === 1 ? '1 spot open' : `${open} spots open`;
}

export interface TimetableFilter {
  /** Year-band ID, or '' for all. */
  band: string;
  /** Subject ID, or '' for all. */
  subject: string;
}

export function filterSessions<T extends Pick<Session, 'band' | 'subject'>>(list: readonly T[], filter: TimetableFilter): T[] {
  return list.filter(session => (!filter.band || session.band === filter.band) && (!filter.subject || session.subject === filter.subject));
}

/** Sorts by day then start time. */
export function sortSessions<T extends Pick<Session, 'day' | 'start'>>(list: readonly T[]): T[] {
  return [...list].sort((a, b) => weekdays.indexOf(a.day) - weekdays.indexOf(b.day) || toMinutes(a.start) - toMinutes(b.start));
}

export function sessionsByDay<T extends Pick<Session, 'day' | 'start'>>(list: readonly T[]): { day: Weekday; sessions: T[] }[] {
  const sorted = sortSessions(list);
  return weekdays.map(day => ({ day, sessions: sorted.filter(session => session.day === day) }));
}

/** Reads ?band= and ?subject= from a query string, keeping only known IDs. */
export function filterFromQuery(search: string, bandIds: readonly string[], subjectIds: readonly string[]): TimetableFilter {
  const params = new URLSearchParams(search);
  const band = params.get('band') ?? '';
  const subject = params.get('subject') ?? '';
  return { band: bandIds.includes(band) ? band : '', subject: subjectIds.includes(subject) ? subject : '' };
}

export function filterToQuery(filter: TimetableFilter): string {
  const params = new URLSearchParams();
  if (filter.band) params.set('band', filter.band);
  if (filter.subject) params.set('subject', filter.subject);
  const query = params.toString();
  return query ? `?${query}` : '';
}

/** Today's ISO date (YYYY-MM-DD) in the business zone. Browser-only callers supply the clock. */
export function isoDateInZone(timeZone: string, now = new Date()): string {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone, year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  return `${part('year')}-${part('month')}-${part('day')}`;
}

/** The term running on `today`, and the next term to start after it. ISO dates compare as strings. */
export function termStatus(list: readonly Term[], today: string): { current?: string; next?: string } {
  const current = list.find(term => term.start <= today && today <= term.end)?.id;
  const next = list.find(term => term.start > today)?.id;
  return { current, next };
}

/** Whole weeks (rounded up) from a Monday start to the last class day. */
export function termWeeks(term: Pick<Term, 'start' | 'end'>): number {
  const days = (Date.parse(`${term.end}T00:00:00Z`) - Date.parse(`${term.start}T00:00:00Z`)) / 86_400_000 + 1;
  return Math.ceil(days / 7);
}

/** "5 Oct – 12 Dec" from ISO dates, formatted in UTC so it never shifts with the visitor's zone. */
export function displayDateRange(start: string, end: string): string {
  const format = (iso: string) => new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'short', timeZone: 'UTC' })
    .format(new Date(`${iso}T00:00:00Z`));
  return `${format(start)} – ${format(end)}`;
}
