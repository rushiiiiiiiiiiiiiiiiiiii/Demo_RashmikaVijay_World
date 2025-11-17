import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Lock, Heart } from "lucide-react";
import { storage } from "@/lib/storage";
import { HeartAnimation } from "@/components/HeartAnimation";
import { toast } from "sonner";

export default function LockScreen() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const profile = storage.getUserProfile();

  const handleUnlock = () => {
    if (storage.verifyPin(pin)) {
      toast.success(`Welcome back, ${profile?.name}! ❤️`);
      navigate("/home");
    } else {
      toast.error("Incorrect PIN. Try again!");
      setPin("");
    }
  };

  return (
    <div className="min-h-screen romantic-gradient flex items-center justify-center p-4 relative">
      <HeartAnimation />
      
      <Card className="w-full max-w-md p-8 relative z-10 bg-card/95 backdrop-blur shadow-[var(--shadow-romantic)]">
        <div className="space-y-6 animate-fade-in">
          <div className="text-center space-y-3">
            <Lock className="w-16 h-16 mx-auto text-primary animate-pulse-soft" />
            <h1 className="text-3xl font-handwriting text-foreground">
              Welcome Back, {profile?.name}
            </h1>
            <p className="text-muted-foreground">
              Enter your PIN to unlock your special space
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter your PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleUnlock()}
                className="text-center text-2xl tracking-widest"
                autoFocus
              />
            </div>

            <Button 
              onClick={handleUnlock}
              className="w-full primary-gradient text-primary-foreground"
            >
              Unlock
              <Heart className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
