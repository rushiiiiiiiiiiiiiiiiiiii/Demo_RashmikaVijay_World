import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HeartAnimation } from "@/components/HeartAnimation";
import { BackgroundText } from "@/components/BackgroundText";
import { ArrowLeft, Play, Music, Heart, Shuffle, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useGlobalMusic } from "@/hooks/useGlobalMusic";
import { useMemo } from "react";

// DIRECT SONG DATA (NO JSON)
const songsData = [
  {
    id: "song1",
    title: "Aaj Se Teri",
    artist: "Arijit Singh (Cover)",
    youtube: "https://www.youtube.com/embed/0v0Xfj8Ial8",
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
type Song = {
  id: string;
  title: string;
  artist: string;
  youtube: string;
  dedication: string;
  category: string;
};

export default function Songs() {
  const [modalSong, setModalSong] = useState<Song | null>(null);
  const { pauseMusic, resumeMusic } = useGlobalMusic();
  const [createModal, setCreateModal] = useState(false);
  const categoryColors: Record<string, string> = {
    romantic: "bg-rose/20 text-rose border-rose/30",
    classic: "bg-blue-200 text-blue-700 border-blue-300",
  };

  const shuffleSongs = () => {
    const random = songsData[Math.floor(Math.random() * songsData.length)];
    setModalSong(random);
  };
  const BackgroundLayer = useMemo(
    () => (
      <>
        <HeartAnimation />
        <BackgroundText />
      </>
    ),
    [],
  );
  return (
    <div className="min-h-screen romantic-gradient relative">
      {BackgroundLayer}

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
        {/* BACK BUTTON */}
        <Link to="/home" replace className="inline-block mb-6">
          <button
            className="
    flex items-center gap-2 px-5 py-2.5 rounded-full
    bg-white/40 backdrop-blur-md border border-white/40
    text-rose-700 font-medium
    shadow-sm
    transition-transform duration-200 ease-out
    hover:bg-white/60 hover:translate-x-[-2px]
    active:scale-95
    will-change-transform
    touch-manipulation
    "
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">Back Home</span>
          </button>
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

                    <Badge
                      className={
                        categoryColors[song.category] ||
                        "bg-rose/20 text-rose border-rose/30"
                      }
                    >
                      {song.category}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground italic mb-3">
                    "{song.dedication}"
                  </p>

                  <Button
                    onClick={() => {
                      pauseMusic();
                      setModalSong(song);
                    }}
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
          <Card className="p-10 hover:shadow-[var(--shadow-romantic)] bg-card/95 backdrop-blur transition-all duration-300 animate-fade-in relative overflow-hidden">
            {/* Fake song behind */}
            <div className="flex items-center gap-4 blur-[px] opacity-90">
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-rose">
                <Music className="w-8 h-8 text-white" />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg text-foreground">
                  Your Partner Fav Song
                </h3>
                <p className="text-sm text-muted-foreground">
                  Waiting to be added ❤️
                </p>

                <Button
                  size="sm"
                  className="rounded-full mt-2 pointer-events-none opacity-60"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </Button>
              </div>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 backdrop-blur-[2px] bg-white/40 z-10 flex flex-col items-center justify-center text-center p-6">
              <Music className="w-10 h-10 text-rose-500 mb-3" />

              <h3 className="font-semibold text-lg text-foreground mb-1">
                Your Partner’s Favorite Song ❤️
              </h3>

              <p className="text-sm text-muted-foreground mb-4 max-w-xs">
                Add a special song dedicated to your partner in your personal
                love website.
              </p>

              <Button
                size="sm"
                onClick={() => setCreateModal(true)}
                className="rounded-full p-2 bg-primary text-white hover:bg-primary/90 shadow-[0_4px_15px_rgba(255,120,150,0.25)] transition-all duration-300 hover:scale-105"
              >
                <Music className="w-4 h-4 mr-2" />
                Add Song ❤️
              </Button>

              <p className="text-xs italic text-muted-foreground mt-3">
                Feature available in your own love website 🎶
              </p>
            </div>
          </Card>

          {/* FOOTER */}
          <Card className="mt-8 p-8 bg-gradient-to-r from-primary/10 to-rose/10 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4 text-rose fill-rose animate-pulse-soft" />
            <p className="text-foreground/90 italic">
              "Every song reminds me of you ❤️"
            </p>
          </Card>
        </div>
      </div>

      {/* FULLSCREEN VIDEO MODAL */}
      {modalSong && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          {/* CLOSE */}
          <button
            className="absolute top-6 right-6 text-white"
            onClick={() => {
              setModalSong(null);
              resumeMusic();
            }}
          >
            <X className="w-8 h-8" />
          </button>

          <div className="w-full max-w-3xl">
            {/* YOUTUBE PLAYER */}
            <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
              <iframe
                loading="lazy"
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

      {createModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="p-6 max-w-md w-full text-center relative">
            <button
              className="absolute top-3 right-3"
              onClick={() => setCreateModal(false)}
            >
              <X className="w-5 h-5" />
            </button>

            <Music className="w-10 h-10 mx-auto text-rose mb-3" />

            <h2 className="text-xl font-semibold mb-2">
              Create Your Love Website ❤️
            </h2>

            <p className="text-muted-foreground text-sm mb-5">
              Get your own personalized romantic website for you and your
              partner. Include songs, love letters, memories, surprises and 50+
              features ❤️
            </p>

            <Button
              className="w-full"
              onClick={() =>
                window.open(
                  "https://wa.me/9324004785?text=Hi%20I%20want%20a%20love%20website",
                  "_blank",
                )
              }
            >
              Create Mine
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
