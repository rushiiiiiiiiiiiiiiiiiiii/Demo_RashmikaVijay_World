import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, Heart, Delete } from "lucide-react";
import { storage } from "@/lib/storage";
import { HeartAnimation } from "@/components/HeartAnimation";
import { toast } from "sonner";

export default function LockScreen() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");

  const profile = storage.getUserProfile();
  const savedPin = storage.getPin(); // ✔ Correct way to get PIN

  const handlePress = (num: string) => {
    if (!savedPin) return;
    if (pin.length >= savedPin.length) return;

    setPin((prev) => prev + num);
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleUnlock = () => {
    if (storage.verifyPin(pin)) {
      storage.unlock(); // ⭐ ADD THIS

      toast.success(`Welcome back, ${profile?.name}! ❤️`);
      navigate("/home");
    } else {
      toast.error("Incorrect PIN ❤️. Try again!");
      setPin("");
    }
  };

  // Auto unlock when pin length matches
  if (savedPin && pin.length === savedPin.length) {
    handleUnlock();
  }

  const keypadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  return (
    <div className="min-h-screen romantic-gradient flex items-center justify-center p-4 relative">
      <HeartAnimation />

      <Card className="w-full max-w-sm p-8 relative z-10 bg-card/95 backdrop-blur shadow-[var(--shadow-romantic)]">
        <div className="space-y-8 text-center">
          <div className="text-center space-y-3 animate-fade-in">
            <Lock className="w-14 h-14 mx-auto text-primary animate-pulse-soft" />
            <h1 className="text-3xl font-handwriting text-foreground">
              Welcome Back, {profile?.name}
            </h1>
            <p className="text-muted-foreground">
              Enter your PIN to unlock your special space
            </p>
          </div>

          {/* PIN DOTS */}
          <div className="flex justify-center gap-3">
            {Array.from({ length: savedPin?.length || 4 }).map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full transition-all ${
                  i < pin.length ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>

          {/* Number keypad */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            {keypadNumbers.slice(0, 9).map((num) => (
              <Button
                key={num}
                variant="outline"
                className="h-16 text-2xl font-semibold rounded-full bg-white/20 backdrop-blur hover:bg-white/40"
                onClick={() => handlePress(num)}
              >
                {num}
              </Button>
            ))}

            <div></div>

            {/* ZERO */}
            <Button
              className="h-16 text-2xl font-semibold rounded-full bg-white/20 backdrop-blur hover:bg-white/40"
              onClick={() => handlePress("0")}
            >
              0
            </Button>

            {/* DELETE */}
            <Button
              variant="destructive"
              className="h-16 rounded-full"
              onClick={handleDelete}
            >
              <Delete className="w-6 h-6" />
            </Button>
          </div>

          <Button
            onClick={handleUnlock}
            className="w-full primary-gradient text-primary-foreground mt-4"
          >
            Unlock
            <Heart className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
