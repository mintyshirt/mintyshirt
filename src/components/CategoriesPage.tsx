import React from 'react';
import Navbar from './Navbar';

export default function CategoriesPage() {
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
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white">
        <h1 className="text-3xl font-bold mb-4">Catégories</h1>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>{cat}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
