import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

export default function CreatorPage() {
  const { name } = useParams();
  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white">
        <h1 className="text-3xl font-bold mb-4 capitalize">{name}</h1>
        <p>Page du créateur {name}.</p>
      </div>
    </div>
  );
}
