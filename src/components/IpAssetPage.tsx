import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLanguage } from '../contexts/LanguageContext';

const texts = {
  en: {
    details: 'IP Asset details coming soon.',
  },
  fr: {
    details: "Détails de l'IP Asset à venir.",
  },
} as const;

export default function IpAssetPage() {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const t = texts[language];
  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white space-y-2">
        <h1 className="text-3xl font-bold">IP Asset {id}</h1>
        <p>{t.details}</p>
      </div>
      <Footer />
    </div>
  );
}
