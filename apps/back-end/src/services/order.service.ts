import { Order, OrderItem, OrderStatus, ValidOrderStatus } from '@/entities';
import { dummyOrders } from '@/test/dummies';
import { isInArray } from '@/util';
import { getCustomerById } from './customer.service';
import { getProductById, subtractProductStock } from './product.service';

let orderIdAutoIncrement = dummyOrders.length + 1;
const ordersFakeDatabase: Order[] = [...dummyOrders];

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
    id: `${orderIdAutoIncrement++}`.padStart(4, '0'),
    date: new Date(),
    customer: orderingCustomer,
    items: orderItems,
    status: 'pending',
  };
  ordersFakeDatabase.push(createdOrder);
  return createdOrder;
}

function listOrders() {
  return ordersFakeDatabase;
}

async function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
  const order = ordersFakeDatabase.find((order) => order.id === orderId);
  if (!order) {
    throw new Error(`Order with id ${orderId} not found`);
  }
  if (['cancelled', 'completed', 'refunded'].includes(order.status)) {
    throw new Error(`Order with id ${orderId} is already ${order.status} and cannot be updated`);
  }
  if (['cancelled', 'refunded'].includes(newStatus)) {
    order.items.forEach((orderItem) => {
      subtractProductStock(orderItem.product, -orderItem.quantity);
    });
  }
  order.status = newStatus;
}

function isValidOrderStatus(statusText: string): statusText is OrderStatus {
  return isInArray(statusText, ValidOrderStatus);
}

export { placeOrder, listOrders, updateOrderStatus, isValidOrderStatus };
export type { CreateOrderInput };
