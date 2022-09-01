import {
  CategoryWithoutId,
  createCategory,
  listCategories,
  getCategoryById,
  updateCategory,
  deleteCategoryById,
} from '@/services/category.service';
import { IdRouteParam } from '@/util';
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

  // Get a category by id
  fastify.get<{
    Params: IdRouteParam;
  }>('/categories/:id', async (request, reply) => {
    const { id } = request.params;
    const category = getCategoryById(Number(id));
    if (category) {
      return category;
    }
    return reply.status(HttpStatus.NOT_FOUND).send();
  });

  // Update a category by id
  fastify.put<{
    Params: IdRouteParam;
    Body: CategoryWithoutId;
  }>('/categories/:id', async (request, reply) => {
    const { id } = request.params;
    const updatedCategory = updateCategory(Number(id), request.body);
    if (updatedCategory) {
      return updatedCategory;
    }
    return reply.status(HttpStatus.NOT_FOUND).send();
  });

  // Delete a category by id
  fastify.delete<{
    Params: IdRouteParam;
  }>('/categories/:id', async (request, reply) => {
    const { id } = request.params;
    const isSuccessfulDeleted = deleteCategoryById(Number(id));
    if (isSuccessfulDeleted) {
      return reply.status(HttpStatus.NO_CONTENT).send();
    }
    return reply.status(HttpStatus.NOT_FOUND).send();
  });
}

export { categoryRoutes };
