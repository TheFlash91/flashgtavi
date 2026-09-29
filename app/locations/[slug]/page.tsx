import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { locations } from '@/data/catalog';
import { getLocation } from '@/lib/catalog';
import LocationCarousel from '@/components/LocationCarousel';
import BackLink from '@/components/BackLink';

export function generateStaticParams() {
  return locations.map((location) => ({ slug: location.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getLocation(slug);
  const t = await getTranslations();

  return {
    title: item
      ? `${t(item.nameKey)} | Flash⚡- GTA VI`
      : 'Flash⚡- GTA VI',
  };
}

export default async function LocationDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const location = getLocation(slug);

  if (!location) {
    notFound();
  }

  const t = await getTranslations();

  return (
    <div className="page-wrap detail-page">
      <div className="detail-title">
        <h1>{t(location.nameKey)}</h1>
      </div>

      <LocationCarousel
        images={location.images}
        name={t(location.nameKey)}
      />

      <section className="detail-section detail-content">
        <h2>{t('locations.contentTitle')}</h2>
        <p>{t(location.descriptionKey)}</p>
      </section>

      <BackLink href="/locations" />
    </div>
  );
}
