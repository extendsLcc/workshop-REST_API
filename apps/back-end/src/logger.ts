import type { FastifyServerOptions } from 'fastify';

export const loggerConfig: FastifyServerOptions['logger'] = {
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'HH:MM:ss.l',
      ignore: 'pid,hostname',
    },
  },
};
