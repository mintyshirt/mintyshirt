import React from 'react';
import { mockMerchProducts, mockDesigns } from '../data/mockData';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

function getDesignImage(designId: string): string {
  const design = mockDesigns.find((d) => d.id === designId);
  return design ? design.imageUrl : 'https://via.placeholder.com/300';
}

function Hero() {
  return (
    <section
      className="text-center text-white py-24 bg-gradient-to-r from-purple-800 via-purple-600 to-fuchsia-600"
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Success is shared</h1>
      <div className="space-x-4">
        <Link
          to="/shop"
          className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-6 py-2 rounded font-semibold"
        >
          Explorer les produits
        </Link>
        <Link
          to="/become-creator"
          className="bg-white text-purple-700 hover:bg-purple-100 transition-colors px-6 py-2 rounded font-semibold"
        >
          Devenir créateur
        </Link>
      </div>
    </section>
  );
}

function BestSellers() {
  const products = mockMerchProducts.slice(0, 3);
  return (
    <section className="py-12 max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6 text-white">Meilleures ventes</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white/10 backdrop-blur border border-purple-800 rounded shadow p-4 flex flex-col items-center text-center"
          >
            <img
              src={getDesignImage(p.designId)}
              alt={p.name}
              className="h-40 w-full object-cover mb-4"
            />
            <h3 className="font-semibold text-white">{p.name}</h3>
            <p className="text-sm text-purple-200">{p.type}</p>
            <p className="font-bold my-2 text-white">
              {p.price} {p.currency}
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded">
              Voir
            </button>
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

