import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useWeb3 } from '../contexts/Web3Context';
import { registerCreator } from '../services/registry';

export default function BecomeCreatorPage() {
  const { address, provider, connect } = useWeb3();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [creatorId, setCreatorId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!provider) {
      await connect();
      if (!provider) return;
    }
    setLoading(true);
    setError('');
    try {
      const id = await registerCreator(provider!, name, url);
      setCreatorId(id);
    } catch (err: any) {
      setError(err.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-md mx-auto mt-6 p-4 text-white space-y-4">
        <h1 className="text-2xl font-bold">Devenir Créateur</h1>
        {!address && (
          <button
            onClick={connect}
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded"
          >
            Connecter Wallet
          </button>
        )}
        {address && (
          <form onSubmit={submit} className="space-y-2">
            <input
              className="w-full border p-2 text-black"
              placeholder="Nom de créateur"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border p-2 text-black"
              placeholder="URL du profil"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : "S'enregistrer comme créateur"}
            </button>
          </form>
        )}
        {creatorId && (
          <p className="text-green-500">Inscription réussie ! ID créateur : {creatorId}</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <Footer />
    </div>
  );
}
