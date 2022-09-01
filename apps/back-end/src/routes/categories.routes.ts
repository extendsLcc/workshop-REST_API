import { CategoryService } from '@/services/category.service';
import { IdRouteParam, isPrismaRecordNotFoundError } from '@/util';
import { Prisma } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import HttpStatus from 'http-status';

async function categoryRoutes(fastify: FastifyInstance) {
  const categoryService = new CategoryService(fastify.prisma);

  // List all categories
  fastify.get('/categories', async () => {
    return categoryService.listCategories();
  });

  // Create a new category
  fastify.post<{
    Body: Prisma.CategoryCreateInput;
  }>('/categories', async (request, reply) => {
    const { name } = request.body;
    const createdCategory = await categoryService.createCategory({ name });
    return reply.status(HttpStatus.CREATED).send(createdCategory);
  });

  // Get a category by id
  fastify.get<{
    Params: IdRouteParam;
  }>('/categories/:id', async (request, reply) => {
    const { id } = request.params;
    const category = await categoryService.getCategoryById(Number(id));
    if (category) {
      return category;
    }
    return reply.status(HttpStatus.NOT_FOUND).send();
  });

  // Update a category by id
  fastify.put<{
    Params: IdRouteParam;
    Body: Prisma.CategoryUpdateInput;
  }>('/categories/:id', async (request, reply) => {
    const { id } = request.params;
    return await categoryService.updateCategory(Number(id), request.body).catch((error) => {
      if (isPrismaRecordNotFoundError(error)) {
        return reply.status(HttpStatus.NOT_FOUND).send();
      }
      throw error;
    });
  });

  // Delete a category by id
  fastify.delete<{
    Params: IdRouteParam;
  }>('/categories/:id', async (request, reply) => {
    const { id } = request.params;
    return categoryService
      .deleteCategoryById(Number(id))
      .then(() => reply.status(HttpStatus.NO_CONTENT).send())
      .catch((error) => {
        if (isPrismaRecordNotFoundError(error)) {
          return reply.status(HttpStatus.NOT_FOUND).send();
        }
        throw error;
      });
  });
}

export { categoryRoutes };
