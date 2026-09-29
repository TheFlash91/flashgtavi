import { getTranslations } from 'next-intl/server';
import { characters } from '@/data/catalog';
import CharacterCard from '@/components/CharacterCard';

export async function generateMetadata() {
  const t = await getTranslations('meta');

  return {
    title: t('characters'),
  };
}

export default async function CharactersPage() {
  const t = await getTranslations();
  const main = characters.filter((character) => character.category === 'MAIN');
  const supporting = characters.filter(
    (character) => character.category === 'SUPPORTING',
  );

  return (
    <div className="page-wrap">
      <div className="page-heading">
        <h1>{t('characters.pageTitle')}</h1>
        <p>{t('characters.pageIntro')}</p>
      </div>

      <section className="section section--no-top-padding section--large-bottom-padding">
        <div className="section-heading">
          <h2>{t('characters.main')}</h2>
        </div>

        <div className="cards-grid">
          {main.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </section>

      <section className="section section--no-padding">
        <div className="section-heading">
          <h2>{t('characters.supporting')}</h2>
        </div>

        <div className="cards-grid">
          {supporting.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      </section>
    </div>
  );
}
