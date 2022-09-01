import { PrismaClient, Prisma } from '@prisma/client';

class CategoryService {
  constructor(private readonly prisma: PrismaClient) {}

  async createCategory(newCategoryInput: Prisma.CategoryCreateInput) {
    return await this.prisma.category.create({
      data: newCategoryInput,
    });
  }

  async listCategories() {
    return await this.prisma.category.findMany();
  }

  async getCategoryById(categoryId: number) {
    return await this.prisma.category.findUnique({ where: { id: categoryId } });
  }

  async updateCategory(categoryId: number, category: Prisma.CategoryUpdateInput) {
    return await this.prisma.category.update({
      where: { id: categoryId },
      data: category,
    });
  }

  async deleteCategoryById(categoryId: number) {
    return await this.prisma.category.delete({ where: { id: categoryId } });
  }
}

export { CategoryService };
