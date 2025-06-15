import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import WalletConnectButton from './WalletConnectButton';

export default function WalletConnectPage() {
  const { address } = useWeb3();
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2 text-white">Connexion au wallet</h1>
      <WalletConnectButton />
      {address && (
        <p className="text-white mt-2">Connecté : {address}</p>
      )}
    </div>
  );
}
