import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import type { Character } from '@/data/catalog';

export default async function CharacterCard({
  character,
  context = 'listing',
}: {
  character: Character;
  context?: 'home' | 'listing';
}) {
  const t = await getTranslations();
  const image =
    context === 'home' ? (character.homeImage ?? character.image) : character.image;

  return (
    <article className="media-card">
      <div className="card-copy card-copy-top">
        <h3>{t(character.nameKey)}</h3>
        <span className="tag">
          {t(
            character.category === 'MAIN'
              ? 'characters.categoryMain'
              : 'characters.categorySupporting',
          )}
        </span>
      </div>

      <div className="media-frame">
        <Image
          src={image.src}
          alt={t('accessibility.characterImage', {
            name: t(character.nameKey),
          })}
          width={image.width}
          height={image.height}
          sizes="(max-width: 700px) 100vw, 50vw"
        />
      </div>

      <div className="card-copy card-copy-bottom">
        <p>{t(character.descriptionKey)}</p>
        <Link href={`/characters/${character.slug}`} className="button">
          {t('actions.readMore')}
        </Link>
      </div>
    </article>
  );
}
