import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Proxy ISS APIs — avoids HTTP mixed-content & CORS issues in browser
      '/proxy/iss-now': {
        target: 'http://api.open-notify.org',
        changeOrigin: true,
        rewrite: () => '/iss-now.json',
      },
      '/proxy/astros': {
        target: 'http://api.open-notify.org',
        changeOrigin: true,
        rewrite: () => '/astros.json',
      },
      // Proxy NewsData.io — avoids CORS issues
      '/proxy/news': {
        target: 'https://newsdata.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/proxy\/news/, '/api/1/latest'),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-map':    ['react-leaflet', 'leaflet'],
          'vendor-charts': ['recharts'],
          'vendor-ui':     ['lucide-react', 'react-hot-toast'],
          'vendor-axios':  ['axios'],
        },
      },
    },
  },
})
