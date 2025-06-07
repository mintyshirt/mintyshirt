import React, { useState } from 'react';
import DesignCard from '../components/DesignCard';

const categories = ['mangas', 'musiciens', 'NFT', 'crypto', 'films', 'clubs sportifs'];

const Categories: React.FC = () => {
  const [category, setCategory] = useState(categories[0]);

  return (
    <div className="container mx-auto py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Catégories</h1>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-6 bg-gray-700 border border-gray-600 rounded p-2"
      >
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <DesignCard title={`Design ${category} 1`} creator="@creator" price="0.05 ETH" />
        <DesignCard title={`Design ${category} 2`} creator="@creator" price="0.06 ETH" />
        <DesignCard title={`Design ${category} 3`} creator="@creator" price="0.07 ETH" />
      </div>
    </div>
  );
};

export default Categories;
