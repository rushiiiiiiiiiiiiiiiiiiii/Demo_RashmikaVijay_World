import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartAnimation } from "@/components/HeartAnimation";
import { BackgroundText } from "@/components/BackgroundText";
import { ArrowLeft, Heart, Sparkles, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import quizzesData from "@/data/quizzes.json";

export default function FunZone() {
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [wheelResult, setWheelResult] = useState<string | null>(null);
  const [compliment, setCompliment] = useState<string | null>(null);

  const spinWheel = () => {
    setWheelSpinning(true);
    setTimeout(() => {
      const randomOption = quizzesData.wheelOptions[Math.floor(Math.random() * quizzesData.wheelOptions.length)];
      setWheelResult(randomOption);
      setWheelSpinning(false);
    }, 2000);
  };

  const getCompliment = () => {
    const randomCompliment = quizzesData.compliments[Math.floor(Math.random() * quizzesData.compliments.length)];
    setCompliment(randomCompliment);
  };

  const games = [
    {
      id: "love-quiz",
      title: "Love Quiz",
      emoji: "💕",
      description: "Answer questions about us",
      gradient: "from-rose to-primary",
    },
    {
      id: "compatibility",
      title: "Compatibility Game",
      emoji: "💑",
      description: "Let's see how well we match",
      gradient: "from-lavender to-peach",
    },
    {
      id: "wheel",
      title: "Wheel of Love",
      emoji: "🎡",
      description: "Spin and see what I'll do for you",
      gradient: "from-primary to-rose",
    },
    {
      id: "compliments",
      title: "Random Compliment",
      emoji: "✨",
      description: "Get a sweet compliment from me",
      gradient: "from-peach to-gold",
    },
  ];

  return (
    <div className="min-h-screen romantic-gradient relative">
      <HeartAnimation />
      <BackgroundText />
      
      <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
        <Link to="/home">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back Home
          </Button>
        </Link>

        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">🎮</div>
          <h1 className="text-4xl md:text-5xl font-handwriting text-foreground mb-3">
            Fun Zone
          </h1>
          <p className="text-muted-foreground text-lg">
            Games and activities just for us
          </p>
        </div>

        {!activeGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {games.map((game, index) => (
              <Card
                key={game.id}
                className="p-8 hover:shadow-[var(--shadow-romantic)] transition-all duration-300 hover:scale-105 bg-card/95 backdrop-blur cursor-pointer group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setActiveGame(game.id)}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {game.emoji}
                  </div>
                  <h3 className="text-2xl font-handwriting text-foreground mb-2">
                    {game.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {game.description}
                  </p>
                  <div className={`h-2 rounded-full bg-gradient-to-r ${game.gradient}`} />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="animate-fade-in">
            {activeGame === "wheel" && (
              <Card className="p-8 bg-card/95 backdrop-blur shadow-[var(--shadow-romantic)]">
                <div className="text-center">
                  <h2 className="text-3xl font-handwriting text-foreground mb-6">
                    Wheel of Love 🎡
                  </h2>
                  <div className={`w-64 h-64 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-rose flex items-center justify-center ${wheelSpinning ? "animate-spin" : ""}`}>
                    <Radio className="w-32 h-32 text-white" />
                  </div>
                  {wheelResult && (
                    <div className="bg-background/50 rounded-lg p-6 border border-border/50 mb-6">
                      <h3 className="font-semibold text-foreground text-xl mb-2">
                        I will:
                      </h3>
                      <p className="text-foreground/90 text-lg">
                        {wheelResult}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-3 justify-center">
                    <Button onClick={spinWheel} disabled={wheelSpinning} size="lg">
                      {wheelSpinning ? "Spinning..." : "Spin the Wheel"}
                    </Button>
                    <Button onClick={() => setActiveGame(null)} variant="outline">
                      Back to Games
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {activeGame === "compliments" && (
              <Card className="p-8 bg-card/95 backdrop-blur shadow-[var(--shadow-romantic)]">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 mx-auto mb-6 text-primary" />
                  <h2 className="text-3xl font-handwriting text-foreground mb-6">
                    Your Random Compliment ✨
                  </h2>
                  {compliment && (
                    <div className="bg-gradient-to-r from-primary/10 to-rose/10 rounded-lg p-8 border border-primary/20 mb-6">
                      <p className="text-2xl font-handwriting text-foreground leading-relaxed">
                        "{compliment}"
                      </p>
                    </div>
                  )}
                  <div className="flex gap-3 justify-center">
                    <Button onClick={getCompliment} size="lg">
                      <Heart className="w-5 h-5 mr-2" />
                      Get Compliment
                    </Button>
                    <Button onClick={() => setActiveGame(null)} variant="outline">
                      Back to Games
                    </Button>
                  </div>
                </div>
              </Card>
            )}

            {(activeGame === "love-quiz" || activeGame === "compatibility") && (
              <Card className="p-8 bg-card/95 backdrop-blur shadow-[var(--shadow-romantic)]">
                <div className="text-center">
                  <h2 className="text-3xl font-handwriting text-foreground mb-6">
                    {activeGame === "love-quiz" ? "Love Quiz 💕" : "Compatibility Game 💑"}
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    This interactive game is coming soon! I'm making it extra special for you.
                  </p>
                  <Button onClick={() => setActiveGame(null)}>
                    Back to Games
                  </Button>
                </div>
              </Card>
            )}
          </div>
        )}

        <Card className="mt-8 p-8 bg-gradient-to-r from-primary/10 to-rose/10 border-primary/20 text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-rose fill-rose animate-pulse-soft" />
          <p className="text-foreground/90 italic">
            "Having fun with you is my favorite thing in the world 💕"
          </p>
        </Card>
      </div>
    </div>
  );
}
