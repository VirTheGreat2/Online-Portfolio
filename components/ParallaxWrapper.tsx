"use client";

import { useEffect, useState } from "react";

export default function ParallaxWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: -500, y: -500 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-slate-100 overflow-x-hidden selection:bg-red-600/40 selection:text-white font-sans">
      {/* Interactive Red Laser Cursor Glow Spot */}
      {isMounted && (
        <div
          className="fixed pointer-events-none z-0 w-[500px] h-[500px] rounded-full bg-red-600/15 blur-[120px] transition-opacity duration-500 -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
          }}
        />
      )}

      {/* Dynamic Animated Ambient Red Glows */}
      <div
        className="fixed inset-0 pointer-events-none transition-transform duration-1000 ease-out z-0"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
        }}
      >
        {/* Top-Left Red Flare */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-red-600/25 via-rose-900/15 to-transparent blur-[140px] animate-pulse-red" />
        
        {/* Bottom-Right Deep Crimson Glow */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tl from-red-700/20 via-red-950/20 to-transparent blur-[150px] animate-pulse-red [animation-delay:3s]" />
        
        {/* Center Accent Ruby Beam */}
        <div className="absolute top-[35%] left-[20%] w-[50%] h-[50%] rounded-full bg-gradient-to-r from-red-500/10 via-rose-700/10 to-transparent blur-[160px] animate-pulse-red [animation-delay:1.5s]" />
      </div>

      {/* Cybernetic High-Tech Grid & Scanline Pattern Overlay */}
      <div 
        className="fixed inset-0 bg-[linear-gradient(to_right,rgba(220,38,38,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(220,38,38,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_20%,#000_60%,transparent_100%)] pointer-events-none z-0" 
      />

      {/* Subtle Horizontal Laser Scanline */}
      <div className="fixed inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent pointer-events-none z-0 animate-scanline opacity-40" />

      {/* Main Page Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
