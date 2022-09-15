<script setup lang="ts">
  const { isDrawerOpen = false } = defineProps<{
    isDrawerOpen?: boolean;
  }>();
</script>

<template>
  <header
    class="sticky top-0 z-30 flex h-16 w-full justify-center bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content shadow-xl"
  >
    <nav class="navbar bg-base-100">
      <label class="swap swap-rotate lg:hidden" for="aside-drawer" :class="{ 'swap-active': isDrawerOpen }">
        <!-- hamburger icon -->
        <svg
          class="swap-off fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
        </svg>

        <!-- close icon -->
        <svg
          class="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
        >
          <polygon
            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
          />
        </svg>
      </label>

      <div class="flex-none tooltip tooltip-left ml-auto" data-tip="github">
        <a
          class="btn btn-square btn-ghost"
          href="https://github.com/extendsLcc/Workshop-REST_API_for_beginners_with_nodejs"
          target="_blank"
        >
          <i class="i-mdi-github text-2xl"></i>
        </a>
      </div>
    </nav>
  </header>
</template>
