import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function IpAssetPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white space-y-2">
        <h1 className="text-3xl font-bold">IP Asset {id}</h1>
        <p>Détails de l'IP Asset à venir.</p>
      </div>
      <Footer />
    </div>
  );
}
