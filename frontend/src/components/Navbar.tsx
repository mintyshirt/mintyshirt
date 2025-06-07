import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-400">MintyShirt</h1>
        <nav className="space-x-4 hidden md:flex">
          <Link to="/" className="hover:text-blue-400">Accueil</Link>
          <Link to="/shop" className="hover:text-blue-400">Shop</Link>
          <Link to="/designhub" className="hover:text-blue-400">DesignHub</Link>
          <Link to="/tokenswap" className="hover:text-blue-400">TokenSwap</Link>
          <Link to="/stats" className="hover:text-blue-400">Stats</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
