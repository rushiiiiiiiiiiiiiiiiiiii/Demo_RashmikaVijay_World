import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HeartAnimation } from "@/components/HeartAnimation";
import { BackgroundText } from "@/components/BackgroundText";
import { ArrowLeft, PartyPopper, Cake, Heart, Gift, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function SpecialEvents() {
  const events = [
    {
      id: "birthday",
      title: "Your Birthday 🎂",
      emoji: "🎉",
      date: "Coming Soon",
      description: "The most special day of the year! I have so many surprises planned for you.",
      gradient: "from-gold to-peach",
      icon: Cake,
    },
    {
      id: "anniversary",
      title: "Our Anniversary 💕",
      emoji: "❤️",
      date: "Every day with you",
      description: "Celebrating the day we became us. Every moment has been magical.",
      gradient: "from-rose to-primary",
      icon: Heart,
    },
    {
      id: "valentine",
      title: "Valentine's Day 💝",
      emoji: "💐",
      date: "February 14th",
      description: "A day to celebrate our love even more than usual. You make every day feel like Valentine's.",
      gradient: "from-primary to-rose",
      icon: Gift,
    },
    {
      id: "special",
      title: "Random Celebrations ✨",
      emoji: "🎊",
      date: "Anytime",
      description: "Because with you, I don't need a reason to celebrate. You're my reason.",
      gradient: "from-lavender to-peach",
      icon: PartyPopper,
    },
  ];

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
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-4xl md:text-5xl font-handwriting text-foreground mb-3">
            Special Events & Celebrations
          </h1>
          <p className="text-muted-foreground text-lg">
            Every moment with you is worth celebrating
          </p>
        </div>

        <div className="space-y-6">
          {events.map((event, index) => {
            const Icon = event.icon;
            return (
              <Card
                key={event.id}
                className="p-8 hover:shadow-[var(--shadow-romantic)] transition-all duration-300 bg-card/95 backdrop-blur animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-6">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${event.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-2xl font-handwriting text-foreground mb-1">
                          {event.title}
                        </h3>
                        <p className="text-sm text-muted-foreground font-medium">
                          {event.date}
                        </p>
                      </div>
                      <div className="text-4xl">{event.emoji}</div>
                    </div>
                    
                    <p className="text-foreground/80 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 p-8 bg-gradient-to-r from-primary/10 to-rose/10 border-primary/20">
          <div className="text-center">
            <Sparkles className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h3 className="text-2xl font-handwriting text-foreground mb-3">
              Birthday Countdown Mode 🎂
            </h3>
            <p className="text-foreground/90 mb-4">
              When your birthday gets closer, this whole section will transform into a special birthday experience with:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div className="bg-background/50 rounded-lg p-3">
                🎈 Animated birthday decorations
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                🎁 Daily birthday surprises
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                🎵 Your favorite birthday songs
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                💝 Special birthday messages from me
              </div>
            </div>
          </div>
        </Card>

        <Card className="mt-6 p-8 bg-gradient-to-r from-lavender/10 to-rose/10 border-lavender/20 text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-rose fill-rose animate-pulse-soft" />
          <p className="text-foreground/90 italic">
            "Every celebration is better because you're in my life 💕"
          </p>
        </Card>
      </div>
    </div>
  );
}
