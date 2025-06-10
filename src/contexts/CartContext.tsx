import { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  creator: string;
  price: number;
  image?: string;
}

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (p: Product) => void;
  remove: (id: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue>({
  items: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
});

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = (p: Product) => {
    setItems((curr) => {
      const existing = curr.find((c) => c.product.id === p.id);
      if (existing) {
        return curr.map((c) =>
          c.product.id === p.id ? { ...c, qty: c.qty + 1 } : c
        );
      }
      return [...curr, { product: p, qty: 1 }];
    });
  };

  const remove = (id: number) => {
    setItems((curr) => curr.filter((c) => c.product.id !== id));
  };

  const clear = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
