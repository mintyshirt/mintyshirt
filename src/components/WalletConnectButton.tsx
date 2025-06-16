import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';

export default function WalletConnectButton() {
  const { address, connect } = useWeb3();

  const label = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet';

  return (
    <button
      onClick={connect}
      className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-3 py-1 rounded whitespace-nowrap"
    >
      {label}
    </button>
  );
}
