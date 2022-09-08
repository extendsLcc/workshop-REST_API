<template>
  <section>
    <slot />
    <aside class="bg-base-100 w-80">
      <div class="min-h-[4rem] z-20 sticky top-0 flex items-center gap-2" p="x-4 y-2" bg="base-100">
        <a href="/" aria-current="page" aria-label="Homepage" class="flex-0 px-2">
          <div class="font-title text-primary-content text-lg transition-all duration-200 md:text-3xl">
            <span>Order</span> <span class="text-base-content">API</span>
          </div>
        </a>
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
          <a id="" href="/categories" class="flex gap-4">
            <span class="flex-1">List</span>
          </a>
        </li>
        <li>
          <a id="" href="/categories/new" class="flex gap-4">
            <span class="flex-1">Register</span>
          </a>
        </li>
        <li></li>
        <li class="menu-title">
          <span class="flex items-center gap-2">
            <i class="i i-mdi-package-variant-closed text-xl!"></i>
            Products
          </span>
        </li>
        <li>
          <a id="" href="/products" class="flex gap-4"> <span class="flex-1">List</span> </a>
        </li>
        <li>
          <a id="" href="/products/new" class="flex gap-4"> <span class="flex-1">Register</span> </a>
        </li>
        <li></li>
        <li class="menu-title">
          <span class="flex items-center gap-2">
            <i class="i i-mdi-account-multiple text-xl!"></i>
            Customers
          </span>
        </li>
        <li>
          <a id="" href="/customers" class="flex gap-4"> <span class="flex-1">List</span> </a>
        </li>
        <li>
          <a id="" href="/customers/new" class="flex gap-4"> <span class="flex-1">Register</span> </a>
        </li>
        <li></li>
        <li class="menu-title">
          <span class="flex items-center gap-2">
            <i class="i i-mdi-cart text-xl!"></i>
            Orders
          </span>
        </li>
        <li>
          <a id="" href="/orders" class="flex gap-4"> <span class="flex-1">List</span> </a>
        </li>
        <li>
          <a id="" href="/orders/new" class="flex gap-4"> <span class="flex-1">Register</span> </a>
        </li>
      </ul>
    </aside>
  </section>
</template>
