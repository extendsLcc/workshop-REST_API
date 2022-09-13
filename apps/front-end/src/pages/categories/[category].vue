<script setup lang="ts">
  import type { Category } from './@types';
  import Spinner from '@/components/Spinner.vue';
  import Content from '@/components/Content.vue';
  import Form from '@/components/Form.vue';
  import TextInput from '@/components/TextInput.vue';
  import Alert from '@/components/Alert.vue';

  const { category: categoryId } = defineProps<{
    category: string;
  }>();
  const router = useRouter();
  const retrieveCategoryRequest = useApi<Category>();
  const updateCategoryRequest = useApi<Category>();

  const category = reactive({
    name: '',
  });
  let alertRef = $ref({
    type: 'success' as 'success' | 'error',
    message: '',
  });

  function handleFormSubmit() {
    updateCategoryRequest.put(`/categories/${categoryId}`, category);
  }

  function handleFormReset() {
    updateCategoryRequest.reset();
  }

  onMounted(() => {
    retrieveCategoryRequest.get(`/categories/${categoryId}`);
  });

  retrieveCategoryRequest.onSuccess((retrievedCategory) => {
    category.name = retrievedCategory.name;
  });
  retrieveCategoryRequest.onFail((_, response) => {
    if (response?.status === 404) {
      router.push('/404');
      return;
    }
    alertRef = {
      type: 'error',
      message: `Failed to retrieve category #${categoryId}`,
    };
  });
  updateCategoryRequest.onSuccess((updatedCategory) => {
    alertRef = {
      type: 'success',
      message: `Category #${updatedCategory.id} - ${updatedCategory.name} updated successfully`,
    };
  });
  updateCategoryRequest.onFail(() => {
    alertRef = {
      type: 'error',
      message: `Failed to update category #${categoryId}`,
    };
  });
</script>

<template>
  <Content title="Edit Category">
    <template #toolbar>
      <router-link to="/categories" class="btn btn-outline">back</router-link>
    </template>

    <Alert v-if="alertRef.message" :type="alertRef.type">
      {{ alertRef.message }}
    </Alert>

    <Spinner v-if="retrieveCategoryRequest.isLoading.value" />
    <Form v-else :is-loading="updateCategoryRequest.isLoading" @submit="handleFormSubmit" @reset="handleFormReset">
      <TextInput v-model:value="category.name" name="name" />
    </Form>
  </Content>
</template>
