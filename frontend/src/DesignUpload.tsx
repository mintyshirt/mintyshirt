import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';

interface DesignUploadProps {
  creatorId?: number;
  onSuccess?: (ipId: number) => void;
}

const DesignUpload: React.FC<DesignUploadProps> = ({ creatorId, onSuccess }) => {
  const { contracts, isConnected, isCorrectNetwork, account } = useWeb3();
  const [name, setName] = useState('');
  const [contentURI, setContentURI] = useState('');
  const [allowAITraining, setAllowAITraining] = useState(false);
  const [allowCommercialUse, setAllowCommercialUse] = useState(false);
  const [allowRemixing, setAllowRemixing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userCreatorId, setUserCreatorId] = useState<number | null>(null);

  // Vérifier si l'utilisateur est déjà un créateur
  useEffect(() => {
    const checkCreatorStatus = async () => {
      if (isConnected && isCorrectNetwork && contracts.mintyShirtRegistry && account) {
        try {
          const id = await contracts.mintyShirtRegistry.getCreatorIdByAddress(account);
          if (id && id.toNumber() > 0) {
            setUserCreatorId(id.toNumber());
          }
        } catch (err) {
          console.log('Utilisateur non enregistré comme créateur');
        }
      }
    };

    checkCreatorStatus();
  }, [isConnected, isCorrectNetwork, contracts.mintyShirtRegistry, account]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      setError('Veuillez connecter votre wallet pour continuer');
      return;
    }
    
    if (!isCorrectNetwork) {
      setError('Veuillez vous connecter au réseau Story Aeneid Testnet');
      return;
    }
    
    if (!contracts.mintyShirtRegistry) {
      setError('Contrat non disponible');
      return;
    }

    if (!userCreatorId && !creatorId) {
      setError('Vous devez être enregistré comme créateur pour téléverser un design');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Appel au smart contract pour enregistrer un nouvel IP asset
      const tx = await contracts.mintyShirtRegistry.registerIPAsset(
        name,
        contentURI,
        allowAITraining,
        allowCommercialUse,
        allowRemixing
      );
      
      // Attendre la confirmation de la transaction
      const receipt = await tx.wait();
      
      // Récupérer l'événement IPAssetRegistered
      const event = receipt.events?.find((e: any) => e.event === 'IPAssetRegistered');
      const ipId = event?.args?.ipId.toNumber();
      
      setSuccess(`Design enregistré avec succès ! ID: ${ipId}`);
      
      if (onSuccess && ipId) {
        onSuccess(ipId);
      }
    } catch (err: any) {
      console.error('Erreur lors de l\'enregistrement du design:', err);
      setError(err.message || 'Une erreur est survenue lors de l\'enregistrement');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Téléverser un Design</h2>
        <p className="text-yellow-400">Veuillez connecter votre wallet pour téléverser un design</p>
      </div>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Téléverser un Design</h2>
        <p className="text-yellow-400">Veuillez vous connecter au réseau Story Aeneid Testnet</p>
      </div>
    );
  }

  if (!userCreatorId && !creatorId) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-2xl font-bold mb-4">Téléverser un Design</h2>
        <p className="text-yellow-400">Vous devez d'abord vous enregistrer comme créateur</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Téléverser un Nouveau Design</h2>
      
      {error && (
        <div className="bg-red-900/30 border border-red-500 text-red-200 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-900/30 border border-green-500 text-green-200 p-3 rounded-lg mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 mb-2">Nom du design</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            placeholder="Nom de votre création"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="contentURI" className="block text-gray-300 mb-2">URL du contenu (IPFS recommandé)</label>
          <input
            type="text"
            id="contentURI"
            value={contentURI}
            onChange={(e) => setContentURI(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            placeholder="ipfs://... ou https://..."
            required
          />
          <p className="text-gray-400 text-sm mt-1">
            Cette URL doit pointer vers votre design (image ou fichier JSON avec métadonnées)
          </p>
        </div>
        
        <div className="mb-6 space-y-3">
          <h3 className="text-lg font-semibold text-gray-300">Permissions</h3>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="allowAITraining"
              checked={allowAITraining}
              onChange={(e) => setAllowAITraining(e.target.checked)}
              className="mr-2 h-5 w-5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="allowAITraining" className="text-gray-300">
              Autoriser l'entraînement IA
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="allowCommercialUse"
              checked={allowCommercialUse}
              onChange={(e) => setAllowCommercialUse(e.target.checked)}
              className="mr-2 h-5 w-5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="allowCommercialUse" className="text-gray-300">
              Autoriser l'usage commercial
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="allowRemixing"
              checked={allowRemixing}
              onChange={(e) => setAllowRemixing(e.target.checked)}
              className="mr-2 h-5 w-5 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
            />
            <label htmlFor="allowRemixing" className="text-gray-300">
              Autoriser le remix
            </label>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3 rounded-lg font-medium ${
            isLoading ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Enregistrement en cours...' : 'Enregistrer le design'}
        </button>
      </form>
    </div>
  );
};

export default DesignUpload;
