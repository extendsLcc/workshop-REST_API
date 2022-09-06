import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from '~pages';

import '@unocss/reset/tailwind.css';
import '@kidonng/daisyui/index.css';
import 'uno.css';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount('#app');
