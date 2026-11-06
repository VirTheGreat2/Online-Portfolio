"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  techStack: string[];
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
    ],
    techStack: ["Fast Edge Delivery", "SEO Optimized", "Mobile Responsive", "Modern Tech"]
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
    ],
    techStack: ["Custom Dashboards", "Secure Logins", "Live Data", "Scalable Systems"]
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
    ],
    techStack: ["App Integration", "Automated Flows", "Secure Database", "Data Privacy"]
  }
];

const AUTO_ROTATE_INTERVAL = 5000;

export default function CapabilitiesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for responsive 3D perspective tuning
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Permanent pause on user interaction
  const handleUserInteraction = useCallback(() => {
    if (!isUserInteracted) {
      setIsUserInteracted(true);
    }
  }, [isUserInteracted]);

  // Auto-play interval timer
  useEffect(() => {
    if (isUserInteracted) {
      setProgress(100);
      return;
    }

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / AUTO_ROTATE_INTERVAL) * 100, 100);
      setProgress(currentProgress);

      if (elapsed >= AUTO_ROTATE_INTERVAL) {
        setCurrentIndex((prev) => (prev + 1) % SERVICES.length);
        setProgress(0);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [currentIndex, isUserInteracted]);

  const handlePrev = useCallback(() => {
    handleUserInteraction();
    setCurrentIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
  }, [handleUserInteraction]);

  const handleNext = useCallback(() => {
    handleUserInteraction();
    setCurrentIndex((prev) => (prev + 1) % SERVICES.length);
  }, [handleUserInteraction]);

  const handleSelect = useCallback((index: number) => {
    handleUserInteraction();
    setCurrentIndex(index);
  }, [handleUserInteraction]);

  const handleDragEnd = useCallback((_: any, info: PanInfo) => {
    handleUserInteraction();
    if (info.offset.x < -35 || info.velocity.x < -250) {
      handleNext();
    } else if (info.offset.x > 35 || info.velocity.x > 250) {
      handlePrev();
    }
  }, [handleUserInteraction, handleNext, handlePrev]);

  return (
    <section id="services" className="max-w-6xl mx-auto relative z-10 scroll-mt-28 px-4 sm:px-6 overflow-hidden" suppressHydrationWarning>
      
      {/* Background Glow Effect */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] sm:w-[600px] h-[250px] sm:h-[300px] bg-red-600/10 rounded-full blur-[100px] sm:blur-[120px] transform-gpu" />
      </div>

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
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

      {/* Carousel Container Stage with 3D Perspective */}
      <div 
        className="relative min-h-[430px] sm:min-h-[460px] flex items-center justify-center overflow-visible py-2 [perspective:1000px] sm:[perspective:1200px]"
        onMouseEnter={handleUserInteraction}
        onTouchStart={handleUserInteraction}
      >
        <div className="relative w-full max-w-xl h-full flex items-center justify-center">
          {SERVICES.map((service, idx) => {
            // Calculate relative offset from current active slide
            let offset = idx - currentIndex;
            const total = SERVICES.length;
            if (offset < -total / 2) offset += total;
            if (offset > total / 2) offset -= total;

            const isActive = offset === 0;

            return (
              <motion.div
                key={service.id}
                className="absolute top-0 w-full cursor-grab active:cursor-grabbing transform-gpu"
                initial={false}
                animate={{
                  x: isMobile 
                    ? offset === 0 ? "0%" : offset < 0 ? "-100%" : "100%"
                    : offset === 0 ? "0%" : offset < 0 ? "-65%" : "65%",
                  scale: isActive ? 1 : isMobile ? 0.85 : 0.82,
                  rotateY: isMobile ? 0 : offset === 0 ? 0 : offset < 0 ? 18 : -18,
                  opacity: isActive ? 1 : isMobile ? 0 : 0.15,
                  zIndex: isActive ? 30 : 10,
                  filter: isActive ? "brightness(1)" : "brightness(0.3)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 28,
                  mass: 0.8,
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (!isActive) handleSelect(idx);
                }}
                style={{
                  transformStyle: "preserve-3d",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {/* Active Ambient Glow behind the card */}
                {isActive && (
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-red-600/30 via-red-500/20 to-red-900/30 blur-xl opacity-80 pointer-events-none" />
                )}

                {/* Main Card Outer Shell */}
                <div 
                  className={`relative p-5 sm:p-6 rounded-3xl bg-black/95 sm:bg-black/90 border transition-all duration-300 backdrop-blur-xl flex flex-col justify-between min-h-[410px] sm:min-h-[430px] shadow-[0_0_30px_rgba(0,0,0,0.9)] ${
                    isActive 
                      ? "border-red-500/60 shadow-[0_0_35px_rgba(239,68,68,0.25)]" 
                      : "border-red-500/20 hover:border-red-500/40"
                  }`}
                >
                  <div className={`transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-30"}`}>
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

                    {/* Deliverables List */}
                    <div className="border-t border-red-500/20 pt-3 mb-3">
                      <div className="text-[10px] sm:text-[11px] font-mono text-red-400 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-red-500 shrink-0" />
                        Key Deliverables
                      </div>
                      <ul className="space-y-1.5 text-xs text-neutral-300">
                        {service.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech Stack Footer Pills */}
                  <div className={`border-t border-red-500/20 pt-3 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-30"}`}>
                    <div className="flex flex-wrap gap-1.5">
                      {service.techStack.map((tech, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2.5 py-1 rounded-md bg-red-950/70 border border-red-500/30 text-red-300 font-mono text-[10px] sm:text-[11px] shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Controls & Progress Indicator */}
      <div className="mt-4 sm:mt-5 flex flex-col items-center gap-3 relative z-20">
        
        {/* Progress Bar Track */}
        <div className="w-48 sm:w-64 h-1.5 bg-red-950/80 rounded-full overflow-hidden border border-red-500/20 shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-75 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Navigation Buttons and Dots */}
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            onClick={handlePrev}
            aria-label="Previous slide"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black/90 border border-red-500/30 text-white hover:bg-red-950 hover:border-red-500 hover:text-red-400 transition-all duration-200 active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Interactive Dot Indicators */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {SERVICES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                aria-label={`Go to slide ${idx + 1}`}
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
            aria-label="Next slide"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-black/90 border border-red-500/30 text-white hover:bg-red-950 hover:border-red-500 hover:text-red-400 transition-all duration-200 active:scale-95 shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-center cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>

    </section>
  );
}
