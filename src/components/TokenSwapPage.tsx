import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { tokens, SwapToken } from '../lib/tokens';
import { categories } from '../lib/categories';
import { useLanguage } from '../contexts/LanguageContext';

const texts = {
  en: {
    title: 'TokenSwap - Royalty Tokens secondary market',
    subtitle: 'Trade your tokens here.',
    search: 'Search for a token or creator',
    categories: 'Categories',
    sortTopSales: 'Top sales',
    sortTopPrice: 'Top price',
    sortRecent: 'Recent',
    sortPopular: 'Popular',
    min: 'Min',
    max: 'Max',
    logo: 'Logo',
    name: 'Name',
    creator: 'Creator',
    lastPrice: 'Last price',
    change24h: '24h',
    volume24h: '24h volume',
    onSale: 'On sale',
    buy: 'Buy',
    disclaimer:
      'Royalty Tokens offered on MintyShirt are not security tokens and do not guarantee returns. Holders earn revenue only if the creator generates sales.',
  },
  fr: {
    title: 'TokenSwap - Marché secondaire des Royalty Tokens',
    subtitle: 'Échangez vos tokens ici.',
    search: 'Rechercher un token ou un créateur',
    categories: 'Catégories',
    sortTopSales: 'Top ventes',
    sortTopPrice: 'Top prix',
    sortRecent: 'Récents',
    sortPopular: 'Populaires',
    min: 'Min',
    max: 'Max',
    logo: 'Logo',
    name: 'Nom',
    creator: 'Créateur',
    lastPrice: 'Dernier prix',
    change24h: '24h',
    volume24h: 'Volume 24h',
    onSale: 'En vente',
    buy: 'Acheter',
    disclaimer:
      'Les Royalty Tokens proposés sur MintyShirt ne sont pas des security tokens. Ils ne constituent pas une promesse de gain financier. Le détenteur touche des revenus uniquement si l’activité du créateur génère des ventes.',
  },
} as const;
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

export default function TokenSwapPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('top-sales');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = texts[language];

  const filtered = tokens
    .filter(t => t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.creator.toLowerCase().includes(search.toLowerCase()))
    .filter(t => !category || t.category === category)
    .filter(t => (!minPrice || t.lastPrice >= parseFloat(minPrice)) &&
      (!maxPrice || t.lastPrice <= parseFloat(maxPrice)));

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'top-price':
        return b.lastPrice - a.lastPrice;
      case 'recent':
        return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime();
      case 'popular':
        return b.holders - a.holders;
      default:
        return b.volume24h - a.volume24h;
    }
  });

  function changeIcon(val: number) {
    if (val > 0) return <span className="text-green-500 inline-flex items-center"><FaArrowUp className="mr-1" />{val.toFixed(1)}%</span>;
    if (val < 0) return <span className="text-red-500 inline-flex items-center"><FaArrowDown className="mr-1" />{val.toFixed(1)}%</span>;
    return <span className="inline-flex items-center"><FaMinus className="mr-1" />0%</span>;
  }

  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white space-y-4">
        <h1 className="text-3xl font-bold">{t.title}</h1>
        <p>{t.subtitle}</p>
        <div className="bg-white/10 backdrop-blur p-4 rounded border border-purple-800 space-y-2">
          <input
            type="text"
            placeholder={t.search}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border p-2 text-black w-full md:w-1/2"
          />
          <div className="flex flex-wrap items-end space-x-2">
            <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 text-black">
              <option value="">{t.categories}</option>
              {categories.map(c => {
                const label = language === 'fr' ? c.nameFr : c.nameEn;
                return (
                  <option key={c.slug} value={c.nameFr}>{label}</option>
                );
              })}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value)} className="border p-2 text-black">
              <option value="top-sales">{t.sortTopSales}</option>
              <option value="top-price">{t.sortTopPrice}</option>
              <option value="recent">{t.sortRecent}</option>
              <option value="popular">{t.sortPopular}</option>
            </select>
            <input type="number" placeholder={t.min} value={minPrice} onChange={e => setMinPrice(e.target.value)} className="border p-2 text-black w-24" />
            <input type="number" placeholder={t.max} value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="border p-2 text-black w-24" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-purple-800">
            <thead className="bg-purple-800/50">
              <tr>
                <th className="px-2 py-1">{t.logo}</th>
                <th className="px-2 py-1 text-left">{t.name}</th>
                <th className="px-2 py-1 text-left">{t.creator}</th>
                <th className="px-2 py-1 text-right">{t.lastPrice}</th>
                <th className="px-2 py-1 text-right">{t.change24h}</th>
                <th className="px-2 py-1 text-right">{t.volume24h}</th>
                <th className="px-2 py-1 text-right">{t.onSale}</th>
                <th className="px-2 py-1" />
              </tr>
            </thead>
            <tbody>
              {sorted.map(token => (
                <tr key={token.id} className="hover:bg-white/10 cursor-pointer" onClick={() => navigate(`/tokenswap/${token.id}`)}>
                  <td className="px-2 py-1 text-center">{token.logo}</td>
                  <td className="px-2 py-1">{token.name}</td>
                  <td className="px-2 py-1">{token.creator}</td>
                  <td className="px-2 py-1 text-right">{token.lastPrice} ETH</td>
                  <td className="px-2 py-1 text-right">{changeIcon(token.change24h)}</td>
                  <td className="px-2 py-1 text-right">{token.volume24h} ETH</td>
                  <td className="px-2 py-1 text-right">{token.quantity}</td>
                  <td className="px-2 py-1">
                    <button
                      className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-2 py-1 rounded"
                      onClick={e => { e.stopPropagation(); }}
                    >{t.buy}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm mt-4">{t.disclaimer}</p>
      </div>
      <Footer />
    </div>
  );
}
