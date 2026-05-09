"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";

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
    <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
      <div className="animate-bounce">
        <div className="brutalist-card bg-white p-4 rotate-[-3deg]">
          <ArrowDown size={32} strokeWidth={3} className="text-black" />
        </div>
      </div>
    </div>
  );
}
