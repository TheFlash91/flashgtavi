'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { releaseProgress } from '@/lib/date';

export default function ReleaseProgress() {
  const t = useTranslations('home');
  const [value, setValue] = useState(() => releaseProgress());

  useEffect(() => {
    const id = setInterval(() => {
      setValue(releaseProgress());
    }, 60_000);

    return () => clearInterval(id);
  }, []);

  const text = Number(value.toFixed(2)).toString();

  return (
    <section className="section progress-section" aria-labelledby="release-progress-title">
      <div className="section-heading">
        <h2 id="release-progress-title">{t('releaseProgressTitle')}</h2>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Number(text)}
        aria-label={t('releaseProgressAlt', { value: text })}
      >
        <div className="progress-fill" style={{ width: `${value}%` }} />
        <span>{text}%</span>
      </div>
    </section>
  );
}
