import { createFileRoute } from '@tanstack/react-router';
// Using satori + @resvg/resvg-wasm instead of @vercel/og or @resvg/resvg-js because:
// - @vercel/og bundles its own WASM that fails to load in Nitro's dev server
// - @resvg/resvg-js has a native .node binary that Nitro/rolldown can't bundle
// - The WASM variant works in both dev and production (see scripts/postbuild.sh)
import satori from 'satori';
import { Resvg, initWasm } from '@resvg/resvg-wasm';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { getPosts } from '@/lib/posts';
import { AUTHOR_NAME } from '@/lib/constants';
import { format } from 'date-fns';

const BG_COLOR = 'hsl(245, 27%, 7%)';
const PRIMARY_COLOR = 'hsl(32, 100%, 51%)';
const MUTED_COLOR = 'hsl(245, 10%, 55%)';
const FOREGROUND_COLOR = 'hsl(60, 100%, 100%)';
const CARD_COLOR = 'hsl(245, 27%, 11%)';

const WIDTH = 1200;
const HEIGHT = 630;

let wasmInitialized = false;

async function ensureWasm() {
  if (wasmInitialized) {
    return;
  }
  // On Vercel, process.cwd() is /var/task — scripts/postbuild.sh copies the
  // WASM file there since Nitro doesn't include non-JS assets from node_modules.
  const wasmPath = join(
    process.cwd(),
    'node_modules/@resvg/resvg-wasm/index_bg.wasm',
  );
  const wasmBuffer = await readFile(wasmPath);
  await initWasm(wasmBuffer);
  wasmInitialized = true;
}

// Satori needs raw font data as an ArrayBuffer — fetch the CSS to extract the
// actual font file URL, then download the binary.
async function loadFont() {
  const res = await fetch(
    'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&display=swap',
  );
  const css = await res.text();
  const fontUrlMatch = css.match(/src:\s*url\(([^)]+)\)/);
  if (!fontUrlMatch) {
    throw new Error('Could not find font URL');
  }
  const fontRes = await fetch(fontUrlMatch[1]);
  return fontRes.arrayBuffer();
}

async function renderOgImage(element: React.ReactNode, fontData: ArrayBuffer) {
  await ensureWasm();
  const svg = await satori(element, {
    width: WIDTH,
    height: HEIGHT,
    fonts: [{ name: 'Space Grotesk', data: fontData, weight: 700 }],
  });
  const resvg = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } });
  const png = resvg.render().asPng();
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}

export const Route = createFileRoute('/og.png' as any)({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const slug = url.searchParams.get('slug');

        const fontData = await loadFont();

        if (slug) {
          const posts = getPosts();
          const post = posts.find((p) => p.slug === slug);

          if (post) {
            return renderOgImage(
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  backgroundColor: BG_COLOR,
                  padding: '60px',
                  fontFamily: '"Space Grotesk"',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {post.frontMatter.tags?.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                      {post.frontMatter.tags.slice(0, 4).map((tag: string) => (
                        <span
                          key={tag}
                          style={{
                            backgroundColor: CARD_COLOR,
                            color: PRIMARY_COLOR,
                            padding: '6px 14px',
                            borderRadius: '6px',
                            fontSize: '20px',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <h1
                    style={{
                      fontSize: '56px',
                      color: FOREGROUND_COLOR,
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    {post.frontMatter.title}
                  </h1>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontSize: '24px', color: MUTED_COLOR }}>
                    {format(new Date(post.dateCreated), 'LLLL d, yyyy')}
                  </span>
                  <span style={{ fontSize: '24px', color: PRIMARY_COLOR, fontWeight: 700 }}>
                    darios.blog
                  </span>
                </div>
              </div>,
              fontData,
            );
          }
        }

        return renderOgImage(
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: BG_COLOR,
              fontFamily: '"Space Grotesk"',
              gap: '16px',
            }}
          >
            <h1
              style={{
                fontSize: '72px',
                color: FOREGROUND_COLOR,
                margin: 0,
              }}
            >
              {"Dario's Blog"}
            </h1>
            <p
              style={{
                fontSize: '28px',
                color: MUTED_COLOR,
                margin: 0,
              }}
            >
              Development, DevOps, and technology — by {AUTHOR_NAME}
            </p>
          </div>,
          fontData,
        );
      },
    },
  },
});
