import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  preview: {
    port: 8080,
  },
  plugins: [react()],
  build: {
    target: 'es2020',
    minify: 'esbuild',
    sourcemap: false,
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react', '@radix-ui/react-tooltip', '@radix-ui/react-dialog', '@radix-ui/react-toast'],
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
        },
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|gif|svg/.test(ext)) {
            return `images/[name]-[hash][extname]`;
          } else if (/woff|woff2|eot|ttf|otf/.test(ext)) {
            return `fonts/[name]-[hash][extname]`;
          } else if (ext === 'css') {
            return `css/[name]-[hash][extname]`;
          }
          return `[name]-[hash][extname]`;
        }
      },
      external: (id) => {
        // Don't bundle unused packages
        if (id.includes('@capacitor') || id.includes('react-syntax-highlighter')) {
          return true;
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
