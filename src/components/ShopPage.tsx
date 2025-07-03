import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import React from 'react';
import Footer from './Footer';
import { useTranslations } from '../contexts/LanguageContext';


const accessories = [
  { name: 'T-shirts', path: 't-shirts' },
  { name: 'Sweatshirts', path: 'sweatshirts' },
  { name: 'Caps', path: 'casquettes' },
  { name: 'Tote bags', path: 'tote-bags' },
  { name: 'Posters', path: 'posters' },
  { name: 'Stickers', path: 'stickers' },
  { name: 'Phone cases', path: 'coques-telephone' },
  { name: 'Mugs', path: 'mugs' },
  { name: 'Wall calendars', path: 'calendriers-muraux' },
  { name: 'Photo albums', path: 'albums-photo' },
  { name: 'Canvas prints', path: 'toiles' },
  { name: 'Custom cards', path: 'cartes-personnalisees' },
];

export default function ShopPage() {
  const t = useTranslations().shop;
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
