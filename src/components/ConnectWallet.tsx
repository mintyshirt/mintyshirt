import { useState } from 'react';
import { ethers } from 'ethers';

export default function ConnectWallet() {
  const [address, setAddress] = useState<string>('');

  async function connect() {
    if (!(window as any).ethereum) return;
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    setAddress(addr);
  }

  return (
    <button onClick={connect} className="bg-purple-500 text-white px-3 py-1 rounded">
      {address ? `${address.slice(0,6)}...${address.slice(-4)}` : 'Connect Wallet'}
    </button>
  );
}
