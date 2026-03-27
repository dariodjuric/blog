import {
  createRootRoute,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { useEffect } from 'react';
import posthog from 'posthog-js';
import Navigation from '@/components/Navigation';
import Socials from '@/components/Socials';
import appCss from '@/styles/app.css?url';

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
    <html lang="en" className="bg-secondary-background background-pattern">
      <head>
        <HeadContent />
      </head>
      <body className="bg-primary-background w-full md:mx-auto md:max-w-screen-md lg:max-w-screen-md min-h-screen">
        <header className="h-[70px] flex flex-row">
          <div className="w-5 md:w-16 flex flex-col justify-center text-[36px] text-right">
            <Link to="/" className="unstyled-link hidden md:block">
              <span className="text-brand-content text-[36px] font-bold font-logo text-shadow">
                &gt;&nbsp;
              </span>
            </Link>
          </div>
          <Link to="/" className="self-center unstyled-link">
            <h1 className="text-[36px] font-bold font-logo text-shadow">
              dario
              <span className="text-brand-content">&apos;</span>s.blog
            </h1>
          </Link>
          <nav className="flex-grow flex flex-row justify-end self-center pr-5 md:pr-16">
            <Navigation />
          </nav>
        </header>
        <hr className="h-[5px] bg-brand-border border-none" />
        <main className="content p-5 md:px-16 md:py-10 md:pb-16">
          <Outlet />
        </main>
        <footer className="h-[70px] bg-neutral-background flex flex-row justify-between  p-8 md:px-14 text-white">
          <p className="self-center text-sm">
            &copy; {new Date().getFullYear()} Dario Djuric
          </p>
          <Socials />
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
