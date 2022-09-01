import { Order, OrderItem } from '@/entities';
import { getCustomerById } from './customer.service';
import { getProductById, subtractProductStock } from './product.service';

let orderIdAutoIncrement = 1;
const ordersFakeDatabase: Order[] = [];

type CreateOrderInput = {
  customerId: number;
  products: {
    productId: number;
    quantity: number;
  }[];
};

async function placeOrder(createOrderParams: CreateOrderInput) {
  const orderingCustomer = getCustomerById(createOrderParams.customerId);
  if (!orderingCustomer) {
    throw new Error(`Customer with id ${createOrderParams.customerId} not found`);
  }

  const orderItems: OrderItem[] = createOrderParams.products.map((productInfo) => {
    const product = getProductById(productInfo.productId);
    if (!product) {
      throw new Error(`Product with id ${productInfo.productId} not found`);
    }
    if (product.stock < productInfo.quantity) {
      throw new Error(`Not enough stock for product ${product.name}, only ${product.stock} left`);
    }
    return {
      product,
      quantity: productInfo.quantity,
      price: product.price,
    };
  });

  orderItems.forEach((orderItem) => {
    subtractProductStock(orderItem.product, orderItem.quantity);
  });

  const createdOrder: Order = {
    id: orderIdAutoIncrement++,
    date: new Date(),
    customer: orderingCustomer,
    items: orderItems,
    status: 'pending',
  };
  ordersFakeDatabase.push(createdOrder);
  return createdOrder;
}

export { placeOrder };
export type { CreateOrderInput };
