import { loggerConfig } from './logger';
import { fastify as fastifyFactory } from 'fastify';
import cors from '@fastify/cors';
import { categoriesRoutes } from './routes/categories.routes';
import { productsRoutes } from './routes/products.routes';
import { customersRoutes } from './routes/customers.routes';
import { ordersRoutes } from './routes/orders.routes';
import fastifyPrismaClient from 'fastify-prisma-client';

const fastify = fastifyFactory({
  logger: loggerConfig,
});

fastify.register(fastifyPrismaClient, {});
fastify.register(cors, {
  credentials: true,
});

fastify.register(categoriesRoutes);
fastify.register(productsRoutes);
fastify.register(customersRoutes);
fastify.register(ordersRoutes);

export { fastify };
