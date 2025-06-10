import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const { add } = useCart();

  if (!product) return <p className="p-4 text-white">Produit introuvable</p>;

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <div className="md:flex space-x-4">
        <div className="h-64 w-64 bg-gray-200 mb-4" />
        <div>
          <p className="mb-2">Créateur : {product.creator}</p>
          <p className="mb-2">Prix : {product.price} ETH</p>
          <div className="mb-2 space-x-2">
            {['S','M','L'].map(s => (
              <button key={s} className="border px-2 py-1">{s}</button>
            ))}
          </div>
          <button onClick={() => add(product)} className="bg-purple-600 text-white px-4 py-2 rounded">Ajouter au panier</button>
        </div>
      </div>
    </div>
  );
}
