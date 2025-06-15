import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface Product {
  id: number;
  name: string;
  creator: string;
  price: number;
  category: string;
  popularity: number;
  sales: number;
  createdAt: number;
  activity: number;
  imageUrl: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'T-shirt Alpha',
    creator: 'Alice',
    price: 0.1,
    category: 't-shirts',
    popularity: 80,
    sales: 120,
    createdAt: 3,
    activity: 5,
    imageUrl: 'https://via.placeholder.com/300?text=T-shirt+Alpha',
  },
  {
    id: 2,
    name: 'T-shirt Beta',
    creator: 'Bob',
    price: 0.12,
    category: 't-shirts',
    popularity: 70,
    sales: 80,
    createdAt: 2,
    activity: 4,
    imageUrl: 'https://via.placeholder.com/300?text=T-shirt+Beta',
  },
  {
    id: 3,
    name: 'Sweat Gamma',
    creator: 'Clara',
    price: 0.2,
    category: 'sweatshirts',
    popularity: 90,
    sales: 150,
    createdAt: 1,
    activity: 6,
    imageUrl: 'https://via.placeholder.com/300?text=Sweat+Gamma',
  },
  {
    id: 4,
    name: 'Casquette Delta',
    creator: 'Dan',
    price: 0.05,
    category: 'casquettes',
    popularity: 60,
    sales: 60,
    createdAt: 5,
    activity: 2,
    imageUrl: 'https://via.placeholder.com/300?text=Casquette+Delta',
  },
  {
    id: 5,
    name: 'Tote Bag Epsilon',
    creator: 'Eve',
    price: 0.03,
    category: 'tote-bags',
    popularity: 50,
    sales: 40,
    createdAt: 4,
    activity: 1,
    imageUrl: 'https://via.placeholder.com/300?text=Tote+Bag+Epsilon',
  },
  {
    id: 6,
    name: 'Poster Zeta',
    creator: 'Fiona',
    price: 0.02,
    category: 'posters',
    popularity: 40,
    sales: 30,
    createdAt: 6,
    activity: 1,
    imageUrl: 'https://via.placeholder.com/300?text=Poster+Zeta',
  },
  {
    id: 7,
    name: 'Sticker Eta',
    creator: 'George',
    price: 0.01,
    category: 'stickers',
    popularity: 35,
    sales: 25,
    createdAt: 7,
    activity: 1,
    imageUrl: 'https://via.placeholder.com/300?text=Sticker+Eta',
  },
  {
    id: 8,
    name: 'Produit Gelato',
    creator: 'Hannah',
    price: 0.05,
    category: 'autres',
    popularity: 20,
    sales: 10,
    createdAt: 8,
    activity: 1,
    imageUrl: 'https://via.placeholder.com/300?text=Produit+Gelato',
  },
];

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
      <div className="max-w-7xl mx-auto mt-6 px-4">
        <div className="flex justify-between items-center mb-4 text-white">
          <h2 className="text-2xl font-bold capitalize">{category?.replace('-', ' ')}</h2>
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
        <div className="grid gap-6 md:grid-cols-3">
          {sorted.map((p) => (
            <div
              key={p.id}
              className="bg-white/10 backdrop-blur border border-purple-800 rounded shadow p-4 flex flex-col items-center text-center text-white"
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="h-40 w-full object-cover mb-4"
              />
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-purple-200">{p.creator}</p>
              <p className="font-bold my-2">{p.price} ETH</p>
              <button className="bg-purple-600 hover:bg-purple-700 transition-colors text-white px-4 py-2 rounded">
                Voir
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
