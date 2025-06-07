import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { MintyShirtRegistryABI } from './MintyShirtRegistryABI';
import { LicenseManagerABI } from './LicenseManagerABI';
import { RevenueDistributorABI } from './RevenueDistributorABI';
import { TokenVerifierABI } from './TokenVerifierABI';

// Adresses des contrats déployés sur le testnet Aeneid
const CONTRACT_ADDRESSES = {
  MintyShirtRegistry: '0xc010C027c557dB20F5A0cE653Cca257A3De24843',
  LicenseManager: '0x7a67Cd67A8283BCBbEB53136Cf83a7a6729d9269',
  RevenueDistributor: '0x342a8FA38C1e8118cD7cDDB3af3e9C156958afd2',
  TokenVerifier: '0xd712770C608Ea7E82C719f85673D4Eb3932C2525',
};

interface Web3ContextType {
  account: string | null;
  isConnected: boolean;
  isCorrectNetwork: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  switchToAeneidNetwork: () => Promise<void>;
  contracts: {
    mintyShirtRegistry: ethers.Contract | null;
    licenseManager: ethers.Contract | null;
    revenueDistributor: ethers.Contract | null;
    tokenVerifier: ethers.Contract | null;
  };
  provider: ethers.providers.Web3Provider | null;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

// Configuration du réseau Aeneid
const AENEID_NETWORK = {
  chainId: '0x523', // 1315 en hexadécimal
  chainName: 'Story Aeneid Testnet',
  nativeCurrency: {
    name: 'IP',
    symbol: 'IP',
    decimals: 18,
  },
  rpcUrls: ['https://aeneid.storyrpc.io'],
  blockExplorerUrls: ['https://aeneid.storyscan.io'],
};

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);
  const [contracts, setContracts] = useState<{
    mintyShirtRegistry: ethers.Contract | null;
    licenseManager: ethers.Contract | null;
    revenueDistributor: ethers.Contract | null;
    tokenVerifier: ethers.Contract | null;
  }>({
    mintyShirtRegistry: null,
    licenseManager: null,
    revenueDistributor: null,
    tokenVerifier: null,
  });

  // Vérifier si MetaMask est installé
  const checkIfWalletIsInstalled = () => {
    return typeof window !== 'undefined' && typeof window.ethereum !== 'undefined';
  };

  // Vérifier si l'utilisateur est sur le bon réseau
  const checkNetwork = async () => {
    if (!provider) return false;
    
    try {
      const network = await provider.getNetwork();
      const isAeneid = network.chainId === 1315; // ID du réseau Aeneid
      setIsCorrectNetwork(isAeneid);
      return isAeneid;
    } catch (error) {
      console.error('Erreur lors de la vérification du réseau:', error);
      setIsCorrectNetwork(false);
      return false;
    }
  };

  // Initialiser les contrats
  const initContracts = (provider: ethers.providers.Web3Provider) => {
    const signer = provider.getSigner();
    
    const mintyShirtRegistry = new ethers.Contract(
      CONTRACT_ADDRESSES.MintyShirtRegistry,
      MintyShirtRegistryABI,
      signer
    );
    
    const licenseManager = new ethers.Contract(
      CONTRACT_ADDRESSES.LicenseManager,
      LicenseManagerABI,
      signer
    );
    
    const revenueDistributor = new ethers.Contract(
      CONTRACT_ADDRESSES.RevenueDistributor,
      RevenueDistributorABI,
      signer
    );
    
    const tokenVerifier = new ethers.Contract(
      CONTRACT_ADDRESSES.TokenVerifier,
      TokenVerifierABI,
      signer
    );
    
    setContracts({
      mintyShirtRegistry,
      licenseManager,
      revenueDistributor,
      tokenVerifier,
    });
  };

  // Connecter le wallet
  const connectWallet = async () => {
    if (!checkIfWalletIsInstalled()) {
      alert('Veuillez installer MetaMask pour utiliser cette application');
      return;
    }
    
    try {
      // Vérifier que window.ethereum existe
      if (!window.ethereum) {
        throw new Error('MetaMask n\'est pas disponible');
      }
      
      // Demander l'accès au compte
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Créer le provider
      const web3Provider = new ethers.providers.Web3Provider(window.ethereum as any);
      setProvider(web3Provider);
      
      // Vérifier le réseau
      const networkOk = await checkNetwork();
      
      if (networkOk) {
        // Initialiser les contrats
        initContracts(web3Provider);
        
        // Mettre à jour l'état
        setAccount(accounts[0]);
        setIsConnected(true);
      } else {
        alert('Veuillez vous connecter au réseau Story Aeneid Testnet');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion du wallet:', error);
    }
  };

  // Déconnecter le wallet
  const disconnectWallet = () => {
    setAccount(null);
    setIsConnected(false);
    setContracts({
      mintyShirtRegistry: null,
      licenseManager: null,
      revenueDistributor: null,
      tokenVerifier: null,
    });
  };

  // Changer de réseau pour Aeneid
  const switchToAeneidNetwork = async () => {
    if (!checkIfWalletIsInstalled() || !window.ethereum) return;
    
    try {
      // Essayer de changer de réseau
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: AENEID_NETWORK.chainId }],
      });
    } catch (switchError: any) {
      // Si le réseau n'existe pas, l'ajouter
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [AENEID_NETWORK],
          });
        } catch (addError) {
          console.error('Erreur lors de l\'ajout du réseau:', addError);
        }
      } else {
        console.error('Erreur lors du changement de réseau:', switchError);
      }
    }
    
    // Vérifier à nouveau le réseau
    if (provider) {
      await checkNetwork();
    }
  };

  // Écouter les changements de compte
  useEffect(() => {
    if (checkIfWalletIsInstalled() && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        } else {
          disconnectWallet();
        }
      });
      
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
    
    return () => {
      if (checkIfWalletIsInstalled() && window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, []);

  // Vérifier la connexion au chargement
  useEffect(() => {
    const checkConnection = async () => {
      if (checkIfWalletIsInstalled() && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          
          if (accounts.length > 0) {
            const web3Provider = new ethers.providers.Web3Provider(window.ethereum as any);
            setProvider(web3Provider);
            
            const networkOk = await checkNetwork();
            
            if (networkOk) {
              initContracts(web3Provider);
              setAccount(accounts[0]);
              setIsConnected(true);
            }
          }
        } catch (error) {
          console.error('Erreur lors de la vérification de la connexion:', error);
        }
      }
    };
    
    checkConnection();
  }, []);

  return (
    <Web3Context.Provider
      value={{
        account,
        isConnected,
        isCorrectNetwork,
        connectWallet,
        disconnectWallet,
        switchToAeneidNetwork,
        contracts,
        provider,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3 doit être utilisé à l\'intérieur d\'un Web3Provider');
  }
  return context;
};
