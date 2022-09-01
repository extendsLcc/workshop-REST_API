import HttpStatus from 'http-status';
import {
  createProduct,
  deleteProductById,
  getProductById,
  listProducts,
  ProductInput,
  toggleProductStatusById,
  updateProduct,
} from '@/services/product.service';
import { FastifyInstance } from 'fastify';
import { IdRouteParam } from '@/util';

async function productsRoutes(fastify: FastifyInstance) {
  // List all products
  fastify.get<{
    Querystring: {
      search?: string;
      categoryId?: string;
      onlyDisabled?: string;
    };
  }>('/products', (request) => {
    const { search, categoryId, onlyDisabled } = request.query;
    return listProducts({
      search,
      categoryId: categoryId ? Number(categoryId) : undefined,
      ...(onlyDisabled && { status: false }),
    });
  });

  // Create a new product
  fastify.post<{
    Body: ProductInput;
  }>('/products', async (request, reply) => {
    const createdProduct = await createProduct(request.body).catch((error) => {
      reply.status(HttpStatus.BAD_REQUEST).send(error);
    });
    return reply.status(HttpStatus.CREATED).send(createdProduct);
  });

  // Get a product by id
  fastify.get<{
    Params: IdRouteParam;
  }>('/products/:id', async (request, reply) => {
    const { id } = request.params;
    const product = getProductById(Number(id));
    if (product) {
      return product;
    }
    return reply.status(HttpStatus.NOT_FOUND).send();
  });

  // Update a product by id
  fastify.put<{
    Params: IdRouteParam;
    Body: ProductInput;
  }>('/products/:id', async (request, reply) => {
    const { id } = request.params;
    const updatedProduct = await updateProduct(Number(id), request.body).catch((error) => {
      reply.status(HttpStatus.BAD_REQUEST).send(error);
    });
    if (updatedProduct) {
      return updatedProduct;
    }
    return reply.status(HttpStatus.NOT_FOUND).send();
  });

  // Toggle product status by id
  fastify.patch<{
    Params: IdRouteParam;
  }>('/products/:id', async (request, reply) => {
    const { id } = request.params;
    const isStatusChangedSuccessful = toggleProductStatusById(Number(id));
    if (isStatusChangedSuccessful) {
      return reply.status(HttpStatus.NO_CONTENT).send();
    }
    return reply.status(HttpStatus.NOT_FOUND).send();
  });

  // Delete a product by id
  fastify.delete<{
    Params: IdRouteParam;
  }>('/products/:id', async (request, reply) => {
    const { id } = request.params;
    const isSuccessfulDeleted = deleteProductById(Number(id));
    if (isSuccessfulDeleted) {
      return reply.status(HttpStatus.NO_CONTENT).send();
    }
    return reply.status(HttpStatus.NOT_FOUND).send();
  });
}

export { productsRoutes };
