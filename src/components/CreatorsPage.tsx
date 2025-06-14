import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function CreatorsPage() {
  const creators = ['alice', 'bob', 'charlie'];
  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white">
        <h1 className="text-3xl font-bold mb-4">Créateurs</h1>
        <ul className="space-y-2">
          {creators.map((c) => (
            <li key={c}>
              <Link to={`/creators/${c}`} className="text-purple-300 hover:underline capitalize">
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
