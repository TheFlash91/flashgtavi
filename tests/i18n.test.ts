import { describe, expect, it } from 'vitest';
import enCommon from '@/messages/en/common.json';
import enHome from '@/messages/en/home.json';
import enCharacters from '@/messages/en/characters.json';
import enLocations from '@/messages/en/locations.json';
import enTrailers from '@/messages/en/trailers.json';
import enNews from '@/messages/en/news.json';
import esCommon from '@/messages/es/common.json';
import esHome from '@/messages/es/home.json';
import esCharacters from '@/messages/es/characters.json';
import esLocations from '@/messages/es/locations.json';
import esTrailers from '@/messages/es/trailers.json';
import esNews from '@/messages/es/news.json';

const en = { ...enCommon, ...enHome, ...enCharacters, ...enLocations, ...enTrailers, ...enNews };
const es = { ...esCommon, ...esHome, ...esCharacters, ...esLocations, ...esTrailers, ...esNews };

function flatten(value: unknown, prefix = ''): string[] {
  if (!value || typeof value !== 'object') return prefix ? [prefix] : [];
  return Object.entries(value).flatMap(([key, child]) => flatten(child, prefix ? `${prefix}.${key}` : key));
}

describe('i18n catalog', () => {
  it('keeps EN and ES feature catalogs structurally identical', () => {
    expect(flatten(en).sort()).toEqual(flatten(es).sort());
  });

  it('keeps translations split by feature instead of a monolithic locale file', () => {
    expect(enHome).toHaveProperty('home');
    expect(enCharacters).toHaveProperty('characters');
    expect(enLocations).toHaveProperty('locations');
    expect(enTrailers).toHaveProperty('trailers');
    expect(enNews).toHaveProperty('news');
    expect(enCommon).toHaveProperty('nav');
    expect(enCommon).toHaveProperty('footer');
  });
});
