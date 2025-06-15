import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { categories } from '../lib/categories';
import WalletConnectButton from './WalletConnectButton';

export default function Navbar() {

  const [categoriesOpen, setCategoriesOpen] = React.useState(false);
  const closeTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const { user, logout, setRole } = useAuth();

  const handleEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setCategoriesOpen(true);
  };

  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setCategoriesOpen(false);
    }, 200);
  };

  return (
    <nav className="sticky top-0 bg-[#2C1D59] text-white shadow z-10">
      <div className="max-w-7xl mx-auto p-4 space-y-2">
        <div className="flex items-center justify-end space-x-4">
          <input
            type="text"
            placeholder="Rechercher…"
            className="border rounded px-2 py-1 text-black"
          />
          <button className="relative">
            <span className="text-xl">🛒</span>
            <span className="absolute -top-1 -right-2 bg-purple-600 text-white text-xs rounded-full px-1">0</span>
          </button>
          <WalletConnectButton />
          {user ? (
            <>
              <button
                onClick={() => setRole(user.role === 'creator' ? 'fan' : 'creator')}
                className="bg-purple-500 hover:bg-purple-600 transition-colors text-white px-3 py-1 rounded whitespace-nowrap"
              >
                {user.role === 'creator' ? 'Passer fan' : 'Mode créateur'}
              </button>
              <button
                onClick={logout}
                className="bg-purple-500 hover:bg-purple-600 transition-colors text-white px-3 py-1 rounded whitespace-nowrap"
              >
                Déconnexion
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-purple-500 hover:bg-purple-600 transition-colors text-white px-3 py-1 rounded whitespace-nowrap"
            >
              Connexion
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-6 pt-2">
          <Link
            to="/"
            className="font-bold text-4xl whitespace-nowrap -ml-2 mr-8 logo-font"
          >
            MintyShirt
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-purple-300 whitespace-nowrap">Accueil</Link>
            <Link to="/shop" className="hover:text-purple-300 whitespace-nowrap">Boutique</Link>
            <Link to="/creators" className="hover:text-purple-300 whitespace-nowrap">Créateurs</Link>
            <div
              className="relative"
              onMouseEnter={handleEnter}
              onMouseLeave={handleLeave}
            >
              <button className="hover:text-purple-300 whitespace-nowrap">Catégories</button>
              <div
                className={`absolute left-0 mt-2 ${categoriesOpen ? 'block' : 'hidden'} bg-white text-gray-900 shadow rounded p-2 space-y-1`}
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/categories/${cat.slug}`}
                    className="block px-2 py-1 hover:bg-purple-100 whitespace-nowrap"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/royalty-tokens" className="hover:text-purple-300 whitespace-nowrap">Royalty Tokens</Link>
            <Link to="/tokenswap" className="hover:text-purple-300 whitespace-nowrap">TokenSwap</Link>
            <Link to="/design-hub" className="hover:text-purple-300 whitespace-nowrap">DesignHub</Link>
            <Link to="/stats" className="hover:text-purple-300 whitespace-nowrap">Stats</Link>
            <Link to="/become-creator" className="hover:text-purple-300 whitespace-nowrap">Devenir Créateur</Link>
            <Link to="/upload-design" className="hover:text-purple-300 whitespace-nowrap">Téléverser un Design</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

