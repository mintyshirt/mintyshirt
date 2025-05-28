import React from 'react';
import { Link } from 'react-router-dom';

const NavbarCategories: React.FC = () => {
  return (
    <div className="bg-gray-700 py-2">
      <div className="container mx-auto px-4">
        <div className="flex space-x-6 overflow-x-auto pb-1 scrollbar-hide">
          <Link to="/category/all" className="text-gray-300 hover:text-white whitespace-nowrap">
            Tous les designs
          </Link>
          <Link to="/category/abstract" className="text-gray-300 hover:text-white whitespace-nowrap">
            Abstraits
          </Link>
          <Link to="/category/nature" className="text-gray-300 hover:text-white whitespace-nowrap">
            Nature
          </Link>
          <Link to="/category/geometric" className="text-gray-300 hover:text-white whitespace-nowrap">
            Géométriques
          </Link>
          <Link to="/category/typography" className="text-gray-300 hover:text-white whitespace-nowrap">
            Typographie
          </Link>
          <Link to="/category/minimalist" className="text-gray-300 hover:text-white whitespace-nowrap">
            Minimalistes
          </Link>
          <Link to="/category/pop-art" className="text-gray-300 hover:text-white whitespace-nowrap">
            Pop Art
          </Link>
          <Link to="/category/vintage" className="text-gray-300 hover:text-white whitespace-nowrap">
            Vintage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavbarCategories;
