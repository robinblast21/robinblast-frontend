// app/yield/page.tsx
// Dashboard for $RBLAST holders to see their yield.
// Currently uses placeholder data — will connect to the real contract after token launch.

export default function YieldPage() {
  return (
    <main className="min-h-screen bg-black pt-14 px-5 pb-16 text-white">
      <div className="max-w-md mx-auto">
        <div className="mb-6 mt-6">
          <div className="text-green-400 text-xs tracking-widest mb-2">PASSIVE INCOME</div>
          <h1 className="text-2xl font-bold">$RBLAST Yield</h1>
        </div>

        {/* Main yield card */}
        <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30 rounded-2xl p-6 mb-4 text-center">
          <div className="text-xs text-gray-400 tracking-widest mb-2">YOUR CLAIMABLE YIELD</div>
          <div className="text-4xl font-black text-green-400 mb-1">0.000 ETH</div>
          <div className="text-xs text-gray-500 mb-5">
            Connect your wallet to see your yield
          </div>
          <button className="w-full bg-zinc-800 text-gray-500 font-bold py-3 rounded-lg tracking-widest text-sm cursor-not-allowed">
            CONNECT WALLET TO CLAIM
          </button>
        </div>

        {/* Holdings */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
          <div className="text-xs text-gray-500 tracking-widest mb-3">YOUR HOLDINGS</div>
          {[
            ["$RBLAST Balance", "—"],
            ["Your Share", "—"],
            ["Est. Weekly Yield", "—"],
            ["Total Earned (All Time)", "—"],
          ].map(([label, val], i) => (
            <div
              key={i}
              className={`flex justify-between py-2 text-xs ${
                i < 3 ? "border-b border-zinc-800" : ""
              }`}
            >
              <span className="text-gray-500">{label}</span>
              <span className="text-white font-bold">{val}</span>
            </div>
          ))}
        </div>

        {/* Treasury stats */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-4">
          <div className="text-xs text-gray-500 tracking-widest mb-3">TREASURY</div>
          {[
            ["Total Treasury", "—"],
            ["This Week Volume", "—"],
            ["This Week Fee Collected", "—"],
            ["Distributed to Holders", "—"],
          ].map(([label, val], i) => (
            <div
              key={i}
              className={`flex justify-between py-2 text-xs ${
                i < 3 ? "border-b border-zinc-800" : ""
              }`}
            >
              <span className="text-gray-500">{label}</span>
              <span className="text-white font-bold">{val}</span>
            </div>
          ))}
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
          <div className="text-xs text-gray-500 mb-1">$RBLAST hasn&apos;t launched yet</div>
          <div className="text-[11px] text-gray-600 leading-relaxed">
            Once the token is live, this dashboard will show your real-time holdings,
            claimable ETH yield, and platform treasury stats.
          </div>
        </div>

        <div className="mt-6 text-[11px] text-gray-600 text-center leading-relaxed">
          Yield is paid in ETH, not $RBLAST.
          <br />
          Holder snapshot is taken every Saturday at 00:00 UTC.
        </div>
      </div>
    </main>
  );
}0
