import React from 'react';

export default function Navbar() {
  const categories = [
    'Créateurs de contenu',
    'Musiciens',
    'Mangas',
    'BD & Animés',
    'Jeux vidéo',
    'Séries',
    'Films',
    'Art visuel',
    'Clubs sportifs',
    'Crypto',
    'Collections de NFTs',
    'Marques & Entreprises',
  ];

  const [categoriesOpen, setCategoriesOpen] = React.useState(false);
  const closeTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);

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
          <a
            href="/login"
            className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-3 py-1 rounded whitespace-nowrap"
          >
            Connecter le portefeuille
          </a>
          <a
            href="/login"
            className="bg-purple-500 hover:bg-purple-600 transition-colors text-white px-3 py-1 rounded whitespace-nowrap"
          >
            Connexion
          </a>
        </div>
        <div className="flex items-center space-x-6 pt-2">
          <a
            href="/"
            className="font-bold text-2xl whitespace-nowrap mr-8"
          >
            MintyShirt
          </a>
          <div className="hidden md:flex space-x-6 items-center">
            <a href="/" className="hover:text-purple-300 whitespace-nowrap">Accueil</a>
            <a href="/shop" className="hover:text-purple-300 whitespace-nowrap">Boutique</a>
            <a href="#" className="hover:text-purple-300 whitespace-nowrap">Créateurs</a>
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
                  <a key={cat} href="#" className="block px-2 py-1 hover:bg-purple-100 whitespace-nowrap">
                    {cat}
                  </a>
                ))}
              </div>
            </div>
            <a href="#" className="hover:text-purple-300 whitespace-nowrap">Royalty Tokens</a>
            <a href="#" className="hover:text-purple-300 whitespace-nowrap">TokenSwap</a>
            <a href="#" className="hover:text-purple-300 whitespace-nowrap">DesignHub</a>
            <a href="#" className="hover:text-purple-300 whitespace-nowrap">Stats</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

