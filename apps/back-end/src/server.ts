import { loggerConfig } from './logger';
import { fastify as fastifyFactory } from 'fastify';
import { categoryRoutes } from './routes/categories.routes';
import { productsRoutes } from './routes/products.routes';
import { customerRoutes } from './routes/customers.routes';

const fastify = fastifyFactory({
  logger: loggerConfig,
});

fastify.register(categoryRoutes);
fastify.register(productsRoutes);
fastify.register(customerRoutes);

export { fastify };
