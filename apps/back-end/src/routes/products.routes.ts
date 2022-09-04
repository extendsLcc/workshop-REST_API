import { Prisma } from '@prisma/client';
import HttpStatus from 'http-status';
import { ProductService } from '@/services/product.service';
import { FastifyInstance } from 'fastify';
import { IdRouteParam } from '@/util';
import { isPrismaForeignKeyConstraintFailedError, isPrismaRecordNotFoundError } from '@/exception';

async function productsRoutes(fastify: FastifyInstance) {
  const productService = new ProductService(fastify.prisma);

  // List all products
  fastify.get<{
    Querystring: {
      search?: string;
      categoryId?: string;
      onlyDisabled?: string;
    };
  }>('/products', async (request) => {
    const { search, categoryId, onlyDisabled } = request.query;
    return await productService.listProducts({ search, categoryId: Number(categoryId), status: !onlyDisabled });
  });

  // Create a new product
  fastify.post<{
    Body: Prisma.ProductUncheckedCreateInput;
  }>('/products', async (request, reply) => {
    const { name, description, price, stock, categoryId } = request.body;
    return await productService
      .createProduct({
        name,
        description,
        price,
        stock,
        categoryId,
      })
      .then((createProduct) => {
        return reply.status(HttpStatus.CREATED).send(createProduct);
      })
      .catch((error) => {
        if (isPrismaForeignKeyConstraintFailedError(error)) {
          return reply.status(HttpStatus.BAD_REQUEST).send(error);
        }
        throw error;
      });
  });

  // Get a product by id
  fastify.get<{
    Params: IdRouteParam;
  }>('/products/:id', async (request, reply) => {
    const { id } = request.params;
    const product = await productService.getProductById(Number(id));
    if (product) {
      return product;
    }
    return reply.status(HttpStatus.NOT_FOUND).send();
  });

  // Update a product by id
  fastify.put<{
    Params: IdRouteParam;
    Body: Prisma.ProductUncheckedUpdateInput;
  }>('/products/:id', async (request, reply) => {
    const { id } = request.params;
    const { name, description, price, stock, categoryId } = request.body;
    return await productService
      .updateProduct(Number(id), { name, description, price, stock, categoryId })
      .then((product) => {
        return product;
      })
      .catch((error) => {
        if (isPrismaRecordNotFoundError(error)) {
          return reply.status(HttpStatus.NOT_FOUND).send();
        }
        if (isPrismaForeignKeyConstraintFailedError(error)) {
          return reply.status(HttpStatus.BAD_REQUEST).send(error);
        }
        throw error;
      });
  });

  // Toggle product status by id
  fastify.patch<{
    Params: IdRouteParam;
  }>('/products/:id', async (request, reply) => {
    const { id } = request.params;
    return await productService
      .toggleProductStatusById(Number(id))
      .then(() => {
        return reply.status(HttpStatus.NO_CONTENT).send();
      })
      .catch((error) => {
        if (isPrismaRecordNotFoundError(error)) {
          return reply.status(HttpStatus.NOT_FOUND).send();
        }
        throw error;
      });
  });

  // Delete a product by id
  fastify.delete<{
    Params: IdRouteParam;
  }>('/products/:id', async (request, reply) => {
    const { id } = request.params;
    return await productService
      .deleteProductById(Number(id))
      .then(() => {
        return reply.status(HttpStatus.NO_CONTENT).send();
      })
      .catch((error) => {
        if (isPrismaRecordNotFoundError(error)) {
          return reply.status(HttpStatus.NOT_FOUND).send();
        }
        throw error;
      });
  });
}

export { productsRoutes };
