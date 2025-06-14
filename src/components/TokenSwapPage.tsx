import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function TokenSwapPage() {
  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white">
        <h1 className="text-3xl font-bold mb-4">Token Swap</h1>
        <p>Échangez vos tokens ici.</p>
      </div>
      <Footer />
    </div>
  );
}
