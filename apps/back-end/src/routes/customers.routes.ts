import { createCustomer, CustomerWithoutId, listCustomers } from '@/services/customer.service';
import { FastifyInstance } from 'fastify';
import HttpStatus from 'http-status';

async function customerRoutes(fastify: FastifyInstance) {
  // List all customers
  fastify.get('/customers', () => {
    return listCustomers();
  });

  // Create a new customer
  fastify.post<{
    Body: CustomerWithoutId;
  }>('/customers', async (request, reply) => {
    const createdCustomer = createCustomer(request.body);
    return reply.status(HttpStatus.CREATED).send(createdCustomer);
  });
}

export { customerRoutes };
