import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartAnimation } from "@/components/HeartAnimation";
import { ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import jarNotes from "@/data/jarNotes.json";

export default function JarOfHearts() {
  const [currentNote, setCurrentNote] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [usedNotes, setUsedNotes] = useState<number[]>([]);

  const pickRandomNote = () => {
    const availableNotes = jarNotes
      .map((note, index) => ({ note, index }))
      .filter(({ index }) => !usedNotes.includes(index));

    if (availableNotes.length === 0) {
      setUsedNotes([]);
      const randomIndex = Math.floor(Math.random() * jarNotes.length);
      setCurrentNote(jarNotes[randomIndex]);
      setUsedNotes([randomIndex]);
    } else {
      const randomItem = availableNotes[Math.floor(Math.random() * availableNotes.length)];
      setCurrentNote(randomItem.note);
      setUsedNotes([...usedNotes, randomItem.index]);
    }
    
    setRevealed(true);
  };

  const pickAnother = () => {
    setRevealed(false);
    setTimeout(() => pickRandomNote(), 300);
  };

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
            Jar of Hearts
          </h1>
          <p className="text-muted-foreground">
            Pick a heart and read a special note from me
          </p>
        </div>

        <Card className="p-8 animate-fade-in bg-card/95 backdrop-blur shadow-[var(--shadow-romantic)] min-h-[400px] flex flex-col items-center justify-center">
          {!currentNote ? (
            <div className="text-center space-y-8">
              <div className="grid grid-cols-5 gap-4 mb-8">
                {Array.from({ length: 15 }).map((_, i) => (
                  <Heart
                    key={i}
                    className="w-12 h-12 text-primary fill-primary animate-float cursor-pointer hover:scale-110 transition-transform"
                    style={{ animationDelay: `${i * 0.1}s` }}
                    onClick={pickRandomNote}
                  />
                ))}
              </div>
              <div>
                <Button 
                  onClick={pickRandomNote}
                  size="lg"
                  className="primary-gradient text-primary-foreground"
                >
                  Pick a Heart
                  <Heart className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-sm text-muted-foreground mt-4">
                  {jarNotes.length} notes waiting for you ❤️
                </p>
              </div>
            </div>
          ) : (
            <div className={`text-center space-y-6 w-full ${revealed ? 'animate-fade-in' : 'opacity-0'}`}>
              <Heart className="w-20 h-20 mx-auto text-primary fill-primary animate-pulse-soft" />
              
              <div className="prose prose-lg max-w-none px-4">
                <p className="text-foreground text-xl leading-relaxed font-medium">
                  {currentNote}
                </p>
              </div>

              <div className="pt-4 space-y-3">
                <Button 
                  onClick={pickAnother}
                  className="primary-gradient text-primary-foreground"
                >
                  Pick Another Heart
                </Button>
                <p className="text-xs text-muted-foreground">
                  {jarNotes.length - usedNotes.length} notes remaining
                </p>
              </div>
            </div>
          )}
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Every note is written with love, just for you ❤️
          </p>
        </div>
      </div>
    </div>
  );
}
