export default function DemoBadge() {
  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[10000] pointer-events-none">
      <div className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-rose-500/90 text-white text-[11px] md:text-sm shadow-lg backdrop-blur-md whitespace-nowrap">
        💖 Demo Version
      </div>
    </div>
  );
}