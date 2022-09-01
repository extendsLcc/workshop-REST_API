import { Product } from '@/entities';
import { getCategoryById } from './category.service';

let productIdAutoIncrement = 1;
const productsFakeDatabase: Product[] = [];

type ProductInput = Omit<Product, 'id' | 'category'> & { categoryId: number };

function createProduct(product: ProductInput) {
  const { categoryId, ...newProductParams } = product;
  const matchingCategory = getCategoryById(categoryId);
  if (!matchingCategory) {
    throw new Error('Category not found');
  }
  const createdProduct = {
    id: productIdAutoIncrement++,
    ...newProductParams,
    category: matchingCategory,
  };
  productsFakeDatabase.push(createdProduct);
  return createdProduct;
}

function listProducts() {
  return productsFakeDatabase;
}

function getProductById(productId: number) {
  return productsFakeDatabase.find((product) => product.id === productId);
}

function updateProduct(productId: number, product: ProductInput) {
  const { categoryId, ...newProductParams } = product;
  const matchingCategory = getCategoryById(categoryId);
  if (!matchingCategory) {
    throw new Error('Category not found');
  }
  const productToUpdate = productsFakeDatabase.find((product) => product.id === productId);
  if (productToUpdate) {
    Object.assign(productToUpdate, {
      ...newProductParams,
      category: matchingCategory,
    });
  }
  return productToUpdate;
}

function deleteProductById(productId: number): boolean {
  const productToDeleteIndex = productsFakeDatabase.findIndex((product) => product.id === productId);
  if (productToDeleteIndex >= 0) {
    productsFakeDatabase.splice(productToDeleteIndex, 1);
    return true;
  }
  return false;
}

export { createProduct, listProducts, getProductById, updateProduct, deleteProductById };
export type { ProductInput };
