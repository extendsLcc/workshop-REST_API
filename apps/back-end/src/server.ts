import { loggerConfig } from './logger';
import { fastify as fastifyFactory } from 'fastify';
import { categoryRoutes } from './routes/categories.routes';
import fastifyPrismaClient from 'fastify-prisma-client';

const fastify = fastifyFactory({
  logger: loggerConfig,
});

fastify.register(fastifyPrismaClient, {});
fastify.register(categoryRoutes);
fastify.register(productsRoutes);
fastify.register(customerRoutes);
fastify.register(ordersRoutes);

export { fastify };
