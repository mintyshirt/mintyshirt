import React from 'react';
import SearchBar from '../components/SearchBar';
import DesignCard from '../components/DesignCard';

const HomePage: React.FC = () => {
  return (
    <div className="bg-purple-900 bg-gradient-to-br from-purple-900 to-purple-950 text-white min-h-screen">
      <div className="container mx-auto py-8">
        <div className="flex justify-end mb-8">
          <SearchBar className="w-full max-w-md" />
        </div>
        <h2 className="text-center text-4xl font-bold mb-8">Le succès se partage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-purple-800/50 p-8 rounded-lg text-center">
            <p className="mb-4 text-xl font-semibold">Rejoignez la communauté</p>
            <button className="btn-primary">Become a Creator</button>
          </div>
          <div className="bg-purple-800/50 p-8 rounded-lg text-center">
            <p className="mb-4 text-xl font-semibold">Parcourez nos produits</p>
            <button className="btn-secondary">Explore the shop</button>
          </div>
        </div>
        <section>
          <h3 className="text-2xl font-semibold mb-4">Meilleures ventes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <DesignCard title="Design 1" creator="@alice" price="0.05 ETH" />
            <DesignCard title="Design 2" creator="@bob" price="0.08 ETH" />
            <DesignCard title="Design 3" creator="@carol" price="0.1 ETH" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
