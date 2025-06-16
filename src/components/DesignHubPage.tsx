import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { categories } from '../lib/categories';
import { useLanguage, useTranslations } from '../contexts/LanguageContext';

interface IPAsset {
  id: number;
  name: string;
  images: string[];
  creator: { name: string; avatar: string };
  isFork: boolean;
  generation: number;
  status: string;
  category: string;
  type: string;
  country: string;
  popularity: number;
  rentals: number;
}

const sampleAssets: IPAsset[] = [
  {
    id: 1,
    name: 'Space Adventure',
    images: [
      'https://via.placeholder.com/80?text=1A',
      'https://via.placeholder.com/80?text=1B',
      'https://via.placeholder.com/80?text=1C',
    ],
    creator: { name: 'Alice', avatar: 'https://via.placeholder.com/32?text=A' },
    isFork: false,
    generation: 1,
    status: 'Disponible',
    category: 'Manga',
    type: 'principal',
    country: 'JP',
    popularity: 10,
    rentals: 3,
  },
  {
    id: 2,
    name: 'Retro Game',
    images: [
      'https://via.placeholder.com/80?text=2A',
      'https://via.placeholder.com/80?text=2B',
      'https://via.placeholder.com/80?text=2C',
    ],
    creator: { name: 'Bob', avatar: 'https://via.placeholder.com/32?text=B' },
    isFork: true,
    generation: 2,
    status: 'Remix autorisé',
    category: 'Jeux vidéo',
    type: 'fork',
    country: 'US',
    popularity: 8,
    rentals: 5,
  },
  {
    id: 3,
    name: 'DJ Beats',
    images: [
      'https://via.placeholder.com/80?text=3A',
      'https://via.placeholder.com/80?text=3B',
    ],
    creator: { name: 'Clara', avatar: 'https://via.placeholder.com/32?text=C' },
    isFork: false,
    generation: 1,
    status: 'Loué',
    category: 'Musiciens',
    type: 'principal',
    country: 'FR',
    popularity: 5,
    rentals: 7,
  },
];

export default function DesignHubPage() {
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [type, setType] = React.useState('');
  const [order, setOrder] = React.useState('');
  const [country, setCountry] = React.useState('');
  const { language } = useLanguage();
  const t = useTranslations();

  const filtered = sampleAssets
    .filter((asset) =>
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.creator.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((asset) => (category ? asset.category === category : true))
    .filter((asset) => (status ? asset.status === status : true))
    .filter((asset) =>
      type
        ? type === 'principal'
          ? asset.type === 'principal'
          : asset.type === 'fork'
        : true
    )
    .filter((asset) => (country ? asset.country === country : true));

  const sorted = [...filtered].sort((a, b) => {
    switch (order) {
      case 'Nouveaux':
        return b.id - a.id;
      case 'Plus loués':
        return b.rentals - a.rentals;
      case 'Populaires':
        return b.popularity - a.popularity;
      default:
        return 0;
    }
  });

  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{t.designHub.title}</h1>
          <p className="text-sm">{t.designHub.subtitle}</p>
        </div>

        <div className="space-y-2">
          <input
            type="text"
            placeholder={t.designHub.searchPlaceholder}
            className="border rounded px-2 py-1 text-black w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            <select
              className="text-black p-1 rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">{t.designHub.categories}</option>
              {categories.map((c) => {
                const label = language === 'fr' ? c.nameFr : c.nameEn;
                return (
                  <option key={c.slug} value={c.nameFr}>
                    {label}
                  </option>
                );
              })}
            </select>
            <select
              className="text-black p-1 rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">{t.designHub.status}</option>
              <option value="Disponible">{t.designHub.statusAvailable}</option>
              <option value="Loué">{t.designHub.statusRented}</option>
              <option value="Remix autorisé">{t.designHub.statusRemixAllowed}</option>
            </select>
            <select
              className="text-black p-1 rounded"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">{t.designHub.type}</option>
              <option value="principal">{t.designHub.typeMain}</option>
              <option value="fork">{t.designHub.typeFork}</option>
            </select>
            <select
              className="text-black p-1 rounded"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="">{t.designHub.order}</option>
              <option value="Populaires">{t.designHub.orderPopular}</option>
              <option value="Nouveaux">{t.designHub.orderNew}</option>
              <option value="Plus loués">{t.designHub.orderMostRented}</option>
            </select>
            <select
              className="text-black p-1 rounded"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">{t.designHub.country}</option>
              <option value="FR">{t.designHub.countryFR}</option>
              <option value="US">{t.designHub.countryUS}</option>
              <option value="JP">{t.designHub.countryJP}</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {sorted.map((asset) => (
            <div
              key={asset.id}
              className="bg-white/10 backdrop-blur border border-purple-800 rounded shadow p-4 flex flex-col text-center group"
            >
              <div className="overflow-hidden mb-2">
                <div className="flex space-x-1 transition-transform duration-300 group-hover:-translate-x-1/3">
                  {asset.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="design"
                      className="w-24 h-24 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
              <h3 className="font-semibold text-white">{asset.name}</h3>
              <div className="flex items-center justify-center space-x-2 text-sm text-purple-200 mb-1">
                <img
                  src={asset.creator.avatar}
                  alt="avatar"
                  className="w-5 h-5 rounded-full"
                />
                <span>{asset.creator.name}</span>
              </div>
              <span className="text-xs mb-2">
                {asset.isFork
                  ? `${t.designHub.forkPrefix} ${asset.generation}${t.designHub.generationSuffix}`
                  : t.designHub.ipMain}
              </span>
              <Link
                to={`/design-hub/${asset.id}`}
                className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-1 rounded"
              >
                {t.designHub.viewIp}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-sm text-center space-y-1">
          <p>{t.designHub.explanation1}</p>
          <p>{t.designHub.explanation2}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
