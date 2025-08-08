import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Wrapper from '../components/Wrapper';

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
      <body className={`${roboto.variable}`}>
        <Wrapper>
          {children}
        </Wrapper>
      </body>
    </html>
  );
}
