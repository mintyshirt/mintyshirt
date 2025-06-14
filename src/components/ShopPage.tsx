import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import React from 'react';

const accessories = [
  { name: 'T-shirts', path: 't-shirts' },
  { name: 'Sweats', path: 'sweats' },
  { name: 'Casquettes', path: 'casquettes' },
  { name: 'Mugs', path: 'mugs' },
  { name: 'Posters', path: 'posters' },
];

export default function ShopPage() {
  return (
    <div className="font-sans">
      <Navbar />
      <div className="flex max-w-7xl mx-auto mt-6 px-4 space-x-6">
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
