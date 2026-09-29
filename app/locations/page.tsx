import { getTranslations } from 'next-intl/server';
import { locations } from '@/data/catalog';
import LocationCard from '@/components/LocationCard';

export async function generateMetadata() {
  const t = await getTranslations('meta');

  return {
    title: t('locations'),
  };
}

export default async function LocationsPage() {
  const t = await getTranslations();

  return (
    <div className="page-wrap">
      <div className="page-heading">
        <h1>{t('locations.pageTitle')}</h1>
        <p>{t('locations.pageIntro')}</p>
      </div>

      <div className="locations-grid">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </div>
  );
}
