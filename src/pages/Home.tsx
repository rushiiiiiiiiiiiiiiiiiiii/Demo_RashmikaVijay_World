import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { storage } from "@/lib/storage";
import { useGlobalMusic } from "@/hooks/useGlobalMusic";

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
  UtensilsCrossed,
  Sparkles,
  Smile,
  Award,
  Gift,
  Volume2,
  VolumeX,
  HeartHandshake,
  Settings as SettingsIcon,
  Sun,
  Moon
} from "lucide-react";
import { BackgroundText } from "@/components/BackgroundText";
import { HeartAnimation } from "@/components/HeartAnimation";

export default function Home() {
  const profile = storage.getUserProfile();
  // Default to light if not set, or read from profile
  const theme = profile?.theme || "light"; 
  
  const { isPlaying, toggleMusic } = useGlobalMusic();

  // Visual State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: "50%", y: "50%" });
  const [scrolled, setScrolled] = useState(false);

  // --- EFFECT: Parallax & Spotlight ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
      setSpotlightPos({ x: `${e.clientX}px`, y: `${e.clientY}px` });
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const features = [
    {
      id: "daily-message",
      title: "Daily Love Message",
      description: "A special note just for you",
      icon: MessageCircleHeart,
      path: "/daily-message",
      color: "text-rose-500",
      bg: "bg-rose-100/50",
      darkColor: "text-rose-300",
      darkBg: "bg-rose-900/30",
    },
    {
      id: "timeline",
      title: "Our Story",
      description: "Every chapter of us",
      icon: Clock,
      path: "/timeline",
      color: "text-indigo-500",
      bg: "bg-indigo-100/50",
      darkColor: "text-indigo-300",
      darkBg: "bg-indigo-900/30",
    },
    {
      id: "affirmations",
      title: "Daily Affirmations",
      description: "Reminders of how amazing you are",
      icon: Award,
      path: "/affirmations",
      color: "text-amber-500",
      bg: "bg-amber-100/50",
      darkColor: "text-amber-300",
      darkBg: "bg-amber-900/30",
    },
    {
      id: "voice-notes",
      title: "Voice Notes",
      description: "Hear me whenever you want",
      icon: Mic,
      path: "/voice-notes",
      color: "text-cyan-500",
      bg: "bg-cyan-100/50",
      darkColor: "text-cyan-300",
      darkBg: "bg-cyan-900/30",
    },
    {
      id: "shayaris",
      title: "My Shayaris",
      description: "Poetry written for my Love",
      icon: BookHeart,
      path: "/shayaris",
      color: "text-pink-500",
      bg: "bg-pink-100/50",
      darkColor: "text-pink-300",
      darkBg: "bg-pink-900/30",
    },
    {
      id: "songs",
      title: "Songs For You",
      description: "Melodies that feel like us",
      icon: Music,
      path: "/songs",
      color: "text-violet-500",
      bg: "bg-violet-100/50",
      darkColor: "text-violet-300",
      darkBg: "bg-violet-900/30",
    },
    {
      id: "reasons",
      title: "100 Reasons",
      description: "Why I love you (endless list)",
      icon: Heart,
      path: "/reasons",
      color: "text-red-500",
      bg: "bg-red-100/50",
      darkColor: "text-red-300",
      darkBg: "bg-red-900/30",
    },
    {
      id: "coupons",
      title: "Love Coupons",
      description: "Redeem for hugs, dates & more",
      icon: Gift,
      path: "/coupans",
      color: "text-emerald-500",
      bg: "bg-emerald-100/50",
      darkColor: "text-emerald-300",
      darkBg: "bg-emerald-900/30",
    },
    {
      id: "moods",
      title: "Mood Check-in",
      description: "How is your heart today?",
      icon: Smile,
      path: "/moods",
      color: "text-yellow-500",
      bg: "bg-yellow-100/50",
      darkColor: "text-yellow-300",
      darkBg: "bg-yellow-900/30",
    },
    {
      id: "photos",
      title: "Our Memories",
      description: "Frozen moments of joy",
      icon: Image,
      path: "/photos",
      color: "text-fuchsia-500",
      bg: "bg-fuchsia-100/50",
      darkColor: "text-fuchsia-300",
      darkBg: "bg-fuchsia-900/30",
    },
    {
      id: "calendar",
      title: "Love Calendar",
      description: "Counting down to our days",
      icon: Calendar,
      path: "/calendar",
      color: "text-blue-500",
      bg: "bg-blue-100/50",
      darkColor: "text-blue-300",
      darkBg: "bg-blue-900/30",
    },
    {
      id: "fun-zone",
      title: "Fun Zone",
      description: "Let's play together",
      icon: Gamepad2,
      path: "/fun-zone",
      color: "text-purple-500",
      bg: "bg-purple-100/50",
      darkColor: "text-purple-300",
      darkBg: "bg-purple-900/30",
    },
    {
      id: "food-picker",
      title: "Food Picker",
      description: "What are we eating?",
      icon: UtensilsCrossed,
      path: "/food-picker",
      color: "text-orange-500",
      bg: "bg-orange-100/50",
      darkColor: "text-orange-300",
      darkBg: "bg-orange-900/30",
    },
    {
      id: "proposals",
      title: "Future Dreams",
      description: "Plans for our forever",
      icon: Sparkles,
      path: "/proposals",
      color: "text-teal-500",
      bg: "bg-teal-100/50",
      darkColor: "text-teal-300",
      darkBg: "bg-teal-900/30",
    },
    {
      id: "special-events",
      title: "Why Us?",
      description: "The magic of our bond",
      icon: HeartHandshake,
      path: "/special-events",
      color: "text-rose-600",
      bg: "bg-rose-200/50",
      darkColor: "text-rose-200",
      darkBg: "bg-rose-800/30",
    },
  ];

  // --- DYNAMIC STYLES ---
  const backgroundStyle = theme === "light" 
    ? "radial-gradient(circle at center, #fff0f5 0%, #ffe4e8 100%)" 
    : "radial-gradient(circle at center, #2d1b2e 0%, #1a1016 100%)";

  const headerGradient = theme === "light"
    ? "from-rose-600 to-rose-400"
    : "from-rose-300 to-purple-200";
  
  const cardClass = theme === "light"
    ? "bg-white/60 border-white/60 hover:bg-white/80 hover:border-rose-200 hover:shadow-rose-200/40"
    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/30 hover:shadow-purple-500/20";

  const textPrimary = theme === "light" ? "text-gray-800" : "text-gray-100";
  const textSecondary = theme === "light" ? "text-gray-500" : "text-gray-400";

  return (
    <div
      className="min-h-screen relative overflow-hidden transition-colors duration-1000"
      style={{ background: backgroundStyle }}
    >
      <BackgroundText/>
      <HeartAnimation/>
       {/* --- TEXTURE OVERLAY --- */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none z-0 mix-blend-overlay fixed" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }}></div>

      {/* --- SPOTLIGHT --- */}
      <div 
        className={`absolute w-[800px] h-[800px] blur-[120px] rounded-full pointer-events-none transition-opacity duration-700 z-0 fixed ${theme === 'light' ? 'bg-rose-400/10' : 'bg-rose-500/10'}`}
        style={{ left: spotlightPos.x, top: spotlightPos.y, transform: 'translate(-50%, -50%)' }}
      ></div>

      {/* --- PARALLAX ELEMENTS --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Clouds */}
        <div className={`cloud cloud1 ${theme === 'dark' ? 'opacity-[0.05]' : 'opacity-40'}`} 
             style={{ transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 10}px)` }}></div>
        <div className={`cloud cloud2 ${theme === 'dark' ? 'opacity-[0.05]' : 'opacity-40'}`} 
             style={{ transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -15}px)` }}></div>
        
        {/* Falling Petals */}
         {[...Array(15)].map((_, i) => (
          <div
            key={`petal-${i}`}
            className="white-petal"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
              opacity: theme === 'light' ? 0.4 : 0.15,
              width: `${10 + Math.random() * 15}px`,
              height: `${10 + Math.random() * 15}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* --- FLOATING HEADER BAR --- */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'backdrop-blur-md bg-white/10 border-b border-white/10 shadow-sm py-3' : 'py-6'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center max-w-6xl">
          <div className="flex items-center gap-2">
             {theme === 'light' ? <Sun className="w-5 h-5 text-amber-500 animate-spin-slow" /> : <Moon className="w-5 h-5 text-purple-300 animate-pulse-soft" />}
             <span className={`font-handwriting text-2xl font-bold ${textPrimary}`}>Our World</span>
          </div>

          <button
            onClick={toggleMusic}
            className={`p-2.5 rounded-full shadow-lg transition-transform hover:scale-110 ${theme === 'light' ? 'bg-white text-rose-500' : 'bg-white/10 text-white border border-white/10'}`}
          >
            {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="relative z-10 container mx-auto px-4 pt-28 pb-20 max-w-6xl">
        
        {/* Welcome Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className={`text-5xl md:text-7xl font-handwriting mb-4 text-transparent bg-clip-text bg-gradient-to-br ${headerGradient} drop-shadow-sm`}>
            Welcome, {profile?.name || "My Love"} ❤️
          </h1>
          <p className={`text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed ${textSecondary}`}>
            I created this little universe just for you. Every corner holds a piece of my heart.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link
                key={feature.id}
                to={feature.path}
                className="group block animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Card className={`relative h-full p-6 overflow-hidden backdrop-blur-xl border transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl ${cardClass}`}>
                  
                  {/* Hover Glow Gradient */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${theme==='light' ? 'from-rose-400 to-orange-300' : 'from-purple-600 to-blue-600'}`}></div>

                  <div className="relative z-10 flex items-start gap-5">
                    <div className={`p-3.5 rounded-2xl shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${theme === 'light' ? feature.bg : feature.darkBg}`}>
                      <Icon className={`w-7 h-7 ${theme === 'light' ? feature.color : feature.darkColor}`} />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-1.5 transition-colors ${textPrimary} group-hover:text-rose-500`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm font-medium leading-relaxed ${textSecondary}`}>
                        {feature.description}
                      </p>
                    </div>

                    {/* Arrow appears on hover */}
                    <div className={`absolute right-4 top-1/2 -translate-y-1/2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ${theme==='light'?'text-rose-400':'text-purple-400'}`}>
                      <Sparkles className="w-5 h-5" />
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Footer Settings */}
        <div className="mt-20 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <Link
            to="/settings"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 border ${
                theme === 'light' 
                ? 'bg-white/50 hover:bg-white text-rose-600 border-rose-100 hover:shadow-md' 
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border-white/10 hover:border-white/30'
            }`}
          >
            <SettingsIcon className="w-4 h-4" />
            <span>Customize Our World</span>
          </Link>
        </div>
      </div>

      {/* --- STYLES (Reused from Onboarding for consistency) --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        body { font-family: 'Inter', sans-serif; }
        .font-handwriting { font-family: 'Dancing Script', cursive; }

        /* CLOUDS & PETALS */
        .cloud {
          position: absolute;
          background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 70%);
          width: 600px;
          height: 300px;
          filter: blur(80px);
          transition: transform 0.2s ease-out;
          border-radius: 50%;
        }
        .cloud1 { top: -100px; left: -100px; }
        .cloud2 { bottom: -100px; right: -100px; }

        .white-petal {
          position: absolute;
          background: white;
          border-radius: 100% 0 100% 0;
          box-shadow: 0 0 5px rgba(255,255,255,0.3);
          animation: falling linear infinite;
          top: -10%;
        }
        @keyframes falling {
          0% { transform: translate(0, -10px) rotate(0deg) scale(0.8); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(-20px, 110vh) rotate(360deg) scale(0.8); opacity: 0; }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-spin-slow { animation: spin 12s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}