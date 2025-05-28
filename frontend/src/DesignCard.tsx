import React from 'react';

interface DesignCardProps {
  title: string;
  creator: string;
  price: string;
  imageUrl?: string;
}

const DesignCard: React.FC<DesignCardProps> = ({ title, creator, price, imageUrl }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all card-hover">
      <div 
        className="h-64 bg-gray-700"
        style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      ></div>
      <div className="p-4">
        <h4 className="text-xl font-semibold mb-2">{title}</h4>
        <p className="text-gray-400 mb-3">Par {creator}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-400">{price}</span>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
            Voir
          </button>
        </div>
      </div>
    </div>
  );
};

export default DesignCard;
