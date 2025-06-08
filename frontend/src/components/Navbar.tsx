import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  'Créateurs de contenu',
  'Musiciens',
  'Mangas',
  'Jeux vidéo',
  'Art visuel',
  'Crypto',
  'NFT',
  'Séries',
  'Films',
  'Marques',
  'Autres',
];

const Navbar: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-400 whitespace-nowrap">
          MintyShirt
        </h1>
        <nav className="space-x-4 hidden md:flex items-center">
          <Link to="/" className="hover:text-blue-400">
            Accueil
          </Link>
          <Link to="/shop" className="hover:text-blue-400">
            Accessoires
          </Link>
          <Link to="/creators" className="hover:text-blue-400">
            Créateurs
          </Link>
          <div className="relative" onMouseLeave={() => setOpen(false)}>
            <button
              onMouseEnter={() => setOpen(true)}
              className="hover:text-blue-400 flex items-center"
            >
              Catégories
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {open && (
              <div className="absolute left-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg z-10">
                {categories.map((c) => (
                  <Link
                    key={c}
                    to={`/category/${encodeURIComponent(c)}`}
                    className="block px-4 py-2 text-sm hover:bg-gray-700 whitespace-nowrap"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/clubs" className="hover:text-blue-400 whitespace-nowrap">
            <span role="img" aria-label="Clubs">🏆</span> Clubs sportifs
          </Link>
          <Link to="/royalty-token" className="hover:text-blue-400 whitespace-nowrap">
            Royalty Token
          </Link>
          <Link to="/tokenswap" className="hover:text-blue-400 whitespace-nowrap">
            TokenSwap
          </Link>
          <Link to="/stats" className="hover:text-blue-400 whitespace-nowrap">
            Stats
          </Link>
          <Link to="/faq" className="hover:text-blue-400 whitespace-nowrap">
            FAQ
          </Link>
          <Link to="/contact" className="hover:text-blue-400 whitespace-nowrap">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
