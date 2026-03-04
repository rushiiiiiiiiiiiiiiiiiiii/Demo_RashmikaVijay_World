import React, { useMemo, useEffect } from "react";
import { Heart } from "lucide-react";

export const HeartAnimation = () => {
  useEffect(() => {
    const handleVisibility = () => {
      document.body.style.animationPlayState = document.hidden
        ? "paused"
        : "running";
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  const hearts = useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 4,
      size: 20 + Math.random() * 30,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-rose/10 animate-float fill-rose/10 will-change-transform"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
          size={heart.size}
        />
      ))}
    </div>
  );
};

export default React.memo(HeartAnimation);
