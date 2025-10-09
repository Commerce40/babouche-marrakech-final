import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // La base doit être le nom de votre dépôt, entouré de slashes
  base: '/babouche-marrakech-final/', 
})