import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { categories } from '../lib/categories';
import { useLanguage } from '../contexts/LanguageContext';

const texts = {
  en: {
    title: 'Statistics',
    subtitle: 'Overview of sales and activity.',
    description:
      'Track creators\' performance on MintyShirt. Rankings are based on merch sales, token activity and community engagement.',
    categories: 'Categories',
    sortSales: 'Top merch sales',
    sortTokens: 'Most traded tokens',
    sortGroup: 'Most active groups',
    sortNew: 'New creators',
    country: 'Country',
    viewStats: 'View detailed stats',
    viewCreator: 'View creator page',
    legend: 'Legend',
    legendUpdated: 'Figures are updated every 24h.',
    legendVolume: 'TokenSwap volume reflects secondary sales.',
    legendMerch: 'Merch revenue only counts products sold via MintyShirt.',
    creatorCategory: 'Category',
    creatorCountry: 'Country',
    creatorIpAssets: 'IP assets',
    creatorTokensIssued: 'Royalty Tokens issued',
    creatorTokenSwapVolume: 'TokenSwap volume (30d)',
    creatorMerchRevenue: 'Merch revenue (30d)',
    creatorGroupMembers: 'Private group members',
  },
  fr: {
    title: 'Statistiques',
    subtitle: 'Aperçu des ventes et activités.',
    description:
      "Suivez les performances économiques des créateurs actifs sur MintyShirt. Classement basé sur les ventes de produits, l’activité liée aux tokens, et l'engagement communautaire.",
    categories: 'Catégories',
    sortSales: 'Meilleures ventes merch',
    sortTokens: 'Tokens les plus échangés',
    sortGroup: 'Groupes les plus actifs',
    sortNew: 'Nouveaux créateurs',
    country: 'Pays',
    viewStats: 'Voir les statistiques détaillées',
    viewCreator: 'Voir la page du créateur',
    legend: 'Légende',
    legendUpdated: 'Les chiffres sont actualisés toutes les 24h.',
    legendVolume: 'Le volume TokenSwap correspond aux ventes secondaires de tokens.',
    legendMerch: 'Les revenus merch incluent uniquement les produits vendus via MintyShirt.',
    creatorCategory: 'Catégorie',
    creatorCountry: 'Pays',
    creatorIpAssets: 'Actifs IP',
    creatorTokensIssued: 'Royalty Tokens émis',
    creatorTokenSwapVolume: 'Volume TokenSwap (30j)',
    creatorMerchRevenue: 'Revenus merch (30j)',
    creatorGroupMembers: 'Membres groupe privé',
  },
} as const;

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
    category: 'Jeux vidéo',
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
    category: 'Manga',
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

const countries = Array.from(new Set(creators.map((c) => c.country)));

export default function StatsPage() {
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('sales');
  const [country, setCountry] = useState('');
  const { language } = useLanguage();
  const t = texts[language];

  const normalizeCategory = (name: string) => {
    const map: Record<string, string> = {
      'Mangas': 'Manga',
      'Musique': 'Musiciens',
      'Jeux vidéos': 'Jeux vidéo',
      'Comics/fantastique': 'BD & Animés',
    };
    return map[name] || name;
  };

  const filtered = creators
    .filter((c) =>
      category ? normalizeCategory(c.category) === normalizeCategory(category) : true
    )
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
          <h1 className="text-3xl font-bold mb-1">{t.title}</h1>
          <p className="text-sm">{t.subtitle}</p>
          <p className="text-sm mt-1">{t.description}</p>
        </div>



        <div className="flex flex-wrap items-center gap-2">
          <select
            className="text-black p-1 rounded"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">{t.categories}</option>
            {categories.map((cat) => {
              const label = language === 'fr' ? cat.nameFr : cat.nameEn;
              return (
                <option key={cat.slug} value={cat.nameFr}>
                  {label}
                </option>
              );
            })}
          </select>

          <select
            className="text-black p-1 rounded"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="sales">{t.sortSales}</option>
            <option value="tokens">{t.sortTokens}</option>
            <option value="group">{t.sortGroup}</option>
            <option value="new">{t.sortNew}</option>
          </select>

          <select
            className="text-black p-1 rounded"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value="">{t.country}</option>
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
              <p>{t.creatorCategory} : {creator.category}</p>
              <p>{t.creatorCountry} : {creator.country}</p>
              <p>{t.creatorIpAssets} : {creator.ipAssets}</p>
              <p>{t.creatorTokensIssued} : {creator.tokensIssued}</p>
              <p>{t.creatorTokenSwapVolume} : {creator.tokenSwapVolume} ETH</p>
              <p>{t.creatorMerchRevenue} : {creator.merchRevenue.toLocaleString('fr-FR')} €</p>
              <p>{t.creatorGroupMembers} : {creator.groupMembers}</p>
              <Link
                to={`/stats/${creator.slug}`}
                className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-3 py-1 rounded inline-block mt-2"
              >
                {t.viewStats}
              </Link>
              <Link
                to={`/creators/${creator.slug}`}
                className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-3 py-1 rounded inline-block mt-2"
              >
                {t.viewCreator}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-sm space-y-1">
          <h2 className="font-semibold">{t.legend}</h2>
          <p>{t.legendUpdated}</p>
          <p>{t.legendVolume}</p>
          <p>{t.legendMerch}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
