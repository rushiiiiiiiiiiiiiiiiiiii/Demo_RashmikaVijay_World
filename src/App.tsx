import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { storage } from "./lib/storage";
import Onboarding from "./pages/Onboarding";
import LockScreen from "./pages/Lock";
import Home from "./pages/Home";
import DailyMessage from "./pages/DailyMessage";
import Timeline from "./pages/Timeline";
import JarOfHearts from "./pages/JarOfHearts";
import Settings from "./pages/Settings";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isSetupComplete = storage.isSetupComplete();
  
  if (!isSetupComplete) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  useEffect(() => {
    // Initialize theme on app load
    const theme = storage.getTheme();
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              storage.isSetupComplete() ? <Navigate to="/lock" replace /> : <Navigate to="/onboarding" replace />
            } />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/lock" element={<LockScreen />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/daily-message" element={<ProtectedRoute><DailyMessage /></ProtectedRoute>} />
            <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
            <Route path="/jar" element={<ProtectedRoute><JarOfHearts /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            
            {/* Placeholder routes for other features */}
            <Route path="/voice-notes" element={<ProtectedRoute><Placeholder title="Voice Notes" description="My voice messages for you" emoji="🎤" /></ProtectedRoute>} />
            <Route path="/moods" element={<ProtectedRoute><Placeholder title="How Are You Feeling?" description="Share your mood with me" emoji="😊" /></ProtectedRoute>} />
            <Route path="/affirmations" element={<ProtectedRoute><Placeholder title="Daily Affirmations" description="Words of love & encouragement" emoji="✨" /></ProtectedRoute>} />
            <Route path="/songs" element={<ProtectedRoute><Placeholder title="My Songs For You" description="Music that reminds me of you" emoji="🎵" /></ProtectedRoute>} />
            <Route path="/shayaris" element={<ProtectedRoute><Placeholder title="My Shayaris" description="Poetry from my heart" emoji="📖" /></ProtectedRoute>} />
            <Route path="/photos" element={<ProtectedRoute><Placeholder title="Our Memories" description="Photos of us together" emoji="📸" /></ProtectedRoute>} />
            <Route path="/calendar" element={<ProtectedRoute><Placeholder title="Love Calendar" description="Special dates & countdowns" emoji="📅" /></ProtectedRoute>} />
            <Route path="/fun-zone" element={<ProtectedRoute><Placeholder title="Fun Zone" description="Games & activities for us" emoji="🎮" /></ProtectedRoute>} />
            <Route path="/special-events" element={<ProtectedRoute><Placeholder title="Special Events" description="Birthdays & celebrations" emoji="🎉" /></ProtectedRoute>} />
            <Route path="/food-picker" element={<ProtectedRoute><Placeholder title="What Should We Eat?" description="Food choices & surprises" emoji="🍕" /></ProtectedRoute>} />
            <Route path="/proposals" element={<ProtectedRoute><Placeholder title="Proposal Ideas" description="Future plans & dreams" emoji="💍" /></ProtectedRoute>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
