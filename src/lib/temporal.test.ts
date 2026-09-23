import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  Temporal,
  calendarYearsSince,
  comparePlainDateDesc,
  currentCalendarYear,
  formatIsoDate,
  formatRfc822Utc,
  nowInstantString,
  parsePlainDate,
} from './temporal.ts';

describe('temporal date helpers', () => {
  it('parses ISO calendar dates without Date', () => {
    const date = parsePlainDate('2017-07-27');
    assert.ok(date instanceof Temporal.PlainDate);
    assert.equal(date?.toString(), '2017-07-27');
    assert.equal(formatIsoDate('2017-07-27T15:00:00Z'), '2017-07-27');
  });

  it('converts gray-matter Date values through Temporal Instant', () => {
    const legacy = new globalThis.Date('2017-07-27T00:00:00.000Z');
    const date = parsePlainDate(legacy);
    assert.equal(date?.toString(), '2017-07-27');
  });

  it('formats RSS pubDate as RFC 822 from a PlainDate', () => {
    const date = Temporal.PlainDate.from('2017-07-27');
    assert.equal(formatRfc822Utc(date), 'Thu, 27 Jul 2017 00:00:00 GMT');
  });

  it('counts calendar years with an explicit now', () => {
    const now = Temporal.PlainDate.from('2026-09-23');
    assert.equal(calendarYearsSince('2025-09-23', now), 1);
    assert.equal(calendarYearsSince('2025-09-24', now), 0);
    assert.equal(calendarYearsSince('2017-07-27', now), 9);
  });

  it('sorts newer calendar dates first', () => {
    assert.ok(comparePlainDateDesc('2026-03-13', '2017-07-27') < 0);
    assert.equal(comparePlainDateDesc('2017-07-27', '2017-07-27'), 0);
  });

  it('reads the current year and instant from Temporal.Now', () => {
    const now = Temporal.PlainDate.from('2026-01-02');
    assert.equal(currentCalendarYear(now), '2026');
    assert.match(
      nowInstantString(Temporal.Instant.from('2026-09-23T00:00:00Z')),
      /^2026-09-23T00:00:00Z$/,
    );
  });
});
