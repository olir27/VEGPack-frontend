import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // or 5174 — whichever your app uses
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
