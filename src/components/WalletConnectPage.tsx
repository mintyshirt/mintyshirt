import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import WalletConnectButton from './WalletConnectButton';
import { useTranslations } from '../contexts/LanguageContext';


export default function WalletConnectPage() {
  const { address } = useWeb3();
  const t = useTranslations().walletConnect;
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2 text-white">{t.title}</h1>
      <WalletConnectButton />
      {address && (
        <p className="text-white mt-2">{t.connected} {address}</p>
      )}
    </div>
  );
}
