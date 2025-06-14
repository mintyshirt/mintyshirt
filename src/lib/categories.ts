export interface Category {
  name: string;
  slug: string;
}

export const categories: Category[] = [
  { name: 'Créateurs de contenu', slug: 'createurs-de-contenu' },
  { name: 'Musiciens', slug: 'musiciens' },
  { name: 'Jeux vidéo', slug: 'jeux-video' },
  { name: 'Manga', slug: 'manga' },
  { name: 'BD & Animés', slug: 'bd-animes' },
  { name: 'Crypto', slug: 'crypto' },
  { name: 'NFT', slug: 'nft' },
  { name: 'Clubs sportifs', slug: 'clubs-sportifs' },
  { name: 'Séries', slug: 'series' },
  { name: 'Films', slug: 'films' },
  { name: 'Art visuel', slug: 'art-visuel' },
  { name: 'Mode', slug: 'mode' },
  { name: 'Marques & entreprises', slug: 'marques-entreprises' },
  { name: 'Autres', slug: 'autres' },
];
