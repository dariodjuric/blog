import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Head>
        <title>Dario&apos;s Blog</title>
        <meta
          name="description"
          content="Personal blog of Dario Djuric, a software engineer based in Zagreb, Croatia."
        />
      </Head>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-2W1599NQM6"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-2W1599NQM6', {
page_path: window.location.pathname,
});
`,
        }}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
