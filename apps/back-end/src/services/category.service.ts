import { Category, PrismaClient } from '@prisma/client';

type CategoryWithoutId = Omit<Category, 'id'>;
class CategoryService {
  constructor(private readonly prisma: PrismaClient) {}

  async createCategory(newCategoryInput: CategoryWithoutId) {
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

  async updateCategory(categoryId: number, category: CategoryWithoutId) {
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
export type { CategoryWithoutId };
