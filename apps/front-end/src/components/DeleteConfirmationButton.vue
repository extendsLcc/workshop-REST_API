<script setup lang="ts">
  import type { MaybeRef } from '@vueuse/core';

  const { isLoading = false } = defineProps<{
    isLoading?: MaybeRef<boolean>;
  }>();
  const emit = defineEmits(['onDeleteConfirmation']);

  function handleConfirmation() {
    emit('onDeleteConfirmation');
  }

  function handleCloseDropdown() {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }

  watchEffect(() => {
    if (!unref(isLoading)) {
      handleCloseDropdown();
    }
  });
</script>

<template>
  <div class="dropdown dropdown-top dropdown-end">
    <button class="btn btn-outline btn-error">Delete</button>
    <div tabindex="0" class="dropdown-content py-2">
      <div class="card compact bg-neutral-focus text-neutral-content rounded-box shadow-xl">
        <div class="card-body">
          <h2 class="card-title font-extrabold capitalize">Delete confirmation</h2>
          <p class="text-neutral-content text-sm text-opacity-80">
            <slot />
          </p>
          <div class="mt-4 flex justify-end gap-2">
            <button class="btn btn-outline" @click="handleCloseDropdown">No</button>
            <button
              class="btn btn-outline btn-error"
              :class="{ loading: unref(isLoading) }"
              @click="handleConfirmation"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
