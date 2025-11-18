import dayjs from "dayjs";
import { Heart } from "lucide-react";

export function MiniLoveCalendar({ event }) {
  const eventDate = dayjs(event.date);

  if (!eventDate.isValid()) return null;

  const monthStart = eventDate.startOf("month");
  const daysInMonth = eventDate.daysInMonth();
  const eventDay = eventDate.date();

  return (
    <div className="mt-5 mb-6 p-5 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_20px_rgba(255,192,203,0.2)] transition-all">

      {/* MONTH HEADER */}
      <p className="text-center text-sm font-semibold text-rose tracking-wide mb-4 drop-shadow-sm">
        {eventDate.format("MMMM YYYY")}
      </p>

      {/* GRID */}
      <div className="grid grid-cols-7 gap-2 text-[10px]">

        {/* WEEKDAYS */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="text-center font-semibold text-rose/70 uppercase tracking-wide"
          >
            {d}
          </div>
        ))}

        {/* EMPTY SPACES BEFORE 1ST */}
        {Array.from({ length: monthStart.day() }).map((_, i) => (
          <div key={i}></div>
        ))}

        {/* DAYS */}
        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const isEventDay = day === eventDay;

          return (
            <div
              key={day}
              className={`
                h-9 w-full flex flex-col items-center justify-center rounded-xl
                transition-all duration-300 select-none

                ${
                  isEventDay
                    ? "bg-rose/60 text-white font-bold shadow-[0_0_12px_rgba(255,80,120,0.6)] scale-105"
                    : "bg-white/10 text-foreground/80 hover:bg-white/20 hover:shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                }
              `}
            >
              {day}

              {/* HEART ICON FOR SPECIAL DAY */}
              {isEventDay && (
                <Heart className="w-3 h-3 text-white mt-0.5 animate-pulse drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
