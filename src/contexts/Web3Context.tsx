import React, { createContext, useContext, useState, useCallback } from 'react';
import { ethers } from 'ethers';

interface Web3ContextType {
  address: string | null;
  provider: ethers.providers.Web3Provider | null;
  connect: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType>({
  address: null,
  provider: null,
  connect: async () => {},
});

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null);

  const connect = useCallback(async () => {
    const { ethereum } = window as any;
    if (!ethereum) {
      alert('Wallet non détecté. Veuillez installer MetaMask.');
      return;
    }
    const web3Provider = new ethers.providers.Web3Provider(ethereum);
    await web3Provider.send('eth_requestAccounts', []);
    const signer = web3Provider.getSigner();
    const addr = await signer.getAddress();

    const targetChainId = parseInt(import.meta.env.VITE_CHAIN_ID || '0');
    const network = await web3Provider.getNetwork();
    if (targetChainId && network.chainId !== targetChainId) {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x' + targetChainId.toString(16) }],
        });
      } catch (err) {
        console.warn('Impossible de changer de réseau', err);
      }
    }

    setProvider(web3Provider);
    setAddress(addr);
  }, []);

  return (
    <Web3Context.Provider value={{ address, provider, connect }}>
      {children}
    </Web3Context.Provider>
  );
};

export function useWeb3() {
  return useContext(Web3Context);
}
