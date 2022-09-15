import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import App from './App.vue';
import generatedRoutes from '~pages';

import '@unocss/reset/tailwind.css';
import '@kidonng/daisyui/index.css';
import 'uno.css';

const routes = setupLayouts(generatedRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
