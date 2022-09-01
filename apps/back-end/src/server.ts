import { loggerConfig } from './logger';
import { fastify as fastifyFactory } from 'fastify';
import { categoryRoutes } from './routes/categories.routes';

const fastify = fastifyFactory({
  logger: loggerConfig,
});

fastify.register(categoryRoutes);

export { fastify };
