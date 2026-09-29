import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';
import { news } from '@/data/catalog';
import { getNews } from '@/lib/catalog';
import BackLink from '@/components/BackLink';

export function generateStaticParams() {
  return news.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getNews(slug);
  const t = await getTranslations();

  return {
    title: item
      ? `${t(item.titleKey)} | Flash⚡- GTA VI`
      : 'Flash⚡- GTA VI',
  };
}

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getNews(slug);

  if (!article) {
    notFound();
  }

  const t = await getTranslations();
  const locale = await getLocale();
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
    <div className="page-wrap detail-page">
      <article className="article-content">
        <h1>{t(article.titleKey)}</h1>

        <div className="meta-row">
          <span className="tag">{t(`news.${category}`)}</span>
          <time dateTime={article.date}>{date}</time>
        </div>

        <div className="detail-image article-image">
          <Image
            src={article.image.src}
            alt={t('accessibility.newsImage', {
              title: t(article.titleKey),
            })}
            width={article.image.width}
            height={article.image.height}
            sizes="100vw"
          />
        </div>

        <p className="lead">{t(article.summaryKey)}</p>
        <p>{t(article.contentKey)}</p>

        <p>
          <strong>{t('news.sourceLabel')}:</strong>{' '}
          <a
            className="source-link"
            href={article.sourceUrl}
            target="_blank"
            rel="noreferrer"
          >
            {article.sourceName}
          </a>
        </p>
      </article>

      <BackLink href="/news" />
    </div>
  );
}
