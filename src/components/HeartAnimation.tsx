import { Heart } from "lucide-react";
import { useEffect, useState } from "react";

export const HeartAnimation = () => {
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-rose/20 animate-float"
          style={{
            left: `${heart.left}%`,
            bottom: "-50px",
            animationDelay: `${heart.delay}s`,
            animationDuration: `${8 + Math.random() * 4}s`,
          }}
          size={20 + Math.random() * 20}
        />
      ))}
    </div>
  );
};
