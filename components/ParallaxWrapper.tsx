"use client";

import { useEffect, useState } from "react";
import {
  Terminal,
  Save,
  SquarePen,
  Pencil,
  Database,
  Server,
  Laptop,
} from "lucide-react";

export default function ParallaxWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f5d1b0]">
      <div className="fixed inset-0 noise pointer-events-none" />

      {/* Background Decor Layer (-1 depth) */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`,
          transition: "transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)",
        }}
      >
        {/* Top Left Cluster: IT Roots */}
        <div className="absolute top-12 left-12 space-y-4 pointer-events-auto group/cluster">
          <div className="brutalist-card p-4 bg-white cursor-blink cursor-pointer">
            <Terminal size={48} strokeWidth={2} className="text-black" />
            <div className="mt-2 flex items-center gap-1 font-mono text-[10px] font-bold">
              <span className="text-black">{">"}_</span>
              <span className="w-1 h-3 bg-black cursor opacity-0"></span>
            </div>
          </div>
          <div className="brutalist-card p-4 bg-white rotate-[-5deg] vibrate-hover cursor-pointer inline-block">
            <Save size={32} strokeWidth={2} className="text-black" />
            <span className="block mt-1 handwritten text-[8px] font-bold text-black uppercase tracking-tighter">
              Legacy
            </span>
          </div>
        </div>

        {/* Top Right Cluster: Drafts */}
        <div className="absolute top-12 right-12 space-y-6 flex flex-col items-end pointer-events-auto group/cluster opacity-40 md:opacity-100">
          <div className="brutalist-card p-6 bg-white rotate-[3deg] hover:rotate-0 cursor-pointer">
            <SquarePen size={40} strokeWidth={2} className="text-black" />
            <div className="mt-4 space-y-1 w-16">
              <div className="h-0.5 bg-black/20 w-full"></div>
              <div className="h-0.5 bg-black/20 w-3/4"></div>
            </div>
          </div>
          <div className="relative rotate-[45deg] hover:rotate-[35deg] transition-transform cursor-pointer pr-8">
            <Pencil size={60} strokeWidth={1.5} className="text-black" />
          </div>
        </div>

        {/* Bottom Left Cluster: Infrastructure */}
        <div className="absolute bottom-12 left-12 space-y-4 pointer-events-auto group/cluster">
          <div className="brutalist-card p-5 bg-white rotate-[10deg] vibrate-hover cursor-pointer">
            <Server size={40} strokeWidth={2} className="text-black" />
          </div>
          <div className="brutalist-card p-4 bg-white -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <Database size={32} strokeWidth={2} className="text-black" />
            <span className="block mt-1 font-mono text-[8px] font-black text-black">
              NVMe.v2
            </span>
          </div>
        </div>

        {/* Bottom Right Anchor: The Workstation */}
        <div className="absolute bottom-12 right-12 pointer-events-auto group/cluster">
          <div className="relative rotate-[-12deg] hover:rotate-0 transition-all duration-500">
            <div className="brutalist-card p-8 bg-white relative">
              <Laptop size={80} strokeWidth={1.5} className="text-black" />
              {/* Lines of Code Simulation */}
              <div className="absolute top-[40%] left-[30%] space-y-1">
                <div className="w-10 h-1 bg-black/20 rounded-full animate-pulse"></div>
                <div className="w-14 h-1 bg-black/10 rounded-full"></div>
                <div className="w-8 h-1 bg-black/20 rounded-full animate-pulse delay-75"></div>
              </div>
              <span className="absolute -bottom-8 right-0 handwritten text-[12px] font-black text-black rotate-3">
                System Active.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
