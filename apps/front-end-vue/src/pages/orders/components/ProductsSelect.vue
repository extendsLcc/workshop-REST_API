<script setup lang="ts">
  import type { Ref } from 'vue';
  import type { Product } from '@/pages/products/@types';

  const { modelValue, name, isLoading, products } = defineProps<{
    name: string;
    modelValue?: number;
    isLoading: Ref<boolean>;
    products: Product[];
  }>();
  const emit = defineEmits(['update:modelValue', 'onChange']);

  function handleInputChange(event: Event) {
    if (event.target instanceof HTMLSelectElement) {
      const selectedOption = Number(event.target.value);
      if (selectedOption <= 0) {
        emit('update:modelValue', undefined);
        return;
      }
      emit('update:modelValue', selectedOption);
      emit(
        'onChange',
        products.find((product) => product.id === selectedOption),
      );
    }
  }
</script>

<template>
  <div class="form-control">
    <label class="label" :for="name">
      <span class="label-text capitalize">{{ name }}</span>
    </label>
    <div v-if="isLoading.value" class="radial-progress animate-spin" style="--value: 70; --size: 2rem" />
    <select
      v-else
      :value="modelValue ?? -1"
      :name="name"
      class="select select-bordered"
      required
      @change="handleInputChange"
    >
      <option selected :value="-1" disabled>Select...</option>
      <option v-for="product in products" :key="product.id" :value="product.id">
        {{ product.name }}
      </option>
    </select>
  </div>
</template>
