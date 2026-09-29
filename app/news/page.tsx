import { getTranslations } from 'next-intl/server';
import { news } from '@/data/catalog';
import NewsCard from '@/components/NewsCard';
import NewsFilter from '@/components/NewsFilter';

export async function generateMetadata() {
  const t = await getTranslations('meta');

  return {
    title: t('news'),
  };
}

export default async function NewsPage() {
  const t = await getTranslations();
  const featured = news.find((article) => article.featured)!;
  const latest = news
    .filter((article) => !article.featured)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="page-wrap">
      <div className="page-heading">
        <h1>{t('news.pageTitle')}</h1>
        <p>{t('news.pageIntro')}</p>
      </div>

      <section className="news-feature">
        <div className="section-heading">
          <h2>{t('news.featured')}</h2>
        </div>
        <NewsCard article={featured} featured />
      </section>

      <section>
        <div className="section-heading">
          <h2>{t('news.latest')}</h2>
        </div>
        <NewsFilter articles={latest} />
      </section>
    </div>
  );
}
