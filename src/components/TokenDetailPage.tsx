import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { tokens } from '../lib/tokens';
import { FaCheck } from 'react-icons/fa';
import { useLanguage, useTranslations } from '../contexts/LanguageContext';


export default function TokenDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const t = useTranslations().tokenDetail;
  const token = tokens.find(tk => tk.id === id);

  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white space-y-4">
        {token ? (
          <>
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{token.logo}</div>
              <h1 className="text-3xl font-bold">{token.name}</h1>
            </div>
            <div>
              {t.creator}:
              <Link to={`/creators/${token.creatorSlug}`} className="text-purple-300 hover:underline ml-1">
                {token.creator}
              </Link>
            </div>
            <div>{t.category}: {token.category}</div>
            <div>
              {t.ipPage}:
              <Link to={`/design-hub/${token.ipAssetId}`} className="text-purple-300 hover:underline ml-1">
                {t.view}
              </Link>
            </div>
            <p>{token.description}</p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white/10 backdrop-blur border border-purple-800 rounded p-4 space-y-1">
                <div>{t.lastPrice}: {token.lastPrice} ETH</div>
                <div>{t.volume24h}: {token.volume24h} ETH</div>
                <div>{t.holders}: {token.holders}</div>
                <div>{t.revenueShare}: {token.revenueShare}%</div>
              </div>
              <div className="bg-white/10 backdrop-blur border border-purple-800 rounded p-4">
                <div className="font-semibold mb-2">{t.perks}</div>
                <ul className="space-y-1">
                  {token.perks[language].map(p => (
                    <li key={p} className="flex items-center">
                      <FaCheck className="text-green-500 mr-2" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-x-2">
              <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded">
                {t.buyNow}
              </button>
              <Link to={`/creators/${token.creatorSlug}`} className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded">
                {t.viewShop}
              </Link>
            </div>
          </>
        ) : (
          <h1 className="text-3xl font-bold">{t.notFound}</h1>
        )}

        <p className="text-sm mt-8">{t.disclaimer}</p>
      </div>
      <Footer />
    </div>
  );
}
