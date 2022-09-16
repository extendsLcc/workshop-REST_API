import { fastify as fastifyFactory } from 'fastify';

export const fastify = fastifyFactory({});

type User = {
  id: number;
  name: string;
  age: number;
};

const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    age: 30,
  },
  {
    id: 2,
    name: 'Jane Doe',
    age: 28,
  },
];

fastify.get('/users', async (request, reply) => {
  return {
    users,
  };
});

fastify.get<{
  Params: {
    id: string;
  };
}>('/users/:id', async (request, reply) => {
  const { id } = request.params;
  const user = users.find((user) => user.id === Number(id));
  return user;
});

fastify.post<{
  Body: {
    name: string;
    age: number;
  };
}>('/users', async (request, reply) => {
  const { name, age } = request.body;
  const newUser = { id: Date.now(), name, age };
  users.push(newUser);
  return newUser;
});

fastify.put<{
  Params: {
    id: string;
  };
  Body: {
    name: string;
    age: number;
  };
}>('/users/:id', async (request, reply) => {
  const { id } = request.params;
  const { name, age } = request.body;
  const updatingUser = users.find((user) => user.id === Number(id));
  if (!updatingUser) {
    return reply.code(404).send({ message: 'User not found' });
  }
  Object.assign(updatingUser, { name, age });
  return updatingUser;
});

fastify.delete<{
  Params: {
    id: string;
  };
}>('/users/:id', async (request, reply) => {
  const { id } = request.params;
  const deletingUser = users.find((user) => user.id === Number(id));
  if (!deletingUser) {
    return reply.code(404).send({ message: 'User not found' });
  }
  users.splice(users.indexOf(deletingUser), 1);
  return { message: 'User deleted' };
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
