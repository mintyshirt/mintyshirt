import React from 'react';

const TokenSwap: React.FC = () => {
  const data = [
    { name: 'RoyaltyToken A', price: '1.2', change: '+3%', sales: 120 },
    { name: 'RoyaltyToken B', price: '0.8', change: '-1%', sales: 98 },
  ];
  return (
    <div className="container mx-auto py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">TokenSwap</h1>
      <div className="mb-4">
        <select className="bg-gray-700 border border-gray-600 rounded p-2">
          <option>Tout</option>
          <option>Par catégorie</option>
          <option>Par créateur</option>
        </select>
      </div>
      <table className="min-w-full text-left">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">Nom</th>
            <th className="p-2">Prix actuel</th>
            <th className="p-2">Évolution</th>
            <th className="p-2">Ventes</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.name} className="border-b border-gray-700">
              <td className="p-2">{row.name}</td>
              <td className="p-2">{row.price}</td>
              <td className="p-2">{row.change}</td>
              <td className="p-2">{row.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TokenSwap;
