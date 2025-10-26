import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/src/pages/content',
    rollupOptions: {
      input: resolve(__dirname, 'src/pages/content/index.tsx'),
      output: {
        entryFileNames: 'index.js',
        format: 'iife',
        name: 'CashCowContentScript',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
});




