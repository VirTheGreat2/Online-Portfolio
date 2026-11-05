"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none transition-all duration-300">
      <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-950/80 border border-red-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(239,68,68,0.25)] text-slate-300 text-xs tracking-widest uppercase font-mono font-medium animate-bounce">
        <span className="bg-gradient-to-r from-slate-200 to-red-400 bg-clip-text text-transparent">Scroll to explore</span>
        <ChevronDown size={14} className="text-red-500 animate-pulse" />
      </div>
    </div>
  );
}
