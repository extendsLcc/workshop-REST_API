<script setup lang="ts">
  import type { Category } from './@types';
  import Content from '@/components/Content.vue';
  import Form from '@/components/Form.vue';
  import TextInput from '@/components/TextInput.vue';
  import Alert from '@/components/Alert.vue';

  const createCategoryRequest = useApi<Category>();

  const category = reactive({
    name: '',
  });
  let alertRef = $ref({
    type: 'success' as 'success' | 'error',
    message: '',
  });

  function handleFormSubmit() {
    createCategoryRequest.post('/categories', category);
  }

  function handleFormReset() {
    createCategoryRequest.reset();
    alertRef.message = '';
  }

  createCategoryRequest.onSuccess((createdCategory) => {
    category.name = '';
    alertRef = {
      type: 'success',
      message: `Category #${createdCategory.id} - ${createdCategory.name} created successfully`,
    };
  });
  createCategoryRequest.onFail(() => {
    alertRef = {
      type: 'error',
      message: `Failed to create category`,
    };
  });
</script>

<template>
  <Content title="New Category">
    <template #toolbar>
      <router-link to="/categories" class="btn btn-outline">back</router-link>
    </template>

    <Alert v-if="alertRef.message" :type="alertRef.type">
      {{ alertRef.message }}
    </Alert>

    <Form :is-loading="createCategoryRequest.isLoading" @submit="handleFormSubmit" @reset="handleFormReset">
      <TextInput v-model:value="category.name" name="name" placeholder="category name" />
    </Form>
  </Content>
</template>
