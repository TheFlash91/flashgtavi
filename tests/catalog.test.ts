import { describe, expect, it } from 'vitest';
import { characters, locations, news, trailers } from '@/data/catalog';

describe('catalog invariants', () => {
  it('has 8 character profiles', () => {
    expect(characters).toHaveLength(8);
  });

  it('has 6 locations', () => {
    expect(locations).toHaveLength(6);
  });

  it('has one featured article', () => {
    expect(news.filter((article) => article.featured)).toHaveLength(1);
  });

  it('has no trailer 4', () => {
    expect(trailers.some((trailer) => /trailer-4/i.test(trailer.slug))).toBe(false);
  });

  it('has three playable videos plus coming soon', () => {
    expect(trailers.filter((trailer) => !trailer.comingSoon)).toHaveLength(3);
  });

  it('does not duplicate location images within a carousel', () => {
    locations.forEach((location) => {
      expect(new Set(location.images.map((image) => image.src)).size).toBe(
        location.images.length,
      );
    });
  });
});
