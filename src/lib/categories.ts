export interface Category {
  slug: string;
  nameEn: string;
  nameFr: string;
}

export const categories: Category[] = [
  {
    slug: 'createurs-de-contenu',
    nameEn: 'Content creators',
    nameFr: 'Créateurs de contenu'
  },
  { slug: 'musiciens', nameEn: 'Musicians', nameFr: 'Musiciens' },
  { slug: 'mangas', nameEn: 'Manga', nameFr: 'Mangas' },
  { slug: 'bd-animes', nameEn: 'Comics & Anime', nameFr: 'BD & Animés' },
  { slug: 'jeux-video', nameEn: 'Video games', nameFr: 'Jeux vidéo' },
  { slug: 'series', nameEn: 'TV shows', nameFr: 'Séries' },
  { slug: 'films', nameEn: 'Movies', nameFr: 'Films' },
  { slug: 'art-visuel', nameEn: 'Visual art', nameFr: 'Art visuel' },
  { slug: 'clubs-sportifs', nameEn: 'Sports clubs', nameFr: 'Clubs sportifs' },
  { slug: 'crypto', nameEn: 'Crypto', nameFr: 'Crypto' },
  {
    slug: 'collections-de-nfts',
    nameEn: 'NFT collections',
    nameFr: 'Collections de NFTs'
  },
  {
    slug: 'marques-entreprises',
    nameEn: 'Brands & Companies',
    nameFr: 'Marques & Entreprises'
  }
];
