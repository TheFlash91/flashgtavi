'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import type { NewsArticle } from '@/data/catalog';
import NewsCard from './NewsCard';

export default function NewsFilter({ articles }: { articles: NewsArticle[] }) {
  const t = useTranslations('news');
  const a = useTranslations('actions');
  const [category, setCategory] = useState<'ALL' | NewsArticle['category']>('ALL');
  const [visible, setVisible] = useState(3);

  const filtered = useMemo(
    () =>
      category === 'ALL'
        ? articles
        : articles.filter((article) => article.category === category),
    [category, articles],
  );

  const shown = filtered.slice(0, visible);

  const labels = {
    ALL: 'all',
    ANNOUNCEMENTS: 'announcements',
    GAME_INFORMATION: 'gameInformation',
    UPDATES: 'updates',
  } as const;

  return (
    <div>
      <div className="filters" role="group" aria-label={t('filters')}>
        {(Object.keys(labels) as (keyof typeof labels)[]).map((key) => (
          <button
            key={key}
            className={category === key ? 'active' : ''}
            onClick={() => {
              setCategory(key);
              setVisible(3);
            }}
            type="button"
          >
            {t(labels[key])}
          </button>
        ))}
      </div>

      {filtered.length ? (
        <>
          <div className="news-grid">
            {shown.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>

          {visible < filtered.length && (
            <div className="cta-row load-more-row">
              <button
                className="button secondary"
                onClick={() => setVisible((value) => value + 3)}
                type="button"
              >
                {a('loadMore')}
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="empty-state">{t('noResults')}</p>
      )}
    </div>
  );
}
