import { useCart } from '../contexts/CartContext';

export default function CartPage() {
  const { items, remove, clear } = useCart();
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Panier</h1>
      {items.length === 0 && <p>Votre panier est vide.</p>}
      {items.map(i => (
        <div key={i.product.id} className="flex justify-between border-b py-2">
          <span>{i.product.name} x{i.qty}</span>
          <span>{i.product.price * i.qty} ETH</span>
          <button onClick={() => remove(i.product.id)} className="ml-2">X</button>
        </div>
      ))}
      {items.length > 0 && (
        <div className="mt-4 space-y-2">
          <p>Total: {total.toFixed(2)} ETH</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded">Commander</button>
          <button onClick={clear} className="ml-2 underline">Vider</button>
        </div>
      )}
    </div>
  );
}
