import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartAnimation } from "@/components/HeartAnimation";
import { BackgroundText } from "@/components/BackgroundText";
import { ArrowLeft, Image as ImageIcon, Heart, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import photosData from "@/data/photos.json";

export default function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [slideshowActive, setSlideshowActive] = useState(false);

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
          <div className="text-6xl mb-4">📸</div>
          <h1 className="text-4xl md:text-5xl font-handwriting text-foreground mb-3">
            Our Memories Together
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Every picture tells our beautiful story
          </p>
          <Button onClick={() => setSlideshowActive(!slideshowActive)} size="lg">
            <Play className="w-5 h-5 mr-2" />
            Start Slideshow
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photosData.map((photo, index) => (
            <Card
              key={photo.id}
              className="overflow-hidden hover:shadow-[var(--shadow-romantic)] transition-all duration-300 hover:scale-105 bg-card/95 backdrop-blur cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => setSelectedPhoto(index)}
            >
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-rose/20 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-16 h-16 text-muted-foreground/30" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
              </div>
              <div className="p-4">
                <h3 className="font-handwriting text-lg text-foreground mb-1">
                  {photo.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {photo.date}
                </p>
                <p className="text-sm text-foreground/80 italic">
                  "{photo.caption}"
                </p>
              </div>
            </Card>
          ))}
        </div>

        {selectedPhoto !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <Card className="max-w-4xl w-full p-8 animate-fade-in">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-rose/20 rounded-lg mb-6 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-24 h-24 text-muted-foreground/30" />
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-handwriting text-foreground mb-2">
                  {photosData[selectedPhoto].title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {photosData[selectedPhoto].date}
                </p>
                <p className="text-foreground/90 italic">
                  "{photosData[selectedPhoto].caption}"
                </p>
              </div>
            </Card>
          </div>
        )}

        <Card className="mt-8 p-8 bg-gradient-to-r from-primary/10 to-rose/10 border-primary/20 text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-rose fill-rose animate-pulse-soft" />
          <p className="text-foreground/90 italic">
            "Every moment with you is a memory I want to treasure forever 📷💕"
          </p>
        </Card>
      </div>
    </div>
  );
}
