import Header from '@/components/Header';
import Socials from '@/components/Socials';
import { AUTHOR_NAME, SITE_URL } from '@/lib/constants';
import appCss from '@/styles/app.css?url';
import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
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
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 px-5 py-20 md:py-28">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-[hsl(245_27%_9%)] px-5 py-2.5">
        <span className="font-mono text-base font-bold text-primary">$</span>
        <span className="font-mono text-base text-muted-foreground">
          page --not-found
        </span>
        <span className="h-5 w-2.5 rounded-sm bg-primary/40 animate-pulse" />
      </div>

      <p className="max-w-120 text-center text-base text-muted-foreground leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        <br />
        Maybe you mistyped the URL, or maybe I moved things around.
      </p>

      <div className="flex gap-3">
        <Link
          to="/"
          className="no-underline inline-flex items-center rounded-full font-display text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 px-5 py-2 transition-colors"
        >
          Go Home
        </Link>
        <Link
          to="/posts"
          className="no-underline inline-flex items-center rounded-full font-display text-sm font-semibold border border-border text-foreground hover:border-primary/50 px-5 py-2 transition-colors"
        >
          Read Blog
        </Link>
      </div>
    </div>
  );
}

function RootLayout() {
  useEffect(() => {
    import('posthog-js').then(({ default: posthog }) => {
      posthog.init('phc_40vnwfmUMGsQ6FSZ85X86ZHg8FhZ5fFHqPwV20v9w7m', {
        api_host: '/ingest',
        ui_host: 'https://eu.posthog.com',
        capture_exceptions: true,
        disable_session_recording: true,
        disable_surveys: true,
      });
    });
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
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-180 mx-auto px-5">
            <p>&copy; {new Date().getFullYear()} Dario Djuric</p>
            <Socials />
          </div>
        </footer>
        <Scripts />
      </body>
    </html>
  );
}
