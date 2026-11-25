import assert from 'node:assert/strict';
import { test } from 'node:test';
import { sessions, terms } from '../content/timetable.ts';
import { subjects } from '../content/subjects.ts';
import { yearBands } from '../content/year-bands.ts';
import {
  displayDateRange, displayRange, filterFromQuery, filterSessions, filterToQuery, isoDateInZone,
  openSpots, sessionsByDay, spotsLabel, termStatus, termWeeks,
} from '../lib/timetable.ts';

const bandIds = yearBands.map(band => band.id);
const subjectIds = subjects.map(subject => subject.id);

test('open spots come from capacity minus enrolled, with enquiry wording', () => {
  assert.equal(openSpots({ capacity: 6, enrolled: 2 }), 4);
  assert.equal(spotsLabel({ capacity: 6, enrolled: 2 }), '4 spots open');
  assert.equal(spotsLabel({ capacity: 4, enrolled: 3 }), '1 spot open');
  assert.equal(spotsLabel({ capacity: 6, enrolled: 6 }), 'Full · waitlist enquiries welcome');
  for (const session of sessions) assert.doesNotMatch(spotsLabel(session), /book|reserve|confirm/i);
});

test('owner edit: filling Wednesday writing shows it as full with no open spots', () => {
  const edited = sessions.map(session => session.id === 'wed-primary-writing-1600' ? { ...session, enrolled: 6 } : session);
  const writing = edited.find(session => session.id === 'wed-primary-writing-1600')!;
  assert.equal(openSpots(writing), 0);
  assert.equal(spotsLabel(writing), 'Full · waitlist enquiries welcome');
});

test('band and subject filters combine; empty filters show everything', () => {
  assert.equal(filterSessions(sessions, { band: '', subject: '' }).length, sessions.length);
  const vce = filterSessions(sessions, { band: 'vce', subject: '' });
  assert.deepEqual(vce.map(session => session.id).sort(),
    ['mon-vce-english-1800', 'sat-vce-methods-1100', 'tue-vce-methods-1800', 'wed-vce-chemistry-1800']);
  assert.deepEqual(filterSessions(sessions, { band: 'vce', subject: 'vce-methods' }).map(session => session.id).sort(),
    ['sat-vce-methods-1100', 'tue-vce-methods-1800']);
  assert.equal(filterSessions(sessions, { band: 'foundation-2', subject: 'vce-methods' }).length, 0);
});

test('the query string sets the starting filter and ignores unknown IDs', () => {
  assert.deepEqual(filterFromQuery('?band=vce&subject=vce-methods', bandIds, subjectIds), { band: 'vce', subject: 'vce-methods' });
  assert.deepEqual(filterFromQuery('?band=<script>&subject=latin', bandIds, subjectIds), { band: '', subject: '' });
  assert.deepEqual(filterFromQuery('', bandIds, subjectIds), { band: '', subject: '' });
  assert.equal(filterToQuery({ band: 'years-3-6', subject: '' }), '?band=years-3-6');
  assert.equal(filterToQuery({ band: '', subject: '' }), '');
});

test('sessions group by day in start order, Monday to Saturday', () => {
  const days = sessionsByDay(sessions);
  assert.deepEqual(days.map(entry => entry.day), ['mon', 'tue', 'wed', 'thu', 'fri', 'sat']);
  assert.deepEqual(days[5].sessions.map(session => session.start), ['09:00', '09:30', '11:00', '11:00']);
  assert.equal(days.reduce((total, entry) => total + entry.sessions.length, 0), sessions.length);
});

test('times display in 12-hour form', () => {
  assert.equal(displayRange('16:00', '17:30'), '4:00pm–5:30pm');
  assert.equal(displayRange('09:30', '12:30'), '9:30am–12:30pm');
});

test('current and next term are found from the Melbourne date', () => {
  assert.deepEqual(termStatus(terms, '2026-11-25'), { current: '2026-t4', next: '2027-t1' });
  assert.deepEqual(termStatus(terms, '2026-12-12'), { current: '2026-t4', next: '2027-t1' });
  assert.deepEqual(termStatus(terms, '2026-12-13'), { current: undefined, next: '2027-t1' });
  assert.deepEqual(termStatus(terms, '2027-02-01'), { current: '2027-t1', next: '2027-t2' });
  assert.deepEqual(termStatus(terms, '2028-01-01'), { current: undefined, next: undefined });
});

test('the business date uses Melbourne time, not the visitor’s', () => {
  // 13:30 UTC on 12 Dec is 00:30 on 13 Dec in Melbourne (AEDT, UTC+11): Term 4 has ended there.
  assert.equal(isoDateInZone('Australia/Melbourne', new Date('2026-12-12T13:30:00Z')), '2026-12-13');
  assert.equal(isoDateInZone('America/Los_Angeles', new Date('2026-12-12T13:30:00Z')), '2026-12-12');
  // AEST (UTC+10) in winter.
  assert.equal(isoDateInZone('Australia/Melbourne', new Date('2027-07-11T13:59:00Z')), '2027-07-11');
  assert.equal(isoDateInZone('Australia/Melbourne', new Date('2027-07-11T14:00:00Z')), '2027-07-12');
});

test('term lengths and date ranges', () => {
  assert.deepEqual(terms.map(termWeeks), [10, 9, 10, 10, 10]);
  assert.equal(displayDateRange('2026-10-05', '2026-12-12'), '5 Oct – 12 Dec');
});
