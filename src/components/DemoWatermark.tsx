const WATERMARKS = (() => {
  const items = [];
  const rows = 4;
  const cols = 4;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      items.push({
        top: `${r * 25}%`,
        left: `${c * 25}%`,
      });
    }
  }

  return items;
})();

export default function DemoWatermark() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">

      {WATERMARKS.map((pos, i) => (
        <span
          key={i}
          style={{
            top: pos.top,
            left: pos.left,
            transform: "rotate(-25deg)",
          }}
          className="absolute
          text-[26px] md:text-[32px]
          font-semibold
          text-rose-500
          opacity-[0.06]
          whitespace-nowrap
          select-none
          transform-gpu"
        >
          Demo Version — Created by Rushi
        </span>
      ))}

    </div>
  );
}