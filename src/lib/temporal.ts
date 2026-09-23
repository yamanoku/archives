import { Temporal as TemporalPolyfill } from 'temporal-polyfill-lite';

type TemporalApi = typeof TemporalPolyfill;

function temporal(): TemporalApi {
  const native = (globalThis as { Temporal?: TemporalApi }).Temporal;
  return native ?? TemporalPolyfill;
}

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

function toPlainDate(value: unknown) {
  const Temporal = temporal();
  if (typeof value === 'string') {
    const iso = value.match(ISO_DATE)?.[1];
    if (!iso) {
      return null;
    }
    try {
      return Temporal.PlainDate.from(iso);
    } catch {
      return null;
    }
  }
  if (isLegacyDate(value) && !Number.isNaN(value.getTime())) {
    return Temporal.Instant.fromEpochMilliseconds(value.getTime())
      .toZonedDateTimeISO('UTC')
      .toPlainDate();
  }
  return null;
}

export function parsePlainDate(value: unknown): string | null {
  return toPlainDate(value)?.toString() ?? null;
}

export function formatIsoDate(value: unknown): string {
  return parsePlainDate(value) ?? '';
}

export function formatRfc822Utc(value: unknown): string {
  const date = toPlainDate(value);
  if (!date) {
    return '';
  }
  const weekday = WEEKDAYS[date.dayOfWeek - 1];
  const month = MONTHS[date.month - 1];
  return `${weekday}, ${String(date.day).padStart(2, '0')} ${month} ${date.year} 00:00:00 GMT`;
}

export function comparePlainDateDesc(left: unknown, right: unknown): number {
  const a = toPlainDate(left);
  const b = toPlainDate(right);
  if (!a && !b) {
    return 0;
  }
  if (!a) {
    return 1;
  }
  if (!b) {
    return -1;
  }
  return temporal().PlainDate.compare(b, a);
}

export function calendarYearsSince(value: unknown, now?: string): number {
  const published = toPlainDate(value);
  const today =
    now === undefined ? temporal().Now.plainDateISO() : toPlainDate(now);
  if (!published || !today) {
    return 0;
  }
  return Math.max(0, published.until(today, { largestUnit: 'year' }).years);
}

export function currentCalendarYear(now?: string): string {
  const today =
    now === undefined ? temporal().Now.plainDateISO() : toPlainDate(now);
  return today ? String(today.year) : '';
}

export function nowInstantString(now?: string): string {
  const Temporal = temporal();
  if (now === undefined) {
    return Temporal.Now.instant().toString();
  }
  try {
    return Temporal.Instant.from(now).toString();
  } catch {
    return '';
  }
}
