<script setup lang="ts">
  import type { Product } from './@types';
  import Content from '@/components/Content.vue';
  import Form from '@/components/Form.vue';
  import TextInput from '@/components/TextInput.vue';
  import Alert from '@/components/Alert.vue';
  import CategoriesSelect from '@/components/CategoriesSelect.vue';

  type CreateProductPayload = Partial<Omit<Product, 'id' | 'category' | 'status'>>;

  const createProductRequest = useApi<Product>();

  const product = reactive<CreateProductPayload>({
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
    createProductRequest.post('/products', product);
  }

  function handleFormReset() {
    product.name = '';
    product.description = '';
    product.price = undefined;
    product.stock = undefined;
    product.categoryId = undefined;
    createProductRequest.reset();
    alertRef.message = '';
  }

  createProductRequest.onSuccess((createdProduct) => {
    handleFormReset();
    alertRef = {
      type: 'success',
      message: `Product #${createdProduct.id} - ${createdProduct.name} created successfully`,
    };
  });
  createProductRequest.onFail(() => {
    alertRef = {
      type: 'error',
      message: `Failed to create product`,
    };
  });
</script>

<template>
  <Content title="New Product">
    <template #toolbar>
      <router-link to="/products" class="btn btn-outline">back</router-link>
    </template>

    <Alert v-if="alertRef.message" :type="alertRef.type">
      {{ alertRef.message }}
    </Alert>

    <Form :is-loading="createProductRequest.isLoading" @submit="handleFormSubmit" @reset="handleFormReset">
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
        />
        <TextInput
          v-model.number="product.stock"
          name="stock"
          placeholder="product stock"
          type="number"
          class="flex-basis-full sm:flex-basis-1/2"
        />
      </div>
    </Form>
  </Content>
</template>
