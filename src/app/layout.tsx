import type {Metadata} from 'next';
import './globals.css';
import {Providers} from './provider';
import {SpeedInsights} from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Stratagem Master',
  description: `Become a Stratagem Master in Helldivers 2! Test your stratagem mastery by inputing the correct code to activate
  each stratagem. You will have 30 seconds to input as many correct
  codes as you can. There are a total of 52 stratagems. Good luck!`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/icon.png" type="image/png" />
      <body>
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
