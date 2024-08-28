import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Flight Orders',
  description: 'An automated air freight scheduling service.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='p-8 bg-gray-50 min-h-screen'>
          <div className='max-w mx-auto bg-white shadow-lg rounded-lg'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
