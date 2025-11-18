import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartAnimation } from "@/components/HeartAnimation";
import { BackgroundText } from "@/components/BackgroundText";
import { ArrowLeft, Sparkles, Heart, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import affirmationsData from "@/data/affirmations.json";
import { storage } from "@/lib/storage";

export default function Affirmations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [fadeDirection, setFadeDirection] = useState("fade-in");
  const profile = storage.getUserProfile();
  const name = profile?.name || "my love";

  useEffect(() => {
    const saved = localStorage.getItem("favoriteAffirmations");
    if (saved) setFavorites(JSON.parse(saved));

    const randomIndex = Math.floor(Math.random() * affirmationsData.length);
    setCurrentIndex(randomIndex);
  }, []);

  const transition = (nextIndex: number) => {
    setFadeDirection("fade-out");
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setFadeDirection("fade-in");
    }, 300);
  };

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem("favoriteAffirmations", JSON.stringify(newFavorites));
  };

  const nextAffirmation = () => {
    transition((currentIndex + 1) % affirmationsData.length);
  };

  const randomAffirmation = () => {
    transition(Math.floor(Math.random() * affirmationsData.length));
  };

  const current = affirmationsData[currentIndex];
  const categoryColors: Record<string, string> = {
    love: "from-rose to-primary",
    gratitude: "from-lavender to-peach",
    strength: "from-peach to-gold",
    encouragement: "from-primary to-lavender",
    confidence: "from-gold to-rose",
    appreciation: "from-lavender-light to-rose"
  };

  return (
    <div className="min-h-screen romantic-gradient relative overflow-hidden">
      <HeartAnimation />
      <BackgroundText />

      {/* Floating Hearts */}
      {[...Array(18)].map((_, i) => (
        <div
          key={"heart-floating-" + i}
          className="floating-heart"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            fontSize: `${18 + Math.random() * 22}px`,
          }}
        >
          {["💖", "💕", "✨", "💗"][Math.floor(Math.random() * 4)]}
        </div>
      ))}

      {/* Background Glow Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>

      <style>{`
        .floating-heart {
          position: absolute;
          bottom: -40px;
          animation: floatUp 9s linear infinite;
          opacity: 0.5;
          pointer-events: none;
        }
        @keyframes floatUp {
          0% { transform: translateY(40px) scale(0.9); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
        }

        .orb {
          position: absolute;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.4;
        }
        .orb-1 {
          background: #ffb3c6;
          top: 10%;
          left: -10%;
        }
        .orb-2 {
          background: #ffd6e8;
          bottom: 5%;
          right: -10%;
        }

        .fade-in {
          animation: fadeIn 0.5s ease forwards;
        }
        .fade-out {
          animation: fadeOut 0.3s ease forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.97); }
        }
      `}</style>

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-3xl">
        <Link to="/home">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back Home
          </Button>
        </Link>

        <div className="text-center mb-10 animate-fade-in">
          <div className="text-6xl mb-3">✨</div>
          <h1 className="text-5xl font-handwriting text-foreground mb-2">
            Daily Affirmations
          </h1>
          <p className="text-muted-foreground text-lg">
            Soft reminders from my heart to yours 💕
          </p>
        </div>

        <Card className="p-10 bg-white/40 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 relative overflow-hidden">
          {/* Category Ribbon */}
          <div
            className={`h-1 w-28 mx-auto rounded-full bg-gradient-to-r ${
              categoryColors[current.category]
            } mb-8 shadow-lg`}
          />

          {/* Animated Text */}
          <p
            className={`text-3xl md:text-4xl font-handwriting text-foreground text-center leading-relaxed mb-8 ${fadeDirection}`}
          >
            "{current.text.replace(/ok/gi, name)}"
          </p>

          {/* Favorite Button */}
          <div className="flex justify-center mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleFavorite(current.id)}
              className="rounded-full"
            >
              <Heart
                className={`w-8 h-8 transition-all ${
                  favorites.includes(current.id)
                    ? "fill-rose text-rose scale-125"
                    : "text-muted-foreground"
                }`}
              />
            </Button>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3">
            <Button onClick={nextAffirmation} variant="outline">
              Next
            </Button>
            <Button onClick={randomAffirmation}>
              <RefreshCw className="w-4 h-4 mr-2" /> Random
            </Button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {affirmationsData.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? "w-8 bg-primary shadow-lg" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </Card>

        <Card className="p-6 mt-6 bg-gradient-to-r from-primary/10 to-rose/10 border-primary/20 text-center">
          <Sparkles className="w-8 h-8 mx-auto mb-3 text-primary" />
          <p className="text-foreground/90 italic">
            "Always remember, {name}, I believe in you more than you know 💗"
          </p>
        </Card>
      </div>
    </div>
  );
}
