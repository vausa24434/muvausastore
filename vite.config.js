// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://api.digiflazz.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
// });
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Mengatur port yang digunakan oleh server pengembangan
    proxy: {
      '/api': {
        target: 'https://api.digiflazz.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    outDir: 'dist', // Direktori output untuk build
    sourcemap: true, // Menghasilkan sourcemaps untuk debugging
  },
  resolve: {
    alias: {
      '@': '/src', // Alias untuk folder src
    },
  },
});
