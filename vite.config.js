import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/' : '/', // Default to root for Vercel
  // Note: For GitHub Pages, you might need to change this to '/rct_info-hub/'
})
