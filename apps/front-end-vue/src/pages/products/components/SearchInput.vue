<script setup lang="ts">
  const { search } = defineProps<{
    search?: string;
  }>();
  const emit = defineEmits(['update:search']);

  function handleInputChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      emit('update:search', event.target.value.trim() || undefined);
    }
  }
</script>

<template>
  <div class="form-control">
    <div tabindex="0">
      <input
        tabindex="0"
        placeholder="search..."
        class="input input-ghost input-bordered text-primary-content placeholder-primary-content focus:text-primary-content rounded-full focus:bg-transparent"
        :value="search"
        @input="handleInputChange"
      />
    </div>
  </div>
  <button
    aria-label="button component"
    class="btn btn-ghost mask mask-squircle btn-square focus:bg-base-content flex border-none focus:bg-opacity-50"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-6 w-6 stroke-current">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>
  </button>
</template>
