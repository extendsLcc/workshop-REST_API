export type dataTypes = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: boolean;
  category: {
    id: number;
    name: string;
  };
};
