import { media, type MediaRef } from './media';

export type RelationshipType =
  | 'FRIEND'
  | 'ROMANTIC_PARTNER'
  | 'EMPLOYER'
  | 'EMPLOYEE'
  | 'ASSOCIATE';

export type Character = {
  id: string;
  slug: string;
  nameKey: string;
  type: 'INDIVIDUAL' | 'GROUP';
  category: 'MAIN' | 'SUPPORTING';
  image: MediaRef;
  homeImage?: MediaRef;
  detailImage?: MediaRef;
  descriptionKey: string;
  backgroundKey: string;
  personalityKey: string;
  currentSituationKey?: string;
  relationships: {
    characterId: string;
    type: RelationshipType;
  }[];
};

export type Location = {
  id: string;
  slug: string;
  nameKey: string;
  descriptionKey: string;
  cardImage: MediaRef;
  images: MediaRef[];
};

export type Trailer = {
  id: string;
  slug: string;
  titleKey: string;
  date: string;
  thumbnail: MediaRef;
  videoId?: string;
  sourceUrl: string;
  comingSoon?: boolean;
};

export type NewsArticle = {
  id: string;
  slug: string;
  category: 'ANNOUNCEMENTS' | 'GAME_INFORMATION' | 'UPDATES';
  featured: boolean;
  titleKey: string;
  summaryKey: string;
  contentKey: string;
  date: string;
  image: MediaRef;
  sourceUrl: string;
  sourceName: string;
};

export const characters: Character[] = [
  {
    id: 'jason',
    slug: 'jason-duval',
    nameKey: 'characters.jason.name',
    type: 'INDIVIDUAL',
    category: 'MAIN',
    image: media.characters.jason,
    homeImage: media.characters.jasonHome,
    detailImage: media.characters.jasonAlt,
    descriptionKey: 'characters.jason.description',
    backgroundKey: 'characters.jason.background',
    personalityKey: 'characters.jason.personality',
    currentSituationKey: 'characters.jason.situation',
    relationships: [
      { characterId: 'lucia', type: 'ROMANTIC_PARTNER' },
      { characterId: 'cal', type: 'FRIEND' },
      { characterId: 'brian', type: 'EMPLOYER' },
    ],
  },
  {
    id: 'lucia',
    slug: 'lucia-caminos',
    nameKey: 'characters.lucia.name',
    type: 'INDIVIDUAL',
    category: 'MAIN',
    image: media.characters.lucia,
    homeImage: media.characters.luciaHome,
    detailImage: media.characters.luciaAlt,
    descriptionKey: 'characters.lucia.description',
    backgroundKey: 'characters.lucia.background',
    personalityKey: 'characters.lucia.personality',
    currentSituationKey: 'characters.lucia.situation',
    relationships: [{ characterId: 'jason', type: 'ROMANTIC_PARTNER' }],
  },
  {
    id: 'cal',
    slug: 'cal-hampton',
    nameKey: 'characters.cal.name',
    type: 'INDIVIDUAL',
    category: 'SUPPORTING',
    image: media.characters.cal,
    detailImage: media.characters.calAlt,
    descriptionKey: 'characters.cal.description',
    backgroundKey: 'characters.cal.background',
    personalityKey: 'characters.cal.personality',
    currentSituationKey: 'characters.cal.situation',
    relationships: [
      { characterId: 'jason', type: 'FRIEND' },
      { characterId: 'brian', type: 'ASSOCIATE' },
    ],
  },
  {
    id: 'brian',
    slug: 'brian-heder',
    nameKey: 'characters.brian.name',
    type: 'INDIVIDUAL',
    category: 'SUPPORTING',
    image: media.characters.brian,
    detailImage: media.characters.brianAlt,
    descriptionKey: 'characters.brian.description',
    backgroundKey: 'characters.brian.background',
    personalityKey: 'characters.brian.personality',
    currentSituationKey: 'characters.brian.situation',
    relationships: [{ characterId: 'jason', type: 'EMPLOYEE' }],
  },
  {
    id: 'boobie',
    slug: 'boobie-ike',
    nameKey: 'characters.boobie.name',
    type: 'INDIVIDUAL',
    category: 'SUPPORTING',
    image: media.characters.boobie,
    detailImage: media.characters.boobieAlt,
    descriptionKey: 'characters.boobie.description',
    backgroundKey: 'characters.boobie.background',
    personalityKey: 'characters.boobie.personality',
    currentSituationKey: 'characters.boobie.situation',
    relationships: [{ characterId: 'drequan', type: 'ASSOCIATE' }],
  },
  {
    id: 'drequan',
    slug: 'drequan-priest',
    nameKey: 'characters.drequan.name',
    type: 'INDIVIDUAL',
    category: 'SUPPORTING',
    image: media.characters.drequan,
    detailImage: media.characters.drequanAlt,
    descriptionKey: 'characters.drequan.description',
    backgroundKey: 'characters.drequan.background',
    personalityKey: 'characters.drequan.personality',
    currentSituationKey: 'characters.drequan.situation',
    relationships: [
      { characterId: 'boobie', type: 'ASSOCIATE' },
      { characterId: 'realdimez', type: 'ASSOCIATE' },
    ],
  },
  {
    id: 'realdimez',
    slug: 'real-dimez',
    nameKey: 'characters.realdimez.name',
    type: 'GROUP',
    category: 'SUPPORTING',
    image: media.characters.realdimez,
    detailImage: media.characters.realdimezAlt,
    descriptionKey: 'characters.realdimez.description',
    backgroundKey: 'characters.realdimez.background',
    personalityKey: 'characters.realdimez.personality',
    currentSituationKey: 'characters.realdimez.situation',
    relationships: [{ characterId: 'drequan', type: 'ASSOCIATE' }],
  },
  {
    id: 'raul',
    slug: 'raul-bautista',
    nameKey: 'characters.raul.name',
    type: 'INDIVIDUAL',
    category: 'SUPPORTING',
    image: media.characters.raul,
    detailImage: media.characters.raulAlt,
    descriptionKey: 'characters.raul.description',
    backgroundKey: 'characters.raul.background',
    personalityKey: 'characters.raul.personality',
    currentSituationKey: 'characters.raul.situation',
    relationships: [],
  },
];

export const locations: Location[] = [
  {
    id: 'vice-city',
    slug: 'vice-city',
    nameKey: 'locations.viceCity.name',
    descriptionKey: 'locations.viceCity.description',
    cardImage: media.locationGalleries.viceCity[0],
    images: media.locationGalleries.viceCity.slice(1),
  },
  {
    id: 'leonida-keys',
    slug: 'leonida-keys',
    nameKey: 'locations.leonidaKeys.name',
    descriptionKey: 'locations.leonidaKeys.description',
    cardImage: media.locationGalleries.leonidaKeys[0],
    images: media.locationGalleries.leonidaKeys.slice(1),
  },
  {
    id: 'port-gellhorn',
    slug: 'port-gellhorn',
    nameKey: 'locations.portGellhorn.name',
    descriptionKey: 'locations.portGellhorn.description',
    cardImage: media.locationGalleries.portGellhorn[0],
    images: media.locationGalleries.portGellhorn.slice(1),
  },
  {
    id: 'ambrosia',
    slug: 'ambrosia',
    nameKey: 'locations.ambrosia.name',
    descriptionKey: 'locations.ambrosia.description',
    cardImage: media.locationGalleries.ambrosia[0],
    images: media.locationGalleries.ambrosia.slice(1),
  },
  {
    id: 'grassrivers',
    slug: 'grassrivers',
    nameKey: 'locations.grassrivers.name',
    descriptionKey: 'locations.grassrivers.description',
    cardImage: media.locationGalleries.grassrivers[0],
    images: media.locationGalleries.grassrivers.slice(1),
  },
  {
    id: 'mount-kalaga-national-park',
    slug: 'mount-kalaga-national-park',
    nameKey: 'locations.mountKalaga.name',
    descriptionKey: 'locations.mountKalaga.description',
    cardImage: media.locationGalleries.mountKalaga[0],
    images: media.locationGalleries.mountKalaga.slice(1),
  },
];

export const trailers: Trailer[] = [
  {
    id: 'an-extended-look',
    slug: 'an-extended-look',
    titleKey: 'trailers.extended.title',
    date: '2026-08-27',
    thumbnail: media.trailers.extended,
    videoId: 'tJbzMqJGH4k',
    sourceUrl: 'https://www.rockstargames.com/VI/media/videos',
  },
  {
    id: 'trailer-2',
    slug: 'trailer-2',
    titleKey: 'trailers.trailer2.title',
    date: '2025-05-06',
    thumbnail: media.trailers.trailer2,
    videoId: 'VQRLujxTm3c',
    sourceUrl: 'https://www.rockstargames.com/VI/trailer-2',
  },
  {
    id: 'trailer-1',
    slug: 'trailer-1',
    titleKey: 'trailers.trailer1.title',
    date: '2023-12-04',
    thumbnail: media.trailers.trailer1,
    videoId: 'QdBZY2fkU-0',
    sourceUrl: 'https://www.rockstargames.com/VI/trailer-1',
  },
  {
    id: 'coming-soon',
    slug: 'coming-soon',
    titleKey: 'trailers.extended.title',
    date: '',
    thumbnail: media.trailers.extended,
    sourceUrl: 'https://www.rockstargames.com/VI/media/videos',
    comingSoon: true,
  },
];

export const news: NewsArticle[] = [
  {
    id: 'launch-november-19',
    slug: 'launch-november-19',
    category: 'ANNOUNCEMENTS',
    featured: false,
    titleKey: 'news.launch.title',
    summaryKey: 'news.launch.summary',
    contentKey: 'news.launch.content',
    date: '2025-11-06',
    image: media.news.launch,
    sourceUrl: 'https://www.rockstargames.com/VI',
    sourceName: 'Rockstar Games',
  },
  {
    id: 'pre-order-june-25',
    slug: 'pre-order-june-25',
    category: 'ANNOUNCEMENTS',
    featured: false,
    titleKey: 'news.preorder.title',
    summaryKey: 'news.preorder.summary',
    contentKey: 'news.preorder.content',
    date: '2026-06-24',
    image: media.news.preorder,
    sourceUrl:
      'https://www.rockstargames.com/newswire/article/5171972o3ak5oa/pre-order-grand-theft-auto-vi-on-june-25',
    sourceName: 'Rockstar Games',
  },
  {
    id: 'extended-look-now-playing',
    slug: 'extended-look-now-playing',
    category: 'GAME_INFORMATION',
    featured: false,
    titleKey: 'news.extended.title',
    summaryKey: 'news.extended.summary',
    contentKey: 'news.extended.content',
    date: '2026-08-27',
    image: media.news.extended,
    sourceUrl: 'https://www.rockstargames.com/VI/media/videos',
    sourceName: 'Rockstar Games',
  },
  {
    id: 'limited-edition-dualsense',
    slug: 'limited-edition-dualsense',
    category: 'ANNOUNCEMENTS',
    featured: true,
    titleKey: 'news.dualsense.title',
    summaryKey: 'news.dualsense.summary',
    contentKey: 'news.dualsense.content',
    date: '2026-09-03',
    image: media.news.dualsense,
    sourceUrl:
      'https://blog.playstation.com/2026/09/03/first-look-at-the-grand-theft-auto-vi-limited-edition-dualsense-wireless-controllers/',
    sourceName: 'PlayStation Blog',
  },
  {
    id: 'platforms-editions-versions',
    slug: 'platforms-editions-versions',
    category: 'GAME_INFORMATION',
    featured: false,
    titleKey: 'news.platforms.title',
    summaryKey: 'news.platforms.summary',
    contentKey: 'news.platforms.content',
    date: '2026-08-18',
    image: media.news.platforms,
    sourceUrl: 'https://www.rockstargames.com/VI',
    sourceName: 'Rockstar Games',
  },
];
