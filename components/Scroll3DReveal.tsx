"use client";

import React, { useEffect, useRef, useState } from "react";

interface Scroll3DRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
  direction?: "up" | "down" | "left" | "right";
}

export default function Scroll3DReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: Scroll3DRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (domRef.current) observer.unobserve(domRef.current);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, []);

  // Determine initial 3D transform according to direction
  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return "perspective(1000px) rotateX(25deg) translateY(40px) translateZ(-40px)";
      case "down":
        return "perspective(1000px) rotateX(-25deg) translateY(-40px) translateZ(-40px)";
      case "left":
        return "perspective(1000px) rotateY(-25deg) translateX(40px) translateZ(-40px)";
      case "right":
        return "perspective(1000px) rotateY(25deg) translateX(-40px) translateZ(-40px)";
      default:
        return "perspective(1000px) rotateX(25deg) translateY(40px) translateZ(-40px)";
    }
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) translateX(0px) translateZ(0px) scale(1)"
          : getInitialTransform(),
        transitionDelay: `${delay}ms`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}
