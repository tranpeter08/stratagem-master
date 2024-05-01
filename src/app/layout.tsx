import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './provider';

export const metadata: Metadata = {
  title: 'Stratagem Master',
  description: 'Become a Stratagem Master in Helldivers 2!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
