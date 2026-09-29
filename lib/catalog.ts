import { characters, locations, news, trailers } from '@/data/catalog';

export function getCharacter(slug: string) {
  return characters.find((character) => character.slug === slug);
}

export function getLocation(slug: string) {
  return locations.find((location) => location.slug === slug);
}

export function getTrailer(slug: string) {
  return trailers.find((trailer) => trailer.slug === slug);
}

export function getNews(slug: string) {
  return news.find((article) => article.slug === slug);
}
