// app/play/page.tsx
// Lobby page — pays entry fee to the contract using the backend's official roomId.
// If matchmaking takes too long, the player can self-claim their refund
// directly from the contract instead of waiting on the backend.

"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useAccount, useWriteContract } from "wagmi";
import { parseEther, keccak256, toBytes } from "viem";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";

const BACKEND_URL = "http://187.77.117.34:3003";
const CLAIM_UNLOCK_SECONDS = 90; // must match CLAIM_REFUND_DELAY in the contract

export default function PlayPage() {
  const [roomType, setRoomType] = useState<"MICRO" | "STANDARD">("MICRO");
  const [status, setStatus] = useState<
    "idle" | "requesting" | "confirming" | "waiting" | "playing"
  >("idle");
  const [playerCount, setPlayerCount] = useState(0);
  const [secondsWaiting, setSecondsWaiting] = useState(0);
  const [claiming, setClaiming] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const roomIdRef = useRef<string | null>(null);
  const lastSocketIdRef = useRef<string | null>(null);
  const awaitingPaymentRef = useRef(false);
  const hasPaidRef = useRef(false);
  const waitingSinceRef = useRef<number | null>(null);

  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();

  const entryFee = roomType === "MICRO" ? "0.005" : "0.01";

  useEffect(() => {
    const socket = io(BACKEND_URL, {
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      if (roomIdRef.current && lastSocketIdRef.current) {
        socket.emit("rejoin_room", {
          roomId: roomIdRef.current,
          oldSocketId: lastSocketIdRef.current,
        });
      }
    });

    socket.on("disconnect", () => {
      lastSocketIdRef.current = socket.id ?? lastSocketIdRef.current;
    });

    socket.on("rejoin_success", (data) => {
      setStatus(data.status === "playing" ? "playing" : "waiting");
    });

    socket.on("rejoin_failed", () => {
      setStatus("idle");
      roomIdRef.current = null;
    });

    socket.on("room_update", async (data) => {
      roomIdRef.current = data.roomId;
      setPlayerCount(data.players.length);

      if (awaitingPaymentRef.current && !hasPaidRef.current) {
        hasPaidRef.current = true;
        awaitingPaymentRef.current = false;
        await payEntryFee(data.roomId);
      } else {
        if (!waitingSinceRef.current) {
          waitingSinceRef.current = Date.now();
        }
        setStatus("waiting");
      }
    });

    socket.on("game_start", () => {
      setStatus("playing");
    });

    socket.on("room_refunded", () => {
      setStatus("idle");
      roomIdRef.current = null;
      hasPaidRef.current = false;
      awaitingPaymentRef.current = false;
      waitingSinceRef.current = null;
      alert("Not enough players joined. Your entry fee has been refunded on-chain.");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Ticks every second while waiting, so we know when the claim button unlocks
  useEffect(() => {
    if (status !== "waiting") return;
    const interval = setInterval(() => {
      if (waitingSinceRef.current) {
        setSecondsWaiting(Math.floor((Date.now() - waitingSinceRef.current) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [status]);const payEntryFee = async (roomId: string) => {
    try {
      setStatus("confirming");

      const roomIdBytes32 = keccak256(toBytes(roomId));
      const feeWei = parseEther(entryFee);

      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "joinRoom",
        args: [roomIdBytes32, feeWei],
        value: feeWei,
      });

      waitingSinceRef.current = Date.now();
      setSecondsWaiting(0);
      setStatus("waiting");
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Transaction failed or was rejected. Please try again.");
      setStatus("idle");
      hasPaidRef.current = false;
      awaitingPaymentRef.current = false;
    }
  };

  const handleJoinRoom = () => {
    if (!isConnected || !address) {
      alert("Please connect your wallet first.");
      return;
    }
    if (!socketRef.current) return;

    hasPaidRef.current = false;
    awaitingPaymentRef.current = true;
    waitingSinceRef.current = null;
    setSecondsWaiting(0);
    setStatus("requesting");

    socketRef.current.emit("join_room", {
      roomType,
      walletAddress: address,
    });
  };

  const handleClaimRefund = async () => {
    if (!roomIdRef.current || !address) return;

    try {
      setClaiming(true);
      const roomIdBytes32 = keccak256(toBytes(roomIdRef.current));

      await writeContractAsync({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: "claimRefund",
        args: [roomIdBytes32],
      });

      alert("Refund claimed successfully! Check your wallet.");
      setStatus("idle");
      roomIdRef.current = null;
      hasPaidRef.current = false;
      waitingSinceRef.current = null;
      setSecondsWaiting(0);
    } catch (err) {
      console.error("Claim refund failed:", err);
      alert("Could not claim refund. It may not be ready yet, or already claimed.");
    } finally {
      setClaiming(false);
    }
  };

  const canClaim = status === "waiting" && secondsWaiting >= CLAIM_UNLOCK_SECONDS;
  const secondsUntilClaim = Math.max(0, CLAIM_UNLOCK_SECONDS - secondsWaiting);return (
    <main className="min-h-screen bg-black pt-14 px-5 pb-10 text-white">
      <div className="max-w-md mx-auto">
        <div className="mb-6 mt-6">
          <div className="text-green-400 text-xs tracking-widest mb-2">LOBBY</div>
          <h1 className="text-2xl font-bold">Choose Your Room</h1>
        </div>

        <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1 mb-5">
          {(["MICRO", "STANDARD"] as const).map((type) => (
            <button
              key={type}
              disabled={status !== "idle"}
              onClick={() => setRoomType(type)}
              className={`flex-1 py-2 rounded-md text-xs font-bold tracking-widest ${
                roomType === type ? "bg-green-500 text-black" : "text-gray-400"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-5 text-xs text-gray-300">
          Entry: <span className="text-white font-bold">{entryFee} ETH</span>
          {"  ·  "}
          Max players: <span className="text-white font-bold">10</span>
          {"  ·  "}
          Waiting time: <span className="text-white font-bold">1 min</span>
        </div>

        {!isConnected && (
          <div className="w-full bg-zinc-800 text-gray-400 font-bold py-3 rounded-lg text-center text-sm mb-4">
            Connect your wallet to play
          </div>
        )}

        {isConnected && status === "idle" && (
          <button
            onClick={handleJoinRoom}
            className="w-full bg-red-500 text-white font-bold py-3 rounded-lg tracking-widest text-sm mb-4"
          >
            JOIN ROOM · {entryFee} ETH
          </button>
        )}

        {status === "requesting" && (
          <div className="w-full bg-zinc-800 text-gray-400 font-bold py-3 rounded-lg text-center text-sm mb-4">
            Finding a room...
          </div>
        )}

        {status === "confirming" && (
          <div className="w-full bg-zinc-800 text-gray-400 font-bold py-3 rounded-lg text-center text-sm mb-4">
            Confirm in your wallet...
          </div>
        )}

        {status === "waiting" && !canClaim && (
          <div className="w-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 font-bold py-3 rounded-lg text-center text-sm mb-4">
            Waiting for players... ({playerCount} joined)
            <div className="text-[10px] text-yellow-400/60 font-normal mt-1">
              Refund available in {secondsUntilClaim}s if no match
            </div>
          </div>
        )}

        {status === "waiting" && canClaim && (
          <button
            onClick={handleClaimRefund}
            disabled={claiming}
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-lg tracking-widest text-sm mb-4"
          >
            {claiming ? "CLAIMING..." : `CLAIM REFUND · ${entryFee} ETH`}
          </button>
        )}

        {status === "playing" && (
          <div className="w-full bg-green-500/10 border border-green-500/30 text-green-400 font-bold py-3 rounded-lg text-center text-sm mb-4">
            Game started! 💣
          </div>
        )}

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-gray-500 text-center">
          If no other players join within 1 minute, your entry fee is automatically refunded.
          If that fails, you can claim it yourself after 90 seconds.
        </div>
      </div>
    </main>
  );
}
