import React from 'react';

interface HeroSectionProps {
  onExplore: () => void;
  onBecomeCreator: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onExplore, onBecomeCreator }) => {
  return (
    <section className="py-16 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-6">Créez, Partagez, Monétisez</h2>
        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          La première plateforme décentralisée pour les créateurs de designs de t-shirts, 
          propulsée par la blockchain et la technologie IP de Story Protocol.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={onExplore}
            className="btn-primary px-6 py-3 font-medium"
          >
            Explorer les Designs
          </button>
          <button 
            onClick={onBecomeCreator}
            className="btn-secondary px-6 py-3 font-medium"
          >
            Devenir Créateur
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
