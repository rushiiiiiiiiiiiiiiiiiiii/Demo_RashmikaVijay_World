import { useEffect, useState } from "react";

export default function DemoWelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("demo_seen")) {
      setOpen(true);
      sessionStorage.setItem("demo_seen", "true");
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[15000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3">

      {/* floating hearts */}
      <span className="absolute text-rose-300 text-lg animate-floatHeart top-14 left-8 select-none">♡</span>
      <span className="absolute text-rose-300 text-lg animate-floatHeart delay-300 bottom-20 right-16 select-none">♡</span>

      <div
        className="relative animate-giftReveal
        bg-gradient-to-b from-pink-50 via-white to-white
        rounded-2xl p-4 max-w-[320px] w-full text-center
        shadow-xl border border-pink-100 transform-gpu"
      >

        {/* glow */}
        <div className="absolute inset-0 rounded-2xl bg-rose-200/30 blur-2xl opacity-30 pointer-events-none"></div>

        {/* ribbon */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2
        bg-gradient-to-r from-rose-500 to-pink-500
        text-white text-[10px] px-3 py-[3px]
        rounded-full shadow">
          🎁 Romantic Gift
        </div>

        {/* gift icon */}
        <div className="text-3xl mb-1 animate-bounce select-none">🎁</div>

        <h2 className="text-base font-semibold text-rose-600 mb-1">
          A Gift That Never Fades ❤️
        </h2>

        <p className="text-[11px] text-gray-600 leading-snug mb-3">
          Flowers fade. Gifts get lost. Messages disappear.
          <br /><br />
          But a <span className="text-rose-500 font-medium">Love World</span> lasts forever.
          <br /><br />
          A private space where your memories, voice notes,
          and moments of love stay alive forever.
        </p>

        {/* features */}
        <div className="grid grid-cols-2 gap-x-2 gap-y-[2px] text-[10px] text-gray-600 mb-3 text-left">
          <p>❤️ Love World</p>
          <p>🔐 Private PIN</p>
          <p>🎵 Music</p>
          <p>📸 Memories</p>
          <p>🎙 Voice Notes</p>
          <p>📖 Timeline</p>
          <p>💌 Messages</p>
          <p>🎟 Coupons</p>
          <p>🎮 Games</p>
          <p>🎡 Wheel</p>
          <p>🏆 Certificate</p>
          <p className="font-semibold text-rose-600">+50 features</p>
        </div>

        {/* CTA */}
        <button
          onClick={() => setOpen(false)}
          className="bg-gradient-to-r from-rose-500 to-pink-500
          text-white px-5 py-[6px] text-xs
          rounded-full transition hover:brightness-105 shadow-md"
        >
          Open the Gift ❤️
        </button>

        <p className="text-[9px] text-gray-400 mt-2">
          A surprise your partner will remember forever.
        </p>

      </div>
    </div>
  );
}