import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';

const GeistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const GeistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Education Portal',
  description: 'An online education platform offering courses, resources, and tools for learners and educators.',
  icons: {
    icon: '/alkainaticon.png',
  },
};

// Analytics component (you can create this later or remove if not needed)
function Analytics() {
  return null; // Placeholder for analytics
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  );
}
