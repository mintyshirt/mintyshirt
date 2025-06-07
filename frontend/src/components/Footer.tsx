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
          <Link to="/legal" className="hover:text-blue-400">Mentions légales</Link>
          <Link to="/contact" className="hover:text-blue-400">Contact</Link>
        </nav>
      </div>
      <div className="text-center text-gray-500 mt-6">
        © {new Date().getFullYear()} MintyShirt
      </div>
    </footer>
  );
};

export default Footer;
