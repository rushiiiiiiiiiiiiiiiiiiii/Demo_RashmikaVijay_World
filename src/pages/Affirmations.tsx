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
  const profile = storage.getUserProfile();
  const name = profile?.name || "my love";

  useEffect(() => {
    const saved = localStorage.getItem("favoriteAffirmations");
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem("favoriteAffirmations", JSON.stringify(newFavorites));
  };

  const nextAffirmation = () => {
    setCurrentIndex((prev) => (prev + 1) % affirmationsData.length);
  };

  const randomAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmationsData.length);
    setCurrentIndex(randomIndex);
  };

  const current = affirmationsData[currentIndex];
  const categoryColors: Record<string, string> = {
    love: "from-rose to-primary",
    gratitude: "from-lavender to-peach",
    strength: "from-peach to-gold",
    encouragement: "from-primary to-lavender",
    confidence: "from-gold to-rose",
    appreciation: "from-lavender-light to-rose",
  };

  return (
    <div className="min-h-screen romantic-gradient relative">
      <HeartAnimation />
      <BackgroundText />
      
      <div className="container mx-auto px-4 py-8 relative z-10 max-w-3xl">
        <Link to="/home">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back Home
          </Button>
        </Link>

        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-4xl md:text-5xl font-handwriting text-foreground mb-3">
            Daily Affirmations
          </h1>
          <p className="text-muted-foreground text-lg">
            Words of love and support from me to you
          </p>
        </div>

        <div className="space-y-6 animate-fade-in">
          <Card className="p-8 md:p-12 bg-card/95 backdrop-blur shadow-[var(--shadow-romantic)] min-h-[400px] flex flex-col justify-center">
            <div className={`h-1 w-20 mx-auto rounded-full bg-gradient-to-r ${categoryColors[current.category]} mb-8`} />
            
            <p className="text-2xl md:text-3xl font-handwriting text-foreground text-center leading-relaxed mb-8">
              "{current.text.replace(/you/gi, name)}"
            </p>

            <div className="flex items-center justify-center gap-4 mb-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(current.id)}
                className="rounded-full"
              >
                <Heart
                  className={`w-6 h-6 ${
                    favorites.includes(current.id)
                      ? "fill-rose text-rose"
                      : "text-muted-foreground"
                  }`}
                />
              </Button>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button onClick={nextAffirmation} variant="outline">
                Next Affirmation
              </Button>
              <Button onClick={randomAffirmation}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Random
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6">
              {affirmationsData.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted"
                  }`}
                />
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-primary/10 to-rose/10 border-primary/20 text-center">
            <Sparkles className="w-8 h-8 mx-auto mb-3 text-primary" />
            <p className="text-foreground/90 italic">
              "Start each day knowing how much I believe in you, {name} 💕"
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
