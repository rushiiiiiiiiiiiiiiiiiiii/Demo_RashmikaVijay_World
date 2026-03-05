import { Heart } from "lucide-react";

export default function CurtainLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-rose-50 overflow-hidden">

      {/* LEFT CURTAIN */}
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-rose-600 to-rose-500 animate-curtain-left"></div>

      {/* RIGHT CURTAIN */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-rose-600 to-rose-500 animate-curtain-right"></div>

      {/* CENTER HEART */}
      <div className="relative z-10 text-center">
        <Heart className="w-12 h-12 text-white animate-pulse mx-auto mb-2" />
        <p className="text-white font-semibold tracking-wide">
          Opening your love story...
        </p>
      </div>

      <style>{`
        @keyframes curtainLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }

        @keyframes curtainRight {
          0% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }

        .animate-curtain-left {
          animation: curtainLeft 1.2s ease forwards;
        }

        .animate-curtain-right {
          animation: curtainRight 1.2s ease forwards;
        }
      `}</style>

    </div>
  );
}