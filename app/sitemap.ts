import type { MetadataRoute } from 'next';
import { characters, locations, news } from '@/data/catalog';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  return [
    {
      url: base,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${base}/characters`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/locations`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/trailers`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${base}/news`,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    ...characters.map((character) => ({
      url: `${base}/characters/${character.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...locations.map((location) => ({
      url: `${base}/locations/${location.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...news.map((article) => ({
      url: `${base}/news/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ];
}
