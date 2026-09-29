import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { characters } from '@/data/catalog';
import { getCharacter } from '@/lib/catalog';
import BackLink from '@/components/BackLink';

export function generateStaticParams() {
  return characters.map((character) => ({ slug: character.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getCharacter(slug);
  const t = await getTranslations();

  return {
    title: item
      ? `${t(item.nameKey)} | Flash⚡- GTA VI`
      : 'Flash⚡- GTA VI',
  };
}

export default async function CharacterDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const character = getCharacter(slug);

  if (!character) {
    notFound();
  }

  const t = await getTranslations();
  const image = character.detailImage ?? character.image;

  return (
    <div className="page-wrap detail-page">
      <div className="detail-title">
        <span className="tag">
          {t(
            character.category === 'MAIN'
              ? 'characters.categoryMain'
              : 'characters.categorySupporting',
          )}
        </span>
        <h1>{t(character.nameKey)}</h1>
      </div>

      <div className="detail-image">
        <Image
          src={image.src}
          alt={t('accessibility.characterImage', {
            name: t(character.nameKey),
          })}
          width={image.width}
          height={image.height}
          sizes="(max-width: 900px) 100vw, 100vw"
        />
      </div>

      <section className="detail-section detail-content">
        <h2>{t('characters.content')}</h2>
        <p>{t(character.descriptionKey)}</p>
      </section>

      <section className="detail-section">
        <h2>{t('characters.background')}</h2>
        <p>{t(character.backgroundKey)}</p>
      </section>

      <section className="detail-section">
        <h2>{t('characters.personality')}</h2>
        <p>{t(character.personalityKey)}</p>
      </section>

      <section className="detail-section">
        <h2>{t('characters.relationships')}</h2>

        <ul className="relationship-list">
          {character.relationships.map((relationship, index) => {
            const target = characters.find(
              (item) => item.id === relationship.characterId,
            );

            if (!target) {
              return null;
            }

            const relationshipKey =
              relationship.type === 'ROMANTIC_PARTNER'
                ? 'romantic'
                : relationship.type.toLowerCase();

            return (
              <li key={`${relationship.characterId}-${index}`}>
                <strong>{t(target.nameKey)}</strong>
                <span>{t(`relationships.${relationshipKey}`)}</span>
              </li>
            );
          })}
        </ul>
      </section>

      {character.currentSituationKey && (
        <section className="detail-section">
          <h2>{t('characters.currentSituation')}</h2>
          <p>{t(character.currentSituationKey)}</p>
        </section>
      )}

      <BackLink href="/characters" />
    </div>
  );
}
