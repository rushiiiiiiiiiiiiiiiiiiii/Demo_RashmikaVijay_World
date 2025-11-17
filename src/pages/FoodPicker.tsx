import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartAnimation } from "@/components/HeartAnimation";
import { BackgroundText } from "@/components/BackgroundText";
import { ArrowLeft, UtensilsCrossed, Shuffle, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import foodData from "@/data/foodOptions.json";

export default function FoodPicker() {
  const [selectedFood, setSelectedFood] = useState<any[]>([]);
  const [surprise, setSurprise] = useState<any | null>(null);

  const toggleFood = (food: any) => {
    setSelectedFood(prev => 
      prev.find(f => f.id === food.id)
        ? prev.filter(f => f.id !== food.id)
        : [...prev, food]
    );
  };

  const surpriseMe = () => {
    const randomFood = foodData[Math.floor(Math.random() * foodData.length)];
    setSurprise(randomFood);
    setSelectedFood([randomFood]);
  };

  return (
    <div className="min-h-screen romantic-gradient relative">
      <HeartAnimation />
      <BackgroundText />
      
      <div className="container mx-auto px-4 py-8 relative z-10 max-w-5xl">
        <Link to="/home">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back Home
          </Button>
        </Link>

        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">🍕</div>
          <h1 className="text-4xl md:text-5xl font-handwriting text-foreground mb-3">
            What Should We Eat Today?
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Let me help you decide what to eat
          </p>
          <Button onClick={surpriseMe} size="lg" className="rounded-full">
            <Shuffle className="w-5 h-5 mr-2" />
            Surprise Me!
          </Button>
        </div>

        {surprise && (
          <Card className="p-8 mb-8 bg-gradient-to-r from-primary/10 to-rose/10 border-primary/20 animate-fade-in">
            <div className="text-center">
              <div className="text-8xl mb-4">{surprise.emoji}</div>
              <h2 className="text-3xl font-handwriting text-foreground mb-2">
                Let's have {surprise.name}!
              </h2>
              <p className="text-muted-foreground mb-2">{surprise.description}</p>
              <p className="text-sm text-foreground/80 italic">
                {surprise.occasion}
              </p>
            </div>
          </Card>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {foodData.map((food, index) => (
            <Card
              key={food.id}
              className={`p-6 hover:shadow-[var(--shadow-romantic)] transition-all duration-300 hover:scale-105 bg-card/95 backdrop-blur cursor-pointer animate-fade-in group ${
                selectedFood.find(f => f.id === food.id) ? "border-primary shadow-[var(--shadow-romantic)]" : ""
              }`}
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => toggleFood(food)}
            >
              <div className="text-center">
                <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">
                  {food.emoji}
                </div>
                <h3 className="font-handwriting text-lg text-foreground mb-1">
                  {food.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {food.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {selectedFood.length > 0 && (
          <Card className="mt-8 p-8 bg-card/95 backdrop-blur shadow-[var(--shadow-romantic)] animate-fade-in">
            <div className="text-center">
              <UtensilsCrossed className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-handwriting text-foreground mb-4">
                Our Food Plan
              </h3>
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {selectedFood.map(food => (
                  <div key={food.id} className="flex items-center gap-2 bg-background/50 rounded-full px-4 py-2">
                    <span className="text-2xl">{food.emoji}</span>
                    <span className="text-foreground font-medium">{food.name}</span>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground mb-4">
                Perfect! Let's enjoy {selectedFood.map(f => f.name).join(", ")} together 💕
              </p>
              <Button onClick={() => setSelectedFood([])} variant="outline">
                Clear Selection
              </Button>
            </div>
          </Card>
        )}

        <Card className="mt-8 p-8 bg-gradient-to-r from-peach/10 to-rose/10 border-peach/20 text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-rose fill-rose animate-pulse-soft" />
          <p className="text-foreground/90 italic mb-2">
            "Every meal with you is special 🍽️💕"
          </p>
          <p className="text-sm text-muted-foreground">
            Click on your favorites to build your meal plan, or hit surprise me for a random choice!
          </p>
        </Card>
      </div>
    </div>
  );
}
