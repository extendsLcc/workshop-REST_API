import { Category } from '@/entities';

let categoryIdAutoIncrement = 1;
const categoriesFakeDatabase: Category[] = [];

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

function getCategory(id: number) {
  return categoriesFakeDatabase.find((category) => category.id === id);
}

function updateCategory(id: number, category: CategoryWithoutId) {
  const categoryToUpdate = categoriesFakeDatabase.find((category) => category.id === id);
  if (categoryToUpdate) {
    Object.assign(categoryToUpdate, category);
  }
  return categoryToUpdate;
}

function deleteCategory(id: number): boolean {
  const categoryToDeleteIndex = categoriesFakeDatabase.findIndex((category) => category.id === id);
  if (categoryToDeleteIndex > 0) {
    categoriesFakeDatabase.splice(categoryToDeleteIndex, 1);
    return true;
  }
  return false;
}

export { createCategory, listCategories, getCategory, updateCategory, deleteCategory };
export type { CategoryWithoutId };
