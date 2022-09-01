import { loggerConfig } from './logger';
import { fastify as fastifyFactory } from 'fastify';

const fastify = fastifyFactory({
  logger: loggerConfig,
});

export { fastify };
