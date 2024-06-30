import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    // enable jest-like global test APIs
    globals: true,
    environment: 'happy-dom'
  },
  plugins: [react()],
})
