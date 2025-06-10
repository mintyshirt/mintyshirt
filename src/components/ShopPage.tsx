import { useState } from 'react';
import { products, categories } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

export default function ShopPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const { add } = useCart();

  const filtered = products
    .filter(p => !category || p.name.includes(category))
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === 'asc') return a.price - b.price;
      if (sort === 'desc') return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <div className="flex space-x-2 mb-4">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Recherche"
          className="p-2 rounded text-black"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="">Catégorie</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="p-2 rounded text-black"
        >
          <option value="">Tri</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {filtered.map(p => (
          <div key={p.id} className="bg-white/10 p-4 rounded">
            <div className="h-40 bg-gray-200 mb-2" />
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm">{p.creator}</p>
            <p className="font-bold">{p.price} ETH</p>
            <div className="flex space-x-2 mt-2">
              <Link to={`/product/${p.id}`} className="bg-purple-600 text-white px-2 py-1 rounded">Voir</Link>
              <button onClick={() => add(p)} className="bg-purple-500 text-white px-2 py-1 rounded">Ajouter</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
