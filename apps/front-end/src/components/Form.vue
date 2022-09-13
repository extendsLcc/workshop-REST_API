<script setup lang="ts">
  import type { MaybeRef } from '@vueuse/core';

  const { isLoading } = defineProps<{
    isLoading: MaybeRef<boolean>;
  }>();
  const emit = defineEmits(['submit', 'reset']);
</script>

<template>
  <div class="card-body py-0">
    <form @submit.prevent="emit('submit')" @reset="emit('reset')">
      <slot />

      <div class="card-actions justify-end mt-5">
        <button class="btn btn-outline btn-error" type="reset">Reset</button>
        <button class="btn btn-primary" type="submit" :class="{ loading: unref(isLoading) }">Save</button>
      </div>
    </form>
  </div>
</template>
