#!/bin/sh
cp -r data .vercel/output/functions/__server.func/data
mkdir -p .vercel/output/functions/__server.func/node_modules/@resvg/resvg-wasm
cp node_modules/@resvg/resvg-wasm/index_bg.wasm .vercel/output/functions/__server.func/node_modules/@resvg/resvg-wasm/index_bg.wasm
