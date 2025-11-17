import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartAnimation } from "@/components/HeartAnimation";
import { BackgroundText } from "@/components/BackgroundText";
import { ArrowLeft, Calendar as CalendarIcon, Heart, PartyPopper, Cake } from "lucide-react";
import { Link } from "react-router-dom";
import calendarData from "@/data/calendar.json";

export default function Calendar() {
  const getEventIcon = (type: string) => {
    switch (type) {
      case "birthday":
        return <Cake className="w-5 h-5" />;
      case "anniversary":
        return <Heart className="w-5 h-5" />;
      case "special":
        return <PartyPopper className="w-5 h-5" />;
      default:
        return <CalendarIcon className="w-5 h-5" />;
    }
  };

  const typeColors: Record<string, string> = {
    birthday: "bg-gold/20 text-gold border-gold/30",
    anniversary: "bg-rose/20 text-rose border-rose/30",
    special: "bg-primary/20 text-primary border-primary/30",
    date: "bg-lavender/20 text-lavender border-lavender/30",
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
          <div className="text-6xl mb-4">📅</div>
          <h1 className="text-4xl md:text-5xl font-handwriting text-foreground mb-3">
            Our Love Calendar
          </h1>
          <p className="text-muted-foreground text-lg">
            Special dates and moments we'll never forget
          </p>
        </div>

        <div className="space-y-6">
          {calendarData.map((event, index) => (
            <Card
              key={event.id}
              className="p-6 hover:shadow-[var(--shadow-romantic)] transition-all duration-300 bg-card/95 backdrop-blur animate-fade-in group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-rose group-hover:scale-110 transition-transform duration-300">
                  {getEventIcon(event.type)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-1">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {event.date}
                      </p>
                    </div>
                    <Badge className={typeColors[event.type]}>
                      {event.type}
                    </Badge>
                  </div>
                  
                  <p className="text-foreground/80">
                    {event.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="mt-8 p-8 bg-gradient-to-r from-primary/10 to-rose/10 border-primary/20 text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-rose fill-rose animate-pulse-soft" />
          <p className="text-foreground/90 italic mb-2">
            "Every date with you becomes a memory worth celebrating 💕"
          </p>
          <p className="text-sm text-muted-foreground">
            More beautiful moments to come...
          </p>
        </Card>
      </div>
    </div>
  );
}
