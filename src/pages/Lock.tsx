import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Lock, Delete } from "lucide-react";
import { storage } from "@/lib/storage";
import { HeartAnimation } from "@/components/HeartAnimation";
import { toast } from "sonner";
import { useMemo } from "react";

export default function LockScreen() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [isUnlocking, setIsUnlocking] = useState(false);

  const profile = storage.getUserProfile();
  const savedPin = storage.getPin();
  useEffect(() => {
    if (storage.isUnlocked()) {
      navigate("/home");
    }
  }, [navigate]);

  const handlePress = (num: string) => {
    if (!savedPin || isUnlocking) return;
    if (pin.length >= savedPin.length) return;

    setPin((prev) => prev + num);
  };

  const handleDelete = () => {
    if (isUnlocking) return;
    setPin((prev) => prev.slice(0, -1));
  };

  // ⭐ CLEAN AUTO UNLOCK
  useEffect(() => {
    if (!savedPin) return;

    if (pin.length === savedPin.length && !isUnlocking) {
      if (storage.verifyPin(pin)) {
        setIsUnlocking(true);

        setTimeout(() => {
          storage.unlock();
          navigate("/home");
        }, 800);
      } else {
        toast.error("Wrong PIN ❤️ Try again");
        setTimeout(() => setPin(""), 300);
      }
    }
  }, [pin, savedPin, navigate, isUnlocking]);

  const keypadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const BackgroundLayer = useMemo(
    () => (
      <>
        <HeartAnimation />
      </>
    ),
    [],
  );
  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200">
      {/* Floating hearts background */}
      {BackgroundLayer}

      <Card className="w-full max-w-sm p-10 text-center bg-white/30 backdrop-blur-xl shadow-2xl rounded-3xl transition-all duration-700">
        <div className="space-y-6">
          <Lock className="w-14 h-14 mx-auto text-rose-500 animate-pulse" />

          <h1 className="text-3xl font-handwriting text-rose-600">
            Welcome back, {profile?.name || "My Love"}
          </h1>

          <p className="text-sm text-rose-500/80">Enter your secret PIN ❤️</p>

          {/* PIN DOTS */}
          <div className="flex justify-center gap-4 my-6">
            {Array.from({ length: savedPin?.length || 4 }).map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all duration-300 will-change-transform ${
                  i < pin.length ? "bg-rose-500 scale-110" : "bg-rose-300/50"
                }`}
              />
            ))}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-4">
            {keypadNumbers.slice(0, 9).map((num) => (
              <button
                disabled={isUnlocking}
                key={num}
                className="h-14 text-xl rounded-full bg-white/40 hover:bg-white/60 backdrop-blur-md transition-all"
                onClick={() => handlePress(num)}
              >
                {num}
              </button>
            ))}

            <div></div>

            <button
              className="h-14 text-xl rounded-full bg-white/40 hover:bg-white/60"
              onClick={() => handlePress("0")}
            >
              0
            </button>

            <button
              disabled={isUnlocking}
              className="h-14 rounded-full bg-red-400/80 text-white disabled:opacity-50"
              onClick={handleDelete}
            >
              <Delete className="w-5 h-5 mx-auto" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
