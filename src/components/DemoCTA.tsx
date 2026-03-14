export default function DemoCTA() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[10000] w-full px-3 pointer-events-none">

      <div className="max-w-xl mx-auto pointer-events-auto">

        <div
          className="flex items-center justify-between gap-3
          bg-white/90 backdrop-blur-md
          border border-rose-200
          shadow-lg
          rounded-full px-4 py-3
          transform-gpu transition-transform duration-200
          hover:scale-[1.02]"
        >

          {/* Text */}
          <span className="text-xs sm:text-sm font-medium text-rose-600 whitespace-nowrap">
            💖 Want your own Love Website?
          </span>

          {/* Button */}
          <a
            href="https://wa.me/9324004785"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-rose-500 to-pink-500
            text-white text-xs sm:text-sm
            px-4 py-2 rounded-full
            transition-all duration-200
            hover:shadow-md hover:brightness-105
            whitespace-nowrap"
          >
            Create Mine
          </a>

        </div>

      </div>
    </div>
  );
}