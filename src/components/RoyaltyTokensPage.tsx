import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { tokens, SwapToken } from '../lib/tokens';
import { categories } from '../lib/categories';
import { useLanguage, useTranslations } from '../contexts/LanguageContext';

import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';

export default function RoyaltyTokensPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('popular');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [page, setPage] = useState(1);
  const { language } = useLanguage();
  const t = useTranslations().royaltyTokens;

  const ITEMS_PER_PAGE = 6;

  const filtered = tokens
    .filter(t => t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.creator.toLowerCase().includes(search.toLowerCase()))
    .filter(t => !category || t.category === category)
    .filter(t => (!minPrice || t.lastPrice >= parseFloat(minPrice)) &&
      (!maxPrice || t.lastPrice <= parseFloat(maxPrice)));

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'price':
        return b.lastPrice - a.lastPrice;
      case 'recent':
        return new Date(b.listedAt).getTime() - new Date(a.listedAt).getTime();
      case 'share':
        return b.revenueShare - a.revenueShare;
      default:
        return b.holders - a.holders;
    }
  });

  const pageCount = Math.ceil(sorted.length / ITEMS_PER_PAGE) || 1;
  const paginated = sorted.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  function changeIcon(val: number) {
    if (val > 0)
      return (
        <span className="text-green-500 inline-flex items-center"><FaArrowUp className="mr-1" />{val.toFixed(1)}%</span>
      );
    if (val < 0)
      return (
        <span className="text-red-500 inline-flex items-center"><FaArrowDown className="mr-1" />{val.toFixed(1)}%</span>
      );
    return (
      <span className="inline-flex items-center"><FaMinus className="mr-1" />0%</span>
    );
  }

  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white space-y-4">
        <h1 className="text-3xl font-bold">{t.title}</h1>

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
              <option value="popular">{t.sortPopular}</option>
              <option value="price">{t.sortPrice}</option>
              <option value="recent">{t.sortRecent}</option>
              <option value="share">{t.sortShare}</option>
            </select>
            <input type="number" placeholder={t.min} value={minPrice} onChange={e => setMinPrice(e.target.value)} className="border p-2 text-black w-24" />
            <input type="number" placeholder={t.max} value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="border p-2 text-black w-24" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paginated.map((token: SwapToken) => (
            <div key={token.id} className="bg-white/10 backdrop-blur border border-purple-800 rounded shadow p-4 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="text-2xl">{token.logo}</div>
                <h3 className="font-semibold">{token.name}</h3>
              </div>
              <div>
                {t.creator}:
                <Link to={`/creators/${token.creatorSlug}`} className="text-purple-300 hover:underline ml-1">
                  {token.creator}
                </Link>
              </div>
              <div>{t.currentPrice}: {token.lastPrice} ETH</div>
              <div>{t.change24h}: {changeIcon(token.change24h)}</div>
              <div>{t.volume24h}: {token.volume24h} ETH</div>
              <div>{t.revenueShare}: {token.revenueShare}%</div>
              <div>
                {t.ipAsset}:
                <Link to={`/design-hub/${token.ipAssetId}`} className="text-purple-300 hover:underline ml-1">
                  {t.view}
                </Link>
              </div>
              <div>
                <div className="font-semibold">{t.perks}</div>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {token.perks[language].map(p => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <Link
                to={`/tokenswap/${token.id}`}
                className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded text-center block"
              >
                {t.viewToken}
              </Link>
            </div>
          ))}
        </div>

        {pageCount > 1 && (
          <div className="flex justify-center items-center space-x-4 mt-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-3 py-1 rounded disabled:opacity-50"
            >
              {t.prev}
            </button>
            <span>
              Page {page} / {pageCount}
            </span>
            <button
              onClick={() => setPage(p => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
              className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-3 py-1 rounded disabled:opacity-50"
            >
              {t.next}
            </button>
          </div>
        )}

        <p className="text-sm mt-4">{t.disclaimer}</p>
      </div>
      <Footer />
    </div>
  );
}
