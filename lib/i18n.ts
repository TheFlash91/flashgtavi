import type { Locale } from '@/i18n/config';

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

const en = { ...enCommon, ...enHome, ...enCharacters, ...enLocations, ...enTrailers, ...enNews } as const;
const es = { ...esCommon, ...esHome, ...esCharacters, ...esLocations, ...esTrailers, ...esNews } as const;

export const messagesByLocale = { en, es } as const;

export function getMessage(locale: Locale, key: string, vars: Record<string, string | number> = {}) {
  const value = key
    .split('.')
    .reduce<unknown>(
      (acc, part) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[part] : undefined),
      messagesByLocale[locale],
    );

  if (typeof value !== 'string') return key;
  return value.replace(/\{(\w+)\}/g, (_, name) => String(vars[name] ?? `{${name}}`));
}
