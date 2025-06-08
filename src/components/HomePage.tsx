import React from 'react';

function Navbar() {
  return (
    <nav className="sticky top-0 bg-white shadow z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <span className="font-bold text-xl">MintyShirt</span>
          <div className="hidden md:flex space-x-4">
            <a href="#" className="hover:text-purple-600">Accueil</a>
            <a href="#" className="hover:text-purple-600">Créateurs</a>
            <a href="#" className="hover:text-purple-600">Accessoires</a>
            <div className="relative group">
              <button className="hover:text-purple-600">Catégories</button>
              <div className="absolute left-0 mt-2 hidden group-hover:block bg-white shadow rounded p-2 space-y-1">
                <a href="#" className="block hover:text-purple-600">Musiciens</a>
                <a href="#" className="block hover:text-purple-600">Créateurs de contenu</a>
                <a href="#" className="block hover:text-purple-600">Art visuel</a>
              </div>
            </div>
            <a href="#" className="hover:text-purple-600">Royalty Tokens</a>
            <a href="#" className="hover:text-purple-600">TokenSwap</a>
            <a href="#" className="hover:text-purple-600">DesignHub</a>
            <a href="#" className="hover:text-purple-600">Stats</a>
            <a href="#" className="hover:text-purple-600">À propos</a>
            <a href="#" className="hover:text-purple-600">FAQ</a>
            <a href="#" className="hover:text-purple-600">Contact</a>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Rechercher un produit, un créateur ou un token…"
            className="border rounded px-2 py-1"
          />
          <button className="bg-purple-600 text-white px-3 py-1 rounded">Connect Wallet</button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="text-center text-white py-20 bg-gradient-to-r from-purple-800 via-purple-600 to-fuchsia-600 bg-cover bg-center" style={{backgroundImage: "url('/images/header-banner.png')"}}>
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Le succès se partage</h1>
      <p className="mb-8 text-xl">Découvrez et créez des produits Web3 uniques</p>
      <div className="space-x-4">
        <a href="/designhub" className="bg-white text-purple-600 px-4 py-2 rounded font-semibold">Créer un produit</a>
        <a href="/shop" className="bg-purple-600 text-white px-4 py-2 rounded font-semibold">Explorer les produits</a>
      </div>
    </section>
  );
}

function BestSellers() {
  const products = [1, 2, 3];
  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Meilleures ventes</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {products.map((p) => (
          <div key={p} className="border rounded shadow p-4 flex flex-col items-center text-center">
            <div className="bg-gray-200 h-40 w-full mb-4" />
            <h3 className="font-semibold">Produit {p}</h3>
            <p className="text-sm text-gray-600">Créateur {p}</p>
            <p className="font-bold my-2">0,{p} ETH</p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded">Voir</button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { name: 'Musiciens', icon: '🎵' },
    { name: 'Créateurs de contenu', icon: '🎥' },
    { name: 'Art visuel', icon: '🎨' },
    { name: 'Crypto', icon: '₿' },
    { name: 'Mangas', icon: '📚' },
    { name: 'Jeux vidéo', icon: '🎮' },
    { name: 'Séries', icon: '📺' },
    { name: 'Films', icon: '🎬' },
  ];
  return (
    <section className="py-12 bg-gray-50 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Catégories populaires</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4 max-w-5xl mx-auto">
        {cats.map((cat) => (
          <div key={cat.name} className="flex flex-col items-center space-y-2">
            <span className="text-3xl">{cat.icon}</span>
            <span className="text-sm text-center">{cat.name}</span>
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
      text: 'Tes designs sont imprimés à la demande sur des t-shirts, sweats et autres produits grâce à Gelato.',
    },
    {
      title: 'Étape 3 : Partage les revenus',
      text: 'Tes fans peuvent acheter des tokens pour recevoir une part des ventes et accéder à des avantages exclusifs.',
    },
  ];
  return (
    <section className="py-12 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Comment ça marche ?</h2>
      <div className="grid gap-6 md:grid-cols-3 max-w-7xl mx-auto">
        {steps.map((s) => (
          <div key={s.title} className="border rounded p-4 text-center space-y-2">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-gray-700">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex flex-wrap justify-center space-x-4">
          <a href="#" className="hover:underline">À propos</a>
          <a href="#" className="hover:underline">DesignHub</a>
          <a href="#" className="hover:underline">TokenSwap</a>
          <a href="#" className="hover:underline">Stats</a>
          <a href="#" className="hover:underline">FAQ</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
        <p className="text-center text-sm">MintyShirt est propulsé par Story Protocol</p>
        <div className="text-center">
          <select className="bg-gray-800 text-white px-2 py-1 rounded">
            <option>FR</option>
            <option>EN</option>
          </select>
        </div>
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
      <Categories />
      <HowItWorks />
      <Footer />
    </div>
  );
}

