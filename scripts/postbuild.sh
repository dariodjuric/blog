#!/bin/sh

# Copy blog post data into the Vercel serverless function bundle
cp -r data .vercel/output/functions/__server.func/data

# Nitro bundles JS but doesn't include non-JS assets from node_modules.
# The resvg WASM binary must be manually copied so og[.]png.tsx can load it
# at runtime via process.cwd() (which resolves to /var/task on Vercel).
mkdir -p .vercel/output/functions/__server.func/node_modules/@resvg/resvg-wasm
cp node_modules/@resvg/resvg-wasm/index_bg.wasm .vercel/output/functions/__server.func/node_modules/@resvg/resvg-wasm/index_bg.wasm
