import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartAnimation } from "@/components/HeartAnimation";
import { BackgroundText } from "@/components/BackgroundText";
import { ArrowLeft, Play, Mic, Heart, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import voiceNotesData from "@/data/voiceNotes.json";

export default function VoiceNotes() {
  const [playing, setPlaying] = useState<string | null>(null);

  const categoryColors: Record<string, string> = {
    daily: "bg-rose/20 text-rose border-rose/30",
    romantic: "bg-primary/20 text-primary border-primary/30",
    emotional: "bg-lavender/20 text-lavender border-lavender/30",
    supportive: "bg-peach/20 text-peach border-peach/30",
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
          <div className="text-6xl mb-4">🎤</div>
          <h1 className="text-4xl md:text-5xl font-handwriting text-foreground mb-3">
            My Voice Notes For You
          </h1>
          <p className="text-muted-foreground text-lg">
            Hear my voice anytime you need me
          </p>
        </div>

        <div className="space-y-4">
          {voiceNotesData.map((note, index) => (
            <Card
              key={note.id}
              className="p-6 hover:shadow-[var(--shadow-romantic)] transition-all duration-300 bg-card/95 backdrop-blur animate-fade-in group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-rose group-hover:scale-110 transition-transform duration-300">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-1">
                        {note.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {note.description}
                      </p>
                    </div>
                    <Badge className={categoryColors[note.category]}>
                      {note.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {note.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {note.duration}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      onClick={() => setPlaying(playing === note.id ? null : note.id)}
                      className="rounded-full"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {playing === note.id ? "Pause" : "Play"}
                    </Button>
                    {playing === note.id && (
                      <div className="flex-1 h-2 bg-gradient-to-r from-primary/20 to-rose/20 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-rose animate-pulse w-1/3" />
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
          <p className="text-foreground/90 italic">
            "Whenever you miss my voice, just come here. I recorded these especially for you. 💕"
          </p>
        </Card>
      </div>
    </div>
  );
}
