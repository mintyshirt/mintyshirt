import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';

interface WalletConnectButtonProps {
  className?: string;
}

const WalletConnectButton: React.FC<WalletConnectButtonProps> = ({ className }) => {
  const { account, isConnected, connectWallet, disconnectWallet, isCorrectNetwork, switchToAeneidNetwork } = useWeb3();

  const handleConnect = async () => {
    if (!isConnected) {
      await connectWallet();
    } else {
      disconnectWallet();
    }
  };

  const handleSwitchNetwork = async () => {
    await switchToAeneidNetwork();
  };

  return (
    <div className={className}>
      {isConnected ? (
        <div className="flex flex-col items-end">
          <div className="flex items-center mb-2">
            <span className="text-gray-400 mr-2">
              {account?.substring(0, 6)}...{account?.substring(account.length - 4)}
            </span>
            <div className={`w-3 h-3 rounded-full ${isCorrectNetwork ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
          
          <div className="flex gap-2">
            {!isCorrectNetwork && (
              <button 
                onClick={handleSwitchNetwork}
                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded-lg text-sm"
              >
                Changer de réseau
              </button>
            )}
            <button 
              onClick={handleConnect}
              className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded-lg text-sm"
            >
              Déconnecter
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={handleConnect}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Connecter Wallet
        </button>
      )}
    </div>
  );
};

export default WalletConnectButton;
