'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import type { NewsArticle } from '@/data/catalog';

export default function NewsCard({
  article,
  featured = false,
}: {
  article: NewsArticle;
  featured?: boolean;
}) {
  const t = useTranslations();
  const locale = useLocale();
  const category =
    article.category === 'ANNOUNCEMENTS'
      ? 'announcements'
      : article.category === 'GAME_INFORMATION'
        ? 'gameInformation'
        : 'updates';

  const date = new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${article.date}T00:00:00Z`));

  return (
    <article className={featured ? 'news-card featured' : 'news-card'}>
      <div className="card-copy card-copy-top">
        <h3>{t(article.titleKey)}</h3>
        <div className="meta-row">
          <span className="tag">{t(`news.${category}`)}</span>
          <time dateTime={article.date}>{date}</time>
        </div>
      </div>

      <div className="media-frame">
        <Image
          src={article.image.src}
          alt={t('accessibility.newsImage', {
            title: t(article.titleKey),
          })}
          width={article.image.width}
          height={article.image.height}
          sizes={
            featured
              ? '(max-width: 900px) 100vw, 65vw'
              : '(max-width: 700px) 100vw, 33vw'
          }
        />
      </div>

      <div className="card-copy card-copy-bottom">
        <p>{t(article.summaryKey)}</p>
        <Link href={`/news/${article.slug}`} className="button">
          {t('actions.readMore')}
        </Link>
      </div>
    </article>
  );
}
