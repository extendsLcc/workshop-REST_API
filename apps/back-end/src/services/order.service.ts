import { ResourceNotFoundException } from '@/exception';
import { isInArray } from '@/util';
import { PrismaClient, Product } from '@prisma/client';

class UnavailableProductStockException extends Error {}
class InvalidOrderStatusException extends Error {}
class InvalidOrderStatusTransitionException extends Error {}

type CreateOrderInput = {
  customerId: number;
  products: {
    productId: number;
    quantity: number;
  }[];
};

const ValidOrderStatus = ['pending', 'paid', 'shipped', 'cancelled', 'completed', 'refunded'] as const;
// type OrderStatus = 'pending' | 'paid' | 'shipped' | 'cancelled' | 'completed' | 'refunded';
type OrderStatus = typeof ValidOrderStatus[number];

class OrderService {
  constructor(private readonly prisma: PrismaClient) {}

  async placeOrder(createOrderParams: CreateOrderInput) {
    const { customerId, products } = createOrderParams;
    if (!(await this.checkIfCustomerExists(customerId))) {
      throw new ResourceNotFoundException(`Customer with id ${customerId} not found`);
    }

    const productsInDatabaseMap = await this.getOrderedProductsMapFromDatabase(
      products.map((product) => product.productId),
    );
    this.checkProductsAvailability(products, productsInDatabaseMap);

    const [createdOrder] = await this.prisma.$transaction([
      this.prisma.order.create({
        data: {
          customerId,
          status: 'pending',
          OrderItem: {
            create: products.map((product) => ({
              productId: product.productId,
              quantity: product.quantity,
              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              price: product.quantity * productsInDatabaseMap.get(product.productId)!.price,
            })),
          },
        },
        include: {
          OrderItem: {
            include: {
              product: true,
            },
          },
        },
      }),
      ...products.map((product) =>
        this.prisma.product.update({
          where: { id: product.productId },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        }),
      ),
    ]);
    return createdOrder;
  }

  private async checkIfCustomerExists(customerId: number) {
    return await this.prisma.customer.findUnique({
      where: { id: customerId },
    });
  }

  private async getOrderedProductsMapFromDatabase(orderedProductsIds: number[]) {
    const orderedProducts = await this.prisma.product.findMany({
      where: {
        id: {
          in: orderedProductsIds,
        },
      },
    });
    return new Map<number, Product>(orderedProducts.map((product) => [product.id, product]));
  }

  /**
   * @param orderedProductsInput
   * @param productsInDatabaseMap
   * @throws Error if any of the products not exists or not available
   */
  private checkProductsAvailability(
    orderedProductsInput: CreateOrderInput['products'],
    productsInDatabaseMap: Map<number, Product>,
  ) {
    orderedProductsInput.forEach((orderedProduct) => {
      const productFromDatabase = productsInDatabaseMap.get(orderedProduct.productId);
      if (!productFromDatabase) {
        throw new ResourceNotFoundException(`Product with id ${orderedProduct.productId} not found`);
      }
      if (productFromDatabase.stock < orderedProduct.quantity) {
        throw new UnavailableProductStockException(
          `Product with id ${orderedProduct.productId} has insufficient stock to fulfill order, requested ${orderedProduct.quantity}, available ${productFromDatabase.stock}`,
        );
      }
    });
  }

  async listOrders() {
    return await this.prisma.order.findMany({
      include: {
        customer: true,
        OrderItem: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async getOrderById(orderId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        OrderItem: {
          include: {
            product: {
              include: {
                category: true,
              },
            },
          },
        },
      },
    });
    if (!order) {
      throw new ResourceNotFoundException(`Order with id ${orderId} not found`);
    }
    return order;
  }

  async updateOrderStatus(orderId: number, newStatus: string) {
    if (!this.isValidOrderStatus(newStatus)) {
      throw new InvalidOrderStatusException(`Invalid order status ${newStatus}`);
    }
    const orderToUpdate = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        OrderItem: true,
      },
    });

    if (!orderToUpdate) {
      throw new ResourceNotFoundException(`Order with id ${orderId} not found`);
    }

    if (['cancelled', 'completed', 'refunded'].includes(orderToUpdate.status)) {
      throw new InvalidOrderStatusTransitionException(
        `Order with id ${orderId} is already ${orderToUpdate.status} and cannot be updated`,
      );
    }

    if (['cancelled', 'refunded'].includes(newStatus)) {
      const [updatedOrder] = await this.prisma.$transaction([
        this.prisma.order.update({
          where: { id: orderId },
          data: {
            status: newStatus,
          },
        }),
        ...orderToUpdate.OrderItem.map((orderItem) =>
          this.prisma.product.update({
            where: { id: orderItem.productId },
            data: {
              stock: {
                increment: orderItem.quantity,
              },
            },
          }),
        ),
      ]);
      return updatedOrder;
    }

    return await this.prisma.order.update({
      where: { id: Number(orderId) },
      data: {
        status: newStatus,
      },
    });
  }

  private isValidOrderStatus(statusText: string): statusText is OrderStatus {
    return isInArray(statusText, ValidOrderStatus);
  }
}

export {
  OrderService,
  UnavailableProductStockException,
  InvalidOrderStatusTransitionException,
  InvalidOrderStatusException,
};
export type { CreateOrderInput };
