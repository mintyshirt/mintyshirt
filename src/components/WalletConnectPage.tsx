import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import WalletConnectButton from './WalletConnectButton';
import { useLanguage } from '../contexts/LanguageContext';

const texts = {
  en: {
    title: 'Wallet connection',
    connected: 'Connected:',
  },
  fr: {
    title: 'Connexion au wallet',
    connected: 'Connecté :',
  },
} as const;

export default function WalletConnectPage() {
  const { address } = useWeb3();
  const { language } = useLanguage();
  const t = texts[language];
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
