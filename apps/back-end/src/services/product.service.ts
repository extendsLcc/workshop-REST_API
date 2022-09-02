import { Prisma, PrismaClient } from '@prisma/client';

type ListProductsFilterParams = {
  search?: string;
  categoryId?: number;
  status?: boolean;
};
class ProductService {
  constructor(private readonly prisma: PrismaClient) {}

  async createProduct(newProductParams: Omit<Prisma.ProductUncheckedCreateInput, 'status'>) {
    return await this.prisma.product.create({
      data: {
        ...newProductParams,
        status: true,
      },
    });
  }

  async listProducts({ search, categoryId, status = true }: ListProductsFilterParams) {
    return await this.prisma.product.findMany({
      where: {
        status: status,
        ...(search && { name: { contains: search } }),
        ...(categoryId && { categoryId: categoryId }),
      },
    });
  }

  async getProductById(productId: number) {
    return await this.prisma.product.findUnique({ where: { id: productId } });
  }

  async updateProduct(productId: number, updateProductParams: Prisma.ProductUncheckedUpdateInput) {
    return await this.prisma.product.update({
      where: { id: productId },
      data: updateProductParams,
    });
  }

  async toggleProductStatusById(productId: number) {
    const { status: productCurrentStatus } = await this.prisma.product.findUniqueOrThrow({
      where: { id: productId },
      select: { status: true },
    });
    return await this.prisma.product.update({
      where: { id: productId },
      data: { status: !productCurrentStatus },
    });
  }

  async deleteProductById(productId: number) {
    return await this.prisma.product.delete({ where: { id: productId } });
  }
}

export { ProductService };
