// vite.config.js
const path = require('path');
import { defineConfig } from 'vite';
import { createVuePlugin as vue } from 'vite-plugin-vue2';
import CSV from './scripts/i18n/loader.js';

export default defineConfig({
  plugins: [vue(), CSV()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    dedupe: ['vue']
  },
  build: {
    /*
    rollupOptions: {
      external: ['vue']
    }
    */
  }
});
