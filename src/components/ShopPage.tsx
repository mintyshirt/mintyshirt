import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import React from 'react';

const accessories = [
  { name: 'T-shirts', path: 't-shirts' },
  { name: 'Sweatshirts', path: 'sweatshirts' },
  { name: 'Casquettes', path: 'casquettes' },
  { name: 'Tote bags', path: 'tote-bags' },
  { name: 'Posters', path: 'posters' },
  { name: 'Stickers', path: 'stickers' },
  { name: 'Coques de téléphone', path: 'coques-telephone' },
  { name: 'Mugs', path: 'mugs' },
  { name: 'Calendriers muraux', path: 'calendriers-muraux' },
  { name: 'Albums photo', path: 'albums-photo' },
  { name: 'Toiles', path: 'toiles' },
  { name: 'Cartes personnalisées', path: 'cartes-personnalisees' },
];

export default function ShopPage() {
  // TODO: replace hardcoded language logic with context/i18n when available
  const language = 'fr';
  const title = language === 'fr' ? 'La Boutique' : 'Shop';
  return (
    <div className="font-sans">
      <Navbar />
      <h1 className="text-3xl font-bold text-white max-w-7xl mx-auto mt-6 px-4">
        {title}
      </h1>
      <p className="text-white max-w-7xl mx-auto mt-2 px-4">
        Trouvez le merch de vos créateurs préférés et découvrez de nouvelles inspirations.
      </p>
      <div className="flex max-w-7xl mx-auto mt-4 px-4 space-x-6">
        <aside className="w-48">
          <h2 className="font-bold mb-2 text-white">Accessoires</h2>
          <ul className="space-y-1">
            {accessories.map((a) => (
              <li key={a.path}>
                <Link to={`/shop/${a.path}`} className="hover:underline text-white">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <div className="flex-1 text-white">
          <p>Sélectionnez un type d&apos;accessoire pour afficher les produits.</p>
        </div>
      </div>
    </div>
  );
}
