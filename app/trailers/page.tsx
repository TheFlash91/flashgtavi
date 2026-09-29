import { getTranslations } from 'next-intl/server';
import { trailers } from '@/data/catalog';
import TrailerPlayer from '@/components/TrailerPlayer';

export async function generateMetadata() {
  const t = await getTranslations('meta');

  return {
    title: t('trailers'),
  };
}

export default async function TrailersPage() {
  const t = await getTranslations();

  return (
    <div className="page-wrap">
      <div className="page-heading">
        <h1>{t('trailers.pageTitle')}</h1>
        <p>{t('trailers.pageIntro')}</p>
      </div>

      <div className="trailer-grid">
        {trailers.map((trailer) => (
          <TrailerPlayer key={trailer.id} trailer={trailer} />
        ))}
      </div>
    </div>
  );
}
