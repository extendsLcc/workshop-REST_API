import { Category } from '@/entities';
import { dummyCategories } from '@/test/dummies';

let categoryIdAutoIncrement = 1;
const categoriesFakeDatabase: Category[] = [...dummyCategories];

type CategoryWithoutId = Omit<Category, 'id'>;

function createCategory(category: CategoryWithoutId) {
  const createdCategory = {
    id: categoryIdAutoIncrement++,
    ...category,
  };
  categoriesFakeDatabase.push(createdCategory);
  return createdCategory;
}

function listCategories() {
  return categoriesFakeDatabase;
}

function getCategoryById(categoryId: number) {
  return categoriesFakeDatabase.find((category) => category.id === categoryId);
}

function updateCategory(categoryId: number, category: CategoryWithoutId) {
  const categoryToUpdate = categoriesFakeDatabase.find((category) => category.id === categoryId);
  if (categoryToUpdate) {
    Object.assign(categoryToUpdate, category);
  }
  return categoryToUpdate;
}

function deleteCategoryById(categoryId: number): boolean {
  const categoryToDeleteIndex = categoriesFakeDatabase.findIndex((category) => category.id === categoryId);
  if (categoryToDeleteIndex >= 0) {
    categoriesFakeDatabase.splice(categoryToDeleteIndex, 1);
    return true;
  }
  return false;
}

export { createCategory, listCategories, getCategoryById, updateCategory, deleteCategoryById };
export type { CategoryWithoutId };
