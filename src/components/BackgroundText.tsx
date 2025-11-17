import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";

export const BackgroundText = () => {
  const [texts, setTexts] = useState<Array<{ id: number; text: string; top: number; left: number; delay: number; duration: number }>>([]);
  const profile = storage.getUserProfile();
  const name = profile?.name || "my love";

  const romanticPhrases = [
    `my love ${name}`,
    `i love you ${name}`,
    "my pikesh",
    "my princess",
    `${name} ❤️`,
    "forever yours",
    "my everything",
    `dear ${name}`,
    "my heart",
    "my world",
    `${name} 💕`,
    "always yours",
    "my darling",
    `sweet ${name}`,
    "my sunshine",
    `${name} forever`,
  ];

  useEffect(() => {
    const newTexts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      text: romanticPhrases[Math.floor(Math.random() * romanticPhrases.length)],
      top: Math.random() * 100,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
    }));
    setTexts(newTexts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {texts.map((item) => (
        <div
          key={item.id}
          className="absolute text-primary/5 font-handwriting text-2xl md:text-4xl animate-float whitespace-nowrap"
          style={{
            top: `${item.top}%`,
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};
