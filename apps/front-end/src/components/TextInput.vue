<script setup lang="ts">
  const {
    modelValue,
    modelModifiers = {},
    name,
    error = undefined,
    placeholder = '',
    type = 'text',
  } = defineProps<{
    modelValue?: number | string;
    modelModifiers?: Record<string, boolean>;
    name: string;
    error?: string;
    placeholder?: string;
    type?: 'text' | 'number';
  }>();
  const emit = defineEmits(['update:modelValue']);

  function handleInputChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      const value = event.target.value;
      if (modelModifiers.number) {
        emit('update:modelValue', Number(value));
        return;
      }
      emit('update:modelValue', event.target.value.trim());
    }
  }
</script>

<template>
  <div class="form-control">
    <label class="label" :for="name">
      <span class="label-text capitalize">{{ name }}</span>
    </label>
    <input
      :id="name"
      :name="name"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      class="input input-bordered"
      required
      @input="handleInputChange"
    />
    <label v-if="error" class="label" :for="name">
      <span class="label-text-alt">{{ error }}</span>
    </label>
  </div>
</template>
