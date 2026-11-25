import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { quotes, resultsDisclaimer, stories } from '../content/results.ts';
import { subjects } from '../content/subjects.ts';
import { sessions, terms } from '../content/timetable.ts';
import { tutors } from '../content/tutors.ts';
import { jsonLd } from '../lib/structured-data.ts';
import { allContent, validateContent, type Content } from '../lib/validate-content.ts';

/** A deep copy of the content with one change applied, so tests never mutate the real data. */
function edited(change: (data: Content) => void): Content {
  const copy = structuredClone(allContent) as Content;
  change(copy);
  return copy;
}
const sessionIn = (data: Content, id: string) => data.sessions.find(session => session.id === id)!;

test('the published content is valid', () => {
  assert.doesNotThrow(() => validateContent());
});

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email'] as const) assert.ok(business[key].trim(), `business.${key}: required`);
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  assert.ok(business.enquiries.usefulToInclude.length >= 3);
});

test('duplicate or unsafe IDs name the collection and item', () => {
  assert.throws(() => validateContent(edited(data => { data.tutors[1].id = data.tutors[0].id; })), /tutors\.maya-okafor: duplicate ID/);
  assert.throws(() => validateContent(edited(data => { data.subjects[0].id = 'Early Reading'; })), /subjects\.Early Reading: expected a URL-safe ID/);
  assert.throws(() => validateContent(edited(data => { data.sessions[0].id = data.sessions[1].id; })), /sessions\..*duplicate ID/);
});

test('sessions must reference an existing subject, band, tutor and room', () => {
  assert.throws(() => validateContent(edited(data => { sessionIn(data, 'tue-science-1630').subject = 'latin'; })),
    /sessions\.tue-science-1630\.subject: unknown subject latin/);
  assert.throws(() => validateContent(edited(data => { sessionIn(data, 'tue-science-1630').room = 'attic'; })),
    /sessions\.tue-science-1630\.room: unknown room attic/);
  assert.throws(() => validateContent(edited(data => { sessionIn(data, 'tue-science-1630').tutor = 'nobody'; })),
    /sessions\.tue-science-1630\.tutor: unknown tutor nobody/);
});

test('a session’s band must be offered for its subject, and its tutor must teach it', () => {
  assert.throws(() => validateContent(edited(data => { sessionIn(data, 'tue-science-1630').band = 'vce'; })),
    /sessions\.tue-science-1630\.band: science is not offered for vce/);
  assert.throws(() => validateContent(edited(data => { sessionIn(data, 'tue-science-1630').tutor = 'priya-raman'; })),
    /sessions\.tue-science-1630\.tutor: priya-raman does not teach science/);
});

test('session times are valid, match the subject length and sit inside centre hours', () => {
  assert.throws(() => validateContent(edited(data => { sessionIn(data, 'mon-early-reading-1600').start = '4pm'; })),
    /mon-early-reading-1600\.start: expected 24-hour HH:MM/);
  assert.throws(() => validateContent(edited(data => { sessionIn(data, 'mon-early-reading-1600').end = '17:30'; })),
    /mon-early-reading-1600\.end: expected 60 minutes/);
  assert.throws(() => validateContent(edited(data => Object.assign(sessionIn(data, 'fri-selective-entry-1600'), { start: '17:30', end: '19:00' }))),
    /fri-selective-entry-1600\.start: expected to fall inside centre hours on Friday/);
  assert.throws(() => validateContent(edited(data => Object.assign(sessionIn(data, 'sat-science-1100'), { start: '14:30', end: '15:30' }))),
    /sat-science-1100\.start: expected to fall inside centre hours on Saturday/);
});

test('tutors and rooms cannot be double-booked', () => {
  assert.throws(() => validateContent(edited(data => Object.assign(sessionIn(data, 'thu-secondary-maths-1700'), { room: 'lovelace' }))),
    /room lovelace is double-booked/);
  assert.throws(() => validateContent(edited(data => Object.assign(sessionIn(data, 'thu-secondary-english-1700'), { tutor: 'tom-nguyen', subject: 'secondary-maths' }))),
    /tutor tom-nguyen is double-booked/);
  // Back-to-back sessions in the same room are fine.
  assert.doesNotThrow(() => validateContent(edited(data => Object.assign(sessionIn(data, 'thu-secondary-maths-1700'), { room: 'curie' }))));
});

test('capacity and enrolled counts stay within limits', () => {
  assert.throws(() => validateContent(edited(data => { sessionIn(data, 'wed-primary-writing-1600').enrolled = 7; })),
    /wed-primary-writing-1600\.enrolled: expected a whole number from 0 to capacity \(6\)/);
  assert.throws(() => validateContent(edited(data => { sessionIn(data, 'wed-primary-writing-1600').enrolled = -1; })), /enrolled/);
  assert.throws(() => validateContent(edited(data => { sessionIn(data, 'wed-primary-writing-1600').capacity = 8; })),
    /wed-primary-writing-1600\.capacity: expected a whole number from 1 to 6/);
});

test('prices are positive whole dollars and group prices stay under one-to-one', () => {
  assert.throws(() => validateContent(edited(data => { data.subjects[0].groupPrice = 45.5; })), /subjects\.early-reading\.groupPrice: expected positive whole dollars/);
  assert.throws(() => validateContent(edited(data => { data.subjects[0].groupPrice = 120; })), /subjects\.early-reading\.groupPrice: expected less than the one-to-one price/);
});

test('terms are in order, start on a Monday and never overlap', () => {
  assert.throws(() => validateContent(edited(data => { data.terms[1].start = '2027-02-02'; })), /terms\.2027-t1\.start: expected a Monday/);
  assert.throws(() => validateContent(edited(data => { data.terms[2].start = '2027-03-29'; })), /terms\.2027-t2\.start: overlaps or comes before 2027-t1/);
  assert.throws(() => validateContent(edited(data => { data.terms[0].end = '2026-13-01'; })), /terms\.2026-t4\.end: expected an ISO date/);
  for (const [index, term] of terms.entries()) if (index) assert.ok(term.start > terms[index - 1].end, term.id);
});

test('every group subject is on the timetable and exactly three tutors are featured', () => {
  for (const subject of subjects) assert.ok(sessions.some(session => session.subject === subject.id), subject.id);
  assert.equal(tutors.filter(tutor => tutor.featured).length, 3);
  assert.throws(() => validateContent(edited(data => { data.tutors[3].featured = true; })), /tutors\.featured: expected exactly three featured tutors, found 4/);
  assert.throws(() => validateContent(edited(data => { data.sessions = data.sessions.filter(session => session.subject !== 'vce-chemistry'); })),
    /subjects\.vce-chemistry\.formats: offers group classes but has no timetable session/);
});

test('results use first names and roles only, with the disclaimer', () => {
  for (const story of stories) assert.match(story.learner, /^[A-Z][a-z]+, (Prep|Year \d+)$/);
  assert.throws(() => validateContent(edited(data => { data.quotes[0].attribution = 'Sarah Jones'; })), /quotes\.quote-parent-ava\.attribution/);
  assert.throws(() => validateContent(edited(data => { data.stories[0].learner = 'Ava Smith'; })), /stories\.ava-reading\.learner/);
  assert.ok(quotes.length >= 3);
  assert.match(resultsDisclaimer, /don’t promise/);
});

test('enquiry copy never implies a confirmed booking or place', () => {
  const copy = [business.enquiries.title, business.enquiries.introduction, ...business.enquiries.usefulToInclude].join(' ');
  assert.doesNotMatch(copy, /book now|reserve|is confirmed|secure your/i);
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});
