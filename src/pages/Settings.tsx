import { useState } from "react";
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
    if (name.trim().length < 2) {
      toast.error("Name must be at least 2 characters");
      return;
    }
    storage.updateUserProfile({ name: name.trim() });
    toast.success("Name updated! ❤️");
  };

  const handleUpdatePin = () => {
    if (!storage.verifyPin(currentPin)) {
      toast.error("Current PIN is incorrect");
      return;
    }
    if (newPin.length < 4) {
      toast.error("New PIN must be at least 4 characters");
      return;
    }
    if (newPin !== confirmNewPin) {
      toast.error("New PINs don't match");
      return;
    }
    storage.updateUserProfile({ pin: newPin });
    setCurrentPin("");
    setNewPin("");
    setConfirmNewPin("");
    toast.success("PIN updated successfully! 🔒");
  };

  const handleThemeChange = (newTheme: 'light' | 'dark') => {
    setTheme(newTheme);
    storage.setTheme(newTheme);
    toast.success(`Switched to ${newTheme} mode`);
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all data? This cannot be undone.")) {
      storage.clearAll();
      toast.success("All data cleared");
      navigate("/onboarding");
    }
  };

  return (
    <div className="min-h-screen romantic-gradient relative">
      <HeartAnimation />
      
      <div className="container mx-auto px-4 py-8 relative z-10 max-w-2xl">
        <Link to="/home">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back Home
          </Button>
        </Link>

        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-handwriting text-foreground mb-2">
            Settings
          </h1>
          <p className="text-muted-foreground">
            Customize your experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Name Settings */}
          <Card className="p-6 animate-fade-in bg-card/95 backdrop-blur">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Your Name</h2>
            </div>
            <div className="space-y-3">
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
              <Button onClick={handleUpdateName} className="w-full">
                Update Name
              </Button>
            </div>
          </Card>

          {/* Theme Settings */}
          <Card className="p-6 animate-fade-in bg-card/95 backdrop-blur" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-4">
              {theme === 'light' ? (
                <Sun className="w-5 h-5 text-primary" />
              ) : (
                <Moon className="w-5 h-5 text-primary" />
              )}
              <h2 className="text-xl font-semibold text-foreground">Theme</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => handleThemeChange('light')}
                className={theme === 'light' ? 'primary-gradient text-primary-foreground' : ''}
              >
                <Sun className="w-4 h-4 mr-2" />
                Light
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => handleThemeChange('dark')}
                className={theme === 'dark' ? 'primary-gradient text-primary-foreground' : ''}
              >
                <Moon className="w-4 h-4 mr-2" />
                Dark
              </Button>
            </div>
          </Card>

          {/* PIN Settings */}
          <Card className="p-6 animate-fade-in bg-card/95 backdrop-blur" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Change PIN</h2>
            </div>
            <div className="space-y-3">
              <Input
                type="password"
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
              <Button onClick={handleUpdatePin} className="w-full">
                Update PIN
              </Button>
            </div>
          </Card>

          {/* Danger Zone */}
          <Card className="p-6 animate-fade-in bg-card/95 backdrop-blur border-destructive/50" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-4">
              <Trash2 className="w-5 h-5 text-destructive" />
              <h2 className="text-xl font-semibold text-destructive">Danger Zone</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              This will delete all your data including favorites, unlocked messages, and settings.
            </p>
            <Button 
              onClick={handleClearData} 
              variant="destructive"
              className="w-full"
            >
              Clear All Data
            </Button>
          </Card>
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>Made with ❤️ by Rushi</p>
        </div>
      </div>
    </div>
  );
}
