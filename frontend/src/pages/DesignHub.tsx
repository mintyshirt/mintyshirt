import React from 'react';
import DesignCard from '../components/DesignCard';

const DesignHub: React.FC = () => {
  const groups = [1, 2, 3];
  return (
    <div className="container mx-auto py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">DesignHub</h1>
      {groups.map((g) => (
        <div key={g} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Collection IP #{g}</h2>
          <div className="flex space-x-4 overflow-x-auto hover:overflow-x-scroll pb-2">
            <DesignCard title="Design A" creator="@creator" price="0.05 ETH" />
            <DesignCard title="Design B" creator="@creator" price="0.06 ETH" />
            <DesignCard title="Design C" creator="@creator" price="0.07 ETH" />
          </div>
          <button className="btn-secondary mt-2">Voir l’IP complète</button>
        </div>
      ))}
      <p className="text-center text-gray-400 mt-10">Chaque design est protégé via Story Protocol</p>
    </div>
  );
};

export default DesignHub;
