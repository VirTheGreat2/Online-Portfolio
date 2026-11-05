"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Server, Zap, ShieldCheck, Activity, Terminal, Code2, ArrowRight, RefreshCw } from "lucide-react";

type ModeKey = "arch" | "db" | "biz" | "vibe";

interface ModeDetail {
  id: ModeKey;
  title: string;
  badge: string;
  icon: React.ElementType;
  cubeFaceText: string;
  rotation: { x: number; y: number };
  status: string;
  latency: string;
  throughput: string;
  codeSnippet: string;
  highlights: string[];
  metrics: { label: string; value: string; sub: string }[];
}

const SYSTEM_MODES: Record<ModeKey, ModeDetail> = {
  arch: {
    id: "arch",
    title: "Full-Stack System Architecture",
    badge: "Next.js 16 + React 19 Engine",
    icon: Cpu,
    cubeFaceText: "SYSTEM",
    rotation: { x: 0, y: 0 },
    status: "OPTIMAL - 100% UPTIME",
    latency: "12ms TTFB",
    throughput: "12.4k req/sec",
    codeSnippet: `// Server Action Architecture
export async function processTransaction(data: BusinessPayload) {
  'use server';
  const validated = PayloadSchema.parse(data);
  return await db.transactions.create({ data: validated });
}`,
    highlights: [
      "Server Side Rendering (SSR) & Dynamic Streaming",
      "Edge-cached global distribution for rapid page loads",
      "SEO & Mobile-First responsive rendering architecture"
    ],
    metrics: [
      { label: "Core Web Vitals", value: "99/100", sub: "Lighthouse Score" },
      { label: "Load Velocity", value: "< 0.4s", sub: "Global Average" },
      { label: "Scalability", value: "Enterprise", sub: "Auto-Scaling" },
    ]
  },
  db: {
    id: "db",
    title: "Real-Time Cloud Database & Security",
    badge: "Supabase PostgreSQL + RLS",
    icon: Server,
    cubeFaceText: "DATABASE",
    rotation: { x: 0, y: -90 },
    status: "ENCRYPTED TLS 1.3",
    latency: "8ms DB Sync",
    throughput: "45MB/s Stream",
    codeSnippet: `// Row-Level Security (RLS) & Live Subscription
const channel = supabase
  .channel('realtime-orders')
  .on('postgres_changes', { event: 'INSERT', schema: 'public' }, handleNewOrder)
  .subscribe();`,
    highlights: [
      "PostgreSQL with automated Row-Level Security (RLS)",
      "Real-time WebSocket event streaming & live sync",
      "Secure Auth, Storage buckets & automated backups"
    ],
    metrics: [
      { label: "Database Speed", value: "8ms", sub: "Query Response" },
      { label: "Security Level", value: "RLS Active", sub: "Role Isolation" },
      { label: "Data Integrity", value: "100%", sub: "ACID Compliant" },
    ]
  },
  biz: {
    id: "biz",
    title: "Business System & Workflow Automation",
    badge: "Tailored Management Solutions",
    icon: ShieldCheck,
    cubeFaceText: "BIZ ROI",
    rotation: { x: 0, y: 180 },
    status: "WORKFLOW ACTIVE",
    latency: "Automated",
    throughput: "100% Efficiency",
    codeSnippet: `// Business Logic & Lead Automation
export async function syncLeadToCRM(lead: CustomerLead) {
  await notifySalesTeam(lead);
  await generateInvoicePDF(lead);
  return { status: "Automated", ROI: "High" };
}`,
    highlights: [
      "Replaces tedious manual work with custom web portals",
      "Real-time analytics dashboards for executive decisions",
      "API integrations connecting CRMs, payment gateways & inventory"
    ],
    metrics: [
      { label: "Ops Time Saved", value: "85%", sub: "Manual Labor Reduced" },
      { label: "Conversion ROI", value: "+240%", sub: "Lead Efficiency" },
      { label: "Custom Fit", value: "100%", sub: "Zero Generic Templates" },
    ]
  },
  vibe: {
    id: "vibe",
    title: "AI Vibe-Coding High-Speed Workflow",
    badge: "AI-Augmented Full-Stack Dev",
    icon: Zap,
    cubeFaceText: "AI VIBE",
    rotation: { x: -90, y: 0 },
    status: "VELOCITY BOOSTED",
    latency: "5x Velocity",
    throughput: "Zero Technical Debt",
    codeSnippet: `// AI-Driven Full-Stack Rapid Delivery
const system = buildSystemWithVibeWorkflow({
  stack: ["Next.js 16", "TypeScript", "Tailwind v4", "Supabase"],
  speed: "Ultra Fast",
  quality: "Production Grade"
});`,
    highlights: [
      "Leverages AI-assisted coding for rapid architectural iterations",
      "Built with HTML5, CSS3, ES6+ JS & modern TypeScript",
      "Fast feature turnaround times without sacrificing stability"
    ],
    metrics: [
      { label: "Build Speed", value: "5x Faster", sub: "Concept to Live Site" },
      { label: "Code Quality", value: "Strict TS", sub: "Type-Safe Guarantee" },
      { label: "Adaptability", value: "Instant", sub: "Agile Updates" },
    ]
  }
};

export default function ThreeDCube() {
  const [activeMode, setActiveMode] = useState<ModeKey>("arch");
  const [isSimulating, setIsSimulating] = useState(false);
  const [simCounter, setSimCounter] = useState(12840);
  const [showCode, setShowCode] = useState(false);

  const currentMode = SYSTEM_MODES[activeMode];

  // Auto-increment simulated data count
  useEffect(() => {
    const interval = setInterval(() => {
      setSimCounter((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const triggerSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-8 flex flex-col items-center">
      
      {/* HUD Mode Switcher Selector Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-black/80 p-2 rounded-2xl border border-red-500/35 backdrop-blur-xl shadow-[0_0_25px_rgba(239,68,68,0.15)]">
        {(Object.keys(SYSTEM_MODES) as ModeKey[]).map((key) => {
          const mode = SYSTEM_MODES[key];
          const Icon = mode.icon;
          const isActive = activeMode === key;

          return (
            <button
              key={key}
              onClick={() => {
                setActiveMode(key);
                triggerSimulation();
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-[0_0_20px_rgba(239,68,68,0.6)] border border-red-400 scale-105"
                  : "bg-red-950/20 text-neutral-400 hover:text-red-300 hover:bg-red-950/50 border border-transparent"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white animate-pulse" : "text-red-500"}`} />
              <span className="hidden sm:inline uppercase">{mode.cubeFaceText}</span>
              <span className="sm:hidden uppercase">{key}</span>
            </button>
          );
        })}
      </div>

      {/* Center 3D Interactive Cyber Core Visualization */}
      <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 bg-gradient-to-b from-black/90 via-red-950/20 to-black/90 p-6 sm:p-8 rounded-3xl border border-red-500/35 shadow-[0_0_40px_rgba(239,68,68,0.2)] overflow-hidden">
        
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ef444410_1px,transparent_1px),linear-gradient(to_bottom,#ef444410_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none opacity-40" />

        {/* 3D Rotating Cube Container with Target Perspective */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 shrink-0 flex items-center justify-center group my-4">
          
          {/* Orbital Rings */}
          <div
            className={`absolute inset-0 rounded-full border border-red-500/40 animate-spin transition-all duration-700 shadow-[0_0_25px_rgba(239,68,68,0.25)] ${
              isSimulating ? "scale-115 border-red-400" : ""
            }`}
            style={{ animationDuration: isSimulating ? "3s" : "12s" }}
          />
          <div
            className="absolute -inset-4 rounded-full border border-dashed border-red-600/35 animate-spin transition-all duration-700"
            style={{ animationDuration: "18s", animationDirection: "reverse" }}
          />

          {/* Ambient Red Glow Halo */}
          <div className="absolute inset-2 rounded-full bg-red-600/25 blur-2xl animate-pulse" />

          {/* 3D Cube Object with Dynamic Rotation based on selected mode */}
          <div
            className="w-28 h-28 sm:w-32 sm:h-32 relative preserve-3d transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1)"
            style={{
              transform: `rotateX(${currentMode.rotation.x}deg) rotateY(${currentMode.rotation.y}deg)`,
            }}
          >
            {/* Front Face - SYSTEM */}
            <div
              onClick={() => setActiveMode("arch")}
              className={`absolute inset-0 bg-black/90 border-2 ${
                activeMode === "arch" ? "border-red-400 shadow-[0_0_30px_#ef4444]" : "border-red-500/60"
              } backdrop-blur-md flex flex-col items-center justify-center text-red-400 cursor-pointer p-2 rounded-xl transition-all hover:scale-105`}
              style={{ transform: "translateZ(3.5rem)" }}
            >
              <Cpu className="w-6 h-6 text-red-500 mb-1" />
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-white">SYSTEM</span>
              <span className="text-[9px] font-mono text-red-400/80">Next.js 16</span>
            </div>

            {/* Back Face - BIZ ROI */}
            <div
              onClick={() => setActiveMode("biz")}
              className={`absolute inset-0 bg-black/90 border-2 ${
                activeMode === "biz" ? "border-red-400 shadow-[0_0_30px_#ef4444]" : "border-red-500/60"
              } backdrop-blur-md flex flex-col items-center justify-center text-red-400 cursor-pointer p-2 rounded-xl transition-all hover:scale-105`}
              style={{ transform: "rotateY(180deg) translateZ(3.5rem)" }}
            >
              <ShieldCheck className="w-6 h-6 text-red-500 mb-1" />
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-white">BIZ ROI</span>
              <span className="text-[9px] font-mono text-red-400/80">Automated</span>
            </div>

            {/* Right Face - DATABASE */}
            <div
              onClick={() => setActiveMode("db")}
              className={`absolute inset-0 bg-black/90 border-2 ${
                activeMode === "db" ? "border-red-400 shadow-[0_0_30px_#ef4444]" : "border-red-500/60"
              } backdrop-blur-md flex flex-col items-center justify-center text-red-400 cursor-pointer p-2 rounded-xl transition-all hover:scale-105`}
              style={{ transform: "rotateY(90deg) translateZ(3.5rem)" }}
            >
              <Server className="w-6 h-6 text-red-500 mb-1" />
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-white">DATABASE</span>
              <span className="text-[9px] font-mono text-red-400/80">Supabase</span>
            </div>

            {/* Left Face - AI VIBE */}
            <div
              onClick={() => setActiveMode("vibe")}
              className={`absolute inset-0 bg-black/90 border-2 ${
                activeMode === "vibe" ? "border-red-400 shadow-[0_0_30px_#ef4444]" : "border-red-500/60"
              } backdrop-blur-md flex flex-col items-center justify-center text-red-400 cursor-pointer p-2 rounded-xl transition-all hover:scale-105`}
              style={{ transform: "rotateY(-90deg) translateZ(3.5rem)" }}
            >
              <Zap className="w-6 h-6 text-red-500 mb-1" />
              <span className="font-mono text-[11px] font-extrabold uppercase tracking-widest text-white">AI VIBE</span>
              <span className="text-[9px] font-mono text-red-400/80">5x Delivery</span>
            </div>

            {/* Top Face */}
            <div
              className="absolute inset-0 bg-black/90 border-2 border-red-500/60 backdrop-blur-md flex flex-col items-center justify-center text-red-400 p-2 rounded-xl"
              style={{ transform: "rotateX(90deg) translateZ(3.5rem)" }}
            >
              <Activity className="w-5 h-5 text-red-400 mb-1" />
              <span className="font-mono text-[10px] text-white">ONLINE</span>
            </div>

            {/* Bottom Face */}
            <div
              className="absolute inset-0 bg-black/90 border-2 border-red-500/60 backdrop-blur-md flex flex-col items-center justify-center text-red-400 p-2 rounded-xl"
              style={{ transform: "rotateX(-90deg) translateZ(3.5rem)" }}
            >
              <Terminal className="w-5 h-5 text-red-400 mb-1" />
              <span className="font-mono text-[10px] text-white">GUANO DEV</span>
            </div>
          </div>

          {/* Corner Node Ping Indicators */}
          <div className="absolute -top-4 -right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-[10px] font-mono text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.3)]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>3D MATRIX ACTIVE</span>
          </div>
        </div>

        {/* Dynamic Telemetry Inspector Panel */}
        <div className="flex-1 w-full space-y-4 text-left relative z-10">
          <div className="flex items-center justify-between gap-2 border-b border-red-500/25 pb-3">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-1">
                <Activity className="w-3 h-3 text-red-500 animate-pulse" />
                <span>{currentMode.badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {currentMode.title}
              </h3>
            </div>

            {/* Run Diagnostic Button */}
            <button
              onClick={triggerSimulation}
              className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 transition-all text-xs font-mono font-semibold flex items-center gap-1.5 shrink-0 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin text-white" : "text-red-400"}`} />
              <span className="hidden sm:inline">TEST TELEMETRY</span>
            </button>
          </div>

          {/* Telemetry Numbers Grid */}
          <div className="grid grid-cols-3 gap-3">
            {currentMode.metrics.map((m, idx) => (
              <div key={idx} className="bg-black/60 p-3 rounded-xl border border-red-500/20">
                <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider truncate">
                  {m.label}
                </div>
                <div className="text-base sm:text-xl font-mono font-black text-red-400 mt-0.5">
                  {m.value}
                </div>
                <div className="text-[9px] font-mono text-neutral-500 truncate">
                  {m.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Architecture Highlights Bullet Points */}
          <ul className="space-y-1.5 text-xs text-neutral-300 font-sans">
            {currentMode.highlights.map((point, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {/* Code Inspector Toggle Button & Viewer */}
          <div className="pt-1">
            <button
              onClick={() => setShowCode(!showCode)}
              className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors underline underline-offset-4"
            >
              <Code2 className="w-3.5 h-3.5 text-red-500" />
              <span>{showCode ? "Hide Implementation Code" : "Inspect Architecture Code Snippet"}</span>
            </button>

            {showCode && (
              <div className="mt-3 p-3.5 rounded-xl bg-black/90 border border-red-500/35 font-mono text-[11px] text-red-300/90 overflow-x-auto shadow-inner relative group">
                <div className="text-[9px] text-neutral-500 mb-1 border-b border-red-950 pb-1 flex justify-between">
                  <span>// System Architecture Logic</span>
                  <span className="text-red-400">STATUS: ACTIVE</span>
                </div>
                <pre className="whitespace-pre">{currentMode.codeSnippet}</pre>
              </div>
            )}
          </div>

          {/* Live Request Counter Telemetry Bar */}
          <div className="flex items-center justify-between pt-2 text-[10px] font-mono text-neutral-400 border-t border-red-500/15">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span>LIVE TRAFFIC SIMULATOR: <strong className="text-red-400 font-mono">{simCounter.toLocaleString()} ops</strong></span>
            </div>
            <a
              href="#services"
              className="text-red-400 hover:text-white flex items-center gap-1 font-bold transition-colors"
            >
              <span>INSPECT CAPABILITIES</span>
              <ArrowRight className="w-3 h-3 text-red-500" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
