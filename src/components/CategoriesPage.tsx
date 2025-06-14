import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { categories } from '../lib/categories';

export default function CategoriesPage() {
  const { slug } = useParams<{ slug?: string }>();

  if (!slug) {
    return (
      <div className="font-sans">
        <Navbar />
        <div className="max-w-7xl mx-auto mt-6 px-4 text-white">
          <h1 className="text-3xl font-bold mb-4">Catégories</h1>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link to={`/categories/${cat.slug}`} className="hover:underline">
                  {cat.name}
                </Link>
              </li>
            ))}
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
          {category ? category.name : slug}
        </h1>
        <p>Contenu pour la catégorie {category ? category.name : slug} à venir.</p>
      </div>
      <Footer />
    </div>
  );
}
