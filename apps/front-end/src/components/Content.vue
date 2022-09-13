<script setup lang="ts">
  import Breadcrumb from '@/components/Breadcrumb.vue';

  const { title } = defineProps<{
    title: string;
  }>();
</script>

<template>
  <main class="p-6 pt-5 md:(p-10 pt-5)">
    <Breadcrumb />
    <article class="card lg:card-side bg-base-100 shadow-xl p-5 pt-2">
      <header class="navbar flex-wrap text-primary-content rounded-box space-x-1 p-0">
        <div class="mx-2 flex-1 justify-center px-2 md:flex md:justify-start">
          <span class="text-xl font-bold">{{ title }}</span>
        </div>
        <slot name="toolbar" />
        <!-- <div class="form-control">
          <div tabindex="0">
            <input
              placeholder="Text Input"
              class="input input-ghost input-bordered text-primary-content placeholder-primary-content focus:text-primary-content rounded-full focus:bg-transparent"
            />
          </div>
        </div>
        <button
          aria-label="button component"
          class="btn btn-ghost mask mask-squircle btn-square focus:bg-base-content flex border-none focus:bg-opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-6 w-6 stroke-current"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button> -->
      </header>
      <div class="divider mt-0"></div>
      <slot />
    </article>
  </main>
</template>
