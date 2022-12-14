import { ResourceNotFoundException } from '@/shared/exception';
import {
  CreateOrderInput,
  InvalidOrderStatusException,
  InvalidOrderStatusTransitionException,
  OrderService,
  UnavailableProductStockException,
} from '@/services/order.service';
import { FastifyInstance } from 'fastify';
import HttpStatus from 'http-status';

async function ordersRoutes(fastify: FastifyInstance) {
  const orderService = new OrderService(fastify.prisma);

  // List all orders
  fastify.get('/orders', async () => {
    return await orderService.listOrders();
  });

  // Place Order endpoint
  fastify.post<{
    Body: CreateOrderInput & { date: string };
  }>('/orders', async (request, reply) => {
    const { customerId, products, date } = request.body;
    return await orderService
      .placeOrder({
        customerId,
        products,
        ...(date && { date: new Date(date) }),
      })
      .then((order) => {
        return reply.status(HttpStatus.CREATED).send(order);
      })
      .catch((error) => {
        switch (error.constructor) {
          case ResourceNotFoundException:
            return reply.status(HttpStatus.BAD_REQUEST).send(error);
          case UnavailableProductStockException:
            return reply.status(HttpStatus.UNPROCESSABLE_ENTITY).send(error);
          default:
            return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
      });
  });

  fastify.get<{
    Params: {
      id: string;
    };
  }>('/orders/:id', async (request, reply) => {
    const { id } = request.params;
    return await orderService
      .getOrderById(Number(id))
      .then((order) => {
        return reply.status(HttpStatus.OK).send(order);
      })
      .catch((error) => {
        switch (error.constructor) {
          case ResourceNotFoundException:
            return reply.status(HttpStatus.NOT_FOUND).send(error);
          default:
            return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
      });
  });

  // Update Order Status endpoint
  fastify.patch<{
    Params: { orderId: string };
    Body: { status: string };
  }>('/orders/:orderId', async (request, reply) => {
    const { orderId } = request.params;
    const { status } = request.body;
    return await orderService
      .updateOrderStatus(Number(orderId), status)
      .then(() => {
        return reply.status(HttpStatus.NO_CONTENT).send();
      })
      .catch((error) => {
        switch (error.constructor) {
          case ResourceNotFoundException:
            return reply.status(HttpStatus.BAD_REQUEST).send(error);
          case InvalidOrderStatusTransitionException:
            return reply.status(HttpStatus.UNPROCESSABLE_ENTITY).send(error);
          case InvalidOrderStatusException:
            return reply.status(HttpStatus.BAD_REQUEST).send(error);
          default:
            return reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        }
      });
  });
}

export { ordersRoutes };
