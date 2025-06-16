export interface Category {
  name: string;
  slug: string;
}

export const categories: Category[] = [
  { name: 'Créateurs de contenu', slug: 'createurs-de-contenu' },
  { name: 'Musiciens', slug: 'musiciens' },
  { name: 'Mangas', slug: 'mangas' },
  { name: 'BD & Animés', slug: 'bd-animes' },
  { name: 'Jeux vidéo', slug: 'jeux-video' },
  { name: 'Séries', slug: 'series' },
  { name: 'Films', slug: 'films' },
  { name: 'Art visuel', slug: 'art-visuel' },
  { name: 'Clubs sportifs', slug: 'clubs-sportifs' },
  { name: 'Crypto', slug: 'crypto' },
  { name: 'Collections de NFTs', slug: 'collections-de-nfts' },
  { name: 'Marques & Entreprises', slug: 'marques-entreprises' }
];
