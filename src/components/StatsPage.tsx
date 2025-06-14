import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function StatsPage() {
  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white">
        <h1 className="text-3xl font-bold mb-4">Statistiques</h1>
        <p>Aperçu des ventes et activités.</p>
      </div>
      <Footer />
    </div>
  );
}
