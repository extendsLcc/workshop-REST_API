<script setup lang="ts">
  const route = useRoute();
</script>

<template>
  <section>
    <slot />
    <aside class="bg-base-100 w-80">
      <div class="min-h-[4rem] z-20 sticky top-0 flex items-center gap-2" p="x-4 y-2" bg="base-100">
        <RouterLink to="/" aria-current="page" aria-label="Homepage" class="flex-0 px-2">
          <div class="font-title text-primary-content text-lg transition-all duration-200 md:text-3xl">
            <span>Order</span> <span class="text-base-content">API</span>
          </div>
        </RouterLink>
      </div>
      <ul class="menu menu-compact flex flex-col p-0 px-4">
        <li></li>
        <li class="menu-title">
          <span class="flex items-center gap-2">
            <i class="i i-mdi-tag-multiple text-xl!"></i>
            Categories
          </span>
        </li>
        <li>
          <RouterLink to="/categories" class="flex gap-4" :class="{ active: route.path === '/categories' }">
            <span class="flex-1">List</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/categories/new" class="flex gap-4" :class="{ active: route.path === '/categories/new' }">
            <span class="flex-1">Register</span>
          </RouterLink>
        </li>
        <li></li>
        <li class="menu-title">
          <span class="flex items-center gap-2">
            <i class="i i-mdi-package-variant-closed text-xl!"></i>
            Products
          </span>
        </li>
        <li>
          <RouterLink to="/products" class="flex gap-4" :class="{ active: route.path === '/products' }">
            <span class="flex-1">List</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/products/new" class="flex gap-4" :class="{ active: route.path === '/products/new' }">
            <span class="flex-1">Register</span>
          </RouterLink>
        </li>
        <li></li>
        <li class="menu-title">
          <span class="flex items-center gap-2">
            <i class="i i-mdi-account-multiple text-xl!"></i>
            Customers
          </span>
        </li>
        <li>
          <RouterLink to="/customers" class="flex gap-4" :class="{ active: route.path === '/customers' }">
            <span class="flex-1">List</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/customers/new" class="flex gap-4" :class="{ active: route.path === '/customers/new' }">
            <span class="flex-1">Register</span>
          </RouterLink>
        </li>
        <li></li>
        <li class="menu-title">
          <span class="flex items-center gap-2">
            <i class="i i-mdi-cart text-xl!"></i>
            Orders
          </span>
        </li>
        <li>
          <RouterLink to="/orders" class="flex gap-4" :class="{ active: route.path === '/orders' }">
            <span class="flex-1">List</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/orders/new" class="flex gap-4" :class="{ active: route.path === '/orders/new' }">
            <span class="flex-1">Register</span>
          </RouterLink>
        </li>
      </ul>
    </aside>
  </section>
</template>
