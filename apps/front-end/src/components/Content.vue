<script setup lang="ts">
  import Breadcrumb from '@/components/Breadcrumb.vue';

  const { title } = defineProps<{
    title: string;
  }>();
</script>

<template>
  <main class="p-6 pt-5 md:(p-10 pt-5)">
    <Breadcrumb />
    <article class="card lg:card-side bg-base-100 shadow-xl p-5 pt-2" style="overflow: unset">
      <header class="navbar flex-wrap text-primary-content rounded-box space-x-1 p-0">
        <div class="mx-2 flex-1 justify-center px-2 md:flex md:justify-start">
          <span class="text-xl font-bold">{{ title }}</span>
        </div>
        <slot name="toolbar" />
      </header>
      <div class="divider mt-0"></div>
      <slot />
    </article>
  </main>
</template>
