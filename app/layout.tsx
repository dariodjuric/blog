import type { Metadata } from 'next';
import './globals.css';

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
      <body className="bg-prussian-blue">{children}</body>
    </html>
  );
}
