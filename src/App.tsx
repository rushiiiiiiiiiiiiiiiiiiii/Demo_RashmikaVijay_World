import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { storage } from "./lib/storage";

import Entry from "./pages/Entry";             // ✅ NEW INTRO PAGE
import Onboarding from "./pages/Onboarding";
import LockScreen from "./pages/Lock";
import Home from "./pages/Home";
import DailyMessage from "./pages/DailyMessage";
import Timeline from "./pages/Timeline";
import LoveCoupans from "./pages/LoveCoupons";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import VoiceNotes from "./pages/VoiceNotes";
import Moods from "./pages/Moods";
import Affirmations from "./pages/Affirmations";
import Songs from "./pages/Songs";
import Shayaris from "./pages/Shayaris";
import Photos from "./pages/Photos";
import Calendar from "./pages/Calendar";
import FunZone from "./pages/FunZone";
import SpecialEvents from "./pages/SpecialEvents";
import FoodPicker from "./pages/FoodPicker";
import Proposals from "./pages/Proposals";
import Reasons from "./pages/Reasons";

import { HeartAnimation } from "@/components/HeartAnimation";
import { useGlobalMusic } from "@/hooks/useGlobalMusic";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isSetupComplete = storage.isSetupComplete();

  return isSetupComplete ? (
    <>{children}</>
  ) : (
    <Navigate to="/onboarding" replace />
  );
};

export default function App() {
  const { resumeMusic } = useGlobalMusic();

  useEffect(() => {
    resumeMusic();
  }, []);

  useEffect(() => {
    const theme = storage.getTheme();
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />

        {/* Global floating hearts */}
        <HeartAnimation />

        {/* All routes */}
        <Routes>

          {/* ⭐ ENTRY PAGE FIRST */}
         <Route path="/" element={<Entry />} />

          {/* SETUP FLOW */}
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/lock" element={<LockScreen />} />

          {/* PROTECTED PAGES */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/daily-message"
            element={
              <ProtectedRoute>
                <DailyMessage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/timeline"
            element={
              <ProtectedRoute>
                <Timeline />
              </ProtectedRoute>
            }
          />

          <Route
            path="/coupans"
            element={
              <ProtectedRoute>
                <LoveCoupans />
              </ProtectedRoute>
            }
          />

          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/voice-notes"
            element={
              <ProtectedRoute>
                <VoiceNotes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/moods"
            element={
              <ProtectedRoute>
                <Moods />
              </ProtectedRoute>
            }
          />

          <Route
            path="/affirmations"
            element={
              <ProtectedRoute>
                <Affirmations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/songs"
            element={
              <ProtectedRoute>
                <Songs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/shayaris"
            element={
              <ProtectedRoute>
                <Shayaris />
              </ProtectedRoute>
            }
          />

          <Route
            path="/photos"
            element={
              <ProtectedRoute>
                <Photos />
              </ProtectedRoute>
            }
          />

          <Route
            path="/calendar"
            element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            }
          />

          <Route
            path="/fun-zone"
            element={
              <ProtectedRoute>
                <FunZone />
              </ProtectedRoute>
            }
          />

          <Route
            path="/special-events"
            element={
              <ProtectedRoute>
                <SpecialEvents />
              </ProtectedRoute>
            }
          />

          <Route
            path="/food-picker"
            element={
              <ProtectedRoute>
                <FoodPicker />
              </ProtectedRoute>
            }
          />

          <Route
            path="/proposals"
            element={
              <ProtectedRoute>
                <Proposals />
              </ProtectedRoute>
            }
          />

          <Route
            path="/reasons"
            element={
              <ProtectedRoute>
                <Reasons />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
