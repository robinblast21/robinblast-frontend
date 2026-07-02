// lib/contract.ts
// Contract address and ABI for RobinBlast, deployed on Robinhood Chain mainnet

export const CONTRACT_ADDRESS = "0x6524749A4A42cEA93EDefc98CCd057F5a411f8c4" as const;

export const CONTRACT_ABI = [
  {
    type: "function",
    name: "joinRoom",
    stateMutability: "payable",
    inputs: [
      { name: "roomId", type: "bytes32" },
      { name: "entryFee", type: "uint256" },
    ],
    outputs: [],
  },
  {
    type: "function",
    name: "claimRefund",
    stateMutability: "nonpayable",
    inputs: [{ name: "roomId", type: "bytes32" }],
    outputs: [],
  },
  {
    type: "function",
    name: "canClaimRefund",
    stateMutability: "view",
    inputs: [
      { name: "roomId", type: "bytes32" },
      { name: "player", type: "address" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;
