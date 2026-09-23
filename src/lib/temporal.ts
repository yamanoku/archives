import { Temporal, toTemporalInstant } from 'temporal-polyfill-lite';

export { Temporal };

const ISO_DATE = /^(\d{4}-\d{2}-\d{2})/;
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

function isLegacyDate(value: unknown): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]';
}

export function parsePlainDate(value: unknown): Temporal.PlainDate | null {
  if (value instanceof Temporal.PlainDate) {
    return value;
  }
  if (typeof value === 'string') {
    const iso = value.match(ISO_DATE)?.[1];
    if (iso) {
      try {
        return Temporal.PlainDate.from(iso);
      } catch {
        return null;
      }
    }
    try {
      return Temporal.Instant.from(value)
        .toZonedDateTimeISO('UTC')
        .toPlainDate();
    } catch {
      return null;
    }
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    try {
      return Temporal.Instant.fromEpochMilliseconds(value)
        .toZonedDateTimeISO('UTC')
        .toPlainDate();
    } catch {
      return null;
    }
  }
  if (isLegacyDate(value) && !Number.isNaN(Number(value))) {
    return toTemporalInstant.call(value).toZonedDateTimeISO('UTC').toPlainDate();
  }
  return null;
}

export function formatIsoDate(value: unknown): string {
  return parsePlainDate(value)?.toString() ?? '';
}

export function formatRfc822Utc(date: Temporal.PlainDate): string {
  const weekday = WEEKDAYS[date.dayOfWeek - 1];
  const month = MONTHS[date.month - 1];
  return `${weekday}, ${String(date.day).padStart(2, '0')} ${month} ${date.year} 00:00:00 GMT`;
}

export function comparePlainDateDesc(left: unknown, right: unknown): number {
  const a = parsePlainDate(left);
  const b = parsePlainDate(right);
  if (!a && !b) {
    return 0;
  }
  if (!a) {
    return 1;
  }
  if (!b) {
    return -1;
  }
  return Temporal.PlainDate.compare(b, a);
}

export function calendarYearsSince(
  value: unknown,
  now: Temporal.PlainDate = Temporal.Now.plainDateISO(),
): number {
  const published = parsePlainDate(value);
  if (!published) {
    return 0;
  }
  return Math.max(0, published.until(now, { largestUnit: 'year' }).years);
}

export function currentCalendarYear(
  now: Temporal.PlainDate = Temporal.Now.plainDateISO(),
): string {
  return String(now.year);
}

export function nowInstantString(
  now: Temporal.Instant = Temporal.Now.instant(),
): string {
  return now.toString();
}
