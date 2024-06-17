import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { Providers } from "./provider";
import "@rainbow-me/rainbowkit/styles.css";
import { AxiomWebVitals } from "next-axiom";

const inter = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "WETH Wrapper",
  description:
    "A DApp for wrapping and unwrapping WETH tokens on the Ethereum L2 blockchain Arbitrum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AxiomWebVitals />
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
