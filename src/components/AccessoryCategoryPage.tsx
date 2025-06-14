import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { products, accessories } from '../data/products';

export default function AccessoryCategoryPage() {
  const { category } = useParams();
  const [sort, setSort] = useState('popular');

  const filtered = products.filter((p) => p.category === category);

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'new':
        return b.createdAt - a.createdAt;
      case 'sales':
        return b.sales - a.sales;
      case 'active':
        return b.activity - a.activity;
      default:
        return b.popularity - a.popularity;
    }
  });

  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 flex space-x-6">
        <aside className="w-52 text-white">
          <h2 className="font-bold mb-2">Accessoires</h2>
          <ul className="space-y-1 mb-4">
            {accessories.map((a) => (
              <li key={a.path}>
                <Link to={`/shop/${a.path}`} className="hover:underline">
                  {a.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4 text-white">
            <h2 className="text-2xl font-bold capitalize">
              {category?.replace('-', ' ')}
            </h2>
            <select
              className="text-black p-1 rounded"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="popular">Plus Populaires</option>
              <option value="new">Nouveaux Ajouts</option>
              <option value="sales">Meilleures Ventes</option>
              <option value="active">Plus Actifs</option>
            </select>
          </div>
          <div className="grid gap-6 md:grid-cols-3 text-white">
            {sorted.map((p) => (
              <div
                key={p.id}
                className="bg-white/10 backdrop-blur border border-purple-800 rounded shadow p-4 flex flex-col items-center text-center"
              >
                <div className="bg-gray-200 h-40 w-full mb-4" />
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-sm text-purple-200">{p.creator}</p>
                <p className="font-bold my-2">{p.price}€</p>
                <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded">
                  Voir
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
