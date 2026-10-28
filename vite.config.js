import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const apiPort = env.PORT || '3002';

  return {
    plugins: [react()],
    server: { proxy: { '/api': `http://localhost:${apiPort}` } },
  };
});
