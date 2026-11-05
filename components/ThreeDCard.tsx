"use client";

import React, { useState, useRef, ReactNode } from "react";

interface ThreeDCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: number;
}

export default function ThreeDCard({
  children,
  className = "",
  glowColor = "rgba(239, 68, 68, 0.4)",
  intensity = 15,
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0);
  const [rotY, setRotY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -intensity;
    const rotateY = ((x - centerX) / centerX) * intensity;

    setRotX(rotateX);
    setRotY(rotateY);

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.6 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotX(0);
    setRotY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative perspective-1000 group transition-transform duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${
          isHovered ? 1.02 : 1
        }, ${isHovered ? 1.02 : 1}, 1)`,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Dynamic Specular 3D Holographic Light Reflexion */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 z-30 overflow-hidden"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(600px circle at ${glarePos.x}% ${glarePos.y}%, ${glowColor}, transparent 60%)`,
        }}
      />

      {/* 3D Border Glow Aura */}
      <div
        className={`pointer-events-none absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-red-600 via-rose-500 to-red-800 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500 z-0 ${
          isHovered ? "shadow-[0_0_30px_rgba(239,68,68,0.5)]" : ""
        }`}
      />

      {/* Card Body with Preserve-3D depth */}
      <div className="relative z-10 w-full h-full preserve-3d">
        {children}
      </div>
    </div>
  );
}
