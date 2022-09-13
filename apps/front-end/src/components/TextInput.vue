<script setup lang="ts">
  const {
    value,
    name,
    error = undefined,
  } = defineProps<{
    value: string;
    name: string;
    error?: string;
  }>();
  const emit = defineEmits(['update:value']);

  function handleInputChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      emit('update:value', event.target.value.trim());
    }
  }
</script>

<template>
  <div class="form-control" :for="name">
    <label class="label">
      <span class="label-text capitalize">{{ name }}</span>
    </label>
    <input
      :id="name"
      :name="name"
      :value="value"
      type="text"
      placeholder="category name"
      class="input input-bordered"
      @input="handleInputChange"
    />
    <label v-if="error" class="label" :for="name">
      <span class="label-text-alt">{{ error }}</span>
    </label>
  </div>
</template>
