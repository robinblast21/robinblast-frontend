// app/providers.tsx
// Wraps the app with wagmi + RainbowKit so every page can access wallet connection

"use client";

import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme, Locale } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/wagmi";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({ accentColor: "#22c55e" })}
          locale={"en-US" as Locale}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}0
