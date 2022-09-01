import { Product } from '@/entities';
import { getCategoryById } from './category.service';

let productIdAutoIncrement = 1;
const productsFakeDatabase: Product[] = [];

type ProductInput = Omit<Product, 'id' | 'category'> & { categoryId: number };

async function createProduct(product: Omit<ProductInput, 'status'>) {
  const { categoryId, ...newProductParams } = product;
  const matchingCategory = getCategoryById(categoryId);
  if (!matchingCategory) {
    throw new Error('Category not found');
  }
  const createdProduct = {
    id: productIdAutoIncrement++,
    ...newProductParams,
    status: true,
    category: matchingCategory,
  };
  productsFakeDatabase.push(createdProduct);
  return createdProduct;
}

type ListProductsFilterParams = {
  search?: string;
  categoryId?: number;
  status?: boolean;
};

function listProducts({ search, categoryId, status = true }: ListProductsFilterParams) {
  let filteredProducts = productsFakeDatabase.filter((product) => product.status === status);
  if (search) {
    filteredProducts = filteredProducts.filter((product) => product.name.includes(search));
  }
  if (categoryId) {
    filteredProducts = filteredProducts.filter((product) => product.category.id === categoryId);
  }
  return filteredProducts;
}

function getProductById(productId: number) {
  return productsFakeDatabase.find((product) => product.id === productId);
}

async function updateProduct(productId: number, product: ProductInput) {
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
