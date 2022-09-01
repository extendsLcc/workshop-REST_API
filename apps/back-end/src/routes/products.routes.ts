import HttpStatus from 'http-status';
import {
  createProduct,
  deleteProductById,
  getProductById,
  listProducts,
  ProductInput,
  updateProduct,
} from '@/services/product.service';
import { FastifyInstance } from 'fastify';
import { IdRouteParam } from '@/util';

async function productsRoutes(fastify: FastifyInstance) {
  // List all products
  fastify.get('/products', () => {
    return listProducts();
  });
  // Create a new product
  fastify.post<{
    Body: ProductInput;
  }>('/products', async (request, reply) => {
    const createdProduct = createProduct(request.body);
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
    const updatedProduct = updateProduct(Number(id), request.body);
    if (updatedProduct) {
      return updatedProduct;
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
