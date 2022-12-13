import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import vue from '@vitejs/plugin-vue';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';
import Unocss from 'unocss/vite';
import AutoImport from 'unplugin-auto-import/vite';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    vue({
      reactivityTransform: true,
    }),
    Pages({ extensions: ['vue'], exclude: ['**/components/*.vue'] }),
    Layouts(),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue/macros', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables'],
      vueTemplate: true,
    }),
    Unocss(),
    EnvironmentPlugin({ GITPOD_WORKSPACE_URL: null }, { defineOn: 'import.meta.env' }),
  ],
});
