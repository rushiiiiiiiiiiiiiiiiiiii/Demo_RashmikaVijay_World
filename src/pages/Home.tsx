import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { storage } from "@/lib/storage";
import { HeartAnimation } from "@/components/HeartAnimation";
import {
  Heart,
  MessageCircleHeart,
  Clock,
  Music,
  Mic,
  BookHeart,
  Image,
  Calendar,
  Gamepad2,
  PartyPopper,
  UtensilsCrossed,
  Sparkles,
  Smile,
  Award,
} from "lucide-react";

export default function Home() {
  const profile = storage.getUserProfile();

  const features = [
    {
      id: "daily-message",
      title: "Daily Love Message",
      description: "A special message waiting for you",
      icon: MessageCircleHeart,
      path: "/daily-message",
      gradient: "from-rose-light to-rose",
    },
    {
      id: "timeline",
      title: "Our Story",
      description: "Our journey together",
      icon: Clock,
      path: "/timeline",
      gradient: "from-lavender-light to-lavender",
    },
    {
      id: "jar",
      title: "Jar of Hearts",
      description: "Random love notes for you",
      icon: Heart,
      path: "/jar",
      gradient: "from-peach-light to-peach",
    },
    {
      id: "voice-notes",
      title: "Voice Notes",
      description: "Hear my voice anytime",
      icon: Mic,
      path: "/voice-notes",
      gradient: "from-rose to-primary",
    },
    {
      id: "moods",
      title: "How Are You Feeling?",
      description: "Let me know your mood",
      icon: Smile,
      path: "/moods",
      gradient: "from-lavender to-primary",
    },
    {
      id: "affirmations",
      title: "Daily Affirmations",
      description: "Words of love & support",
      icon: Award,
      path: "/affirmations",
      gradient: "from-peach to-gold",
    },
    {
      id: "songs",
      title: "My Songs For You",
      description: "Music that reminds me of you",
      icon: Music,
      path: "/songs",
      gradient: "from-primary to-rose",
    },
    {
      id: "shayaris",
      title: "My Shayaris",
      description: "Poetry from my heart",
      icon: BookHeart,
      path: "/shayaris",
      gradient: "from-lavender to-peach",
    },
    {
      id: "photos",
      title: "Our Memories",
      description: "Photos of us together",
      icon: Image,
      path: "/photos",
      gradient: "from-rose-light to-lavender",
    },
    {
      id: "calendar",
      title: "Love Calendar",
      description: "Special dates & countdowns",
      icon: Calendar,
      path: "/calendar",
      gradient: "from-peach to-rose",
    },
    {
      id: "fun-zone",
      title: "Fun Zone",
      description: "Games & activities",
      icon: Gamepad2,
      path: "/fun-zone",
      gradient: "from-primary to-lavender",
    },
    {
      id: "special-events",
      title: "Special Events",
      description: "Birthdays & celebrations",
      icon: PartyPopper,
      path: "/special-events",
      gradient: "from-gold to-peach",
    },
    {
      id: "food-picker",
      title: "What Should We Eat?",
      description: "Food choices & surprises",
      icon: UtensilsCrossed,
      path: "/food-picker",
      gradient: "from-rose to-peach",
    },
    {
      id: "proposals",
      title: "Proposal Ideas",
      description: "Future plans & dreams",
      icon: Sparkles,
      path: "/proposals",
      gradient: "from-lavender-light to-gold",
    },
  ];

  return (
    <div className="min-h-screen romantic-gradient relative">
      <HeartAnimation />
      
      <div className="container mx-auto px-4 py-8 relative z-10 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-handwriting text-foreground mb-3">
            Welcome, {profile?.name} ❤️
          </h1>
          <p className="text-muted-foreground text-lg">
            I made this entire space just for you. Explore and enjoy every moment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link 
                key={feature.id} 
                to={feature.path}
                className="block animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Card className="p-6 hover:shadow-[var(--shadow-romantic)] transition-all duration-300 hover:scale-105 bg-card/90 backdrop-blur border-border/50">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.gradient}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/settings"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
