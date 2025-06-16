import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTranslations } from '../contexts/LanguageContext';

interface StatsEntry {
  date: string;
  merchVolume: number;
  itemsSold: number;
  tokenVolume: number;
  tokenTx: number;
}

const sampleData: StatsEntry[] = [
  { date: '2024-05-01', merchVolume: 1200, itemsSold: 12, tokenVolume: 50, tokenTx: 5 },
  { date: '2024-05-02', merchVolume: 800, itemsSold: 8, tokenVolume: 30, tokenTx: 3 },
  { date: '2024-05-03', merchVolume: 600, itemsSold: 6, tokenVolume: 25, tokenTx: 2 },
  { date: '2024-05-04', merchVolume: 1000, itemsSold: 10, tokenVolume: 45, tokenTx: 4 },
  { date: '2024-05-05', merchVolume: 700, itemsSold: 7, tokenVolume: 20, tokenTx: 2 },
];

const periods = [
  { label: '24h', value: '1d' },
  { label: '7j', value: '7d' },
  { label: '30j', value: '30d' },
  { label: '90j', value: '90d' },
  { label: 'Année', value: '1y' },
  { label: 'Toutes périodes', value: 'all' },
  { label: 'Période personnalisée', value: 'custom' },
];

export default function CreatorStatsPage() {
  const { creatorHandle } = useParams<{ creatorHandle: string }>();
  const t = useTranslations().creatorStats;
  const [period, setPeriod] = useState('7d');

  const current = sampleData; // would be filtered by period in a real app
  const merchVolume = current.reduce((sum, d) => sum + d.merchVolume, 0);
  const itemsSold = current.reduce((sum, d) => sum + d.itemsSold, 0);
  const tokenVolume = current.reduce((sum, d) => sum + d.tokenVolume, 0);
  const tokenTx = current.reduce((sum, d) => sum + d.tokenTx, 0);

  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">{t.title} {creatorHandle}</h1>
          <p className="text-sm">{t.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {periods.map((p) => (
            <button
              key={p.value}
              onClick={() => setPeriod(p.value)}
              className={`px-3 py-1 rounded border ${period === p.value ? 'bg-purple-600' : 'bg-white/10'}`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="h-48 bg-white/10 border border-purple-800 rounded flex items-center justify-center">
              {t.salesChart}
            </div>
            <div className="bg-white/10 border border-purple-800 rounded p-4 space-y-1">
              <div className="font-semibold">{t.merchVolume} : {merchVolume} €</div>
              <div className="font-semibold">{t.itemsSold} : {itemsSold}</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-48 bg-white/10 border border-purple-800 rounded flex items-center justify-center">
              {t.tokenChart}
            </div>
            <div className="bg-white/10 border border-purple-800 rounded p-4 space-y-1">
              <div className="font-semibold">{t.tokenVolume} : {tokenVolume} ETH</div>
              <div className="font-semibold">{t.tokenTx} : {tokenTx}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 text-center">
          <Link
            to="/stats"
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded"
          >
            {t.back}
          </Link>
          <Link
            to={`/creators/${creatorHandle}`}
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded"
          >
            {t.viewProfile}
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

