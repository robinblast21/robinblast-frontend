// app/play/game/page.tsx
// The live bomb-passing game screen

"use client";

import { useState, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const BACKEND_URL = "http://187.77.117.34:3003";

type Player = {
  socketId: string;
  walletAddress: string;
  alive: boolean;
};

export default function GamePage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [bombHolderId, setBombHolderId] = useState<string | null>(null);
  const [mySocketId, setMySocketId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [phase, setPhase] = useState<"connecting" | "playing" | "lost" | "won">("connecting");
  const [log, setLog] = useState<string[]>([]);
  const socketRef = useRef<Socket | null>(null);

  const addLog = (msg: string) => {
    setLog((prev) => [msg, ...prev].slice(0, 6));
  };

  useEffect(() => {
    // Reconnect to the same socket session used in the lobby.
    // In a real deploy, we'd pass the room/session info via URL or shared state —
    // for now this page assumes it's opened right after joining a room.
    const socket = io(BACKEND_URL);
    socketRef.current = socket;

    socket.on("connect", () => {
      setMySocketId(socket.id ?? null);
    });

    socket.on("room_update", (data) => {
      setRoomId(data.roomId);
      setPlayers(data.players);
    });

    socket.on("game_start", (data) => {
      setRoomId(data.roomId);
      setPlayers(data.players);
      setPhase("playing");
      addLog("💣 Game started!");
    });

    socket.on("bomb_assigned", (data) => {
      setBombHolderId(data.bombHolderId);
      addLog(
        data.bombHolderId === socket.id
          ? "💣 You have the bomb!"
          : "💣 Bomb assigned to another player"
      );
    });

    socket.on("bomb_passed", (data) => {
      setBombHolderId(data.toId);
      addLog(data.toId === socket.id ? "➡️ Bomb passed to you!" : "➡️ Bomb passed");
    });

    socket.on("bomb_exploded", (data) => {
      setPlayers((prev) =>
        prev.map((p) =>
          p.socketId === data.eliminatedId ? { ...p, alive: false } : p
        )
      );
      if (data.eliminatedId === socket.id) {
        addLog("💥 BOOM! You got REKT.");
      } else {
        addLog(`💥 A player was eliminated (${data.reason})`);
      }
    });

    socket.on("game_finished", (data) => {
      if (data.winnerId === socket.id) {
        setPhase("won");
        addLog("🏆 You won!");
      } else {
        setPhase("lost");
        addLog(`🏆 Game over. Winner: ${data.winnerWallet ?? "no one"}`);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const iHaveBomb = bombHolderId === mySocketId;

  const passBomb = (targetSocketId: string) => {
    if (!socketRef.current || !roomId || !iHaveBomb) return;
    socketRef.current.emit("pass_bomb", { roomId, targetSocketId });
  };return (
    <main className="min-h-screen bg-black pt-14 px-5 pb-10 text-white">
      <div className="max-w-md mx-auto">
        {phase === "connecting" && (
          <div className="text-center pt-20 text-gray-400 text-sm">
            Connecting to game...
          </div>
        )}

        {phase === "playing" && (
          <>
            <div className="flex justify-between items-center mb-4 mt-6">
              <span className="text-xs text-gray-400">MICRO ROOM</span>
              <span className="text-xs text-green-400 font-bold">
                {players.filter((p) => p.alive).length} alive
              </span>
            </div>

            {/* Players grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {players.map((p) => {
                const hasBomb = p.socketId === bombHolderId;
                const isMe = p.socketId === mySocketId;
                return (
                  <button
                    key={p.socketId}
                    disabled={!iHaveBomb || isMe || !p.alive}
                    onClick={() => passBomb(p.socketId)}
                    className={`p-3 rounded-lg text-center border-2 ${
                      !p.alive
                        ? "opacity-30 border-zinc-800 bg-zinc-900"
                        : hasBomb
                        ? "border-red-500 bg-red-500/10"
                        : isMe
                        ? "border-zinc-600 bg-zinc-900"
                        : "border-zinc-800 bg-zinc-900"
                    }`}
                  >
                    <div className="text-2xl mb-1">{hasBomb ? "💣" : "🧑"}</div>
                    <div className={`text-[10px] ${isMe ? "text-red-400" : "text-gray-500"}`}>
                      {isMe ? "YOU" : p.walletAddress.slice(0, 6)}
                    </div>
                    {iHaveBomb && !isMe && p.alive && (
                      <div className="text-[8px] text-red-400/60 mt-1">TAP TO PASS</div>
                    )}
                  </button>
                );
              })}
            </div>

            {iHaveBomb && (
              <div className="bg-red-500/10 border border-red-500 rounded-lg p-3 text-center mb-4">
                <span className="text-red-400 font-bold text-xs">
                  ⚠️ YOU HAVE THE BOMB! TAP A PLAYER TO PASS!
                </span>
              </div>
            )}

            {/* Log */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
              <div className="text-[10px] text-gray-600 tracking-widest mb-2">LIVE</div>
              {log.map((l, i) => (
                <div key={i} className={`text-xs py-0.5 ${i === 0 ? "text-white" : "text-gray-600"}`}>
                  {l}
                </div>
              ))}
            </div>
          </>
        )}

        {phase === "lost" && (
          <div className="text-center pt-24">
            <div className="text-6xl mb-4">💥</div>
            <div className="text-2xl font-bold text-red-500 mb-2">REKT.</div>
            <div className="text-sm text-gray-400 mb-8">Better luck next round.</div>
            <a
              href="/play"
              className="inline-block bg-zinc-800 text-gray-300 font-bold py-3 px-8 rounded-lg text-sm"
            >
              BACK TO LOBBY
            </a>
          </div>
        )}

        {phase === "won" && (
          <div className="text-center pt-24">
            <div className="text-6xl mb-4">🏆</div>
            <div className="text-2xl font-bold text-green-400 mb-8">WINNER!</div>
            <a
              href="/play"
              className="inline-block bg-green-500/10 border border-green-500/40 text-green-400 font-bold py-3 px-8 rounded-lg text-sm"
            >
              PLAY AGAIN
            </a>
          </div>
        )}
      </div>
    </main>
  );
}0
