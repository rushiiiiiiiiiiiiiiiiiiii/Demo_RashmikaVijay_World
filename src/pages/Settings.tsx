import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HeartAnimation } from "@/components/HeartAnimation";
import { ArrowLeft, Moon, Sun, User, Lock, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "@/lib/storage";
import { toast } from "sonner";

export default function Settings() {
  const navigate = useNavigate();
  const profile = storage.getUserProfile();
  const [name, setName] = useState(profile?.name || "");
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmNewPin, setConfirmNewPin] = useState("");
  const [theme, setTheme] = useState(storage.getTheme());

  const handleUpdateName = () => {
    if (name.trim().length < 2)
      return toast.error("Name must be at least 2 characters");
    storage.updateUserProfile({ name: name.trim() });
    toast.success("Name updated! ❤️");
  };

  const handleUpdatePin = () => {
    if (!storage.verifyPin(currentPin))
      return toast.error("Current PIN is incorrect");
    if (newPin.length < 4)
      return toast.error("New PIN must be at least 4 characters");
    if (newPin !== confirmNewPin) return toast.error("PINs do not match");
    storage.updateUserProfile({ pin: newPin });
    setCurrentPin("");
    setNewPin("");
    setConfirmNewPin("");
    toast.success("PIN updated successfully! 🔒");
  };

  const handleThemeChange = (mode) => {
    setTheme(mode);
    storage.setTheme(mode);
    toast.success(`Theme changed to ${mode}`);
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear everything?")) {
      storage.clearAll();
      toast.success("All data cleared!");
      navigate("/");
    }
  };
  const BackgroundLayer = useMemo(() => <HeartAnimation />, []);

  return (
    <div className="min-h-screen romantic-gradient relative pb-20">
      {BackgroundLayer}

      {/* ✨ Extra Styling */}
      <style>{`
        .section-card {
          background: rgba(255, 255, 255, 0.38);
          backdrop-filter: blur(14px);
          border-radius: 22px;
          border: 1px solid rgba(255, 255, 255, 0.32);
          box-shadow: 0 8px 30px rgba(0,0,0,0.08);
          transition: 0.35s ease;
        }
        .section-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 38px rgba(255,150,180,0.25);
        }
        .fade-up {
          animation: fadeUp 0.6s ease forwards;
          will-change: transform, opacity;
        }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(25px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="container mx-auto px-5 py-10 max-w-2xl relative z-10">
        <Link to="/home" replace>
          <Button variant="ghost" className="mb-6 hover:bg-white/20">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back Home
          </Button>
        </Link>

        <div className="text-center fade-up mb-8">
          <h1 className="text-5xl font-handwriting text-foreground mb-1">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Customize your beautiful space 💖
          </p>
        </div>

        <div className="space-y-8">
          {/* NAME */}
          <Card className="p-6 section-card fade-up">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Your Name</h2>
            </div>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
            <Button className="w-full mt-3" onClick={handleUpdateName}>
              Update Name
            </Button>
          </Card>

          {/* THEME */}
          <Card
            className="p-6 section-card fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-3 mb-3">
              {theme === "light" ? (
                <Sun className="w-5 h-5 text-primary" />
              ) : (
                <Moon className="w-5 h-5 text-primary" />
              )}
              <h2 className="text-xl font-semibold">Theme</h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                className="shadow-sm"
                onClick={() => handleThemeChange("light")}
              >
                <Sun className="w-4 h-4 mr-2" /> Light
              </Button>

              <Button
                variant={theme === "dark" ? "default" : "outline"}
                className="shadow-sm"
                onClick={() => handleThemeChange("dark")}
              >
                <Moon className="w-4 h-4 mr-2" /> Dark
              </Button>
            </div>
          </Card>

          {/* PIN */}
          <Card
            className="p-6 section-card fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Lock className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold">Change PIN</h2>
            </div>

            <div className="space-y-3">
              <Input
                type="password"
                autoComplete="off"
                placeholder="Current PIN"
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value)}
              />
              <Input
                type="password"
                placeholder="New PIN"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Confirm New PIN"
                value={confirmNewPin}
                onChange={(e) => setConfirmNewPin(e.target.value)}
              />
              <Button className="w-full" onClick={handleUpdatePin}>
                Update PIN
              </Button>
            </div>
          </Card>

          {/* CLEAR DATA */}
          <Card
            className="p-6 section-card fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Trash2 className="w-5 h-5 text-rose-600" />
              <h2 className="text-xl font-semibold text-rose-600">
                Start Again
              </h2>
            </div>

            <p className="text-sm text-foreground/70 mb-4">
              Clears PIN, name, theme, favorites, messages & all app memory and
              start again.
            </p>

            <Button
              variant="destructive"
              className="w-full"
              onClick={handleClearData}
            >
              Clear Data
            </Button>
          </Card>
        </div>

        <div className="text-center mt-10 text-sm text-muted-foreground fade-up">
          <p>Made with ❤️ for Shruti By Rushi</p>
        </div>
      </div>
    </div>
  );
}
