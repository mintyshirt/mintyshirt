import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['/src/index.tsx', './App.css']
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  }
});
