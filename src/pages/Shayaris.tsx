import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartAnimation } from "@/components/HeartAnimation";
import { BackgroundText } from "@/components/BackgroundText";
import { ArrowLeft, BookHeart, Play, Heart, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import shayarisData from "@/data/shayaris.json";

export default function Shayaris() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const nextShayari = () => {
    setCurrentIndex((prev) => (prev + 1) % shayarisData.length);
    setShowTranslation(false);
  };

  const randomShayari = () => {
    const randomIndex = Math.floor(Math.random() * shayarisData.length);
    setCurrentIndex(randomIndex);
    setShowTranslation(false);
  };

  const current = shayarisData[currentIndex];
  const categoryColors: Record<string, string> = {
    romantic: "from-rose to-primary",
    emotional: "from-lavender to-peach",
    sweet: "from-peach to-gold",
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
          <div className="text-6xl mb-4">📖</div>
          <h1 className="text-4xl md:text-5xl font-handwriting text-foreground mb-3">
            My Shayaris For You
          </h1>
          <p className="text-muted-foreground text-lg">
            Poetry from my heart in Urdu
          </p>
        </div>

        <div className="space-y-6 animate-fade-in">
          <Card className="p-8 md:p-12 bg-card/95 backdrop-blur shadow-[var(--shadow-romantic)]">
            <div className={`h-1 w-20 mx-auto rounded-full bg-gradient-to-r ${categoryColors[current.category]} mb-8`} />
            
            <div className="mb-8">
              <p className="text-2xl md:text-3xl text-foreground text-center leading-loose mb-6 font-serif">
                {current.text}
              </p>
              
              {showTranslation && (
                <div className="bg-background/50 rounded-lg p-6 border border-border/50 animate-fade-in">
                  <p className="text-muted-foreground text-center italic">
                    {current.translation}
                  </p>
                </div>
              )}
            </div>

            {current.voice && (
              <Card className="p-4 mb-6 bg-gradient-to-r from-primary/10 to-rose/10 border-primary/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Listen in my voice</p>
                  </div>
                  <Button size="sm" className="rounded-full">
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </Button>
                </div>
              </Card>
            )}

            <div className="flex flex-col items-center gap-3">
              <Button
                onClick={() => setShowTranslation(!showTranslation)}
                variant="outline"
              >
                {showTranslation ? "Hide" : "Show"} Translation
              </Button>
              
              <div className="flex items-center gap-3">
                <Button onClick={nextShayari} variant="outline">
                  Next Shayari
                </Button>
                <Button onClick={randomShayari}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Random
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-6">
              {shayarisData.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-muted"
                  }`}
                />
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-lavender/10 to-rose/10 border-lavender/20 text-center">
            <BookHeart className="w-8 h-8 mx-auto mb-3 text-lavender" />
            <p className="text-foreground/90 italic">
              "These words come straight from my heart to yours 💕"
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
