import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartAnimation } from "@/components/HeartAnimation";
import { ArrowLeft, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import timeline from "@/data/timeline.json";

export default function Timeline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(false);

  const currentMoment = timeline[currentIndex];

  const nextMoment = () => {
    setCurrentIndex((prev) => (prev + 1) % timeline.length);
  };

  const prevMoment = () => {
    setCurrentIndex((prev) => (prev - 1 + timeline.length) % timeline.length);
  };

  return (
    <div className="min-h-screen romantic-gradient relative">
      <HeartAnimation />
      
      <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
        <Link to="/home">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back Home
          </Button>
        </Link>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-handwriting text-foreground mb-2">
            Our Story Together
          </h1>
          <p className="text-muted-foreground">
            Every moment with you is precious
          </p>
        </div>

        <Card className="p-8 animate-fade-in bg-card/95 backdrop-blur shadow-[var(--shadow-romantic)]">
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-6xl mb-4 animate-float">{currentMoment.emoji}</div>
              <div className="text-sm text-muted-foreground mb-2">{currentMoment.date}</div>
              <h2 className="text-3xl font-handwriting text-foreground mb-4">
                {currentMoment.title}
              </h2>
            </div>

            <div className="relative w-full h-80 rounded-lg overflow-hidden border-4 border-white shadow-lg">
              <img 
                src={currentMoment.image}
                alt={currentMoment.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white text-sm font-handwriting">Moment {currentIndex + 1} of {timeline.length}</p>
              </div>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-foreground leading-relaxed text-center">
                {currentMoment.description}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Button
                variant="outline"
                size="icon"
                onClick={prevMoment}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {timeline.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-primary w-8"
                        : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextMoment}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="text-center">
              <Button
                variant="ghost"
                onClick={() => setAutoplay(!autoplay)}
                className="text-sm"
              >
                <Play className="w-4 h-4 mr-2" />
                {autoplay ? "Stop" : "Play"} Slideshow
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
