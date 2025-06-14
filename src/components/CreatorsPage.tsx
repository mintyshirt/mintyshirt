import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

interface Creator {
  name: string;
  slug: string;
}

export default function CreatorsPage() {
  const creators: Creator[] = [
    { name: 'Alice', slug: 'alice' },
    { name: 'Bob', slug: 'bob' },
    { name: 'Charlie', slug: 'charlie' },
  ];

  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white">
        <h1 className="text-3xl font-bold mb-4">Créateurs</h1>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {creators.map((creator) => (
            <Link
              key={creator.slug}
              to={`/creators/${creator.slug}`}
              className="bg-white/10 backdrop-blur border border-purple-800 rounded shadow p-4 flex flex-col items-center text-center hover:bg-white/20 transition-colors"
            >
              <div className="bg-gray-200 h-32 w-full mb-2" />
              <h3 className="font-semibold capitalize">{creator.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
