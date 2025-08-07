import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import Wrapper from '../components/Wrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Security Metrics Dashboard",
  description: "Security metrics visualization with D3 and Apollo GraphQL",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable}`}>
        <Wrapper>
          {children}
        </Wrapper>
      </body>
    </html>
  );
}
