import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'

export default defineConfig({
  plugins: [
    // Generates src/routeTree.gen.ts from src/routes. Must come before the
    // React plugin so the generated routes get transformed too.
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
  ],
  server: {
    host: true,
    port: 5173,
    // Dev server only. On the host the backend is on localhost; inside the dev
    // container it is the `backend` service, so the target is overridable.
    proxy: {
      '/api': {
        target: process.env.VITE_PROXY_TARGET ?? 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
})
