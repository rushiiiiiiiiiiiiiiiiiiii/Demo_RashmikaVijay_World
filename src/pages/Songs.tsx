import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartAnimation } from "@/components/HeartAnimation";
import { BackgroundText } from "@/components/BackgroundText";
import { ArrowLeft, Play, Music, Heart, Shuffle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGlobalMusic } from "@/hooks/useGlobalMusic";

// DIRECT SONG DATA (NO JSON)
const songsData = [
  {
    id: "song1",
    title: "Aaj Se Teri",
    artist: "Arijit Singh (Cover)",
    youtube: "https://www.youtube.com/embed/0v0Xfj8Ial8?autoplay=1&playsinline=1",
    dedication: "Aaj se teri saari galiyaan meri ho gayi ❤️",
    category: "romantic",
  },
  {
    id: "song2",
    title: "Falak Tak Chal",
    artist: "Udit Narayan",
    youtube: "https://www.youtube.com/embed/0pOq8ag0Z0Y",
    dedication: "Falak tak chal saath mere 💫",
    category: "romantic",
  },
  {
    id: "song3",
    title: "Chaar Kadam",
    artist: "Shaan (Cover)",
    youtube: "https://www.youtube.com/embed/yITf2fb2ARE",
    dedication: "Chaar kadam bas chaar kadam… tum saath ho 🎵",
    category: "romantic",
  },
  {
    id: "song4",
    title: "Perfect",
    artist: "Ed Sheeran (Piano Cover)",
    youtube: "https://www.youtube.com/embed/hV7lJVnUIBI",
    dedication: "You are perfect to me ✨",
    category: "romantic",
  },
  {
    id: "song5",
    title: "Abhi Na Jao Chhodkar",
    artist: "Mohammed Rafi (Cover)",
    youtube: "https://www.youtube.com/embed/NOKVjFdERw0",
    dedication: "Abhi na jao chhodkar… dil abhi bhara nahi 💗",
    category: "classic",
  },
];


export default function Songs() {
  const [modalSong, setModalSong] = useState<any>(null);
const { pauseMusic, resumeMusic } = useGlobalMusic();

  const categoryColors: Record<string, string> = {
    romantic: "bg-rose/20 text-rose border-rose/30",
    classic: "bg-blue-200 text-blue-700 border-blue-300",
  };

  const shuffleSongs = () => {
    const random = songsData[Math.floor(Math.random() * songsData.length)];
    setModalSong(random);
  };

  return (
    <div className="min-h-screen romantic-gradient relative">
      <HeartAnimation />
      <BackgroundText />

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
        
        {/* BACK BUTTON */}
        <Link to="/home">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back Home
          </Button>
        </Link>

        {/* HEADER */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-6xl mb-4">🎵</div>
          <h1 className="text-4xl md:text-5xl font-handwriting text-foreground mb-3">
            My Songs For You
          </h1>
          <p className="text-muted-foreground text-lg mb-6">
            Music that reminds me of you and us
          </p>

          <Button onClick={shuffleSongs} size="lg" className="rounded-full">
            <Shuffle className="w-5 h-5 mr-2" />
            Surprise Me
          </Button>
        </div>

        {/* SONG LIST */}
        <div className="space-y-4">
          {songsData.map((song, index) => (
            <Card
              key={song.id}
              className="p-6 hover:shadow-[var(--shadow-romantic)] bg-card/95 backdrop-blur transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-4">

                {/* ICON */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-rose">
                  <Music className="w-8 h-8 text-white" />
                </div>

                {/* DETAIL */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-lg text-foreground">
                        {song.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {song.artist}
                      </p>
                    </div>

                    <Badge className={categoryColors[song.category]}>
                      {song.category}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground italic mb-3">
                    "{song.dedication}"
                  </p>

                  <Button
                    onClick={() =>{
                      pauseMusic()
                      setModalSong(song); 
                    }

                    }
                    size="sm"
                    className="rounded-full"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* FOOTER */}
        <Card className="mt-8 p-8 bg-gradient-to-r from-primary/10 to-rose/10 text-center">
          <Heart className="w-12 h-12 mx-auto mb-4 text-rose fill-rose animate-pulse-soft" />
          <p className="text-foreground/90 italic">
            "Every song reminds me of you ❤️"
          </p>
        </Card>
      </div>

      {/* FULLSCREEN VIDEO MODAL */}
      {modalSong && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">

          {/* CLOSE */}
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() =>{ 
              setModalSong(null);
              resumeMusic();
            }
            }
          >
            <X className="w-8 h-8" />
          </button>

          <div className="w-full max-w-3xl">
            
            {/* YOUTUBE PLAYER */}
            <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
              <iframe
                width="100%"
                height="100%"
                src={`${modalSong.youtube}?autoplay=1&mute=1&playsinline=1`}
                title={modalSong.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <h2 className="text-center text-white mt-4 text-3xl font-handwriting">
              {modalSong.title}
            </h2>
            <p className="text-center text-white/70 mt-1 italic">
              {modalSong.dedication}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
