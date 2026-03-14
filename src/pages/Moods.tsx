import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartAnimation } from "@/components/HeartAnimation";
import { BackgroundText } from "@/components/BackgroundText";
import { ArrowLeft, Play, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import moodsData from "@/data/moods.json";
import { storage } from "@/lib/storage";
type Mood = {
  id: string;
  name: string;
  emoji: string;
  color: string;
  message: string;
  memory: string;
  activity: string;
};
export default function Moods() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const profile = storage.getUserProfile();
  const name = profile?.name || "my love";
  const [showPromo, setShowPromo] = useState(false);
  const FREE_MOODS = 3;
  const moodColors = useMemo(
    () => ({
      rose: "from-rose-light to-rose",
      lavender: "from-lavender-light to-lavender",
      peach: "from-peach-light to-peach",
      gold: "from-gold to-peach",
      sky: "from-sky-200 to-sky-500",
      indigo: "from-indigo-200 to-indigo-500",
      pink: "from-pink-200 to-pink-500",
      red: "from-red-300 to-red-500",
      purple: "from-purple-300 to-purple-500",
    }),
    [],
  );
  const BackgroundLayer = useMemo(
    () => (
      <>
        <HeartAnimation />
        <BackgroundText />
      </>
    ),
    [],
  );
  return (
    <div className="min-h-screen romantic-gradient relative">
      {BackgroundLayer}

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
        <Link to="/home" replace className="inline-block mb-6">
          <button
            className="
    flex items-center gap-2 px-5 py-2.5 rounded-full
    bg-white/40 backdrop-blur-md border border-white/40
    text-rose-700 font-medium
    shadow-sm
    transition-transform duration-200 ease-out
    hover:bg-white/60 hover:translate-x-[-2px]
    active:scale-95
    will-change-transform
    touch-manipulation
    "
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Back Home</span>
          </button>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in will-change-transform">
            {moodsData.map((mood, index) => {
              const locked = index >= FREE_MOODS;

              return (
                <Card
                  key={mood.id}
                  className={`p-8 transition-transform duration-300 bg-card/95 backdrop-blur cursor-pointer group relative overflow-hidden
      ${locked ? "opacity-70" : "hover:shadow-[var(--shadow-romantic)] hover:scale-105"}
      `}
                  onClick={() => {
                    if (locked) {
                      setShowPromo(true);
                    } else {
                      setSelectedMood(mood);
                    }
                  }}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {locked && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10">
                      <div className="text-center">
                        <Heart className="w-8 h-8 text-rose mx-auto mb-2" />
                        <p className="text-sm font-medium">
                          Unlock this mood ❤️
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {mood.emoji}
                    </div>
                    <h3 className="text-2xl font-handwriting text-foreground mb-2">
                      {mood.name}
                    </h3>
                    <div
                      className={`h-2 rounded-full bg-gradient-to-r ${
                        moodColors[mood.color] || "from-rose-light to-rose"
                      } mt-4`}
                    />
                  </div>
                </Card>
              );
            })}
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
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r ${
                      moodColors[selectedMood.color]
                    } mt-2 w-32`}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-background/50 rounded-lg p-6 border border-border/50">
                  <div className="flex items-start gap-3 mb-4">
                    <Heart className="w-6 h-6 text-rose fill-rose mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        My Message for You:
                      </h3>
                      <p className="text-foreground/90 leading-relaxed">
                        {selectedMood.message.replace("loved", name)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-background/50 rounded-lg p-6 border border-border/50">
                  <div className="flex items-start gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-lavender mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        A Special Memory:
                      </h3>
                      <p className="text-foreground/90 leading-relaxed italic">
                        {selectedMood.memory}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-peach/20 to-rose/20 rounded-lg p-6 border border-peach/30">
                  <h3 className="font-semibold text-foreground mb-2">
                    Let's Do This:
                  </h3>
                  <p className="text-foreground/90">{selectedMood.activity}</p>
                </div>

                <div className="text-center pt-4">
                  <p className="text-muted-foreground mb-4">
                    I'm always here for you, {name}. No matter what you're
                    feeling. ❤️
                  </p>
                  <Button
                    onClick={() => setSelectedMood(null)}
                    variant="outline"
                  >
                    Change Mood
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
      {showPromo && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="p-6 max-w-md w-full text-center relative">
            <button
              className="absolute top-3 right-3"
              onClick={() => setShowPromo(false)}
            >
              ✕
            </button>

            <Sparkles className="w-10 h-10 mx-auto text-rose mb-3" />

            <h2 className="text-xl font-semibold mb-2">
              Unlock All Mood Features ❤️
            </h2>

            <p className="text-muted-foreground text-sm mb-5">
              In your own personalized love website you can add unlimited moods,
              messages, memories and romantic surprises for your partner.
            </p>

            <Button
              className="w-full"
              onClick={() =>
                window.open(
                  "https://wa.me/9324004785?text=Hi%20I%20want%20a%20love%20website",
                  "_blank",
                )
              }
            >
              Create My Love Website ❤️
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
