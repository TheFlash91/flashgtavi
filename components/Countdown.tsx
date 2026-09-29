'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  countdownParts,
  DEFAULT_TIMEZONE,
  getReleaseInstant,
} from '@/lib/date';

function validTimeZone(value?: string) {
  if (!value) {
    return false;
  }

  try {
    new Intl.DateTimeFormat('en-US', { timeZone: value }).format();
    return true;
  } catch {
    return false;
  }
}

export default function Countdown() {
  const t = useTranslations('countdown');
  const [now, setNow] = useState<Date | null>(null);
  const [zone, setZone] = useState(DEFAULT_TIMEZONE);

  useEffect(() => {
    const detectedZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setZone(validTimeZone(detectedZone) ? detectedZone : DEFAULT_TIMEZONE);
  }, []);

  const target = useMemo(() => getReleaseInstant(zone), [zone]);
  const parts = now ? countdownParts(target, now) : null;

  useEffect(() => {
    const tick = () => setNow(new Date());

    tick();
    const id = window.setInterval(tick, 1_000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        tick();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (!parts) {
    return (
      <div className="countdown countdown-placeholder" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
    );
  }

  if (parts.available) {
    return <div className="countdown available">{t('availableNow')}</div>;
  }

  const items = [
    ['days', parts.days],
    ['hours', parts.hours],
    ['minutes', parts.minutes],
    ['seconds', parts.seconds],
  ] as const;

  return (
    <div
      className="countdown"
      role="timer"
      aria-live="polite"
      aria-label={t('aria', parts)}
    >
      {items.map(([key, value]) => (
        <div className="time-unit" key={key}>
          <strong>{String(value).padStart(2, '0')}</strong>
          <span>{t(key)}</span>
        </div>
      ))}
    </div>
  );
}
