import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';


export default defineConfig({
    plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
      port: 62626,
      
      //https: {
      //    key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      //    cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem'))
      //},
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
      '/cgi-bin': {
        target: 'https://databank.oup.com',
        changeOrigin: true,
        secure: false,
        },
        '/account': {
            target: 'http://localhost:3000',
            changeOrigin: true,
            secure: false,
        }
    },
  },
  build: {
    outDir: 'build',
  },
});