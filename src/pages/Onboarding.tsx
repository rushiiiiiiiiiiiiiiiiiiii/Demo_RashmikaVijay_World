import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Heart, Lock, Sparkles } from "lucide-react";
import { storage } from "@/lib/storage";
import { HeartAnimation } from "@/components/HeartAnimation";
import { toast } from "sonner";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleNameSubmit = () => {
    if (name.trim().length < 2) {
      toast.error("Please enter your name");
      return;
    }
    setStep(2);
  };

  const handlePinSubmit = () => {
    if (pin.length < 4) {
      toast.error("PIN must be at least 4 characters");
      return;
    }
    if (pin !== confirmPin) {
      toast.error("PINs don't match");
      return;
    }
    setStep(3);
  };

  const handleComplete = () => {
    storage.setUserProfile({
      name: name.trim(),
      pin,
      theme,
      setupComplete: true,
    });
    storage.setTheme(theme);
    toast.success(`Welcome, ${name}! ❤️`);
    navigate("/home");
  };

  return (
    <div className="min-h-screen romantic-gradient flex items-center justify-center p-4 relative">
      <HeartAnimation />
      
      <Card className="w-full max-w-md p-8 relative z-10 bg-card/95 backdrop-blur shadow-[var(--shadow-romantic)]">
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-3">
              <Heart className="w-16 h-16 mx-auto text-primary animate-pulse-soft" />
              <h1 className="text-3xl font-handwriting text-foreground">
                I Made This For You
              </h1>
              <p className="text-muted-foreground">
                Welcome to your special place. Before we begin, I'd love to know your name...
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Your Name</label>
                <Input
                  type="text"
                  placeholder="Enter your beautiful name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleNameSubmit()}
                  className="mt-1"
                />
              </div>

              <Button 
                onClick={handleNameSubmit} 
                className="w-full primary-gradient text-primary-foreground"
              >
                Continue
                <Heart className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-3">
              <Lock className="w-16 h-16 mx-auto text-primary" />
              <h1 className="text-3xl font-handwriting text-foreground">
                Keep It Private, {name}
              </h1>
              <p className="text-muted-foreground">
                Let's set up a PIN to keep all our special moments just between us.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Create PIN</label>
                <Input
                  type="password"
                  placeholder="Enter a PIN (4+ characters)"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Confirm PIN</label>
                <Input
                  type="password"
                  placeholder="Enter PIN again"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handlePinSubmit()}
                  className="mt-1"
                />
              </div>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  onClick={handlePinSubmit}
                  className="flex-1 primary-gradient text-primary-foreground"
                >
                  Continue
                  <Lock className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center space-y-3">
              <Sparkles className="w-16 h-16 mx-auto text-primary animate-pulse-soft" />
              <h1 className="text-3xl font-handwriting text-foreground">
                Choose Your Style
              </h1>
              <p className="text-muted-foreground">
                Pick a theme that makes you feel comfortable.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setTheme("light")}
                className={`p-6 rounded-lg border-2 transition-all ${
                  theme === "light"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-4xl mb-2">☀️</div>
                <div className="font-medium text-foreground">Light</div>
                <div className="text-xs text-muted-foreground">Bright & Cheerful</div>
              </button>

              <button
                onClick={() => setTheme("dark")}
                className={`p-6 rounded-lg border-2 transition-all ${
                  theme === "dark"
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-4xl mb-2">🌙</div>
                <div className="font-medium text-foreground">Dark</div>
                <div className="text-xs text-muted-foreground">Cozy & Intimate</div>
              </button>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setStep(2)}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={handleComplete}
                className="flex-1 primary-gradient text-primary-foreground"
              >
                Let's Begin
                <Sparkles className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
