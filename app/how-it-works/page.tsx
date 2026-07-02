// app/how-it-works/page.tsx
// Explains the game mechanics, $RBLAST token utility, and FAQ

"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How do I play?",
    a: "Join a room and pay the entry fee in ETH. A bomb spawns randomly in one player's hand. Pass the bomb to another player before the timer runs out. Whoever holds the bomb when it explodes is REKT. Last survivor takes the prize pool.",
  },
  {
    q: "How do I earn yield from $RBLAST?",
    a: "Just hold $RBLAST in your wallet. Every week, 5% of total platform fees are distributed proportionally to all holders in ETH.",
  },
  {
    q: "Is my ETH safe in the contract?",
    a: "Prize pool and treasury are separated in the contract. The dev can only access the treasury (5% platform fee). The prize pool is locked until there's a winner.",
  },
  {
    q: "What's the difference between Micro and Standard?",
    a: "Micro: 0.005 ETH entry. Standard: 0.01 ETH entry, bigger prize pool. Both support up to 10 players with a 1-minute max wait time.",
  },
  {
    q: "What if the room stays empty?",
    a: "If no other players join within 1 minute, your entry fee is automatically refunded to your wallet.",
  },
  {
    q: "What happens if I disconnect mid-game?",
    a: "You have 30 seconds to reconnect. If you're holding the bomb when you disconnect, it's automatically passed to another player so the game isn't stuck. If you don't reconnect in time, you forfeit the round.",
  },
];

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-black pt-14 px-5 pb-16 text-white">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8 mt-6">
          <div className="text-green-400 text-xs tracking-widest mb-2">DOCUMENTATION</div>
          <h1 className="text-2xl font-bold">How RobinBlast Works</h1>
        </div>

        {/* Game mechanics */}
        <div className="text-xs text-gray-500 tracking-widest mb-4">GAME MECHANICS</div>
        <div className="space-y-3 mb-8">
          {[
            { icon: "🚪", title: "Join a Room", desc: "Connect your wallet, pick Micro or Standard, pay the entry fee. Your ETH goes into the prize pool in the smart contract." },
            { icon: "💣", title: "Bomb Drops", desc: "The bomb spawns in a random player's hand. Timer starts counting down — but nobody knows when it ends." },
            { icon: "⚡", title: "Pass It Fast", desc: "Tap another player to pass the bomb. No delay, no gas fee per pass — everything is real-time." },
            { icon: "💥", title: "Boom", desc: "Timer hits zero, bomb explodes, holder is out. Game continues with the survivors." },
            { icon: "🏆", title: "Winner Takes All", desc: "Last survivor gets 90% of the prize pool sent directly to their wallet." },
          ].map((s, i) => (
            <div key={i} className="flex gap-3 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="text-2xl w-8 text-center flex-shrink-0">{s.icon}</div>
              <div>
                <div className="text-sm font-bold mb-1">{s.title}</div>
                <div className="text-xs text-gray-400 leading-relaxed">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Token section */}
        <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30 rounded-2xl p-5 mb-8">
          <div className="text-green-400 text-xs tracking-widest mb-2">$RBLAST TOKEN</div>
          <h3 className="text-lg font-bold mb-3">Hold $RBLAST. Earn ETH.</h3>
          <p className="text-xs text-gray-400 leading-relaxed mb-4">
            Every round, 10% fee goes to the treasury. Each week, that fee is split:
          </p>
          <div className="space-y-2 mb-4">
            {[
              ["5%", "Distributed to all $RBLAST holders, paid in ETH"],
              ["5%", "Treasury — dev & operational"],
            ].map(([pct, desc], i) => (
              <div key={i} className="flex gap-3 text-xs">
                <span className="text-green-400 font-black w-8 text-sm">{pct}</span>
                <span className="text-gray-400">{desc}</span>
              </div>
            ))}
          </div>
          <div className="bg-black/40 rounded-lg p-3 text-xs text-gray-400">
            No staking needed. No clicking required. Just hold $RBLAST in your wallet.
          </div>
        </div>

        {/* Security */}
        <div className="text-xs text-gray-500 tracking-widest mb-4">SECURITY</div>
        <div className="space-y-2 mb-8">
          {[
            { icon: "🔒", title: "Prize pool is protected", desc: "Dev can only access the treasury. Players' prize pool is locked until there's a winner." },
            { icon: "📖", title: "Open source", desc: "Smart contract is fully verifiable on-chain. All logic is transparent." },
            { icon: "↩️", title: "Auto-refund", desc: "If the room isn't filled within 1 minute, entry fees are automatically returned." },
          ].map((s, i) => (
            <div key={i} className="flex gap-3 bg-zinc-900 border border-zinc-800 rounded-lg p-3">
              <span className="text-lg">{s.icon}</span>
              <div>
                <div className="text-xs font-bold mb-1">{s.title}</div>
                <div className="text-[11px] text-gray-400 leading-relaxed">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="text-xs text-gray-500 tracking-widest mb-4">FAQ</div>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`bg-zinc-900 border rounded-lg overflow-hidden ${
                openFaq === i ? "border-green-500/40" : "border-zinc-800"
              }`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-4 flex justify-between items-center text-left"
              >
                <span className="text-xs font-bold">{faq.q}</span>
                <span className="text-green-400 text-lg flex-shrink-0 ml-2">
                  {openFaq === i ? "−" : "+"}
                </span>
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-xs text-gray-400 leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}0
