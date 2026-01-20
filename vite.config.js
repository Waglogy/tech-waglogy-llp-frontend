import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    port: 3000,
  },
  build: {
    // Ensure proper chunking for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'framer-motion': ['framer-motion'],
        }
      }
    }
  },
  // Optimize for SEO
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})
