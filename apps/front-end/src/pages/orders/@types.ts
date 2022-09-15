import type { Customer } from '../customers/@types';
import type { Product } from '../products/@types';

const ValidOrderStatus = ['pending', 'paid', 'shipped', 'cancelled', 'completed', 'refunded'] as const;
type OrderStatus = typeof ValidOrderStatus[number];

export type Order = {
  id: number;
  date: string;
  status: OrderStatus;
  customer: Customer;
  OrderItem: {
    quantity: number;
    price: number;
    product: Product;
  }[];
};
