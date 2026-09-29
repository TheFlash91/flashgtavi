export const RELEASE_DATE = '2026-11-19';
export const START_DATE = '2026-01-01';
export const DEFAULT_TIMEZONE = 'America/Managua';

export function getTimeZoneOffsetMs(timeZone: string, date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).formatToParts(date);

  const map = Object.fromEntries(
    parts
      .filter((part) => part.type !== 'literal')
      .map((part) => [part.type, part.value]),
  );

  const asUtc = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour) % 24,
    Number(map.minute),
    Number(map.second),
  );

  return asUtc - date.getTime();
}

export function getReleaseInstant(timeZone: string) {
  const naiveUtc = new Date(`${RELEASE_DATE}T00:00:00Z`);

  return new Date(
    naiveUtc.getTime() - getTimeZoneOffsetMs(timeZone, naiveUtc),
  );
}

export function countdownParts(target: Date, now: Date) {
  const total = Math.max(0, target.getTime() - now.getTime());
  const seconds = Math.floor(total / 1_000);

  return {
    days: Math.floor(seconds / 86_400),
    hours: Math.floor((seconds % 86_400) / 3_600),
    minutes: Math.floor((seconds % 3_600) / 60),
    seconds: seconds % 60,
    available: total <= 0,
  };
}

export function releaseProgress(now = new Date()) {
  const start = new Date(`${START_DATE}T00:00:00Z`);
  const end = new Date(`${RELEASE_DATE}T00:00:00Z`);

  if (end.getTime() <= start.getTime()) {
    throw new Error('EndDate must be after StartDate');
  }

  const startDay = Date.UTC(
    start.getUTCFullYear(),
    start.getUTCMonth(),
    start.getUTCDate(),
  );
  const endDay = Date.UTC(
    end.getUTCFullYear(),
    end.getUTCMonth(),
    end.getUTCDate(),
  );
  const currentDay = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const value = ((currentDay - startDay) / (endDay - startDay)) * 100;

  return Math.min(100, Math.max(0, value));
}
