import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { nitro } from 'nitro/vite';
import fs from 'node:fs';
import path from 'node:path';

const postSlugs = fs
  .readdirSync(path.resolve(__dirname, 'data/posts'))
  .filter((f) => f.endsWith('.mdx'))
  .map((f) => f.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.mdx$/, ''));

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
      pages: postSlugs.map((slug) => ({ path: `/posts/${slug}` })),
    }),
    react(),
    nitro(),
  ],
});
