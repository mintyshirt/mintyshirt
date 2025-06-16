import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useWeb3 } from '../contexts/Web3Context';
import { registerCreator } from '../services/registry';
import { useTranslations } from '../contexts/LanguageContext';

export default function BecomeCreatorPage() {
  const { address, provider, connect } = useWeb3();
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [creatorId, setCreatorId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const t = useTranslations();

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
        <h1 className="text-2xl font-bold">{t.becomeCreator.title}</h1>
        {!address && (
          <button
            onClick={connect}
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded"
          >
            {t.becomeCreator.connectWallet}
          </button>
        )}
        {address && (
          <form onSubmit={submit} className="space-y-2">
            <input
              className="w-full border p-2 text-black"
              placeholder={t.becomeCreator.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-full border p-2 text-black"
              placeholder={t.becomeCreator.urlPlaceholder}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? t.becomeCreator.registering : t.becomeCreator.register}
            </button>
          </form>
        )}
        {creatorId && (
          <p className="text-green-500">{t.becomeCreator.success} {creatorId}</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <Footer />
    </div>
  );
}
