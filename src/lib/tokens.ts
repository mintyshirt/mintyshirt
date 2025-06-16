export interface SwapToken {
  id: string;
  logo: string;
  name: string;
  creator: string;
  creatorSlug: string;
  category: string;
  lastPrice: number; // ETH
  change24h: number; // percent
  volume24h: number; // ETH
  quantity: number;
  description: string;
  ipAssetId: string;
  holders: number;
  revenueShare: number; // percent
  perks: string[];
  listedAt: string; // ISO date
}

export const tokens: SwapToken[] = [
  {
    id: 'royalties_mx',
    logo: '🔶',
    name: 'Royalties_MX',
    creator: 'MangaX',
    creatorSlug: 'mangax',
    category: 'Mangas',
    lastPrice: 0.032,
    change24h: 5.2,
    volume24h: 12,
    quantity: 14,
    description: 'Token donnant droit à une part des revenus des produits MangaX.',
    ipAssetId: '1',
    holders: 78,
    revenueShare: 25,
    perks: ['Groupe privé', 'Lien d’affiliation', 'Réductions sur le merch'],
    listedAt: '2023-10-01T00:00:00Z'
  },
  {
    id: 'merchtoken_d',
    logo: '🔷',
    name: 'MerchToken_D',
    creator: 'DJ Nova',
    creatorSlug: 'dj-nova',
    category: 'Musiciens',
    lastPrice: 0.012,
    change24h: -3.1,
    volume24h: 4,
    quantity: 6,
    description: 'Accès à des remises exclusives sur le merch de DJ Nova.',
    ipAssetId: '2',
    holders: 42,
    revenueShare: 15,
    perks: ['Groupe privé', 'Réductions sur le merch'],
    listedAt: '2023-10-03T00:00:00Z'
  },
  {
    id: 'royalties_ri',
    logo: '🔴',
    name: 'Royalties_Ri',
    creator: 'RickFan',
    creatorSlug: 'rickfan',
    category: 'BD & Animés',
    lastPrice: 0.021,
    change24h: 0,
    volume24h: 8,
    quantity: 10,
    description: 'Partage des revenus des ventes de la série RickFan.',
    ipAssetId: '3',
    holders: 55,
    revenueShare: 20,
    perks: ['Groupe privé'],
    listedAt: '2023-09-28T00:00:00Z'
  }
];
