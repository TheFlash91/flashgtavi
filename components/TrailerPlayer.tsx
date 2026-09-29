'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import type { Trailer } from '@/data/catalog';

export default function TrailerPlayer({ trailer }: { trailer: Trailer }) {
  const t = useTranslations();
  const locale = useLocale();
  const [playing, setPlaying] = useState(false);

  if (trailer.comingSoon) {
    return (
      <article className="trailer-card coming">
        <div className="card-copy card-copy-top">
          <h3>{t('trailers.comingSoonTitle')}</h3>
        </div>

        <div className="media-frame">
          <Image
            src={trailer.thumbnail.src}
            alt=""
            width={trailer.thumbnail.width}
            height={trailer.thumbnail.height}
            sizes="100vw"
          />
        </div>

        <div className="card-copy card-copy-bottom">
          <span className="tag">{t('trailers.comingSoon')}</span>
        </div>
      </article>
    );
  }

  const date = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${trailer.date}T00:00:00Z`));

  return (
    <article className="trailer-card">
      <div className="card-copy card-copy-top">
        <h3>{t(trailer.titleKey)}</h3>
      </div>

      <div className="video-shell">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailer.videoId}?rel=0`}
            title={t('trailers.embedTitle')}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            <Image
              src={trailer.thumbnail.src}
              alt={t('accessibility.trailerImage')}
              width={trailer.thumbnail.width}
              height={trailer.thumbnail.height}
              sizes="100vw"
            />
            <button
              className="play-button"
              onClick={() => setPlaying(true)}
              aria-label={`${t('actions.play')} ${t(trailer.titleKey)}`}
              type="button"
            >
              ▶
            </button>
          </>
        )}
      </div>

      <div className="card-copy card-copy-bottom">
        <div className="meta-row">
          <span className="tag">{t('trailers.extended.source')}</span>
          <time dateTime={trailer.date}>{date}</time>
        </div>

        <Link
          className="button secondary"
          href={trailer.sourceUrl}
          target="_blank"
          rel="noreferrer"
        >
          {t('trailers.external')}
        </Link>
      </div>
    </article>
  );
}
