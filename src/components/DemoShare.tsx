import { useEffect, useState } from "react";

export default function DemoShare() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 70000); // show after 45 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  const shareLink = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copied! Share it with someone special ❤️");
  };

  const whatsappShare = () => {
    const message = encodeURIComponent(
      `Someone made this love story website for their partner ❤️
You should see it

${shareLink}

Imagine making one for your partner ✨`,
    );

    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[15000]">
      <div className="bg-white shadow-xl border border-rose-200 rounded-2xl p-4 w-[280px] text-center space-y-3">
        <h3 className="text-sm font-semibold text-rose-600">
          💖 Loved this experience?
        </h3>

        <p className="text-xs text-gray-500">
          Share this demo with someone special.
        </p>

        <div className="flex gap-2 justify-center">
          <button
            onClick={whatsappShare}
            className="bg-green-500 text-white text-xs px-3 py-1.5 rounded-full"
          >
            WhatsApp
          </button>

          <button
            onClick={handleCopy}
            className="bg-rose-500 text-white text-xs px-3 py-1.5 rounded-full"
          >
            Copy Link
          </button>
        </div>

        <button
          onClick={() => setShow(false)}
          className="text-[10px] text-gray-400"
        >
          close
        </button>
      </div>
    </div>
  );
}
