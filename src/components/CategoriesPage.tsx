import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { categories } from '../lib/categories';
import { useLanguage } from '../contexts/LanguageContext';

const texts = {
  en: {
    title: 'Categories',
    coming: 'Content for category',
  },
  fr: {
    title: 'Catégories',
    coming: 'Contenu pour la catégorie',
  },
} as const;

export default function CategoriesPage() {
  const { slug } = useParams<{ slug?: string }>();
  const { language } = useLanguage();
  const t = texts[language];

  if (!slug) {
    return (
      <div className="font-sans">
        <Navbar />
        <div className="max-w-7xl mx-auto mt-6 px-4 text-white">
          <h1 className="text-3xl font-bold mb-4">{t.title}</h1>
          <ul className="space-y-2">
            {categories.map((cat) => {
              const label = language === 'fr' ? cat.nameFr : cat.nameEn;
              return (
                <li key={cat.slug}>
                  <Link to={`/categories/${cat.slug}`} className="hover:underline">
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <Footer />
      </div>
    );
  }

  const category = categories.find((c) => c.slug === slug);

  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white space-y-2">
        <h1 className="text-3xl font-bold capitalize">
          {category ? (language === 'fr' ? category.nameFr : category.nameEn) : slug}
        </h1>
        <p>
          {t.coming}{' '}
          {category ? (language === 'fr' ? category.nameFr : category.nameEn) : slug}...
        </p>
      </div>
      <Footer />
    </div>
  );
}
