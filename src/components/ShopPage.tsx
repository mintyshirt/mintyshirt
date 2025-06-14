import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { products, accessories } from '../data/products';

export default function ShopPage() {
  const [sort, setSort] = useState('popular');
  const [creator, setCreator] = useState('');
  const [color, setColor] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [availableOnly, setAvailableOnly] = useState(false);
  const [page, setPage] = useState(1);

  const creators = Array.from(new Set(products.map((p) => p.creator)));
  const colors = Array.from(new Set(products.map((p) => p.color)));

  const filtered = products.filter(
    (p) =>
      (creator ? p.creator === creator : true) &&
      (color ? p.color === color : true) &&
      (availableOnly ? p.available : true) &&
      p.price >= priceRange[0] &&
      p.price <= priceRange[1]
  );

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'new':
        return b.createdAt - a.createdAt;
      case 'sales':
        return b.sales - a.sales;
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      default:
        return b.popularity - a.popularity;
    }
  });

  const perPage = 6;
  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <h1 className="text-2xl font-bold text-white mb-4">La Boutique</h1>
        <div className="flex space-x-6">
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
            <div className="space-y-2 text-sm">
              <div>
                <label className="block mb-1">Créateurs</label>
                <select
                  className="text-black w-full p-1 rounded"
                  value={creator}
                  onChange={(e) => {
                    setCreator(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">Tous</option>
                  {creators.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Couleur</label>
                <select
                  className="text-black w-full p-1 rounded"
                  value={color}
                  onChange={(e) => {
                    setColor(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="">Toutes</option>
                  {colors.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Disponibilité</label>
                <div>
                  <input
                    type="checkbox"
                    className="mr-1"
                    checked={availableOnly}
                    onChange={(e) => {
                      setAvailableOnly(e.target.checked);
                      setPage(1);
                    }}
                  />
                  En stock
                </div>
              </div>
              <div>
                <label className="block mb-1">Fourchette de Prix</label>
                <select
                  className="text-black w-full p-1 rounded"
                  value={priceRange.toString()}
                  onChange={(e) => {
                    const [min, max] = e.target.value.split(',').map(Number);
                    setPriceRange([min, max]);
                    setPage(1);
                  }}
                >
                  <option value="0,1000">Tous</option>
                  <option value="0,20">0-20€</option>
                  <option value="20,40">20-40€</option>
                  <option value="40,1000">40€ et +</option>
                </select>
              </div>
            </div>
          </aside>
          <div className="flex-1 text-white">
            <div className="flex justify-end mb-4">
              <select
                className="text-black p-1 rounded"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
              >
                <option value="popular">Plus Populaires</option>
                <option value="new">Nouveaux Ajouts</option>
                <option value="sales">Meilleures Ventes</option>
                <option value="price-asc">Prix Croissant</option>
                <option value="price-desc">Prix Décroissant</option>
              </select>
            </div>
            {paginated.length === 0 ? (
              <p>Aucun produit</p>
            ) : (
              <div className="grid gap-6 md:grid-cols-3">
                {paginated.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white/10 backdrop-blur border border-purple-800 rounded shadow p-4 flex flex-col items-center text-center"
                  >
                    <div className="bg-gray-200 h-40 w-full mb-4" />
                    <h3 className="font-semibold">{p.name}</h3>
                    <Link
                      to="#"
                      className="text-sm text-purple-200 hover:underline"
                    >
                      {p.creator}
                    </Link>
                    <p className="font-bold my-2">{p.price}€</p>
                    <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded">
                      Voir
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-center mt-4 space-x-2">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="px-2 py-1 bg-purple-600 disabled:opacity-50"
              >
                Précédent
              </button>
              <span className="px-2">
                {page}/{totalPages || 1}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="px-2 py-1 bg-purple-600 disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
