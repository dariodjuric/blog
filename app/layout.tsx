import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Image from 'next/image';
import arrow from '@/public/arrow.svg';
import { Badge } from '@/components/Badge';
import Socials from '@/components/Socials';

export const metadata: Metadata = {
  title: "Dario's Blog",
  description:
    'Blog by Dario Djuric: writing about development, DevOps, and technology.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-prussian-blue">
        <main className="bg-half-colonial-white w-full lg:mx-auto lg:w-[800px] min-h-screen">
          <header className="h-[70px] flex flex-row">
            <Link
              href="/"
              className="w-8 lg:w-16 flex flex-col justify-center text-[36px] text-right unstyled-link"
            >
              <span className="text-thunderbird text-[36px] font-bold font-logo text-shadow">
                &gt;&nbsp;
              </span>
            </Link>
            <Link href="/" className="self-center unstyled-link">
              <h1 className="text-[36px] font-bold font-logo text-shadow">
                dario
                <span className="text-thunderbird">&apos;</span>s.blog
              </h1>
            </Link>
            <nav className="flex-grow flex flex-row justify-end self-center pr-8 lg:pr-16">
              <Navigation />
            </nav>
          </header>
          <hr className="h-[5px] bg-thunderbird" />
          <div className="content p-8 lg:px-16 lg:py-12 flex flex-col space-y-6">
            {children}
          </div>
          <footer className="h-[70px] bg-hippie-blue-600 flex flex-row justify-between  p-8 lg:px-14 text-white">
            <p className="self-center text-sm">ⓒ 2024 Dario Djuric</p>
            <Socials />
          </footer>
        </main>
      </body>
    </html>
  );
}
