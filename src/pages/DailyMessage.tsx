import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartAnimation } from "@/components/HeartAnimation";
import { Heart, ArrowLeft, Play, Pause } from "lucide-react";
import { Link } from "react-router-dom";
import { storage } from "@/lib/storage";
import { toast } from "sonner";
import messages from "@/data/messages.json";

export default function DailyMessage() {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [revealed, setRevealed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Get today's message (cycle through messages)
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const messageIndex = dayOfYear % messages.length;
    setCurrentMessage(messages[messageIndex]);
  }, []);

  useEffect(() => {
    setIsFavorite(storage.isFavorite(currentMessage.id));
    setRevealed(storage.isMessageUnlocked(currentMessage.id));
  }, [currentMessage]);

  const handleReveal = () => {
    setRevealed(true);
    storage.unlockMessage(currentMessage.id);
    toast.success("Message unlocked! ❤️");
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      storage.removeFavorite(currentMessage.id);
      toast("Removed from favorites");
    } else {
      storage.addFavorite(currentMessage.id);
      toast.success("Added to favorites! ❤️");
    }
    setIsFavorite(!isFavorite);
  };

  const profile = storage.getUserProfile();

  return (
    <div className="min-h-screen romantic-gradient relative">
      <HeartAnimation />
      
      <div className="container mx-auto px-4 py-8 relative z-10 max-w-2xl">
        <Link to="/home">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back Home
          </Button>
        </Link>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-handwriting text-foreground mb-2">
            Today's Message, {profile?.name}
          </h1>
          <p className="text-muted-foreground">
            I wrote this especially for you ❤️
          </p>
        </div>

        <Card className="p-8 animate-fade-in bg-card/95 backdrop-blur shadow-[var(--shadow-romantic)]">
          {!revealed ? (
            <div className="text-center space-y-6">
              <div className="text-6xl animate-pulse-soft">{currentMessage.emoji}</div>
              <h2 className="text-2xl font-handwriting text-foreground">{currentMessage.title}</h2>
              <p className="text-muted-foreground">
                Click below to reveal today's special message
              </p>
              <Button 
                onClick={handleReveal}
                className="primary-gradient text-primary-foreground"
              >
                Reveal Message
                <Heart className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-5xl mb-4">{currentMessage.emoji}</div>
                <h2 className="text-3xl font-handwriting text-foreground mb-4">
                  {currentMessage.title}
                </h2>
              </div>

              {currentMessage.image && (
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <img 
                    src={currentMessage.image}
                    alt={currentMessage.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg";
                    }}
                  />
                </div>
              )}

              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {currentMessage.message}
                </p>
              </div>

              {currentMessage.voiceNote && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setPlaying(!playing)}
                    className="shrink-0"
                  >
                    {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">Voice Note</div>
                    <div className="text-xs text-muted-foreground">Listen to my voice</div>
                  </div>
                </div>
              )}

              <div className="flex justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={toggleFavorite}
                  className={isFavorite ? "text-primary" : ""}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current" : ""}`} />
                  {isFavorite ? "Favorited" : "Add to Favorites"}
                </Button>
              </div>
            </div>
          )}
        </Card>

        <div className="text-center mt-6 text-sm text-muted-foreground">
          <p>A new message appears every day ❤️</p>
        </div>
      </div>
    </div>
  );
}
