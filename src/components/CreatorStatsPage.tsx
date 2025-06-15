import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface StatsEntry {
  date: string;
  sales: number;
  tokenVolume: number;
}

const sampleData: StatsEntry[] = [
  { date: '2024-05-01', sales: 120, tokenVolume: 50 },
  { date: '2024-05-02', sales: 80, tokenVolume: 30 },
  { date: '2024-05-03', sales: 60, tokenVolume: 25 },
  { date: '2024-05-04', sales: 100, tokenVolume: 45 },
  { date: '2024-05-05', sales: 70, tokenVolume: 20 },
];

const periods = [
  { label: '24h', value: '1d' },
  { label: '7j', value: '7d' },
  { label: '30j', value: '30d' },
  { label: '90j', value: '90d' },
  { label: 'Tout', value: 'all' },
];

export default function CreatorStatsPage() {
  const { creatorHandle } = useParams<{ creatorHandle: string }>();
  const [period, setPeriod] = useState('7d');

  const current = sampleData; // would be filtered by period in a real app
  const totalSales = current.reduce((sum, d) => sum + d.sales, 0);
  const totalVolume = current.reduce((sum, d) => sum + d.tokenVolume, 0);

  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-1">Stats de {creatorHandle}</h1>
          <p className="text-sm">Performances économiques du créateur.</p>
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
              Graphique ventes (exemple)
            </div>
            <div className="bg-white/10 border border-purple-800 rounded p-4 space-y-1">
              <div className="font-semibold">Ventes totales : {totalSales}</div>
              <div className="font-semibold">Volume TokenSwap : {totalVolume} ETH</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-48 bg-white/10 border border-purple-800 rounded flex items-center justify-center">
              Graphique tokens (exemple)
            </div>
            <div className="bg-white/10 border border-purple-800 rounded p-4 space-y-1">
              <div className="font-semibold">Transactions : {current.length}</div>
              <div className="font-semibold">Période sélectionnée : {period}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 text-center">
          <Link
            to="/stats"
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded"
          >
            Retour aux statistiques générales
          </Link>
          <Link
            to={`/creators/${creatorHandle}`}
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded"
          >
            Voir le profil complet du créateur
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}

