import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';

interface CreatorRegistrationProps {
  onSuccess?: (creatorId: number) => void;
}

const CreatorRegistration: React.FC<CreatorRegistrationProps> = ({ onSuccess }) => {
  const { contracts, isConnected, isCorrectNetwork } = useWeb3();
  const [name, setName] = useState('');
  const [profileURI, setProfileURI] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

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
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Appel au smart contract pour enregistrer un nouveau créateur
      const tx = await contracts.mintyShirtRegistry.registerNewCreator(name, profileURI);
      
      // Attendre la confirmation de la transaction
      const receipt = await tx.wait();
      
      // Récupérer l'événement CreatorRegistered
      const event = receipt.events?.find((e: any) => e.event === 'CreatorRegistered');
      const creatorId = event?.args?.creatorId.toNumber();
      
      setSuccess(`Félicitations ! Vous êtes maintenant enregistré comme créateur avec l'ID: ${creatorId}`);
      
      if (onSuccess && creatorId) {
        onSuccess(creatorId);
      }
    } catch (err: any) {
      console.error('Erreur lors de l\'enregistrement du créateur:', err);
      setError(err.message || 'Une erreur est survenue lors de l\'enregistrement');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Devenir Créateur</h2>
      
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
          <label htmlFor="name" className="block text-gray-300 mb-2">Nom du créateur</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            placeholder="Votre nom d'artiste ou de marque"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="profileURI" className="block text-gray-300 mb-2">URL de votre profil (IPFS ou HTTP)</label>
          <input
            type="text"
            id="profileURI"
            value={profileURI}
            onChange={(e) => setProfileURI(e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white"
            placeholder="ipfs://... ou https://..."
            required
          />
          <p className="text-gray-400 text-sm mt-1">
            Cette URL doit pointer vers un fichier JSON contenant vos informations de profil
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isLoading || !isConnected || !isCorrectNetwork}
          className={`w-full py-3 rounded-lg font-medium ${
            isLoading || !isConnected || !isCorrectNetwork
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? 'Enregistrement en cours...' : 'S\'enregistrer comme créateur'}
        </button>
        
        {!isConnected && (
          <p className="text-yellow-400 text-sm mt-2">
            Vous devez connecter votre wallet pour vous enregistrer
          </p>
        )}
        
        {isConnected && !isCorrectNetwork && (
          <p className="text-yellow-400 text-sm mt-2">
            Vous devez être connecté au réseau Story Aeneid Testnet
          </p>
        )}
      </form>
    </div>
  );
};

export default CreatorRegistration;
