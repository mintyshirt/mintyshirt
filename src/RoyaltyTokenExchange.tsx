import { useState } from 'react';
import { ethers } from 'ethers';
import royaltyTokenAbi from './lib/abis/royaltyToken.json';

const CONTRACT_ADDRESS = (window as any).env?.VITE_ROYALTY_TOKEN || import.meta.env.VITE_ROYALTY_TOKEN;

export default function RoyaltyTokenExchange() {
  const [amount, setAmount] = useState('0');

  async function getSigner() {
    if (!(window as any).ethereum) return null;
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    await provider.send('eth_requestAccounts', []);
    return provider.getSigner();
  }

  async function buy() {
    const signer = await getSigner();
    if (!signer) return;
    const contract = new ethers.Contract(CONTRACT_ADDRESS, royaltyTokenAbi, signer);
    const decimals = await contract.decimals();
    const value = ethers.utils.parseUnits(amount, decimals);
    const price: ethers.BigNumber = await contract.getTokenPrice();
    const cost = value.mul(price).div(ethers.constants.WeiPerEther);
    await contract.buyTokens(value, { value: cost });
  }

  async function sell() {
    const signer = await getSigner();
    if (!signer) return;
    const contract = new ethers.Contract(CONTRACT_ADDRESS, royaltyTokenAbi, signer);
    const decimals = await contract.decimals();
    const value = ethers.utils.parseUnits(amount, decimals);
    await contract.sellTokens(value);
  }

  return (
    <div className="space-y-2">
      <input
        type="text"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-2"
      />
      <div className="space-x-2">
        <button onClick={buy} className="bg-blue-500 text-white px-4 py-2">Buy</button>
        <button onClick={sell} className="bg-green-500 text-white px-4 py-2">Sell</button>
      </div>
    </div>
  );
}
