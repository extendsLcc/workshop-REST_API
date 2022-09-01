import { Category, Customer, Order, Product } from '@/entities';

const dummyCategories: Category[] = [
  {
    id: 1,
    name: 'Category X',
  },
  {
    id: 2,
    name: 'Category Y',
  },
  {
    id: 3,
    name: 'Category Z',
  },
];

const dummyProducts: Product[] = [
  {
    id: 1,
    name: 'Product A',
    description: 'Product A description',
    price: 100,
    stock: 10,
    status: true,
    category: dummyCategories[2],
  },
  {
    id: 2,
    name: 'Product B',
    description: 'Product B description',
    price: 200,
    stock: 20,
    status: true,
    category: dummyCategories[1],
  },
  {
    id: 3,
    name: 'Product C',
    description: 'Product C description',
    price: 300,
    stock: 30,
    status: true,
    category: dummyCategories[0],
  },
  {
    id: 4,
    name: 'Product D',
    description: 'Product D description',
    price: 400,
    stock: 40,
    status: true,
    category: dummyCategories[2],
  },
  {
    id: 5,
    name: 'Product E',
    description: 'Product E description',
    price: 500,
    stock: 50,
    status: false,
    category: dummyCategories[1],
  },
];

const dummyCustomers: Customer[] = [
  {
    id: 1,
    name: 'Customer 1',
  },
  {
    id: 2,
    name: 'Customer 2',
  },
];

const dummyOrders: Order[] = [
  {
    id: '0001',
    customer: dummyCustomers[0],
    date: new Date('2021-01-01'),
    status: 'pending',
    items: [
      {
        product: dummyProducts[0],
        quantity: 1,
        price: dummyProducts[0].price,
      },
      {
        product: dummyProducts[1],
        quantity: 2,
        price: dummyProducts[1].price,
      },
    ],
  },
  {
    id: '0002',
    customer: dummyCustomers[1],
    date: new Date('2022-02-02'),
    status: 'completed',
    items: [
      {
        product: dummyProducts[2],
        quantity: 3,
        price: dummyProducts[2].price,
      },
      {
        product: dummyProducts[3],
        quantity: 4,
        price: dummyProducts[3].price,
      },
      {
        product: dummyProducts[4],
        quantity: 5,
        price: dummyProducts[4].price,
      },
    ],
  },
];

export { dummyCategories, dummyProducts, dummyCustomers, dummyOrders };
