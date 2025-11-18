import { useEffect, useState } from "react";

let bgAudio: HTMLAudioElement | null = null;
let firstUserInteractionDone = false; // prevents re-triggering

export function useGlobalMusic() {
  const [isPlaying, setIsPlaying] = useState(false);

  // Create audio only once globally
  if (!bgAudio) {
    bgAudio = new Audio("/notes/romantic-saxophone-244539.mp3");
    bgAudio.loop = true;
    bgAudio.preload = "auto";
    bgAudio.volume = 0.2;
  }

  // Allow audio only on FIRST interaction (required by browsers)
  useEffect(() => {
    if (firstUserInteractionDone) return;

    const enableAudioOnce = () => {
      if (!firstUserInteractionDone) {
        firstUserInteractionDone = true;

        bgAudio!.play().catch(() => {});
        setIsPlaying(true);
      }

      document.removeEventListener("click", enableAudioOnce);
      document.removeEventListener("touchstart", enableAudioOnce);
    };

    document.addEventListener("click", enableAudioOnce);
    document.addEventListener("touchstart", enableAudioOnce);

    return () => {
      document.removeEventListener("click", enableAudioOnce);
      document.removeEventListener("touchstart", enableAudioOnce);
    };
  }, []);

  const pauseMusic = () => {
    bgAudio?.pause();
    setIsPlaying(false);
  };

  const resumeMusic = () => {
    bgAudio?.play().catch(() => {});
    setIsPlaying(true);
  };

  const toggleMusic = () => {
    if (bgAudio?.paused) {
      resumeMusic();
    } else {
      pauseMusic();
    }
  };

  return { isPlaying, toggleMusic, pauseMusic, resumeMusic };
}
