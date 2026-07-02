// lib/wagmi.ts
// Wallet connection config for RobinBlast, targeting Robinhood Chain mainnet

import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { defineChain } from "viem";

export const robinhoodChain = defineChain({
  id: 4663,
  name: "Robinhood Chain",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: { http: ["https://rpc.mainnet.chain.robinhood.com"] },
  },
  blockExplorers: {
    default: {
      name: "Robinhood Chain Explorer",
      url: "https://robinhoodchain.blockscout.com",
    },
  },
});

export const config = getDefaultConfig({
  appName: "RobinBlast",
  projectId: "c660679da7135a334a8e2270902e0740",
  chains: [robinhoodChain],
  ssr: true,
});0
