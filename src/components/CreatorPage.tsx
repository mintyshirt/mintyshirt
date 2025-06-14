import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

export default function CreatorPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white space-y-2">
        <h1 className="text-3xl font-bold capitalize">{slug}</h1>
        <p>Détails du créateur {slug} à venir.</p>
      </div>
    </div>
  );
}
