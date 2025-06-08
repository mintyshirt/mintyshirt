import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 py-10 px-6 border-t border-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-6 md:mb-0">
          <span className="text-2xl font-bold text-blue-400">MintyShirt</span>
          <span className="text-gray-500">x</span>
          <img src="/story-protocol-logo.svg" alt="Story Protocol" className="h-6" />
        </div>
        <nav className="flex space-x-6 text-gray-400">
          <Link to="/about" className="hover:text-blue-400">À propos</Link>
          <Link to="/designhub" className="hover:text-blue-400">DesignHub</Link>
          <Link to="/tokenswap" className="hover:text-blue-400">TokenSwap</Link>
          <Link to="/stats" className="hover:text-blue-400">Stats</Link>
          <Link to="/faq" className="hover:text-blue-400">FAQ</Link>
          <Link to="/contact" className="hover:text-blue-400">Contact</Link>
        </nav>
        <select className="bg-gray-700 border border-gray-600 text-white rounded p-1 mt-4 md:mt-0">
          <option value="fr">FR</option>
          <option value="en">EN</option>
        </select>
      </div>
      <div className="text-center text-gray-500 mt-6">
        MintyShirt est propulsé par Story Protocol
      </div>
    </footer>
  );
};

export default Footer;
