export interface Product {
  id: number;
  name: string;
  creator: string;
  price: number;
  category: string;
  color: string;
  available: boolean;
  popularity: number;
  sales: number;
  createdAt: number;
  activity: number;
}

export const products: Product[] = [
  { id: 1, name: 'T-shirt Alpha', creator: 'Alice', price: 20, category: 't-shirts', color: 'blanc', available: true, popularity: 80, sales: 120, createdAt: 1, activity: 5 },
  { id: 2, name: 'T-shirt Beta', creator: 'Bob', price: 25, category: 't-shirts', color: 'noir', available: true, popularity: 70, sales: 90, createdAt: 3, activity: 4 },
  { id: 3, name: 'Sweat Gamma', creator: 'Clara', price: 40, category: 'sweats', color: 'gris', available: false, popularity: 90, sales: 150, createdAt: 2, activity: 6 },
  { id: 4, name: 'Casquette Delta', creator: 'Dan', price: 15, category: 'casquettes', color: 'rouge', available: true, popularity: 60, sales: 60, createdAt: 5, activity: 2 },
  { id: 5, name: 'Tote bag Epsilon', creator: 'Eve', price: 18, category: 'tote-bags', color: 'beige', available: true, popularity: 55, sales: 45, createdAt: 4, activity: 3 },
  { id: 6, name: 'Poster Zeta', creator: 'Frank', price: 12, category: 'posters', color: 'multi', available: true, popularity: 65, sales: 70, createdAt: 6, activity: 4 },
  { id: 7, name: 'Sticker Eta', creator: 'Grace', price: 5, category: 'stickers', color: 'multi', available: true, popularity: 50, sales: 80, createdAt: 7, activity: 2 },
  { id: 8, name: 'Casquette Theta', creator: 'Heidi', price: 17, category: 'casquettes', color: 'bleu', available: false, popularity: 45, sales: 30, createdAt: 8, activity: 1 },
  { id: 9, name: 'Sweat Iota', creator: 'Ivan', price: 42, category: 'sweats', color: 'noir', available: true, popularity: 85, sales: 110, createdAt: 9, activity: 5 },
  { id: 10, name: 'Sticker Kappa', creator: 'Judy', price: 6, category: 'stickers', color: 'multi', available: true, popularity: 40, sales: 25, createdAt: 10, activity: 1 },
];

export const accessories = [
  { name: 'T-shirts', path: 't-shirts' },
  { name: 'Sweatshirts', path: 'sweats' },
  { name: 'Casquettes', path: 'casquettes' },
  { name: 'Tote bags', path: 'tote-bags' },
  { name: 'Posters', path: 'posters' },
  { name: 'Stickers', path: 'stickers' },
  { name: 'Autres', path: 'autres' },
];
