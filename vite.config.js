import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild = false }) => ({
  // Skip tailwindcss plugin for SSR — CSS is handled by the client build
  plugins: isSsrBuild ? [react()] : [react(), tailwindcss()],
  server: {
    port: 3000,
  },
  build: {
    outDir: isSsrBuild ? 'dist/server' : 'dist',
    rollupOptions: isSsrBuild
      ? { input: 'src/entry-server.jsx' }
      : {
          output: {
            manualChunks: {
              'react-vendor': ['react', 'react-dom', 'react-router-dom'],
              'framer-motion': ['framer-motion'],
            },
          },
        },
  },
  // Bundle CJS-only packages into the SSR output so Node can import them
  ssr: isSsrBuild ? { noExternal: ['react-helmet-async'] } : undefined,
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
}))
