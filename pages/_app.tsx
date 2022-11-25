import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';

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
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
