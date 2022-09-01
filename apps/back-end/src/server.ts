import { fastify as fastifyFactory } from 'fastify';

export const fastify = fastifyFactory({});

fastify.get('/', async (request, reply) => {
  return {
    lecturer: 'extendslcc',
    workshop: 'api-rest-basics',
    property: 'value',
  };
});

fastify.get('/query', async (request, reply) => {
  return {
    queryParams: request.query,
  };
});

fastify.post('/post', async (request, reply) => {
  return {
    body: request.body,
  };
});

fastify.get('/route/:id', async (request, reply) => {
  return {
    routeParams: request.params,
  };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
