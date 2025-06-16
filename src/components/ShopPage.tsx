import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import React from 'react';
import Footer from './Footer';
import { useLanguage } from '../contexts/LanguageContext';

const texts = {
  en: {
    title: 'Shop',
    description: 'Find merch from your favourite creators and discover new inspiration.',
    accessories: 'Accessories',
    select: 'Select an accessory type to view products.',
  },
  fr: {
    title: 'La Boutique',
    description: 'Trouvez le merch de vos créateurs préférés et découvrez de nouvelles inspirations.',
    accessories: 'Accessoires',
    select: "Sélectionnez un type d'accessoire pour afficher les produits.",
  },
} as const;

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
  const { language } = useLanguage();
  const t = texts[language];
  return (
    <div className="font-sans">
      <Navbar />
      <h1 className="text-3xl font-bold text-white max-w-7xl mx-auto mt-6 px-4">
        {t.title}
      </h1>
      <p className="text-white max-w-7xl mx-auto mt-2 px-4">
        {t.description}
      </p>
      <div className="flex max-w-7xl mx-auto mt-4 px-4 space-x-6">
        <aside className="w-48">
          <h2 className="font-bold mb-2 text-white">{t.accessories}</h2>
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
          <p>{t.select}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
