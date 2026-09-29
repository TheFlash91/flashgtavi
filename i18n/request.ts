import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { defaultLocale, isLocale, type Locale } from './config';

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

const en = {
  ...enCommon,
  ...enHome,
  ...enCharacters,
  ...enLocations,
  ...enTrailers,
  ...enNews,
} as const;

const es = {
  ...esCommon,
  ...esHome,
  ...esCharacters,
  ...esLocations,
  ...esTrailers,
  ...esNews,
} as const;

export const messagesByLocale = { en, es } as const;

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get('locale')?.value;
  return value && isLocale(value) ? value : defaultLocale;
}

export async function getMessages(locale: Locale) {
  return messagesByLocale[locale];
}

export default getRequestConfig(async () => {
  const locale = await getLocale();
  return { locale, messages: messagesByLocale[locale] };
});
