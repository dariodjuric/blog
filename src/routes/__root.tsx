import Header from '@/components/Header';
import Socials from '@/components/Socials';
import { AUTHOR_NAME, SITE_URL } from '@/lib/constants';
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
const description = `Blog by ${AUTHOR_NAME}: writing about development, DevOps, and technology.`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: SITE_URL },
      { property: 'og:site_name', content: title },
      { property: 'og:locale', content: 'en_US' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${SITE_URL}/og.png` },
      { name: 'twitter:title', content: title },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@dario_djuric' },
      { name: 'twitter:creator', content: '@dario_djuric' },
      { name: 'twitter:image', content: `${SITE_URL}/og.png` },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      {
        rel: 'alternate',
        type: 'application/rss+xml',
        href: `${SITE_URL}/rss.xml`,
      },
    ],
  }),
  component: RootLayout,
});

function RootLayout() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      posthog.init('phc_40vnwfmUMGsQ6FSZ85X86ZHg8FhZ5fFHqPwV20v9w7m', {
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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: title,
              url: SITE_URL,
              author: {
                '@type': 'Person',
                name: AUTHOR_NAME,
                url: `${SITE_URL}/about`,
              },
            }),
          }}
        />
        <Header />
        <main id="main-content" className="flex-1">
          <Outlet />
        </main>
        <footer className="border-t border-border bg-card/50 py-6 mt-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-[720px] mx-auto px-5">
            <p>&copy; {new Date().getFullYear()} Dario Djuric</p>
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
