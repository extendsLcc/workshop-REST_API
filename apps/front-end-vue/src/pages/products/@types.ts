import type { Category } from '../categories/@types';

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: boolean;
  categoryId: number;
  category: Category;
};
