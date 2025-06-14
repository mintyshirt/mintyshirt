import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { tokens, SwapToken } from '../lib/tokens';
import { categories } from '../lib/categories';
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

export default function TokenSwapPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('top-sales');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

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
        <h1 className="text-3xl font-bold">TokenSwap - Marché secondaire des Royalty Tokens</h1>

        <div className="bg-white/10 backdrop-blur p-4 rounded border border-purple-800 space-y-2">
          <input
            type="text"
            placeholder="Rechercher un token ou un créateur"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border p-2 text-black w-full md:w-1/2"
          />
          <div className="flex flex-wrap items-end space-x-2">
            <select value={category} onChange={e => setCategory(e.target.value)} className="border p-2 text-black">
              <option value="">Catégories</option>
              {categories.map(c => (
                <option key={c.slug} value={c.name}>{c.name}</option>
              ))}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value)} className="border p-2 text-black">
              <option value="top-sales">Top ventes</option>
              <option value="top-price">Top prix</option>
              <option value="recent">Récents</option>
              <option value="popular">Populaires</option>
            </select>
            <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="border p-2 text-black w-24" />
            <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="border p-2 text-black w-24" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border border-purple-800">
            <thead className="bg-purple-800/50">
              <tr>
                <th className="px-2 py-1">Logo</th>
                <th className="px-2 py-1 text-left">Nom</th>
                <th className="px-2 py-1 text-left">Créateur</th>
                <th className="px-2 py-1 text-right">Dernier prix</th>
                <th className="px-2 py-1 text-right">24h</th>
                <th className="px-2 py-1 text-right">Volume 24h</th>
                <th className="px-2 py-1 text-right">En vente</th>
                <th className="px-2 py-1" />
              </tr>
            </thead>
            <tbody>
              {sorted.map(t => (
                <tr key={t.id} className="hover:bg-white/10 cursor-pointer" onClick={() => navigate(`/tokenswap/${t.id}`)}>
                  <td className="px-2 py-1 text-center">{t.logo}</td>
                  <td className="px-2 py-1">{t.name}</td>
                  <td className="px-2 py-1">{t.creator}</td>
                  <td className="px-2 py-1 text-right">{t.lastPrice} ETH</td>
                  <td className="px-2 py-1 text-right">{changeIcon(t.change24h)}</td>
                  <td className="px-2 py-1 text-right">{t.volume24h} ETH</td>
                  <td className="px-2 py-1 text-right">{t.quantity}</td>
                  <td className="px-2 py-1">
                    <button
                      className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-2 py-1 rounded"
                      onClick={e => { e.stopPropagation(); }}
                    >Acheter</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-sm mt-4">
          Les Royalty Tokens proposés sur MintyShirt ne sont pas des security tokens. Ils ne constituent pas une promesse de gain financier, mais représentent un droit à redevance lié à l’usage commercial d’une œuvre ou d’une marque, déterminé par le créateur lui-même. MintyShirt ne garantit aucun rendement. Le détenteur touche des revenus uniquement si l’activité du créateur génère des ventes.
        </p>
      </div>
      <Footer />
    </div>
  );
}
