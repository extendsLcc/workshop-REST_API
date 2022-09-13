<script setup lang="ts">
  import type { Category } from './@types';
  import Content from '@/components/Content.vue';
  import Table from '@/components/Table.vue';
  import TableRow from '@/components/TableRow.vue';
  import DeleteConfirmationButton from '@/components/DeleteConfirmationButton.vue';
  import Alert from '@/components/Alert.vue';
  import { useApi } from '@/composables/useApi';

  const listCategoriesRequest = useApi<Category[]>();
  const deleteCategoryRequest = useApi<Category>();
  let alertRef = $ref({
    type: 'success' as 'success' | 'error',
    message: '',
  });
  let deletingCategory = $ref<Category>();

  function loadCategories() {
    listCategoriesRequest.get('/categories');
  }

  function handleDeleteCategory(category: Category) {
    deletingCategory = category;
    deleteCategoryRequest.reset();
    deleteCategoryRequest.delete(`/categories/${category.id}`);
  }

  onMounted(() => {
    loadCategories();
  });

  listCategoriesRequest.onFail(() => {
    alertRef = {
      type: 'error',
      message: 'Failed to retrieve categories',
    };
  });
  deleteCategoryRequest.onSuccess(() => {
    loadCategories();
    alertRef = {
      type: 'success',
      message: `Category #${deletingCategory.id} - ${deletingCategory.name} deleted successfully`,
    };
  });
  deleteCategoryRequest.onFail(() => {
    alertRef = {
      type: 'error',
      message: `Failed to delete category #${deletingCategory.id} - ${deletingCategory.name}`,
    };
  });
</script>

<template>
  <Content title="Categories List">
    <template #toolbar>
      <router-link to="/categories/new" class="btn btn-primary">New</router-link>
    </template>

    <Alert v-if="alertRef.message" :type="alertRef.type">
      {{ alertRef.message }}
    </Alert>

    <Table :column-headers="['id', 'name', 'action']" :is-loading="listCategoriesRequest.isLoading">
      <TableRow v-for="category in listCategoriesRequest.data.value" :key="category.id" :category="category">
        <td>{{ category.id }}</td>
        <td>{{ category.name }}</td>
        <td class="space-x-2">
          <router-link :to="`/categories/${category.id}`" class="btn btn-outline">Edit</router-link>
          <DeleteConfirmationButton
            :is-loading="deleteCategoryRequest.isLoading"
            @on-delete-confirmation="handleDeleteCategory(category)"
          >
            Are you sure you want to delete this category?
          </DeleteConfirmationButton>
        </td>
      </TableRow>
    </Table>
  </Content>
</template>
