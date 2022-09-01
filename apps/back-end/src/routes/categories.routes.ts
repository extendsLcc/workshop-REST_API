import { CategoryWithoutId, createCategory, listCategories } from '@/services/category.service';
import { FastifyInstance } from 'fastify';
import HttpStatus from 'http-status';

async function categoryRoutes(fastify: FastifyInstance) {
  // List all categories
  fastify.get('/categories', () => {
    return listCategories();
  });
  // Create a new category
  fastify.post<{
    Body: CategoryWithoutId;
  }>('/categories', async (request, reply) => {
    const { name } = request.body;
    const createdCategory = createCategory({ name });
    return reply.status(HttpStatus.CREATED).send(createdCategory);
  });
}

export { categoryRoutes };
