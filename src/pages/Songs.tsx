import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartAnimation } from "@/components/HeartAnimation";
import { BackgroundText } from "@/components/BackgroundText";
import { ArrowLeft, Play, Music, Heart, Shuffle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import songsData from "@/data/songs.json";

export default function Songs() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [shuffled, setShuffled] = useState(false);

  const categoryColors: Record<string, string> = {
    romantic: "bg-rose/20 text-rose border-rose/30",
    emotional: "bg-lavender/20 text-lavender border-lavender/30",
    upbeat: "bg-gold/20 text-gold border-gold/30",
    calm: "bg-peach/20 text-peach border-peach/30",
  };

  const shuffleSongs = () => {
    setShuffled(!shuffled);
    const randomSong = songsData[Math.floor(Math.random() * songsData.length)];
    setPlaying(randomSong.id);
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
          <div className="text-6xl mb-4">🎵</div>
          <h1 className="text-4xl md:text-5xl font-handwriting text-foreground mb-3">
            My Songs For You
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Music that reminds me of you and us
          </p>
          <Button onClick={shuffleSongs} size="lg" className="rounded-full">
            <Shuffle className="w-5 h-5 mr-2" />
            Surprise Me with a Song
          </Button>
        </div>

        <div className="space-y-4">
          {songsData.map((song, index) => (
            <Card
              key={song.id}
              className={`p-6 hover:shadow-[var(--shadow-romantic)] transition-all duration-300 bg-card/95 backdrop-blur animate-fade-in group ${
                playing === song.id ? "border-primary shadow-[var(--shadow-romantic)]" : ""
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-rose group-hover:scale-110 transition-transform duration-300">
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  {playing === song.id && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg">
                        {song.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {song.artist}
                      </p>
                    </div>
                    <Badge className={categoryColors[song.category]}>
                      {song.category}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3 italic">
                    "{song.dedication}"
                  </p>

                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => setPlaying(playing === song.id ? null : song.id)}
                      className="rounded-full"
                      size="sm"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {playing === song.id ? "Pause" : "Play"}
                    </Button>
                    {playing === song.id && (
                      <div className="flex-1 h-2 bg-gradient-to-r from-primary/20 to-rose/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-rose animate-pulse w-1/2" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-8 bg-gradient-to-r from-primary/10 to-rose/10 border-primary/20 text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-rose fill-rose animate-pulse-soft" />
          <p className="text-foreground/90 italic mb-2">
            "Every song I hear reminds me of you 🎶"
          </p>
          <p className="text-sm text-muted-foreground">
            These are the songs that make me think of our moments together
          </p>
        </Card>
      </div>
    </div>
  );
}
