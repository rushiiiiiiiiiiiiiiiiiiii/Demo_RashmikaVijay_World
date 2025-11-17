import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartAnimation } from "@/components/HeartAnimation";
import { ArrowLeft, Heart } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderProps {
  title: string;
  description: string;
  emoji: string;
}

export default function Placeholder({ title, description, emoji }: PlaceholderProps) {
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

        <Card className="p-12 text-center animate-fade-in bg-card/95 backdrop-blur shadow-[var(--shadow-romantic)]">
          <div className="text-7xl mb-6 animate-float">{emoji}</div>
          <h1 className="text-4xl font-handwriting text-foreground mb-4">
            {title}
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            {description}
          </p>
          <p className="text-sm text-muted-foreground">
            This section is coming soon! I'm working on making it perfect for you ❤️
          </p>
          <div className="mt-8">
            <Heart className="w-12 h-12 mx-auto text-primary fill-primary animate-pulse-soft" />
          </div>
        </Card>
      </div>
    </div>
  );
}
