export type dataTypes = {
  id: number;
  date: string;
  status: string;
  customerId: number;
  customer: {
    id: number;
    name: string;
  };
  OrderItem: OrdemItemDataTypes[];
};

type ProductDataTypes = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: boolean;
  categoryId: number;
};

type OrdemItemDataTypes = {
  id: number;
  quantity: number;
  price: number;
  orderId: number;
  productId: number;
  product: ProductDataTypes;
};
