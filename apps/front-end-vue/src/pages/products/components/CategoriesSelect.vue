<script setup lang="ts">
  import type { Category } from '@/pages/categories/@types';

  const { modelValue, name } = defineProps<{
    name: string;
    modelValue?: number;
  }>();
  const emit = defineEmits(['update:modelValue']);

  const listCategoriesRequest = useApi<Category[]>();

  onMounted(() => {
    listCategoriesRequest.get('/categories');
  });

  function handleInputChange(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      const selectedOption = Number(event.target.value);
      if (selectedOption <= 0) {
        emit('update:modelValue', undefined);
        return;
      }
      emit('update:modelValue', selectedOption);
    }
  }
</script>

<template>
  <div class="form-control">
    <label class="label" :for="name">
      <span class="label-text capitalize">{{ name }}</span>
    </label>
    <div
      v-if="listCategoriesRequest.isLoading.value"
      class="radial-progress animate-spin"
      style="--value: 70; --size: 2rem"
    />
    <select
      v-else
      :value="modelValue ?? -1"
      :name="name"
      class="select select-bordered"
      required
      @change="handleInputChange"
    >
      <option selected :value="-1">
        {{ listCategoriesRequest.isFailed.value ? 'Failed to load categories' : 'Select...' }}
      </option>
      <option v-for="category in listCategoriesRequest.data.value" :key="category.id" :value="category.id">
        {{ category.name }}
      </option>
    </select>
  </div>
</template>
