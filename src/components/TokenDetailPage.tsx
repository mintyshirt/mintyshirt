import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { tokens } from '../lib/tokens';

export default function TokenDetailPage() {
  const { id } = useParams<{ id: string }>();
  const token = tokens.find(t => t.id === id);

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
              Créateur:
              <Link to={`/creators/${token.creatorSlug}`} className="text-purple-300 hover:underline ml-1">
                {token.creator}
              </Link>
            </div>
            <div>Catégorie: {token.category}</div>
            <div>
              Page IP associée:
              <Link to={`/design-hub/${token.ipAssetId}`} className="text-purple-300 hover:underline ml-1">
                Voir l'actif IP
              </Link>
            </div>
            <p>{token.description}</p>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-white/10 backdrop-blur border border-purple-800 rounded p-4 space-y-1">
                <div>Dernier prix échangé: {token.lastPrice} ETH</div>
                <div>Volume 24h: {token.volume24h} ETH</div>
                <div>Nombre de détenteurs: {token.holders}</div>
                <div>% des revenus redistribués: {token.revenueShare}%</div>
              </div>
              <div className="bg-white/10 backdrop-blur border border-purple-800 rounded p-4">
                <div className="font-semibold mb-2">Avantages associés</div>
                <ul className="list-disc list-inside space-y-1">
                  {token.perks.map(p => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-x-2">
              <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded">
                Acheter maintenant
              </button>
              <Link to={`/creators/${token.creatorSlug}`} className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded">
                Voir sur la boutique du créateur
              </Link>
            </div>
          </>
        ) : (
          <h1 className="text-3xl font-bold">Token introuvable</h1>
        )}

        <p className="text-sm mt-8">
          Les Royalty Tokens proposés sur MintyShirt ne sont pas des security tokens. Ils ne constituent pas une promesse de gain financier, mais représentent un droit à redevance lié à l’usage commercial d’une œuvre ou d’une marque, déterminé par le créateur lui-même. MintyShirt ne garantit aucun rendement. Le détenteur touche des revenus uniquement si l’activité du créateur génère des ventes.
        </p>
      </div>
      <Footer />
    </div>
  );
}
