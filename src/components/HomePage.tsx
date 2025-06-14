import React from 'react';
import { FaYoutube, FaTiktok, FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';
import Navbar from './Navbar';

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
      title: 'Étape 1 : Enregistre tes designs',
      text: 'Crée des designs originaux et protège-les comme propriétés intellectuelles sur la blockchain en quelques clics.',
    },
    {
      title: 'Étape 2 : Vends ton merch',
      text: 'Tes designs sont imprimés à la demande sur des t-shirts, sweats et autres produits éco-responsables, puis livrés partout dans le monde.',
    },
    {
      title: 'Étape 3 : Partage les revenus',
      text: 'Tes fans peuvent acheter des royalty tokens leur permettant de recevoir une part de tes revenus et d\'accéder à des avantages exclusifs.',
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
        <div className="flex justify-center space-x-4 text-2xl">
          <a href="#" aria-label="YouTube" className="hover:text-purple-300"><FaYoutube /></a>
          <a href="#" aria-label="TikTok" className="hover:text-purple-300"><FaTiktok /></a>
          <a href="#" aria-label="Instagram" className="hover:text-purple-300"><FaInstagram /></a>
          <a href="#" aria-label="X" className="hover:text-purple-300"><FaTwitter /></a>
          <a href="#" aria-label="Facebook" className="hover:text-purple-300"><FaFacebook /></a>
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

