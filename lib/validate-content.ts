// Content validation. Every failure names the collection, item ID and field to fix.
import { business } from '../content/business.ts';
import { pricing } from '../content/pricing.ts';
import { quotes, resultsDisclaimer, stats, stories } from '../content/results.ts';
import { subjectIcons, subjects } from '../content/subjects.ts';
import { rooms, sessions, terms, weekdays, homePlannerSessionIds } from '../content/timetable.ts';
import { accessories, badgeColours, hairStyles, skinTones, tutors } from '../content/tutors.ts';
import { pencilColours, yearBands } from '../content/year-bands.ts';
import { DAYS, validateHours } from './hours.ts';
import { clockPattern, toMinutes } from './timetable.ts';

export const allContent = { yearBands, subjects, tutors, rooms, terms, sessions, stats, stories, quotes, homePlannerSessionIds };
export type Content = typeof allContent;

function requireValue(condition: unknown, field: string, problem: string): asserts condition {
  if (!condition) throw new Error(`${field}: ${problem}`);
}

function requiredText(value: unknown, field: string) {
  requireValue(typeof value === 'string' && value.trim(), field, 'required text');
}

function textList(values: unknown, field: string, min = 1, max = Infinity) {
  requireValue(Array.isArray(values) && values.length >= min && values.length <= max, field,
    max === Infinity ? `expected at least ${min} entries` : `expected ${min}–${max} entries`);
  (values as unknown[]).forEach((value, index) => requiredText(value, `${field}[${index}]`));
}

function validateIds(items: readonly { id: string }[], collection: string) {
  const seen = new Set<string>();
  for (const { id } of items) {
    const key = `${collection}.${id}`;
    requireValue(typeof id === 'string' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id), key, 'expected a URL-safe ID (lowercase letters, numbers and hyphens)');
    requireValue(!seen.has(id), key, 'duplicate ID');
    seen.add(id);
  }
}

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const validIsoDate = (value: string) => {
  const time = Date.parse(`${value}T00:00:00Z`);
  return isoDate.test(value) && !Number.isNaN(time) && new Date(time).toISOString().startsWith(value);
};
const utcDay = (value: string) => new Date(`${value}T00:00:00Z`).getUTCDay();

export function validateBusiness() {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'landmark', 'directions'] as const) requiredText(business[key], `business.${key}`);
  requireValue(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(business.email), 'business.email', 'expected a public email address');
  for (const key of ['street', 'locality', 'region', 'postcode', 'country'] as const) requiredText(business.address[key], `business.address.${key}`);
  validateHours(business.hours);
  requiredText(business.enquiries.title, 'business.enquiries.title');
  requiredText(business.enquiries.introduction, 'business.enquiries.introduction');
  textList(business.enquiries.usefulToInclude, 'business.enquiries.usefulToInclude');
}

export function validateContent(data: Content = allContent) {
  validateBusiness();
  for (const [collection, items] of Object.entries(data)) {
    if (Array.isArray(items) && items.length && typeof items[0] === 'object') validateIds(items as { id: string }[], collection);
  }

  requireValue(Number.isInteger(pricing.oneToOne.price) && pricing.oneToOne.price > 0, 'pricing.oneToOne.price', 'expected positive whole dollars');

  for (const band of data.yearBands) {
    const key = `yearBands.${band.id}`;
    for (const field of ['label', 'years', 'ages', 'blurb'] as const) requiredText(band[field], `${key}.${field}`);
    requireValue(pencilColours.includes(band.colour), `${key}.colour`, `expected one of ${pencilColours.join(', ')}`);
    requireValue(Number.isInteger(band.from) && Number.isInteger(band.to) && band.from >= 0 && band.to <= 12 && band.from <= band.to,
      `${key}.from`, 'expected years 0 (Prep) to 12 with from ≤ to');
  }

  for (const subject of data.subjects) {
    const key = `subjects.${subject.id}`;
    requiredText(subject.name, `${key}.name`);
    requiredText(subject.summary, `${key}.summary`);
    textList(subject.topics, `${key}.topics`, 3, 4);
    textList(subject.bands, `${key}.bands`);
    for (const band of subject.bands) requireValue(data.yearBands.some(item => item.id === band), `${key}.bands`, `unknown year band ${band}`);
    requireValue(subject.formats.length > 0 && subject.formats.every(format => format === 'group' || format === 'one-to-one'),
      `${key}.formats`, 'expected group and/or one-to-one');
    requireValue(subjectIcons.includes(subject.icon), `${key}.icon`, `unknown icon ${subject.icon}`);
    requireValue([60, 90].includes(subject.sessionMinutes), `${key}.sessionMinutes`, 'expected 60 or 90 minutes');
    requireValue(Number.isInteger(subject.groupPrice) && subject.groupPrice > 0, `${key}.groupPrice`, 'expected positive whole dollars');
    requireValue(subject.groupPrice < pricing.oneToOne.price, `${key}.groupPrice`, `expected less than the one-to-one price ($${pricing.oneToOne.price})`);
    if (subject.formats.includes('group')) {
      requireValue(data.sessions.some(session => session.subject === subject.id), `${key}.formats`,
        'offers group classes but has no timetable session; add one or remove "group"');
    }
  }

  for (const tutor of data.tutors) {
    const key = `tutors.${tutor.id}`;
    for (const field of ['name', 'role', 'qualifications', 'bio', 'funFact'] as const) requiredText(tutor[field], `${key}.${field}`);
    textList(tutor.subjects, `${key}.subjects`);
    for (const id of tutor.subjects) requireValue(data.subjects.some(subject => subject.id === id), `${key}.subjects`, `unknown subject ${id}`);
    requireValue(typeof tutor.featured === 'boolean', `${key}.featured`, 'expected true or false');
    requireValue(hairStyles.includes(tutor.portrait.hair), `${key}.portrait.hair`, `expected one of ${hairStyles.join(', ')}`);
    requireValue(skinTones.includes(tutor.portrait.skin), `${key}.portrait.skin`, `expected one of ${skinTones.join(', ')}`);
    requireValue(accessories.includes(tutor.portrait.accessory), `${key}.portrait.accessory`, `expected one of ${accessories.join(', ')}`);
    requireValue(badgeColours.includes(tutor.portrait.badgeColour), `${key}.portrait.badgeColour`, `expected one of ${badgeColours.join(', ')}`);
  }
  const featured = data.tutors.filter(tutor => tutor.featured);
  requireValue(featured.length === 3, 'tutors.featured', `expected exactly three featured tutors, found ${featured.length} (${featured.map(tutor => tutor.id).join(', ')})`);

  for (const room of data.rooms) requiredText(room.name, `rooms.${room.id}.name`);

  data.terms.forEach((term, index) => {
    const key = `terms.${term.id}`;
    requiredText(term.label, `${key}.label`);
    requireValue(validIsoDate(term.start), `${key}.start`, 'expected an ISO date YYYY-MM-DD');
    requireValue(validIsoDate(term.end), `${key}.end`, 'expected an ISO date YYYY-MM-DD');
    requireValue(utcDay(term.start) === 1, `${key}.start`, 'expected a Monday');
    requireValue(term.end > term.start, `${key}.end`, 'expected to end after it starts');
    if (index > 0) requireValue(term.start > data.terms[index - 1].end, `${key}.start`, `overlaps or comes before ${data.terms[index - 1].id}`);
  });

  for (const session of data.sessions) {
    const key = `sessions.${session.id}`;
    requireValue(weekdays.includes(session.day), `${key}.day`, `expected one of ${weekdays.join(', ')}`);
    for (const field of ['start', 'end'] as const) requireValue(clockPattern.test(session[field]), `${key}.${field}`, 'expected 24-hour HH:MM');
    requireValue(toMinutes(session.start) < toMinutes(session.end), `${key}.end`, 'expected the session to end after it starts');
    const subject = data.subjects.find(item => item.id === session.subject);
    requireValue(subject, `${key}.subject`, `unknown subject ${session.subject}`);
    requireValue(data.yearBands.some(band => band.id === session.band), `${key}.band`, `unknown year band ${session.band}`);
    requireValue(subject.bands.includes(session.band), `${key}.band`, `${subject.id} is not offered for ${session.band}`);
    const tutor = data.tutors.find(item => item.id === session.tutor);
    requireValue(tutor, `${key}.tutor`, `unknown tutor ${session.tutor}`);
    requireValue(tutor.subjects.includes(subject.id), `${key}.tutor`, `${tutor.id} does not teach ${subject.id}`);
    requireValue(data.rooms.some(room => room.id === session.room), `${key}.room`, `unknown room ${session.room}`);
    requireValue(toMinutes(session.end) - toMinutes(session.start) === subject.sessionMinutes, `${key}.end`,
      `expected ${subject.sessionMinutes} minutes to match ${subject.id}`);
    const dayName = DAYS[weekdays.indexOf(session.day)];
    const hours = business.hours.find(entry => entry.day === dayName);
    requireValue(hours?.opens && hours.closes && toMinutes(session.start) >= toMinutes(hours.opens) && toMinutes(session.end) <= toMinutes(hours.closes),
      `${key}.start`, `expected to fall inside centre hours on ${dayName}`);
    requireValue(Number.isInteger(session.capacity) && session.capacity >= 1 && session.capacity <= 6, `${key}.capacity`, 'expected a whole number from 1 to 6');
    requireValue(Number.isInteger(session.enrolled) && session.enrolled >= 0 && session.enrolled <= session.capacity, `${key}.enrolled`,
      `expected a whole number from 0 to capacity (${session.capacity})`);
  }

  // Clashes: the same tutor or room in overlapping sessions on one day.
  for (const [index, a] of data.sessions.entries()) {
    for (const b of data.sessions.slice(index + 1)) {
      if (a.day !== b.day || toMinutes(a.start) >= toMinutes(b.end) || toMinutes(b.start) >= toMinutes(a.end)) continue;
      requireValue(a.tutor !== b.tutor, `sessions.${a.id}`, `tutor ${a.tutor} is double-booked with ${b.id}`);
      requireValue(a.room !== b.room, `sessions.${a.id}`, `room ${a.room} is double-booked with ${b.id}`);
    }
  }

  requireValue(data.homePlannerSessionIds.length === 6, 'homePlannerSessionIds', 'expected six sessions for the Home planner');
  for (const id of data.homePlannerSessionIds) requireValue(data.sessions.some(session => session.id === id), 'homePlannerSessionIds', `unknown session ${id}`);

  for (const stat of data.stats) {
    for (const field of ['value', 'label', 'note'] as const) requiredText(stat[field], `stats.${stat.id}.${field}`);
  }
  for (const story of data.stories) {
    for (const field of ['learner', 'before', 'after'] as const) requiredText(story[field], `stories.${story.id}.${field}`);
    requireValue(/^[A-Z][a-z]+, (Prep|Year \d{1,2})$/.test(story.learner), `stories.${story.id}.learner`, 'expected a first name and year only, e.g. "Ava, Year 2"');
    requireValue(data.subjects.some(subject => subject.id === story.subject), `stories.${story.id}.subject`, `unknown subject ${story.subject}`);
  }
  for (const quote of data.quotes) {
    requiredText(quote.quote, `quotes.${quote.id}.quote`);
    requiredText(quote.attribution, `quotes.${quote.id}.attribution`);
    requireValue(/^(Parent|Carer|Grandparent|Year \d{1,2}|Prep|VCE)\b/.test(quote.attribution),
      `quotes.${quote.id}.attribution`, 'use a role such as "Parent of a Year 2 learner" or "Year 12 student", not a name');
    requireValue(data.subjects.some(subject => subject.id === quote.subject), `quotes.${quote.id}.subject`, `unknown subject ${quote.subject}`);
  }
  requireValue(/don’t promise|do not promise/.test(resultsDisclaimer), 'resultsDisclaimer', 'must say results are not promised');
}
