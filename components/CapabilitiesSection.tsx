"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { 
  Layout, 
  Workflow, 
  Database, 
  CheckCircle2, 
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  features: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: "websites",
    title: "High-Converting Websites",
    subtitle: "Speed & Customer Growth",
    icon: Layout,
    description: "Fast, custom websites designed to showcase your brand, rank high on Google, and convert site visitors into paying clients.",
    features: [
      "Mobile-Friendly Layout for All Screen Sizes",
      "Google Search Optimization to Attract More Clients",
      "Instant Page Loading to Stop Visitors Leaving",
      "Easy Content Management for Quick Updates"
    ]
  },
  {
    id: "apps",
    title: "Custom Web Applications",
    subtitle: "Interactive Business Tools",
    icon: Workflow,
    description: "Tailored web software that automates client interactions, manages workflows, and streamlines your everyday operations.",
    features: [
      "Custom Client Dashboards & Admin Panels",
      "Secure Account Login & User Protection",
      "Live Data Updates & Instant Synchronization",
      "Online Forms & Automated Customer Ordering"
    ]
  },
  {
    id: "systems",
    title: "Business Automation & Systems",
    subtitle: "Save Time & Eliminate Manual Work",
    icon: Database,
    description: "Smart system connections and automated database workflows that replace tedious manual tasks and keep your business running smoothly.",
    features: [
      "Connect Your Apps to Share Data Automatically",
      "Automated Customer Notifications & Email Flows",
      "Centralized Customer Database & File Storage",
      "Admin Controls to Monitor Team & Business Activity"
    ]
  }
];

export default function CapabilitiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check screen size for responsive 3D perspective tuning
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SERVICES.length);
  }, []);

  const handleSelect = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    const threshold = 30;
    const velocityThreshold = 200;
    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      handleNext();
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      handlePrev();
    }
  }, [handleNext, handlePrev]);

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "Home") {
      e.preventDefault();
      handleSelect(0);
    } else if (e.key === "End") {
      e.preventDefault();
      handleSelect(SERVICES.length - 1);
    }
  };

  return (
    <section 
      id="services" 
      className="max-w-6xl mx-auto relative z-10 scroll-mt-28 px-4 sm:px-6 outline-none"
      aria-label="Services and Solutions Carousel"
      suppressHydrationWarning
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[300px] sm:w-[600px] h-[250px] sm:h-[300px] bg-red-600/10 rounded-full blur-[100px] sm:blur-[120px] transform-gpu" />
      </div>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/35 text-red-400 text-xs font-mono uppercase tracking-widest mb-3 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-red-500 shrink-0" />
          <span>Services & Solutions</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          What I <span className="gradient-text-red">Offer</span>
        </h2>
        <p className="text-neutral-300 text-xs sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed px-2 font-normal">
          I build tailored web solutions designed to solve business challenges, improve operational efficiency, and deliver outstanding user experiences.
        </p>
      </div>

      {/* Manual Carousel Stage with 3D Depth & Peeking Cards */}
      <div 
        ref={containerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-xl mx-auto h-[420px] sm:h-[440px] [perspective:1000px] sm:[perspective:1200px] focus:outline-none focus:ring-1 focus:ring-red-500/40 rounded-3xl"
        aria-roledescription="carousel"
      >
        {SERVICES.map((service, idx) => {
          // Calculate relative circular index offset
          let offset = idx - currentIndex;
          const total = SERVICES.length;
          if (offset < -total / 2) offset += total;
          if (offset > total / 2) offset -= total;

          const isActive = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;

          // 3D positioning parameters for continuous visual depth & peeking
          let xOffset = "0%";
          let scale = 1;
          let rotateY = 0;
          let opacity = 1;
          let zIndex = 30;
          let filter = "brightness(1)";

          if (isLeft) {
            xOffset = isMobile ? "-62%" : "-58%";
            scale = isMobile ? 0.86 : 0.84;
            rotateY = isMobile ? 14 : 18;
            opacity = 0.55;
            zIndex = 20;
            filter = "brightness(0.6)";
          } else if (isRight) {
            xOffset = isMobile ? "62%" : "58%";
            scale = isMobile ? 0.86 : 0.84;
            rotateY = isMobile ? -14 : -18;
            opacity = 0.55;
            zIndex = 20;
            filter = "brightness(0.6)";
          } else if (!isActive) {
            xOffset = offset < 0 ? "-110%" : "110%";
            scale = 0.72;
            rotateY = offset < 0 ? 30 : -30;
            opacity = 0;
            zIndex = 10;
            filter = "brightness(0.3)";
          }

          return (
            <motion.div
              key={service.id}
              className={`absolute inset-0 w-full h-full transform-gpu ${
                isActive ? "cursor-grab active:cursor-grabbing" : "cursor-pointer"
              }`}
              initial={false}
              animate={{
                x: xOffset,
                scale: scale,
                rotateY: rotateY,
                opacity: opacity,
                zIndex: zIndex,
                filter: filter,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 26,
                mass: 0.8,
              }}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              onClick={() => {
                if (!isActive) handleSelect(idx);
              }}
              style={{
                transformStyle: "preserve-3d",
                pointerEvents: "auto",
              }}
            >
              {/* Active Ambient Glow */}
              {isActive && (
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-600/30 via-red-500/20 to-red-900/30 blur-xl opacity-80 pointer-events-none" />
              )}

              {/* Main Card Outer Shell */}
              <div 
                className={`relative w-full h-full p-5 sm:p-6 rounded-3xl bg-black/95 sm:bg-black/90 border transition-all duration-300 backdrop-blur-xl flex flex-col justify-between shadow-[0_0_30px_rgba(0,0,0,0.9)] ${
                  isActive 
                    ? "border-red-500/60 shadow-[0_0_35px_rgba(239,68,68,0.25)] ring-1 ring-red-500/30" 
                    : "border-red-500/25 hover:border-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]"
                }`}
              >
                <div className={`transition-opacity duration-300 flex-1 flex flex-col justify-between ${isActive ? "opacity-100" : "opacity-60"}`}>
                  <div>
                    {/* Header Row: Icon + Subtitle Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4">
                      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg shrink-0 ${
                        isActive 
                          ? "bg-red-950 border border-red-500/50 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]" 
                          : "bg-red-950/60 border border-red-500/20 text-neutral-400"
                      }`}>
                        <service.icon className="w-5 h-5" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider truncate max-w-[220px] text-right">
                        {service.subtitle}
                      </span>
                    </div>

                    {/* Service Title */}
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
                      {service.title}
                    </h3>

                    {/* Service Description */}
                    <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 font-normal">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <div className="border-t border-red-500/20 pt-3">
                    <div className="text-[10px] sm:text-[11px] font-mono text-red-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-red-500 shrink-0" />
                      Key Deliverables
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-300">
                      {service.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* User-Driven Navigation Controls */}
      <div className="mt-8 flex items-center justify-center gap-3 sm:gap-6 relative z-20">
        <button
          onClick={handlePrev}
          aria-label="Previous service"
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black/90 border border-red-500/30 text-white hover:bg-red-950 hover:border-red-500 hover:text-red-400 transition-all duration-200 active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Interactive Pagination Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {SERVICES.map((service, idx) => (
            <button
              key={service.id}
              onClick={() => handleSelect(idx)}
              aria-label={`Go to ${service.title}`}
              aria-current={idx === currentIndex ? "true" : "false"}
              className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer group focus:outline-none"
            >
              <span className={`transition-all duration-300 rounded-full ${
                idx === currentIndex 
                  ? "w-7 sm:w-8 h-2.5 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" 
                  : "w-2.5 h-2.5 bg-red-950 border border-red-500/40 group-hover:bg-red-500/60"
              }`} />
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          aria-label="Next service"
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black/90 border border-red-500/30 text-white hover:bg-red-950 hover:border-red-500 hover:text-red-400 transition-all duration-200 active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </section>
  );
}
