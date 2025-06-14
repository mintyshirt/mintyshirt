import React from 'react';
import Navbar from './Navbar';
import RoyaltyTokenExchange from '../RoyaltyTokenExchange';
import Footer from './Footer';

export default function RoyaltyTokensPage() {
  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white space-y-4">
        <h1 className="text-3xl font-bold">Royalty Tokens</h1>
        <RoyaltyTokenExchange />
      </div>
      <Footer />
    </div>
  );
}
