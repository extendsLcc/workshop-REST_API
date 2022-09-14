<script setup lang="ts">
  import type { Ref } from 'vue';

  const { columnHeaders, isLoading } = defineProps<{
    columnHeaders: string[];
    isLoading: Ref<boolean>;
  }>();
</script>

<template>
  <table class="table table-zebra w-full">
    <thead>
      <tr>
        <th v-for="(column, columnNumber) in columnHeaders" :key="columnNumber">{{ column }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="isLoading.value">
        <td :colspan="columnHeaders.length" class="text-center">
          <div class="radial-progress animate-spin center" style="--value: 70; --size: 3rem" />
        </td>
      </tr>
      <slot v-else />
    </tbody>
  </table>
</template>
