import { defineConfig } from 'vite';
import dotenv from 'dotenv';
export default defineConfig({
  publicDir: 'public',
  base: '/slot/',
  plugins: [
    // Load environment variables
    dotenv(),
  ],
})
