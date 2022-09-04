import { Prisma } from '@prisma/client';
import { CustomerService } from '@/services/customer.service';
import { FastifyInstance } from 'fastify';
import HttpStatus from 'http-status';

async function customerRoutes(fastify: FastifyInstance) {
  const customerService = new CustomerService(fastify.prisma);
  // List all customers
  fastify.get('/customers', () => {
    return customerService.listCustomers();
  });

  // Create a new customer
  fastify.post<{
    Body: Prisma.CustomerCreateInput;
  }>('/customers', async (request, reply) => {
    return reply.status(HttpStatus.CREATED).send(await customerService.createCustomer(request.body));
  });
}

export { customerRoutes };
