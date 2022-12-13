<script setup lang="ts">
  const {
    matched: [matchedRoute],
  } = useRoute();

  const computedBreadcrumbs = $computed(() => {
    const pathsIdentifiers = matchedRoute.path.split('/').filter(Boolean);
    const [resourceName] = pathsIdentifiers;
    return pathsIdentifiers
      .map((pathIdentifier) => {
        if (pathIdentifier.startsWith(':')) {
          if (resourceName === 'categories') {
            return 'edit category';
          }
          return `edit ${resourceName.slice(0, -1)}`;
        }
        if (pathIdentifier === 'new') {
          if (resourceName === 'categories') {
            return 'new category';
          }
          return `new ${resourceName.slice(0, -1)}`;
        }
        return pathIdentifier;
      })
      .reverse();
  });

  const [lastBreadcrumbItem, ...breadcrumbItems] = computedBreadcrumbs;
</script>

<template>
  <div class="text-sm breadcrumbs my-3">
    <ul>
      <li class="capitalize">
        <RouterLink to="/">home</RouterLink>
      </li>
      <li v-for="breadcrumbItem in breadcrumbItems" :key="breadcrumbItem" class="capitalize">
        <RouterLink :to="`/${breadcrumbItem}`">{{ breadcrumbItem }}</RouterLink>
      </li>
      <li class="capitalize">{{ lastBreadcrumbItem }}</li>
    </ul>
  </div>
</template>
