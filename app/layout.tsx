// app/layout.tsx
// Root layout — wraps every page with wallet providers and global nav

import type { Metadata } from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const metadata: Metadata = {
  title: "RobinBlast — Pass the bomb. Don't get REKT.",
  description: "Real-time degen game on Robinhood Chain. Hold $RBLAST, earn ETH weekly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur border-b border-gray-800 h-14 flex items-center justify-between px-5">
      <a href="/" className="flex items-center gap-2">
        <span className="text-xl">💣</span>
        <span className="text-green-400 font-bold tracking-widest text-sm">
          ROBINBLAST
        </span>
      </a>
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <span className="text-gray-600 cursor-not-allowed">
          Play <span className="text-[9px] text-zinc-600">(soon)</span>
        </span>
        <a href="/how-it-works" className="hover:text-white">How It Works</a>
        <a href="/yield" className="hover:text-white">Yield</a>
        <a
          href="https://x.com/RobinBlastToken"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          𝕏
        </a>
        <ConnectButton showBalance={false} />
      </div>
    </nav>
  );
}
