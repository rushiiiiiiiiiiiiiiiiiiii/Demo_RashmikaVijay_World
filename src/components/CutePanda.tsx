import React from "react";

export const CutePanda: React.FC = () => {
  return (
    <div
      className="
        fixed 
        top-2 
        right-2
        z-[50]
        animate-panda-enter
        pointer-events-none

        /* MOBILE SIZE FIX */
        w-[65px] h-[65px]
        sm:w-[85px] sm:h-[85px]
        md:w-[105px] md:h-[105px]
      "
    >
      <svg
        viewBox="0 0 200 200"
        className="animate-panda-bounce w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="shadow">
            <feDropShadow
              dx="0"
              dy="4"
              stdDeviation="6"
              floodColor="#000"
              floodOpacity="0.25"
            />
          </filter>
        </defs>

        <g filter="url(#shadow)">
          {/* Head */}
          <circle cx="100" cy="80" r="60" fill="#ffffff" stroke="#000" strokeWidth="2" />

          {/* Ears */}
          <circle cx="50" cy="30" r="22" fill="#000" />
          <circle cx="150" cy="30" r="22" fill="#000" />

          {/* Eye patches */}
          <ellipse cx="65" cy="80" rx="22" ry="28" fill="#000" />
          <ellipse cx="135" cy="80" rx="22" ry="28" fill="#000" />

          {/* Eyes */}
          <circle cx="70" cy="83" r="9" fill="#fff" />
          <circle cx="130" cy="83" r="9" fill="#fff" />
          <circle cx="72" cy="82" r="4" fill="#000" />
          <circle cx="132" cy="82" r="4" fill="#000" />

          {/* Nose */}
          <path d="M100 95 q10 5 0 10 q-10 -5 0 -10" fill="#000" />

          {/* Cute smile */}
          <path
            d="M80 115 q20 22 40 0"
            stroke="#000"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Body */}
          <ellipse cx="100" cy="155" rx="65" ry="45" fill="#fff" stroke="#000" strokeWidth="2" />

          {/* Arms */}
          <ellipse cx="60" cy="150" rx="18" ry="28" fill="#000" />
          <ellipse cx="140" cy="150" rx="18" ry="28" fill="#000" />

          {/* Little heart */}
          <path
            d="M160 120 
             q -12 -18 -24 0 
             q 12 18 24 0z"
            fill="#ff7aa2"
          />
        </g>
      </svg>
    </div>
  );
};
