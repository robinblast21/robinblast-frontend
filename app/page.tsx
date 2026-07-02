// app/page.tsx
// The homepage for RobinBlast — gameplay locked until $RBLAST launches

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div
        className="min-h-screen flex flex-col items-center justify-center px-5 pt-14 text-center"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, rgba(34,197,94,0.08) 0%, transparent 70%)",
        }}
      >
        <div className="text-7xl mb-4">💣</div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-wide leading-tight mb-4">
          PASS THE BOMB.
          <br />
          <span className="text-red-500" style={{ textShadow: "0 0 30px rgba(239,68,68,0.5)" }}>
            DON&apos;T GET REKT.
          </span>
        </h1>

        <p className="text-sm text-gray-400 max-w-sm mb-8 leading-relaxed">
          Real-time degen game on Robinhood Chain. Pass the bomb before it
          blows. Last survivor takes the pool. Hold $RBLAST, earn ETH weekly.
        </p>

        <div className="flex gap-3 flex-wrap justify-center mb-16">
          <button
            disabled
            className="bg-zinc-800 text-gray-500 font-bold px-8 py-3.5 rounded-xl text-sm tracking-widest cursor-not-allowed"
          >
            PLAY · SOON
          </button>
          <a
            href="/how-it-works"
            className="bg-transparent border border-zinc-800 text-gray-400 font-bold px-8 py-3.5 rounded-xl text-sm tracking-widest"
          >
            HOW IT WORKS
          </a>
        </div>

        {/* Stats */}
        <div className="flex gap-3 flex-wrap justify-center w-full max-w-md">
          {[
            ["ENTRY FROM", "0.005 ETH"],
            ["MAX PLAYERS", "10"],
            ["HOLDER YIELD", "5% weekly"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex-1 min-w-[100px] bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-center"
            >
              <div className="text-lg font-black">{value}</div>
              <div className="text-[10px] text-gray-500 tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works preview */}
      <div className="px-5 py-16 max-w-lg mx-auto">
        <div className="text-center mb-10">
          <div className="text-green-400 text-xs tracking-widest mb-2">THE GAME</div>
          <h2 className="text-2xl font-black">Simple. Brutal. Fair.</h2>
        </div>

        {[
          { icon: "💰", title: "Join & Deposit", desc: "Pick Micro or Standard. Your entry fee goes into the prize pool on-chain." },
          { icon: "💣", title: "Pass the Bomb", desc: "Hidden countdown timer. Pass it to another player before it blows." },
          { icon: "💥", title: "Last One Standing", desc: "Whoever holds the bomb when it explodes is REKT. Survivor takes 90%." },
          { icon: "💎", title: "Hold $RBLAST, Earn ETH", desc: "5% of every round is distributed to holders weekly. Pure passive income." },
        ].map((step, i) => (
          <div
            key={i}
            className="flex gap-4 mb-4 bg-zinc-900 border border-zinc-800 rounded-xl p-4"
          >
            <div className="text-2xl flex-shrink-0">{step.icon}</div>
            <div>
              <div className="text-sm font-bold mb-1">{step.title}</div>
              <div className="text-xs text-gray-400 leading-relaxed">{step.desc}</div>
            </div>
          </div>
        ))}

        <button
          disabled
          className="block w-full text-center bg-zinc-800 text-gray-500 font-bold py-3.5 rounded-xl text-sm tracking-widest mt-8 cursor-not-allowed"
        >
          PLAY · COMING SOON
        </button>
      </div>
    </main>
  );
}
