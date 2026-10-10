import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // ponytail: the lazy BinsScene chunk is mostly three.js (~513 kB), loaded after first paint;
    // swap to a lighter renderer if the hero ever needs to load faster on slow networks
    chunkSizeWarningLimit: 600,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
