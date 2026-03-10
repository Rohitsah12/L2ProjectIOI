import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import tailwindcss from '@tailwindcss/vite';


// https://vite.dev/config/
export default defineConfig({
   // Use root path for local dev; /CodeLytics/ for GitHub Pages production build
   base: '/',
   build:{
      outDir: 'dist'
   },
  plugins: [react(),tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})
