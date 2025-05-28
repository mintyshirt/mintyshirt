import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import WalletConnectButton from './WalletConnectButton';
import CreatorRegistration from './CreatorRegistration';
import DesignUpload from './DesignUpload';
import DesignCard from './DesignCard';

const TestPage: React.FC = () => {
  const { isConnected, isCorrectNetwork, account, contracts } = useWeb3();
  const [creatorId, setCreatorId] = useState<number | null>(null);
  const [ipIds, setIpIds] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<'connect' | 'register' | 'upload' | 'explore'>('connect');
  const [testStatus, setTestStatus] = useState<{[key: string]: 'pending' | 'success' | 'error'}>({
    connection: 'pending',
    network: 'pending',
    registration: 'pending',
    upload: 'pending',
    exploration: 'pending'
  });

  // Vérifier si l'utilisateur est déjà un créateur
  useEffect(() => {
    const checkCreatorStatus = async () => {
      if (isConnected && isCorrectNetwork && contracts.mintyShirtRegistry && account) {
        try {
          const id = await contracts.mintyShirtRegistry.getCreatorIdByAddress(account);
          if (id && id.toNumber() > 0) {
            setCreatorId(id.toNumber());
            setTestStatus(prev => ({...prev, registration: 'success'}));
          }
        } catch (err) {
          console.log('Utilisateur non enregistré comme créateur');
        }
      }
    };

    checkCreatorStatus();
  }, [isConnected, isCorrectNetwork, contracts.mintyShirtRegistry, account]);

  // Mettre à jour le statut des tests de connexion et réseau
  useEffect(() => {
    if (isConnected) {
      setTestStatus(prev => ({...prev, connection: 'success'}));
      
      if (isCorrectNetwork) {
        setTestStatus(prev => ({...prev, network: 'success'}));
      } else {
        setTestStatus(prev => ({...prev, network: 'error'}));
      }
    } else {
      setTestStatus(prev => ({...prev, connection: 'pending', network: 'pending'}));
    }
  }, [isConnected, isCorrectNetwork]);

  // Fonction pour récupérer les designs existants
  const fetchDesigns = async () => {
    if (!contracts.mintyShirtRegistry || !isConnected || !isCorrectNetwork) return;
    
    try {
      const nextIPId = await contracts.mintyShirtRegistry.nextIPId();
      const ids = [];
      
      // Récupérer les 10 derniers designs (ou moins s'il y en a moins)
      const startId = Math.max(1, nextIPId.toNumber() - 10);
      for (let i = startId; i < nextIPId.toNumber(); i++) {
        ids.push(i);
      }
      
      setIpIds(ids);
      if (ids.length > 0) {
        setTestStatus(prev => ({...prev, exploration: 'success'}));
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des designs:', err);
      setTestStatus(prev => ({...prev, exploration: 'error'}));
    }
  };

  // Récupérer les designs au chargement et quand le statut de connexion change
  useEffect(() => {
    if (isConnected && isCorrectNetwork) {
      fetchDesigns();
    }
  }, [isConnected, isCorrectNetwork, contracts.mintyShirtRegistry]);

  const handleCreatorRegistration = (id: number) => {
    setCreatorId(id);
    setTestStatus(prev => ({...prev, registration: 'success'}));
    setActiveTab('upload');
  };

  const handleDesignUpload = () => {
    setTestStatus(prev => ({...prev, upload: 'success'}));
    fetchDesigns();
    setActiveTab('explore');
  };

  const renderStatusBadge = (status: 'pending' | 'success' | 'error') => {
    switch (status) {
      case 'success':
        return <span className="bg-green-900/30 text-green-300 text-xs px-2 py-1 rounded">Succès</span>;
      case 'error':
        return <span className="bg-red-900/30 text-red-300 text-xs px-2 py-1 rounded">Erreur</span>;
      default:
        return <span className="bg-yellow-900/30 text-yellow-300 text-xs px-2 py-1 rounded">En attente</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header avec navigation de test */}
      <header className="border-b border-gray-800 py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-400">MintyShirt Test</h1>
          </div>
          <WalletConnectButton />
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto py-8 px-4">
        <h2 className="text-3xl font-bold mb-8">Test des fonctionnalités MintyShirt</h2>
        
        {/* Tableau de bord des tests */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-8">
          <h3 className="text-xl font-semibold mb-4">Statut des tests</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="flex flex-col items-center p-3 bg-gray-700/50 rounded-lg">
              <span className="mb-2">1. Connexion Wallet</span>
              {renderStatusBadge(testStatus.connection)}
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-700/50 rounded-lg">
              <span className="mb-2">2. Réseau Aeneid</span>
              {renderStatusBadge(testStatus.network)}
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-700/50 rounded-lg">
              <span className="mb-2">3. Enregistrement</span>
              {renderStatusBadge(testStatus.registration)}
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-700/50 rounded-lg">
              <span className="mb-2">4. Téléversement</span>
              {renderStatusBadge(testStatus.upload)}
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-700/50 rounded-lg">
              <span className="mb-2">5. Exploration</span>
              {renderStatusBadge(testStatus.exploration)}
            </div>
          </div>
        </div>
        
        {/* Navigation par onglets */}
        <div className="flex border-b border-gray-700 mb-6">
          <button 
            className={`py-2 px-4 ${activeTab === 'connect' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('connect')}
          >
            1. Connexion
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'register' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('register')}
          >
            2. Enregistrement
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'upload' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('upload')}
          >
            3. Téléversement
          </button>
          <button 
            className={`py-2 px-4 ${activeTab === 'explore' ? 'border-b-2 border-blue-500 text-blue-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('explore')}
          >
            4. Exploration
          </button>
        </div>
        
        {/* Contenu des onglets */}
        <div className="mb-8">
          {activeTab === 'connect' && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Étape 1: Connexion du Wallet</h3>
              <p className="mb-4 text-gray-300">
                Pour commencer à utiliser MintyShirt, vous devez connecter votre wallet Ethereum et vous assurer 
                d'être sur le réseau Story Aeneid Testnet.
              </p>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h4 className="text-xl font-semibold mb-4">Instructions</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Cliquez sur le bouton "Connecter Wallet" en haut à droite</li>
                  <li>Autorisez la connexion dans votre extension de wallet (MetaMask, etc.)</li>
                  <li>Si vous n'êtes pas sur le réseau Story Aeneid Testnet, cliquez sur "Changer de réseau"</li>
                </ol>
                
                <div className="mt-6">
                  <h4 className="font-semibold mb-2">Statut actuel:</h4>
                  <p className="text-gray-300">
                    {isConnected 
                      ? `Connecté avec l'adresse ${account?.substring(0, 6)}...${account?.substring(account!.length - 4)}` 
                      : 'Non connecté'}
                  </p>
                  <p className="text-gray-300">
                    {isConnected 
                      ? (isCorrectNetwork 
                          ? 'Sur le réseau Story Aeneid Testnet' 
                          : 'Sur un réseau incorrect, veuillez changer pour Story Aeneid Testnet')
                      : 'Réseau non détecté'}
                  </p>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <WalletConnectButton className="mx-auto" />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'register' && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Étape 2: Enregistrement Créateur</h3>
              <p className="mb-4 text-gray-300">
                Pour téléverser des designs, vous devez d'abord vous enregistrer comme créateur sur la plateforme.
              </p>
              
              {creatorId ? (
                <div className="bg-green-900/30 border border-green-500 text-green-200 p-4 rounded-lg mb-6">
                  <p className="font-semibold">Vous êtes déjà enregistré comme créateur!</p>
                  <p>ID Créateur: {creatorId}</p>
                  <button 
                    onClick={() => setActiveTab('upload')}
                    className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                  >
                    Passer à l'étape suivante
                  </button>
                </div>
              ) : (
                <CreatorRegistration onSuccess={handleCreatorRegistration} />
              )}
            </div>
          )}
          
          {activeTab === 'upload' && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Étape 3: Téléversement de Design</h3>
              <p className="mb-4 text-gray-300">
                Maintenant que vous êtes enregistré comme créateur, vous pouvez téléverser vos designs sur la blockchain.
              </p>
              
              <DesignUpload creatorId={creatorId || undefined} onSuccess={handleDesignUpload} />
            </div>
          )}
          
          {activeTab === 'explore' && (
            <div>
              <h3 className="text-2xl font-semibold mb-4">Étape 4: Exploration des Designs</h3>
              <p className="mb-4 text-gray-300">
                Explorez les designs enregistrés sur la blockchain et interagissez avec eux.
              </p>
              
              {ipIds.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {ipIds.map(id => (
                    <DesignCard key={id} ipId={id} />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
                  <p className="text-gray-400">Aucun design trouvé. Téléversez votre premier design!</p>
                  <button 
                    onClick={() => setActiveTab('upload')}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  >
                    Téléverser un design
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Résumé des tests */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold mb-4">Résumé des tests</h3>
          <p className="text-gray-300 mb-4">
            Cette page vous permet de tester les fonctionnalités principales de MintyShirt :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            <li>Connexion de wallet et changement de réseau</li>
            <li>Enregistrement en tant que créateur</li>
            <li>Téléversement de designs avec paramètres de licence</li>
            <li>Exploration des designs existants</li>
          </ul>
          <p className="mt-4 text-gray-300">
            Suivez les étapes dans l'ordre pour valider le bon fonctionnement de l'application.
          </p>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 py-6 px-6 border-t border-gray-700 mt-8">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">MintyShirt - Plateforme de design décentralisée</p>
          <p className="text-gray-500 text-sm mt-2">Testnet Story Aeneid - {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
};

export default TestPage;
