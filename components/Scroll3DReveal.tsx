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
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
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
        return "perspective(1000px) rotateX(15deg) translateY(30px) translateZ(-20px)";
      case "down":
        return "perspective(1000px) rotateX(-15deg) translateY(-30px) translateZ(-20px)";
      case "left":
        return "perspective(1000px) rotateY(-15deg) translateX(30px) translateZ(-20px)";
      case "right":
        return "perspective(1000px) rotateY(15deg) translateX(-30px) translateZ(-20px)";
      default:
        return "perspective(1000px) rotateX(15deg) translateY(30px) translateZ(-20px)";
    }
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-700 ease-out transform-gpu ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) translateX(0px) translateZ(0px) scale(1)"
          : getInitialTransform(),
        transitionDelay: `${delay}ms`,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
