import React from 'react';

function Navbar() {
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

  return (
    <nav className="sticky top-0 bg-[#2C1D59] text-white shadow z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-6">
          <span className="font-bold text-xl whitespace-nowrap">MintyShirt</span>
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#" className="hover:text-purple-300 whitespace-nowrap">Accueil</a>
            <a href="#" className="hover:text-purple-300 whitespace-nowrap">Créateurs</a>
            <a href="#" className="hover:text-purple-300 whitespace-nowrap">Accessoires</a>
            <div className="relative group">
              <button className="hover:text-purple-300 whitespace-nowrap">Catégories</button>
              <div className="absolute left-0 mt-2 hidden group-hover:block bg-white text-gray-900 shadow rounded p-2 space-y-1">
                {categories.map((cat) => (
                  <a
                    key={cat}
                    href="#"
                    className="block px-2 py-1 hover:bg-purple-100 whitespace-nowrap"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>
            <a href="#" className="hover:text-purple-300 whitespace-nowrap">Royalty Tokens</a>
            <a href="#" className="hover:text-purple-300 whitespace-nowrap">TokenSwap</a>
            <a href="#" className="hover:text-purple-300 whitespace-nowrap">DesignHub</a>
            <a href="#" className="hover:text-purple-300 whitespace-nowrap">Stats</a>
            <a href="#" className="hover:text-purple-300 whitespace-nowrap">À propos</a>
            <a href="#" className="hover:text-purple-300 whitespace-nowrap">FAQ</a>
            <a href="#" className="hover:text-purple-300 whitespace-nowrap">Contact</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Rechercher…"
            className="border rounded px-2 py-1 text-black"
          />
          <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-3 py-1 rounded">
            Connect Wallet
          </button>
          <button className="bg-purple-500 hover:bg-purple-600 transition-colors text-white px-3 py-1 rounded whitespace-nowrap">
            S'inscrire
          </button>
          <button className="relative">
            <span className="text-xl">🛒</span>
            <span className="absolute -top-1 -right-2 bg-purple-600 text-white text-xs rounded-full px-1">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      className="text-center text-white py-24 bg-gradient-to-r from-purple-800 via-purple-600 to-fuchsia-600"
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Success is shared</h1>
      <div className="space-x-4">
        <a
          href="/shop"
          className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-6 py-2 rounded font-semibold"
        >
          Explorer les produits
        </a>
        <a
          href="/register"
          className="bg-white text-purple-700 hover:bg-purple-100 transition-colors px-6 py-2 rounded font-semibold"
        >
          vendre un produit
        </a>
      </div>
    </section>
  );
}

function BestSellers() {
  const products = [1, 2, 3];
  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-white">Meilleures ventes</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {products.map((p) => (
          <div key={p} className="bg-white/10 backdrop-blur border border-purple-800 rounded shadow p-4 flex flex-col items-center text-center">
            <div className="bg-gray-200 h-40 w-full mb-4" />
            <h3 className="font-semibold text-white">Produit {p}</h3>
            <p className="text-sm text-purple-200">Créateur {p}</p>
            <p className="font-bold my-2 text-white">0,{p} ETH</p>
            <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded">Voir</button>
          </div>
        ))}
      </div>
    </section>
  );
}


function HowItWorks() {
  const steps = [
    {
      title: 'Étape 1 : Crée ton design',
      text: 'Crée un visuel original et enregistre-le comme propriété intellectuelle sur la blockchain grâce à Story Protocol.',
    },
    {
      title: 'Étape 2 : Vends ton merch',
      text: 'Tes designs sont imprimés à la demande sur des t-shirts, sweats et autres produits.',
    },
    {
      title: 'Étape 3 : Partage les revenus',
      text: 'Tes fans peuvent acheter des tokens pour recevoir une part des ventes et accéder à des avantages exclusifs.',
    },
  ];
  return (
    <section className="py-12 px-4 bg-[#2C1D59] text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Comment ça marche ?</h2>
      <div className="grid gap-6 md:grid-cols-3 max-w-7xl mx-auto">
        {steps.map((s) => (
          <div key={s.title} className="bg-white/10 backdrop-blur rounded p-6 text-center space-y-2 shadow">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#2C1D59] text-white py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex flex-wrap justify-center space-x-4">
          <a href="#" className="hover:underline">À propos</a>
          <a href="#" className="hover:underline">FAQ</a>
          <a href="#" className="hover:underline">Contact</a>
          <a href="#" className="hover:underline">Conditions générales de vente</a>
          <a href="#" className="hover:underline">Mentions légales</a>
          <a href="#" className="hover:underline">Token-gated affiliate program</a>
        </div>
        <div className="flex justify-center space-x-4">
          <a href="#" aria-label="Twitter" className="hover:text-purple-300">🐦</a>
          <a href="#" aria-label="Instagram" className="hover:text-purple-300">📷</a>
          <a href="#" aria-label="Discord" className="hover:text-purple-300">💬</a>
        </div>
        <form className="flex justify-center space-x-2">
          <input
            type="email"
            placeholder="Ton email"
            className="px-2 py-1 rounded text-black"
          />
          <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-1 rounded">
            S'inscrire
          </button>
        </form>
        <p className="text-center text-sm">MintyShirt est propulsé par Story Protocol</p>
      </div>
    </footer>
  );
}

export default function HomePage() {
  return (
    <div className="font-sans">
      <Navbar />
      <Hero />
      <BestSellers />
      <HowItWorks />
      <Footer />
    </div>
  );
}

