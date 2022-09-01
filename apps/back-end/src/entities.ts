type Category = {
  id: number;
  name: string;
};

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: boolean;
  category: Category;
};

type Customer = {
  id: number;
  name: string;
};

const ValidOrderStatus = ['pending', 'paid', 'shipped', 'cancelled', 'completed', 'refunded'] as const;
// type OrderStatus = 'pending' | 'paid' | 'shipped' | 'cancelled' | 'completed' | 'refunded';
type OrderStatus = typeof ValidOrderStatus[number];

type OrderItem = {
  product: Product;
  quantity: number;
  price: number;
};

type Order = {
  id: string;
  date: Date;
  customer: Customer;
  status: OrderStatus;
  items: OrderItem[];
};

export { ValidOrderStatus };
export type { Category, Product, Customer, OrderStatus, OrderItem, Order };
