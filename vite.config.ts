import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  base: '/pool_korolev/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        menu: fileURLToPath(new URL('./menu.html', import.meta.url)),
      },
    },
  },
  server: {
    host: '127.0.0.1',
    watch: { useFsEvents: false, usePolling: true },
  },
});
