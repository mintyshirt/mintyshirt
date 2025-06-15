import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface CreatorStats {
  slug: string;
  username: string;
  category: string;
  country: string;
  ipAssets: number;
  tokensIssued: number;
  tokenSwapVolume: number; // ETH
  merchRevenue: number; // EUR
  groupMembers: number;
  joinedAt: string; // ISO date
}

const creators: CreatorStats[] = [
  {
    slug: 'artistx',
    username: '@ArtistX',
    category: 'Jeux Vidéo',
    country: 'France',
    ipAssets: 3,
    tokensIssued: 3000,
    tokenSwapVolume: 2.4,
    merchRevenue: 6820,
    groupMembers: 347,
    joinedAt: '2023-08-15',
  },
  {
    slug: 'mangay',
    username: '@MangaY',
    category: 'Mangas',
    country: 'Japon',
    ipAssets: 5,
    tokensIssued: 1500,
    tokenSwapVolume: 1.1,
    merchRevenue: 10520,
    groupMembers: 412,
    joinedAt: '2023-09-10',
  },
  {
    slug: 'dj-nova',
    username: '@DJNova',
    category: 'Musiciens',
    country: 'États-Unis',
    ipAssets: 2,
    tokensIssued: 4200,
    tokenSwapVolume: 3.8,
    merchRevenue: 4520,
    groupMembers: 289,
    joinedAt: '2023-07-20',
  },
  {
    slug: 'visualartpro',
    username: '@VisualArtPro',
    category: 'Art visuel',
    country: 'France',
    ipAssets: 4,
    tokensIssued: 2600,
    tokenSwapVolume: 0.9,
    merchRevenue: 3780,
    groupMembers: 198,
    joinedAt: '2023-10-01',
  },
  {
    slug: 'cryptohero',
    username: '@CryptoHero',
    category: 'Crypto',
    country: 'Suisse',
    ipAssets: 1,
    tokensIssued: 500,
    tokenSwapVolume: 5.1,
    merchRevenue: 850,
    groupMembers: 75,
    joinedAt: '2023-10-05',
  },
];

const categories = [
  'Mangas',
  'Séries',
  'Films',
  'Jeux Vidéo',
  'Musiciens',
  'Crypto',
  'NFT',
  'Art visuel',
  'Clubs sportifs',
  'Comics/Fantastiques',
];

const countries = Array.from(new Set(creators.map((c) => c.country)));

export default function StatsPage() {
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('sales');
  const [country, setCountry] = useState('');

  const filtered = creators
    .filter((c) => (category ? c.category === category : true))
    .filter((c) => (country ? c.country === country : true));

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'sales':
        return b.merchRevenue - a.merchRevenue;
      case 'tokens':
        return b.tokenSwapVolume - a.tokenSwapVolume;
      case 'group':
        return b.groupMembers - a.groupMembers;
      case 'new':
        return new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Statistiques</h1>
          <p className="text-sm">Aperçu des ventes et activités.</p>
          <p className="text-sm mt-1">
            Suivez les performances économiques des créateurs actifs sur
            MintyShirt. Classement basé sur les ventes de produits, l’activité
            liée aux tokens, et l'engagement communautaire.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            className="text-black p-1 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Catégories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            className="text-black p-1 rounded"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="sales">Meilleures ventes merch</option>
            <option value="tokens">Tokens les plus échangés</option>
            <option value="group">Groupes les plus actifs</option>
            <option value="new">Nouveaux créateurs</option>
          </select>

          <select
            className="text-black p-1 rounded"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">Pays</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {sorted.map((creator) => (
            <div
              key={creator.slug}
              className="bg-white/10 backdrop-blur border border-purple-800 rounded shadow p-4 text-center space-y-1"
            >
              <h3 className="font-semibold">{creator.username}</h3>
              <p>Catégorie : {creator.category}</p>
              <p>Pays : {creator.country}</p>
              <p>Actifs IP : {creator.ipAssets}</p>
              <p>Royalty Tokens émis : {creator.tokensIssued}</p>
              <p>Volume TokenSwap (30j) : {creator.tokenSwapVolume} ETH</p>
              <p>Revenus merch (30j) : {creator.merchRevenue.toLocaleString('fr-FR')} €</p>
              <p>Membres groupe privé : {creator.groupMembers}</p>
              <Link
                to={`/creators/${creator.slug}`}
                className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-3 py-1 rounded inline-block mt-2"
              >
                Voir la page du créateur
              </Link>
              <Link
                to={`/stats/${creator.slug}`}
                className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-3 py-1 rounded inline-block mt-2"
              >
                Voir les statistiques détaillées
              </Link>
            </div>
          ))}
        </div>

        <div className="text-sm space-y-1">
          <h2 className="font-semibold">Légende</h2>
          <p>Les chiffres sont actualisés toutes les 24h.</p>
          <p>Le volume TokenSwap correspond aux ventes secondaires de tokens.</p>
          <p>
            Les revenus merch incluent uniquement les produits vendus via
            MintyShirt.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
