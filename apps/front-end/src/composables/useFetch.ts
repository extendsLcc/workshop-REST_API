import { createFetch } from '@vueuse/core';

export const useFetch = createFetch({
  baseUrl: import.meta.env.VITE_API_URL,
});
