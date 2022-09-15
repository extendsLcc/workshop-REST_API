<script setup lang="ts">
  import type { Product } from './@types';
  import CategoriesSelect from './components/CategoriesSelect.vue';
  import Content from '@/components/Content.vue';
  import Spinner from '@/components/Spinner.vue';
  import Form from '@/components/Form.vue';
  import TextInput from '@/components/TextInput.vue';
  import Alert from '@/components/Alert.vue';

  type UpdateProductPayload = Partial<Omit<Product, 'id' | 'category' | 'status'>>;

  const { product: productId } = defineProps<{
    product: string;
  }>();
  const router = useRouter();
  const retrieveProductRequest = useApi<Product>();
  const updateProductRequest = useApi<Product>();

  const product = reactive<UpdateProductPayload>({
    name: '',
    description: '',
    price: undefined,
    stock: undefined,
    categoryId: undefined,
  });
  let alertRef = $ref({
    type: 'success' as 'success' | 'error',
    message: '',
  });

  function handleFormSubmit() {
    updateProductRequest.put(`/products/${productId}`, product);
  }

  onMounted(() => {
    retrieveProductRequest.get(`/products/${productId}`);
  });

  retrieveProductRequest.onSuccess((retrievedProduct) => {
    product.name = retrievedProduct.name;
    product.description = retrievedProduct.description;
    product.price = retrievedProduct.price;
    product.stock = retrievedProduct.stock;
    product.categoryId = retrievedProduct.categoryId;
  });
  retrieveProductRequest.onFail((_, response) => {
    if (response?.status === 404) {
      router.push('/404');
      return;
    }
    alertRef = {
      type: 'error',
      message: `Failed to retrieve product #${productId}`,
    };
  });
  updateProductRequest.onSuccess((createdProduct) => {
    alertRef = {
      type: 'success',
      message: `Product #${createdProduct.id} - ${createdProduct.name} updated successfully`,
    };
  });
  updateProductRequest.onFail(() => {
    alertRef = {
      type: 'error',
      message: `Failed to update product`,
    };
  });
</script>

<template>
  <Content title="Edit Product">
    <template #toolbar>
      <router-link to="/products" class="btn btn-outline">back</router-link>
    </template>

    <Alert v-if="alertRef.message" :type="alertRef.type">
      {{ alertRef.message }}
    </Alert>

    <Spinner v-if="retrieveProductRequest.isLoading.value" />
    <Form v-else :is-loading="updateProductRequest.isLoading" @submit="handleFormSubmit">
      <div class="flex flex-wrap sm:(flex-nowrap gap-4)">
        <TextInput
          v-model="product.name"
          name="name"
          placeholder="product name"
          class="flex-basis-full sm:flex-basis-1/2"
        />
        <CategoriesSelect
          v-model.number:categoryId="product.categoryId"
          name="category"
          class="flex-basis-full sm:flex-basis-1/2"
        />
      </div>
      <TextInput v-model="product.description" name="description" placeholder="product description" />
      <div class="flex flex-wrap sm:(flex-nowrap gap-4)">
        <TextInput
          v-model.number="product.price"
          name="price in cents"
          placeholder="product price in cents"
          type="number"
          class="flex-basis-full sm:flex-basis-1/2"
          min="1"
          step="1"
        />
        <TextInput
          v-model.number="product.stock"
          name="stock"
          placeholder="product stock"
          type="number"
          class="flex-basis-full sm:flex-basis-1/2"
          step="1"
        />
      </div>
    </Form>
  </Content>
</template>
