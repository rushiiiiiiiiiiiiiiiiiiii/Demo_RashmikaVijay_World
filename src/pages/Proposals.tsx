import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartAnimation } from "@/components/HeartAnimation";
import { BackgroundText } from "@/components/BackgroundText";
import { ArrowLeft, Sparkles, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import proposalsData from "@/data/proposals.json";

export default function Proposals() {
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const difficultyColors: Record<string, string> = {
    easy: "bg-peach/20 text-peach border-peach/30",
    medium: "bg-lavender/20 text-lavender border-lavender/30",
    hard: "bg-primary/20 text-primary border-primary/30",
  };

  const moodColors: Record<string, string> = {
    romantic: "from-rose to-primary",
    magical: "from-lavender to-primary",
    nostalgic: "from-peach to-rose",
    fun: "from-primary to-peach",
    intimate: "from-lavender-light to-rose",
  };

  return (
    <div className="min-h-screen romantic-gradient relative">
      <HeartAnimation />
      <BackgroundText />
      
      <div className="container mx-auto px-4 py-8 relative z-10 max-w-6xl">
        <Link to="/home">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back Home
          </Button>
        </Link>

        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">💍</div>
          <h1 className="text-4xl md:text-5xl font-handwriting text-foreground mb-3">
            Proposal Ideas & Dreams
          </h1>
          <p className="text-muted-foreground text-lg">
            Planning our perfect moment together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {proposalsData.map((proposal, index) => (
            <Card
              key={proposal.id}
              className="overflow-hidden hover:shadow-[var(--shadow-romantic)] transition-all duration-300 hover:scale-105 bg-card/95 backdrop-blur animate-fade-in group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-rose/20 relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${moodColors[proposal.mood]} opacity-60`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-white/80" />
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-handwriting text-foreground">
                    {proposal.title}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleFavorite(proposal.id)}
                    className="rounded-full"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        favorites.includes(proposal.id)
                          ? "fill-gold text-gold"
                          : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </div>

                <p className="text-foreground/80 mb-4">
                  {proposal.description}
                </p>

                <div className="flex items-center gap-2">
                  <Badge className="capitalize">{proposal.mood}</Badge>
                  <Badge className={difficultyColors[proposal.difficulty]}>
                    {proposal.difficulty}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-8 bg-gradient-to-r from-primary/10 to-rose/10 border-primary/20">
          <div className="text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-handwriting text-foreground mb-3">
              Planning Our Perfect Moment
            </h3>
            <p className="text-foreground/90 mb-4">
              These are just ideas I've been thinking about. When the time is right, I want to create the perfect moment that's uniquely ours.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="bg-background/50 rounded-lg p-4">
                <div className="text-2xl mb-2">💝</div>
                <p className="text-muted-foreground">
                  Every detail will be special
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
                <div className="text-2xl mb-2">✨</div>
                <p className="text-muted-foreground">
                  Made just for you
                </p>
              </div>
              <div className="bg-background/50 rounded-lg p-4">
                <div className="text-2xl mb-2">❤️</div>
                <p className="text-muted-foreground">
                  From my heart to yours
                </p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="mt-6 p-8 bg-gradient-to-r from-lavender/10 to-rose/10 border-lavender/20 text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-rose fill-rose animate-pulse-soft" />
          <p className="text-foreground/90 italic">
            "Every moment I imagine with you makes me fall in love all over again 💕"
          </p>
        </Card>
      </div>
    </div>
  );
}
