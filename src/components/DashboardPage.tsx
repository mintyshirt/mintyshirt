import { useAuth } from '../contexts/AuthContext';
import { products } from '../data/products';

export default function DashboardPage() {
  const { user } = useAuth();
  const myProducts = user?.type === 'creator' ? products : [];

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user?.type === 'creator' ? (
        <div>
          <h2 className="font-semibold mb-2">Vos produits</h2>
          <ul className="list-disc pl-5">
            {myProducts.map(p => (
              <li key={p.id}>{p.name}</li>
            ))}
          </ul>
          <button className="mt-4 bg-purple-600 text-white px-4 py-2 rounded">Créer un nouveau design</button>
        </div>
      ) : (
        <p>Rien à afficher.</p>
      )}
    </div>
  );
}
