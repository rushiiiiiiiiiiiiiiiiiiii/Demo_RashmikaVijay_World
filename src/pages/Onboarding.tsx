import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  Lock,
  Sparkles,
  Delete,
  Moon,
  Sun,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { storage } from "@/lib/storage";
import { toast } from "sonner";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form State
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [isConfirmMode, setIsConfirmMode] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Visual State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [spotlightPos, setSpotlightPos] = useState({ x: "50%", y: "50%" });
  const [isExiting, setIsExiting] = useState(false);

  // Interactive Effects State
  const [ripples, setRipples] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const [clickSparkles, setClickSparkles] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const rippleIdRef = useRef(0);
  const sparkleIdRef = useRef(0);

  // --- EFFECT: Parallax & Spotlight ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
      setSpotlightPos({ x: `${e.clientX}px`, y: `${e.clientY}px` });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- INTERACTIVE CLICK HANDLER ---
  const handleGlobalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only trigger if clicking the background (optional check, but good for UX)
    // For now, we trigger everywhere for maximum magic
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 1. Ripple
    rippleIdRef.current += 1;
    const newRippleId = rippleIdRef.current;
    setRipples((prev) => [...prev, { x, y, id: newRippleId }]);
    setTimeout(
      () => setRipples((prev) => prev.filter((r) => r.id !== newRippleId)),
      1000
    );

    // 2. Sparkles (Burst)
    const sparkCount = 8;
    const newSparkles = Array.from({ length: sparkCount }).map(() => {
      sparkleIdRef.current += 1;
      return { x, y, id: sparkleIdRef.current };
    });
    setClickSparkles((prev) => [...prev, ...newSparkles]);
    setTimeout(() => {
      setClickSparkles((prev) =>
        prev.filter((s) => !newSparkles.find((ns) => ns.id === s.id))
      );
    }, 1000);
  };

  // --- LOGIC: Handlers ---
  const handleNameSubmit = (e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent double ripple if clicking button
    if (name.trim().length < 2) {
      toast.error("Please enter your name, my love");
      return;
    }
    setStep(2);
  };

  const handlePress = (num: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isConfirmMode) {
      if (pin.length < 4) {
        const newPin = pin + num;
        setPin(newPin);
        if (newPin.length === 4) {
          setTimeout(() => setIsConfirmMode(true), 300);
        }
      }
    } else {
      if (confirmPin.length < 4) setConfirmPin(confirmPin + num);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isConfirmMode) setPin(pin.slice(0, -1));
    else setConfirmPin(confirmPin.slice(0, -1));
  };

  // Auto-submit PIN when 4 digits confirmed
  useEffect(() => {
    if (isConfirmMode && confirmPin.length === 4) {
      if (pin !== confirmPin) {
        toast.error("The keys don't match. Try again?");
        setConfirmPin("");
        setPin("");
        setIsConfirmMode(false);
      } else {
        setTimeout(() => setStep(3), 300);
      }
    }
  }, [confirmPin, isConfirmMode, pin]);

  const handleComplete = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsExiting(true);

    storage.setUserProfile({
      name: name.trim(),
      pin,
      theme,
      setupComplete: true,
    });
    storage.setTheme(theme);

    setTimeout(() => {
      toast.success(`Welcome home, ${name}. ❤️`);
      navigate("/home");
    }, 1000);
  };

  // --- DYNAMIC STYLES ---
  const backgroundStyle =
    theme === "light"
      ? "radial-gradient(circle at center, #fff0f5 0%, #ffe4e8 100%)"
      : "radial-gradient(circle at center, #2d1b2e 0%, #1a1016 100%)";

  const textGradient =
    theme === "light"
      ? "from-rose-500 to-rose-700"
      : "from-rose-300 to-rose-100";

  const cardBg =
    theme === "light"
      ? "bg-white/30 border-white/50"
      : "bg-black/30 border-white/10";

  return (
    <div
      className={`min-h-screen relative overflow-hidden flex items-center justify-center p-4 transition-all duration-1000 background-breathe ${
        isExiting ? "scale-110 opacity-0 filter blur-lg" : "opacity-100"
      }`}
      style={{ background: backgroundStyle }}
      onClick={handleGlobalClick}
    >
      {/* --- TEXTURE OVERLAY --- */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none z-0 mix-blend-overlay"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")`,
        }}
      ></div>

      {/* --- FALLING PETALS (Added as requested) --- */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={`petal-${i}`}
            className="white-petal"
            style={
              {
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${8 + Math.random() * 5}s`,
                opacity: theme === "light" ? 0.6 : 0.2,
                transform: `scale(${0.5 + Math.random() * 0.5})`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* --- FLOATING PARTICLES (Atmosphere) --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute rounded-full blur-[1px] animate-float ${
              theme === "light" ? "bg-white" : "bg-rose-200/20"
            }`}
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDuration: 15 + Math.random() * 20 + "s",
              animationDelay: Math.random() * 5 + "s",
            }}
          />
        ))}
      </div>

      {/* --- PARALLAX CLOUDS --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div
          className={`cloud cloud1 ${
            theme === "dark" ? "opacity-[0.08]" : "opacity-60"
          }`}
          style={{
            transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 10}px)`,
          }}
        ></div>
        <div
          className={`cloud cloud2 ${
            theme === "dark" ? "opacity-[0.08]" : "opacity-60"
          }`}
          style={{
            transform: `translate(${mousePos.x * -20}px, ${
              mousePos.y * -10
            }px)`,
          }}
        ></div>
      </div>

      {/* --- CLICK RIPPLES --- */}
      {ripples.map((r) => (
        <span
          key={`ripple-${r.id}`}
          className="ripple"
          style={{ top: r.y, left: r.x }}
        />
      ))}

      {/* --- CLICK SPARKLES --- */}
      {clickSparkles.map((s) => (
        <Sparkles
          key={`sparkle-${s.id}`}
          className="click-sparkle text-rose-300/80"
          style={{ left: s.x, top: s.y }}
        />
      ))}

      {/* --- SPOTLIGHT (Follows Mouse) --- */}
      <div
        className={`absolute w-[600px] h-[600px] blur-[100px] rounded-full pointer-events-none transition-opacity duration-700 z-0 ${
          theme === "light" ? "bg-rose-400/20" : "bg-rose-500/15"
        }`}
        style={{
          left: spotlightPos.x,
          top: spotlightPos.y,
          transform: "translate(-50%, -50%)",
        }}
      ></div>

      {/* --- GLASS CARD CONTAINER --- */}
      <div
        className={`relative z-20 w-full max-w-md transition-all duration-500 ${
          step === 2 ? "max-w-sm" : ""
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] rounded-3xl p-8 md:p-10 border ${cardBg} transition-all duration-500 relative overflow-hidden`}
        >
          {/* Step Progress Indicator */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-200/20">
            <div
              className="h-full bg-rose-500 transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          {/* === STEP 1: NAME === */}
          {step === 1 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <Heart
                    className={`w-16 h-16 mx-auto animate-heartbeat ${
                      theme === "light" ? "text-rose-500" : "text-rose-400"
                    }`}
                    fill="currentColor"
                  />
                  <div className="absolute inset-0 blur-xl bg-rose-500/40 animate-pulse"></div>
                </div>
                <h1
                  className={`text-4xl md:text-5xl font-handwriting font-bold bg-clip-text text-transparent bg-gradient-to-br ${textGradient} mb-3`}
                >
                  Before We Begin...
                </h1>
                <p
                  className={`text-lg ${
                    theme === "light" ? "text-rose-900/60" : "text-rose-100/60"
                  }`}
                >
                  Can you please Enter your good name, my love?
                </p>
              </div>

              <div className="relative group">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your beautiful name..."
                  className={`w-full bg-transparent border-b-2 py-3 text-center text-2xl font-serif placeholder:font-sans placeholder:text-lg placeholder:opacity-40 outline-none transition-all duration-300
                     ${
                       theme === "light"
                         ? "border-rose-200 text-rose-900 focus:border-rose-500 placeholder-rose-300"
                         : "border-rose-800 text-rose-100 focus:border-rose-400 placeholder-rose-700"
                     }`}
                  autoFocus
                />
                <Sparkles className="absolute right-2 top-3 w-5 h-5 text-rose-400 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 animate-spin-slow" />
              </div>

              <button
                onClick={(e) => handleNameSubmit(e)}
                disabled={name.length < 2}
                className={`w-full py-4 rounded-2xl font-medium text-lg tracking-wide shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2
                   ${
                     name.length < 2
                       ? "opacity-50 cursor-not-allowed grayscale"
                       : ""
                   }
                   ${
                     theme === "light"
                       ? "bg-gradient-to-r from-rose-400 to-rose-600 text-white shadow-rose-300/50"
                       : "bg-gradient-to-r from-rose-700 to-rose-900 text-rose-100 shadow-black/30 border border-rose-500/20"
                   }`}
              >
                Continue <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* === STEP 2: PIN (GLASS KEYPAD) === */}
          {step === 2 && (
            <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6 animate-fade-in-up text-center">
              <h3
                className={`text-2xl md:text-3xl font-['Parisienne'] 
  ${theme === "light" ? "text-rose-900" : "text-rose-100"}`}
              >
                This world opens only for your touch..
              </h3>

              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setStep(1)}
                  className={`p-2 rounded-full hover:bg-white/10 transition-colors ${
                    theme === "dark" ? "text-white" : "text-rose-900"
                  }`}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="flex flex-col items-center">
                  <Lock
                    className={`w-8 h-8 mb-2 ${
                      theme === "light" ? "text-rose-500" : "text-rose-400"
                    }`}
                  />
                  <h2
                    className={`text-2xl font-handwriting ${
                      theme === "light" ? "text-rose-800" : "text-rose-100"
                    }`}
                  >
                    {isConfirmMode
                      ? "Just to be sure..."
                      : "Create a Secret Key"}
                  </h2>
                </div>
                <div className="w-10"></div>
              </div>

              {/* PIN Dots */}
              <div className="flex justify-center gap-4 mb-6">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full transition-all duration-300 border 
                       ${
                         (isConfirmMode ? confirmPin.length : pin.length) > i
                           ? "bg-rose-500 border-rose-500 scale-110 shadow-[0_0_10px_rgba(244,63,94,0.5)]"
                           : theme === "light"
                           ? "bg-rose-100 border-rose-300"
                           : "bg-white/10 border-white/20"
                       }`}
                  ></div>
                ))}
              </div>

              {/* Glass Keypad */}
              <div className="grid grid-cols-3 gap-4 max-w-[280px] mx-auto">
                {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                  <button
                    key={num}
                    onClick={(e) => handlePress(num, e)}
                    className={`h-16 w-16 rounded-full text-2xl font-light transition-all duration-200 active:scale-90 flex items-center justify-center backdrop-blur-sm
                       ${
                         theme === "light"
                           ? "bg-white/40 hover:bg-white/60 text-rose-900 shadow-sm"
                           : "bg-white/5 hover:bg-white/10 text-rose-100 border border-white/10"
                       }`}
                  >
                    {num}
                  </button>
                ))}
                <div className="h-16 w-16"></div>
                <button
                  onClick={(e) => handlePress("0", e)}
                  className={`h-16 w-16 rounded-full text-2xl font-light transition-all duration-200 active:scale-90 flex items-center justify-center backdrop-blur-sm
                    ${
                      theme === "light"
                        ? "bg-white/40 hover:bg-white/60 text-rose-900 shadow-sm"
                        : "bg-white/5 hover:bg-white/10 text-rose-100 border border-white/10"
                    }`}
                >
                  0
                </button>
                <button
                  onClick={(e) => handleDelete(e)}
                  className={`h-16 w-16 rounded-full flex items-center justify-center text-rose-500 transition-all duration-200 active:scale-90 hover:bg-rose-500/10`}
                >
                  <Delete className="w-6 h-6" />
                </button>
              </div>
            </div>
          )}

          {/* === STEP 3: THEME === */}
          {step === 3 && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center space-y-2">
                <Sparkles
                  className={`w-12 h-12 mx-auto animate-spin-slow ${
                    theme === "light" ? "text-amber-400" : "text-purple-300"
                  }`}
                />
                <h1
                  className={`text-4xl font-handwriting font-bold ${
                    theme === "light" ? "text-rose-900" : "text-rose-100"
                  }`}
                >
                  Set the Mood
                </h1>
                <p
                  className={`text-sm opacity-70 ${
                    theme === "light" ? "text-rose-800" : "text-rose-200"
                  }`}
                >
                  How should our world look?
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme("light");
                  }}
                  className={`relative group p-6 rounded-2xl border-2 transition-all duration-500 overflow-hidden
                     ${
                       theme === "light"
                         ? "border-rose-500 bg-rose-50 shadow-[0_0_30px_rgba(244,63,94,0.2)]"
                         : "border-transparent bg-white/40 hover:bg-white/60"
                     }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-rose-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <Sun
                      className={`w-10 h-10 ${
                        theme === "light" ? "text-rose-500" : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        theme === "light" ? "text-rose-900" : "text-gray-700"
                      }`}
                    >
                      Morning
                    </span>
                  </div>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTheme("dark");
                  }}
                  className={`relative group p-6 rounded-2xl border-2 transition-all duration-500 overflow-hidden
                     ${
                       theme === "dark"
                         ? "border-purple-400 bg-slate-900/80 shadow-[0_0_30px_rgba(168,85,247,0.2)]"
                         : "border-transparent bg-white/40 hover:bg-slate-800/10"
                     }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-purple-900 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <Moon
                      className={`w-10 h-10 ${
                        theme === "dark" ? "text-purple-300" : "text-gray-500"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-700"
                      }`}
                    >
                      Midnight
                    </span>
                  </div>
                </button>
              </div>

              <button
                onClick={(e) => handleComplete(e)}
                className={`w-full py-4 rounded-2xl font-medium text-lg shadow-lg transform transition-all duration-300 hover:scale-[1.02] active:scale-95 mt-4
                   ${
                     theme === "light"
                       ? "bg-rose-500 text-white hover:bg-rose-600 shadow-rose-400/40"
                       : "bg-purple-600 text-white hover:bg-purple-700 shadow-purple-500/40"
                   }`}
              >
                Enter Our World
              </button>
            </div>
          )}
        </div>
      </div>

      {/* === GLOBAL STYLES === */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap');

        body { font-family: 'Inter', sans-serif; }
        .font-handwriting { font-family: 'Dancing Script', cursive; }
        .font-serif { font-family: 'Playfair Display', serif; }

        /* === FALLING PETALS === */
        .white-petal {
          position: absolute;
          width: 20px;
          height: 20px;
          background: white;
          border-radius: 100% 0 100% 0; /* Irregular petal shape */
          box-shadow: 0 0 5px rgba(255,255,255,0.5);
          animation: falling linear infinite;
          top: -10%; /* Start above screen */
        }

        @keyframes falling {
          0% { transform: translate(0, -10px) rotate(0deg) scale(0.8); opacity: 0; }
          10% { opacity: 1; }
          100% { transform: translate(-20px, 110vh) rotate(360deg) scale(0.8); opacity: 0; }
        }

        /* === BACKGROUND BREATHING === */
        .background-breathe {
          animation: bgBreathe 10s ease-in-out infinite alternate;
        }
        @keyframes bgBreathe {
          0% { filter: brightness(1); }
          100% { filter: brightness(1.05); }
        }

        /* === RIPPLES === */
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.4);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
          animation: rippleAnim 0.8s cubic-bezier(0, 0.2, 0.8, 1) forwards;
          pointer-events: none;
          z-index: 5;
        }
        @keyframes rippleAnim {
          0% { width: 0px; height: 0px; opacity: 0.6; border: 2px solid rgba(255,255,255,0.5); }
          100% { width: 400px; height: 400px; opacity: 0; border: 0px solid rgba(255,255,255,0); }
        }

        /* === SPARKLES === */
        .click-sparkle {
          position: absolute;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          animation: sparkleBurst 0.8s ease-out forwards;
          pointer-events: none;
          z-index: 6;
        }
        @keyframes sparkleBurst {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(0) rotate(0deg); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(1.5) rotate(180deg) translateY(-40px); }
        }

        /* ANIMATIONS */
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -10px); }
        }
        .animate-float { animation: float 5s ease-in-out infinite; }

        @keyframes heartbeat {
          0% { transform: scale(1); }
          15% { transform: scale(1.15); }
          30% { transform: scale(1); }
          45% { transform: scale(1.15); }
          60% { transform: scale(1); }
        }
        .animate-heartbeat { animation: heartbeat 2s infinite; }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }

        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* CLOUDS */
        .cloud {
          position: absolute;
          background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
          width: 500px;
          height: 300px;
          filter: blur(60px);
          transition: transform 0.1s linear;
          border-radius: 50%;
        }
        .cloud1 { top: -100px; left: -100px; }
        .cloud2 { bottom: -100px; right: -100px; }
      `}</style>
    </div>
  );
}
