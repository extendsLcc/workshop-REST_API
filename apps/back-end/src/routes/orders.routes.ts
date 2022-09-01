import { CreateOrderInput, placeOrder } from '@/services/order.service';
import { FastifyInstance } from 'fastify';
import HttpStatus from 'http-status';

async function customerRoutes(fastify: FastifyInstance) {
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
}

export { customerRoutes };
