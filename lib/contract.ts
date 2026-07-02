// lib/contract.ts
// Contract address and ABI for RobinBlast, deployed on Robinhood Chain mainnet

export const CONTRACT_ADDRESS = "0x87F32BD5Ee67914cd5039d24Aba5A963B226f5eF" as const;

export const CONTRACT_ABI = [
  {
    inputs: [
      { internalType: "bytes32", name: "roomId", type: "bytes32" },
      { internalType: "uint256", name: "entryFee", type: "uint256" },
    ],
    name: "joinRoom",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;
