import {
  CreateOrderInput,
  isValidOrderStatus,
  listOrders,
  placeOrder,
  updateOrderStatus,
} from '@/services/order.service';
import { FastifyInstance } from 'fastify';
import HttpStatus from 'http-status';

async function ordersRoutes(fastify: FastifyInstance) {
  // List all orders
  fastify.get('/orders', async () => {
    return listOrders();
  });

  // Place Order endpoint
  fastify.post<{
    Body: CreateOrderInput;
  }>('/orders', async (request, reply) => {
    return placeOrder(request.body)
      .then((createdOrder) => {
        return reply.status(HttpStatus.CREATED).send(createdOrder);
      })
      .catch((error) => {
        return reply.status(HttpStatus.BAD_REQUEST).send(error);
      });
  });

  // Update Order Status endpoint
  fastify.patch<{
    Params: { orderId: string };
    Body: { status: string };
  }>('/orders/:orderId', async (request, reply) => {
    const { orderId } = request.params;
    const { status } = request.body;
    if (isValidOrderStatus(status)) {
      return updateOrderStatus(orderId, status)
        .then(() => {
          return reply.status(HttpStatus.NO_CONTENT).send();
        })
        .catch((error) => {
          return reply.status(HttpStatus.BAD_REQUEST).send(error);
        });
    }
    return reply.status(HttpStatus.BAD_REQUEST).send(new Error(`Invalid Order status ${status}`));
  });
}

export { ordersRoutes };
