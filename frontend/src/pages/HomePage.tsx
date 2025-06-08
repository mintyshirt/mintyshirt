import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import DesignCard from '../components/DesignCard';

const HomePage: React.FC = () => {
  const categories = [
    { name: 'Musiciens', icon: '🎵' },
    { name: 'Créateurs de contenu', icon: '🎥' },
    { name: 'Art visuel', icon: '🎨' },
    { name: 'Crypto', icon: '🪙' },
    { name: 'Mangas', icon: '📚' },
    { name: 'Jeux vidéo', icon: '🎮' },
    { name: 'Séries', icon: '📺' },
    { name: 'Films', icon: '🎬' },
  ];

  return (
    <div className="bg-purple-900 bg-gradient-to-br from-purple-900 to-purple-950 text-white">
      <div className="relative h-96 flex items-center justify-center">
        <div className="absolute inset-0 bg-purple-800 opacity-50" />
        <div className="relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Le succès se partage</h2>
          <div className="flex justify-center gap-4">
            <Link to="/designhub" className="btn-primary">Become a Creator</Link>
            <Link to="/shop" className="btn-secondary">Explore the Shop</Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="flex justify-end mb-8">
          <SearchBar className="w-full max-w-md" />
        </div>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Meilleures ventes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <DesignCard title="Design 1" creator="@alice" price="0.05 ETH" />
            <DesignCard title="Design 2" creator="@bob" price="0.08 ETH" />
            <DesignCard title="Design 3" creator="@carol" price="0.1 ETH" />
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-4">Catégories populaires</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="bg-purple-800/50 rounded-lg flex flex-col items-center py-4"
              >
                <span className="text-3xl mb-2">{cat.icon}</span>
                <span className="text-sm">{cat.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Comment ça marche ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-2">Étape 1 : Crée ton design</h4>
              <p className="text-gray-300">
                Crée un visuel original et enregistre-le comme propriété intellectuelle
                sur la blockchain grâce à Story Protocol.
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-2">Étape 2 : Vends ton merch</h4>
              <p className="text-gray-300">
                Tes designs sont imprimés à la demande sur des t-shirts, sweats et autres produits.
              </p>
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold mb-2">Étape 3 : Partage les revenus</h4>
              <p className="text-gray-300">
                Tes fans peuvent acheter des tokens pour recevoir une part des ventes et accéder à des avantages exclusifs.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
