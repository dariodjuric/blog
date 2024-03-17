import './globals.css';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Socials from '@/components/Socials';
import Script from 'next/script';

const title = `Dario's Blog`;
const description =
  'Blog by Dario Djuric: writing about development, DevOps, and technology.';

export const metadata = {
  metadataBase: new URL('https://darios.blog'),
  title: {
    template: `%s | ${title}`,
    default: title,
  },
  description,
  openGraph: {
    title,
    description,
    url: 'https://darios.blog',
    siteName: title,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Dario Djuric',
    card: 'summary_large_image',
    creator: '@dario_djuric',
  },
  icons: {
    shortcut: 'https://darios.blog/public/favicon.ico',
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://darios.blog/rss.xml',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-secondary-background background-pattern">
      <body>
        <main className="bg-primary-background w-full md:mx-auto md:max-w-screen-md lg:max-w-screen-md min-h-screen">
          <header className="h-[70px] flex flex-row">
            <div className="w-5 md:w-16 flex flex-col justify-center text-[36px] text-right">
              <Link href="/" className="unstyled-link hidden md:block">
                <span className="text-brand-content text-[36px] font-bold font-logo text-shadow">
                  &gt;&nbsp;
                </span>
              </Link>
            </div>
            <Link href="/" className="self-center unstyled-link">
              <h1 className="text-[36px] font-bold font-logo text-shadow">
                dario
                <span className="text-brand-content">&apos;</span>s.blog
              </h1>
            </Link>
            <nav className="flex-grow flex flex-row justify-end self-center pr-5 md:pr-16">
              <Navigation />
            </nav>
          </header>
          <hr className="h-[5px] bg-brand-border" />
          <div className="content p-5 md:px-16 md:py-10 md:pb-16">
            {children}
          </div>
          <footer className="h-[70px] bg-neutral-background flex flex-row justify-between  p-8 md:px-14 text-white">
            <p className="self-center text-sm">ⓒ 2024 Dario Djuric</p>
            <Socials />
          </footer>
        </main>
      </body>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-2W1599NQM6"
        id="google_gtagjs-js"
        strategy="lazyOnload"
      />
      <Script id="google_gtagjs-js-after" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2W1599NQM6');
        `}
      </Script>
    </html>
  );
}
