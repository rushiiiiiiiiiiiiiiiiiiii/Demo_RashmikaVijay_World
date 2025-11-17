import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartAnimation } from "@/components/HeartAnimation";
import { BackgroundText } from "@/components/BackgroundText";
import { ArrowLeft, Play, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import moodsData from "@/data/moods.json";
import { storage } from "@/lib/storage";

export default function Moods() {
  const [selectedMood, setSelectedMood] = useState<any>(null);
  const profile = storage.getUserProfile();
  const name = profile?.name || "my love";

  const moodColors: Record<string, string> = {
    rose: "from-rose-light to-rose",
    lavender: "from-lavender-light to-lavender",
    peach: "from-peach-light to-peach",
    gold: "from-gold to-peach",
  };

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
          <h1 className="text-4xl md:text-5xl font-handwriting text-foreground mb-3">
            How Are You Feeling, {name}? 💕
          </h1>
          <p className="text-muted-foreground text-lg">
            Tell me your mood and let me comfort you
          </p>
        </div>

        {!selectedMood ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            {moodsData.map((mood, index) => (
              <Card
                key={mood.id}
                className="p-8 hover:shadow-[var(--shadow-romantic)] transition-all duration-300 hover:scale-105 bg-card/95 backdrop-blur cursor-pointer group"
                onClick={() => setSelectedMood(mood)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {mood.emoji}
                  </div>
                  <h3 className="text-2xl font-handwriting text-foreground mb-2">
                    {mood.name}
                  </h3>
                  <div className={`h-2 rounded-full bg-gradient-to-r ${moodColors[mood.color]} mt-4`} />
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="animate-fade-in space-y-6">
            <Card className="p-8 bg-card/95 backdrop-blur shadow-[var(--shadow-romantic)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-6xl">{selectedMood.emoji}</div>
                <div>
                  <h2 className="text-3xl font-handwriting text-foreground">
                    {selectedMood.name}
                  </h2>
                  <div className={`h-2 rounded-full bg-gradient-to-r ${moodColors[selectedMood.color]} mt-2 w-32`} />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-background/50 rounded-lg p-6 border border-border/50">
                  <div className="flex items-start gap-3 mb-4">
                    <Heart className="w-6 h-6 text-rose fill-rose mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">My Message for You:</h3>
                      <p className="text-foreground/90 leading-relaxed">
                        {selectedMood.message.replace("love", name)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-background/50 rounded-lg p-6 border border-border/50">
                  <div className="flex items-start gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-lavender mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">A Special Memory:</h3>
                      <p className="text-foreground/90 leading-relaxed italic">
                        {selectedMood.memory}
                      </p>
                    </div>
                  </div>
                </div>

                {selectedMood.voice && (
                  <Card className="p-6 bg-gradient-to-r from-primary/10 to-rose/10 border-primary/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Voice Note</p>
                        <p className="font-medium text-foreground">Listen to my voice</p>
                      </div>
                      <Button size="lg" className="rounded-full">
                        <Play className="w-5 h-5" />
                      </Button>
                    </div>
                  </Card>
                )}

                <div className="bg-gradient-to-r from-peach/20 to-rose/20 rounded-lg p-6 border border-peach/30">
                  <h3 className="font-semibold text-foreground mb-2">Let's Do This:</h3>
                  <p className="text-foreground/90">
                    {selectedMood.activity}
                  </p>
                </div>

                <div className="text-center pt-4">
                  <p className="text-muted-foreground mb-4">
                    I'm always here for you, {name}. No matter what you're feeling. ❤️
                  </p>
                  <Button onClick={() => setSelectedMood(null)} variant="outline">
                    Change Mood
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
