import React from 'react';

const Stats: React.FC = () => {
  const data = [
    { creator: 'Alice', sold: 120, revenue: '2 ETH', top: ['Design 1', 'Design 2', 'Design 3'] },
    { creator: 'Bob', sold: 85, revenue: '1.3 ETH', top: ['Design 4', 'Design 5', 'Design 6'] },
  ];
  return (
    <div className="container mx-auto py-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Statistiques</h1>
      <div className="mb-4">
        <select className="bg-gray-700 border border-gray-600 rounded p-2">
          <option>7 derniers jours</option>
          <option>30 derniers jours</option>
          <option>Toute la période</option>
        </select>
      </div>
      <table className="min-w-full text-left">
        <thead className="bg-gray-700">
          <tr>
            <th className="p-2">Créateur</th>
            <th className="p-2">Produits vendus</th>
            <th className="p-2">Chiffre généré</th>
            <th className="p-2">Top 3 designs</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.creator} className="border-b border-gray-700">
              <td className="p-2">{row.creator}</td>
              <td className="p-2">{row.sold}</td>
              <td className="p-2">{row.revenue}</td>
              <td className="p-2">{row.top.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Stats;
