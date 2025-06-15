import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useWeb3 } from '../contexts/Web3Context';
import { getCreatorId, registerIPAsset } from '../services/registry';

export default function UploadDesignPage() {
  const { provider, connect, address } = useWeb3();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  const [contentType, setContentType] = useState('image/png');
  const [allowAI, setAllowAI] = useState(false);
  const [ipId, setIpId] = useState<number | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!provider) {
      await connect();
      if (!provider) return;
    }
    setLoading(true);
    setError('');
    try {
      const creatorId = await getCreatorId(provider!);
      const id = await registerIPAsset(
        provider!,
        creatorId,
        name,
        description,
        ipfsHash,
        contentType,
        allowAI
      );
      setIpId(id);
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
        <h1 className="text-2xl font-bold">Téléverser un Design</h1>
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
              placeholder="Nom du design"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              className="w-full border p-2 text-black"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <input
              className="w-full border p-2 text-black"
              placeholder="Hash IPFS ou URL"
              value={ipfsHash}
              onChange={(e) => setIpfsHash(e.target.value)}
            />
            <input
              className="w-full border p-2 text-black"
              placeholder="Type de contenu"
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={allowAI}
                onChange={(e) => setAllowAI(e.target.checked)}
              />
              <span>Autoriser l'entraînement IA</span>
            </label>
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Enregistrement...' : 'Enregistrer le design'}
            </button>
          </form>
        )}
        {ipId !== null && (
          <p className="text-green-500">Design enregistré avec l'ID : {ipId}</p>
        )}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <Footer />
    </div>
  );
}
