// app/layout.tsx
// Root layout — wraps every page. Good place for global nav, fonts, and metadata.

import type { Metadata } from "next";
import "./globals.css";

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
        <Navbar />
        {children}
      </body>
    </html>
  );
}

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur border-b border-gray-800 h-14 flex items-center justify-between px-5">
      <div className="flex items-center gap-2">
        <span className="text-xl">💣</span>
        <span className="text-green-400 font-bold tracking-widest text-sm">
          ROBINBLAST
        </span>
      </div>
      <div className="flex items-center gap-4 text-xs text-gray-400">
        <a href="/play" className="hover:text-white">Play</a>
        <a href="/how-it-works" className="hover:text-white">How It Works</a>
        <button className="bg-green-500 text-black px-3 py-1.5 rounded-md font-bold text-xs">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}
