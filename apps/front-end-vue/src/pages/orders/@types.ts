import type { Customer } from '../customers/@types';
import type { Product } from '../products/@types';

export const ValidOrderStatus = ['pending', 'paid', 'shipped', 'cancelled', 'completed', 'refunded'] as const;
export type OrderStatus = typeof ValidOrderStatus[number];

export type Order = {
  id: number;
  date: string;
  status: OrderStatus;
  customer: Customer;
  OrderItem: {
    id: number;
    quantity: number;
    price: number;
    product: Product;
  }[];
};
