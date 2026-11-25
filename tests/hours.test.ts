import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));
test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});
test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});
test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});
test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});

// Lightbulb Tutoring's centre hours in Australia/Melbourne (AEST UTC+10, AEDT UTC+11).
import { business } from '../content/business.ts';
const centre = (iso: string) => openingLabel(business.hours, 'Australia/Melbourne', new Date(iso));
test('centre hours: weekday afternoon opening and evening closing', () => {
  // Wednesday 25 Nov 2026, AEDT.
  assert.equal(centre('2026-11-25T04:29:00Z'), 'Closed · opens today at 15:30');
  assert.equal(centre('2026-11-25T04:30:00Z'), 'Open now · until 20:30');
  // Thursday 26 Nov 2026 20:29 and 20:30.
  assert.equal(centre('2026-11-26T09:29:00Z'), 'Open now · until 20:30');
  assert.equal(centre('2026-11-26T09:30:00Z'), 'Closed · opens Friday at 15:30');
});
test('centre hours: Friday short evening, Saturday morning and closed Sunday', () => {
  assert.equal(centre('2026-11-27T07:29:00Z'), 'Open now · until 18:30');
  assert.equal(centre('2026-11-27T07:30:00Z'), 'Closed · opens Saturday at 08:30');
  // Saturday 28 Nov 14:59 and 15:00.
  assert.equal(centre('2026-11-28T03:59:00Z'), 'Open now · until 15:00');
  assert.equal(centre('2026-11-28T04:00:00Z'), 'Closed · opens Monday at 15:30');
  // All of Sunday is closed.
  assert.equal(centre('2026-11-28T23:00:00Z'), 'Closed · opens Monday at 15:30');
  assert.equal(centre('2026-11-29T09:00:00Z'), 'Closed · opens Monday at 15:30');
});
test('centre hours keep local times across Melbourne’s DST changes', () => {
  // DST ends Sunday 4 April 2027: Monday 5 April is AEST (UTC+10), so 15:30 local is 05:30 UTC.
  assert.equal(centre('2027-04-05T05:29:00Z'), 'Closed · opens today at 15:30');
  assert.equal(centre('2027-04-05T05:30:00Z'), 'Open now · until 20:30');
  // The Saturday before (3 April) is still AEDT: 08:30 local is 21:30 UTC on Friday.
  assert.equal(centre('2027-04-02T21:29:00Z'), 'Closed · opens today at 08:30');
  assert.equal(centre('2027-04-02T21:30:00Z'), 'Open now · until 15:00');
  // DST starts Sunday 3 October 2027: Monday 4 October is AEDT (UTC+11), so 15:30 local is 04:30 UTC.
  assert.equal(centre('2027-10-04T04:29:00Z'), 'Closed · opens today at 15:30');
  assert.equal(centre('2027-10-04T04:30:00Z'), 'Open now · until 20:30');
  // Saturday 2 October is AEST: 15:00 local is 05:00 UTC.
  assert.equal(centre('2027-10-02T04:59:00Z'), 'Open now · until 15:00');
  assert.equal(centre('2027-10-02T05:00:00Z'), 'Closed · opens Monday at 15:30');
});
