<script setup lang="ts">
  import SearchInput from '../../components/SearchInput.vue';
  import type { Category } from '../categories/@types';
  import type { Product } from './@types';
  import Content from '@/components/Content.vue';
  import Table from '@/components/Table.vue';
  import TableRow from '@/components/TableRow.vue';
  import DeleteConfirmationButton from '@/components/DeleteConfirmationButton.vue';
  import Alert from '@/components/Alert.vue';
  import { useApi } from '@/composables/useApi';

  type ListProductsQueryParams = {
    search?: string;
    categoryId?: string;
    onlyDisabled?: boolean;
  };

  const listProductsQueryParams = $ref<ListProductsQueryParams>({
    categoryId: undefined,
  });
  const listProductsRequest = useApi<Product[]>();
  const updateProductStatusRequest = useApi<Product>();
  const deleteProductRequest = useApi<Product>();
  const listCategoriesRequest = useApi<Category[]>();
  let alertRef = $ref({
    type: 'success' as 'success' | 'error',
    message: '',
  });
  let deletingProduct = $ref<Product>();

  function loadProducts() {
    listProductsRequest.get('/products', {
      params: {
        ...listProductsQueryParams,
        onlyDisabled: listProductsQueryParams.onlyDisabled ? 'on' : undefined,
      },
    });
  }

  function handleDeleteProduct(product: Product) {
    deletingProduct = product;
    deleteProductRequest.reset();
    deleteProductRequest.delete(`/products/${product.id}`);
  }

  function handleProductStatusChange(product: Product) {
    updateProductStatusRequest.reset();
    updateProductStatusRequest.patch(`/products/${product.id}`);
  }

  onMounted(() => {
    loadProducts();
    listCategoriesRequest.get('/categories');
  });

  watch(listProductsQueryParams, () => {
    loadProducts();
  });

  listCategoriesRequest.onFail(() => {
    alertRef = {
      type: 'error',
      message: 'Failed to load categories',
    };
  });
  listProductsRequest.onFail(() => {
    alertRef = {
      type: 'error',
      message: 'Failed to retrieve products',
    };
  });
  updateProductStatusRequest.onFail(() => {
    alertRef = {
      type: 'error',
      message: 'Failed to update product status',
    };
  });
  updateProductStatusRequest.onSuccess(() => {
    loadProducts();
  });
  deleteProductRequest.onSuccess(() => {
    loadProducts();
    alertRef = {
      type: 'success',
      message: `Product #${deletingProduct.id} - ${deletingProduct.name} deleted successfully`,
    };
  });
  deleteProductRequest.onFail(() => {
    alertRef = {
      type: 'error',
      message: `Failed to delete product #${deletingProduct.id} - ${deletingProduct.name}`,
    };
  });
</script>

<template>
  <Content title="Products List">
    <template #toolbar>
      <SearchInput v-model:search="listProductsQueryParams.search" />
      <router-link to="/products/new" class="btn btn-primary">New</router-link>
    </template>

    <Alert v-if="alertRef.message" :type="alertRef.type">
      {{ alertRef.message }}
    </Alert>

    <section class="flex items-center justify-between pb-4">
      <h1>Filters:</h1>
      <div class="flex space-x-2">
        <label class="label">
          <span class="label-text">Category</span>
        </label>
        <div
          v-if="listCategoriesRequest.isLoading.value"
          class="radial-progress animate-spin"
          style="--value: 70; --size: 2rem"
        />
        <select v-else v-model="listProductsQueryParams.categoryId" class="select select-bordered max-w-[200px]">
          <option selected :value="undefined">select...</option>
          <option v-for="category in listCategoriesRequest.data.value" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <label class="label">
          <span class="label-text">only disabled</span>
        </label>
        <input v-model="listProductsQueryParams.onlyDisabled" type="checkbox" class="checkbox self-center" />
      </div>
    </section>

    <Table
      :column-headers="['id', 'name', 'price', 'stock', 'category', 'status', /*'description',*/ 'action']"
      :is-loading="listProductsRequest.isLoading"
    >
      <TableRow v-for="product in listProductsRequest.data.value" :key="product.id">
        <td>{{ product.id }}</td>
        <td>{{ product.name }}</td>
        <td>{{ product.price }}</td>
        <td>{{ product.stock }}</td>
        <td>{{ product.category.name }}</td>
        <td>
          <input
            type="checkbox"
            :checked="product.status"
            class="checkbox"
            @change="handleProductStatusChange(product)"
          />
        </td>
        <!-- <td>{{ product.description }}</td> -->
        <td class="space-x-2">
          <router-link :to="`/products/${product.id}`" class="btn btn-outline">Edit</router-link>
          <DeleteConfirmationButton
            :is-loading="deleteProductRequest.isLoading"
            @on-delete-confirmation="handleDeleteProduct(product)"
          >
            Are you sure you want to delete this product?
          </DeleteConfirmationButton>
        </td>
      </TableRow>
    </Table>
  </Content>
</template>
