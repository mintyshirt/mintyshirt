import React from 'react';

interface NavbarProps {
  onConnectWallet: () => void;
  isConnected: boolean;
  walletAddress?: string;
}

const Navbar: React.FC<NavbarProps> = ({ onConnectWallet, isConnected, walletAddress }) => {
  return (
    <header className="border-b border-gray-800 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-400">MintyShirt</h1>
          <nav className="ml-10 hidden md:flex">
            <a href="#" className="px-4 py-2 hover:text-blue-400">Explorer</a>
            <a href="#" className="px-4 py-2 hover:text-blue-400">DesignHub</a>
            <a href="#" className="px-4 py-2 hover:text-blue-400">Créateurs</a>
            <a href="#" className="px-4 py-2 hover:text-blue-400">TokenSwap</a>
          </nav>
        </div>
        <div>
          {isConnected ? (
            <div className="flex items-center">
              <span className="text-gray-400 mr-2">
                {walletAddress?.substring(0, 6)}...{walletAddress?.substring(walletAddress.length - 4)}
              </span>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          ) : (
            <button 
              onClick={onConnectWallet}
              className="btn-primary"
            >
              Connecter Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
