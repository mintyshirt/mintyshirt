import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { mockCreators, Creator } from '../data/mockData';

export default function CreatorsPage() {
  const creators: Creator[] = mockCreators;

  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white">
        <h1 className="text-3xl font-bold mb-4">Créateurs</h1>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {creators.map((creator) => (
            <Link
              key={creator.id}
              to={`/creators/${creator.username.slice(1).toLowerCase()}`}
              className="bg-white/10 backdrop-blur border border-purple-800 rounded shadow p-4 flex flex-col items-center text-center hover:bg-white/20 transition-colors"
            >
              <img
                src={creator.bannerImageUrl}
                alt={creator.username}
                className="h-32 w-full mb-2 object-cover"
              />
              <img
                src={creator.profilePictureUrl}
                alt={creator.username}
                className="w-16 h-16 rounded-full -mt-8 border-2 border-white"
              />
              <h3 className="font-semibold mt-2">{creator.username}</h3>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
