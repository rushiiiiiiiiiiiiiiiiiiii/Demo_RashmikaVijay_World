import { useEffect, useState } from "react";
import { Heart, X, Sparkles } from "lucide-react";

export default function DemoReminder() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let autoCloseTimer: NodeJS.Timeout;
    let repeatTimer: NodeJS.Timeout;

    const showModal = () => {
      setShow(true);

      autoCloseTimer = setTimeout(() => {
        setShow(false);
      }, 5000);
    };

    // first appearance
    const firstTimer = setTimeout(() => {
      showModal();
    }, 40000);

    // repeat appearances
    repeatTimer = setInterval(showModal, 40000);

    return () => {
      clearTimeout(firstTimer);
      clearTimeout(autoCloseTimer);
      clearInterval(repeatTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[15000] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">

      <div
        className="relative bg-white rounded-2xl p-7 max-w-md w-full text-center
        shadow-xl transform-gpu transition duration-300"
      >
        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-3">
          <div className="bg-rose-100 p-2 rounded-full">
            <Heart className="w-7 h-7 text-rose-500 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-800 mb-1">
          Create Your Love Website Gift 💖
        </h3>

        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          Surprise your partner with a beautiful private romantic world made just
          for them. A special place that keeps you emotionally connected and
          reminds them that you are always with them and love them deeply.
        </p>

        {/* Features */}
        <div className="text-xs text-gray-600 space-y-1 mb-5 text-left bg-rose-50 p-3 rounded-lg">
          <p>❤️ Personal Love World</p>
          <p>🔐 Private PIN Access</p>
          <p>📸 Photo & Video Memories</p>
          <p>🎙 Voice Notes</p>
          <p>💌 Love Messages</p>

          <p className="font-semibold text-rose-600 flex items-center gap-1 pt-1">
            <Sparkles className="w-3 h-3" />
            + 50 romantic features
          </p>
        </div>

        {/* CTA */}
        <a
          href="https://wa.me/9324004785?text=Hi%20I%20want%20a%20love%20website"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-2 rounded-lg
          bg-gradient-to-r from-rose-500 to-pink-500
          text-white text-sm font-medium
          transition hover:brightness-105"
        >
          Create Website
        </a>

        <p className="text-[10px] text-gray-400 mt-2">
          Takes less than 2 minutes ✨
        </p>

      </div>
    </div>
  );
}