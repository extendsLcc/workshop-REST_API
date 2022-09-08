<script setup lang="ts">
  import SideNav from '@/components/SideNav.vue';
  import NavBar from '@/components/NavBar.vue';

  const isDrawerOpen = $ref(false);
</script>

<template>
  <section class="drawer drawer-mobile">
    <input id="aside-drawer" v-model="isDrawerOpen" type="checkbox" class="drawer-toggle" />
    <SideNav class="drawer-side">
      <label for="aside-drawer" class="drawer-overlay z-1"></label>
    </SideNav>
    <section class="drawer-content bg-base-200 flex flex-col">
      <NavBar :is-drawer-open="isDrawerOpen" />
      <RouterView />
    </section>
  </section>
</template>
