<script setup lang="ts">
  import type { Customer } from '@/pages/customers/@types';

  const { modelValue, name } = defineProps<{
    name: string;
    modelValue?: number;
  }>();
  const emit = defineEmits(['update:modelValue']);

  const listCustomersRequest = useApi<Customer[]>();

  onMounted(() => {
    listCustomersRequest.get('/customers');
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
      v-if="listCustomersRequest.isLoading.value"
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
        {{ listCustomersRequest.isFailed.value ? 'Failed to load customers' : 'Select...' }}
      </option>
      <option v-for="products in listCustomersRequest.data.value" :key="products.id" :value="products.id">
        {{ products.name }}
      </option>
    </select>
  </div>
</template>
