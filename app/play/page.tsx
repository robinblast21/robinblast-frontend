// app/play/page.tsx
// Lobby page — lets players pick a room type before joining

"use client";

import { useState } from "react";

export default function PlayPage() {
  const [roomType, setRoomType] = useState<"MICRO" | "STANDARD">("MICRO");

  const entryFee = roomType === "MICRO" ? "0.005" : "0.01";

  return (
    <main className="min-h-screen bg-black pt-14 px-5 pb-10 text-white">
      <div className="max-w-md mx-auto">
        <div className="mb-6 mt-6">
          <div className="text-green-400 text-xs tracking-widest mb-2">LOBBY</div>
          <h1 className="text-2xl font-bold">Choose Your Room</h1>
        </div>

        {/* Room type tabs */}
        <div className="flex bg-zinc-900 border border-zinc-800 rounded-lg p-1 mb-5">
          {(["MICRO", "STANDARD"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setRoomType(type)}
              className={`flex-1 py-2 rounded-md text-xs font-bold tracking-widest ${
                roomType === type
                  ? "bg-green-500 text-black"
                  : "text-gray-400"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Room info */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-5 text-xs text-gray-300">
          Entry: <span className="text-white font-bold">{entryFee} ETH</span>
          {"  ·  "}
          Max players: <span className="text-white font-bold">10</span>
          {"  ·  "}
          Waiting time: <span className="text-white font-bold">1 min</span>
        </div>

        {/* Join button */}
        <button className="w-full bg-red-500 text-white font-bold py-3 rounded-lg tracking-widest text-sm mb-4">
          JOIN ROOM · {entryFee} ETH
        </button>

        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3 text-xs text-gray-500 text-center">
          If no other players join within 1 minute, your entry fee is automatically refunded.
        </div>
      </div>
    </main>
  );
}
