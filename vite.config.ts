import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { nitro } from 'nitro/vite';
import path from 'node:path';

export default defineConfig({
  resolve: {
    dedupe: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
  },
  ssr: {
    optimizeDeps: {
      include: ['react', 'react-dom', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
    },
  },
  server: {
    port: 4500,
    proxy: {
      '/ingest/static': {
        target: 'https://eu-assets.i.posthog.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/ingest/, ''),
      },
      '/ingest': {
        target: 'https://eu.i.posthog.com',
        changeOrigin: true,
        rewrite: (p) => p.replace(/^\/ingest/, ''),
      },
    },
  },
  plugins: [
    {
      name: 'force-exit-on-signal',
      configureServer() {
        for (const signal of ['SIGHUP', 'SIGTERM', 'SIGINT'] as const) {
          process.once(signal, () => process.exit());
        }
      },
    },
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
    }),
    nitro(),
  ],
});
