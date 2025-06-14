import React from 'react';
import Navbar from './Navbar';

export default function DesignHubPage() {
  return (
    <div className="font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-6 px-4 text-white">
        <h1 className="text-3xl font-bold mb-4">Design Hub</h1>
        <p>Espace de création et de gestion des designs.</p>
      </div>
    </div>
  );
}
