import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { Location } from '@/data/catalog';
import Image from 'next/image';

export default async function LocationCard({ location }: { location: Location }) {
  const t = await getTranslations();

  return (
    <article className="location-card">
      <div className="card-copy card-copy-top">
        <h3>{t(location.nameKey)}</h3>
      </div>

      <div className="media-frame">
        <Image
          src={location.cardImage.src}
          alt={t('accessibility.locationImage', {
            name: t(location.nameKey),
          })}
          width={location.cardImage.width}
          height={location.cardImage.height}
          sizes="(max-width: 700px) 100vw, 33vw"
        />
      </div>

      <div className="card-copy card-copy-bottom">
        <p>{t(location.descriptionKey)}</p>
        <Link href={`/locations/${location.slug}`} className="button">
          {t('actions.explore')}
        </Link>
      </div>
    </article>
  );
}
