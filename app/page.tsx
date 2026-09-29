import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { media } from '@/data/media';
import { characters, locations, news, trailers } from '@/data/catalog';
import Countdown from '@/components/Countdown';
import ReleaseProgress from '@/components/ReleaseProgress';
import CharacterCard from '@/components/CharacterCard';
import NewsCard from '@/components/NewsCard';
import TrailerPlayer from '@/components/TrailerPlayer';
import LocationCarousel from '@/components/LocationCarousel';

export default async function Home() {
  const t = await getTranslations();
  const featured = news.find((article) => article.featured)!;
  const secondary = news
    .filter((article) => !article.featured)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 2);
  const homeCharacters = characters.filter(
    (character) => character.category === 'MAIN',
  );
  const viceCity = locations[0];
  const trailer = trailers[0];

  return (
    <>
      <section className="hero">
        <div className="hero-media">
          <Image
            src={media.hero.src}
            alt={t('accessibility.heroImage')}
            fill
            priority
            sizes="100vw"
          />
        </div>

        <div className="hero-content">
          <h5 className="hero-kicker">{t('home.heroIdentifier')}</h5>
          <h1>GTA VI</h1>
          <p className="hero-date">{t('home.releaseDate')}</p>
          <Countdown />
        </div>
      </section>

      <ReleaseProgress />

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">{t('news.featured')}</p>
          <h2>{t('home.newsTitle')}</h2>
        </div>

        <div className="news-feature">
          <NewsCard article={featured} featured />
        </div>

        <div className="news-grid">
          {secondary.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t('home.charactersTitle')}</h2>
        </div>

        <div className="cards-grid">
          {homeCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              context="home"
            />
          ))}
        </div>

        <div className="cta-row section-action-row">
          <Link className="button" href="/characters">
            {t('home.charactersCta')}
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t('home.locationsTitle')}</h2>
        </div>

        <div className="location-feature">
          <div className="feature-copy">
            <h3>{t(viceCity.nameKey)}</h3>
            <p>{t('home.locationsIntro')}</p>

            <div className="cta-row">
              <Link className="button" href="/locations">
                {t('home.locationsCta')}
              </Link>
            </div>
          </div>

          <div className="feature-image">
            <LocationCarousel
              images={media.locationHomeGalleries.viceCity}
              name={t(viceCity.nameKey)}
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t('home.trailersTitle')}</h2>
        </div>

        <div className="trailer-grid">
          <TrailerPlayer trailer={trailer} />
        </div>

        <div className="cta-row section-action-row">
          <Link className="button secondary" href="/trailers">
            {t('home.trailersCta')}
          </Link>
        </div>
      </section>

      <section className="section section--final-cta">
        <div className="location-feature">
          <div className="feature-copy">
            <p className="eyebrow">{t('home.finalCtaDate')}</p>
            <h3>{t('home.finalCtaTitle')}</h3>

            <div className="cta-row">
              <Link className="button" href="/locations">
                {t('home.locationsCta')}
              </Link>
            </div>
          </div>

          <div className="feature-image">
            <Image
              src={media.characters.jasonFinal.src}
              alt=""
              width={media.characters.jasonFinal.width}
              height={media.characters.jasonFinal.height}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </>
  );
}
