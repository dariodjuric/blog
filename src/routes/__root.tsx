import Header from '@/components/Header';
import Socials from '@/components/Socials';
import appCss from '@/styles/app.css?url';
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import posthog from 'posthog-js';
import { useEffect } from 'react';

const title = `Dario's Blog`;
const description =
  'Blog by Dario Djuric: writing about development, DevOps, and technology.';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title },
      { name: 'description', content: description },
      { name: 'og:title', content: title },
      { name: 'og:description', content: description },
      { name: 'og:url', content: 'https://darios.blog' },
      { name: 'og:site_name', content: title },
      { name: 'og:locale', content: 'en_US' },
      { name: 'og:type', content: 'website' },
      { name: 'twitter:title', content: 'Dario Djuric' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: '@dario_djuric' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        href: 'https://darios.blog/rss.xml',
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  useEffect(() => {
    if (typeof window !== 'undefined' && import.meta.env.VITE_POSTHOG_KEY) {
      posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
        api_host: '/ingest',
        ui_host: 'https://eu.posthog.com',
        capture_exceptions: true,
      });
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-background min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <footer className="border-t border-border bg-card/50 py-6 mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-[720px] mx-auto px-5">
            <p>
              &copy; {new Date().getFullYear()} Dario Djuric
            </p>
            <Socials />
          </div>
        </footer>
        <Scripts />
        <script
          defer
          src="https://www.googletagmanager.com/gtag/js?id=G-2W1599NQM6"
        />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2W1599NQM6');
            `,
          }}
        />
      </body>
    </html>
  );
}
