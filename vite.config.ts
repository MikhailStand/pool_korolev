import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/pool_korolev/',
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    watch: { useFsEvents: false, usePolling: true },
  },
});
