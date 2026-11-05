"use client";

import React from "react";
import { 
  Layout, 
  Workflow, 
  Database, 
  CheckCircle2, 
  ArrowRight,
  Sparkles
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
    title: "Modern Websites",
    subtitle: "High Conversion & Speed",
    icon: Layout,
    description: "Fast, responsive, and SEO-optimized websites designed to represent your brand professionally and convert visitors into clients.",
    features: [
      "Responsive & Mobile-First Design",
      "Search Engine Optimization (SEO)",
      "High-Speed Edge Performance",
      "Content Management & Dynamic Content",
      "Modern Glassmorphism & Cyber Aesthetics"
    ],
    techStack: ["Next.js 16", "Tailwind CSS v4", "TypeScript", "Vercel Edge"]
  },
  {
    id: "apps",
    title: "Web Applications",
    subtitle: "Interactive & Scalable",
    icon: Workflow,
    description: "Full-stack web applications tailored to your business needs, featuring secure user authentication, dashboards, and dynamic features.",
    features: [
      "Interactive User Dashboards",
      "Secure User Authentication & Access Control",
      "Real-time Data Updates & API Integration",
      "Scalable Front-end Architecture",
      "Custom Forms & Data Pipelines"
    ],
    techStack: ["React 19", "Next.js", "TypeScript", "Supabase Auth"]
  },
  {
    id: "systems",
    title: "Business Systems & APIs",
    subtitle: "Automation & Database Solutions",
    icon: Database,
    description: "Custom management software, database architectures, and REST APIs that streamline business operations and automate tedious tasks.",
    features: [
      "Custom Database Schema & Management",
      "Automated Workflow & Notification Rules",
      "Back-Office Admin Controls",
      "RESTful API Development & Integration",
      "Data Security & Row-Level Security (RLS)"
    ],
    techStack: ["Supabase", "PostgreSQL", "Node.js", "Server Actions"]
  }
];

export default function CapabilitiesSection() {
  return (
    <section id="services" className="max-w-6xl mx-auto relative z-10 scroll-mt-28" suppressHydrationWarning>
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/35 text-red-400 text-xs font-mono uppercase tracking-widest mb-3 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.2)]">
          <Sparkles className="w-3.5 h-3.5 text-red-500" />
          <span>Services & Solutions</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          What I <span className="gradient-text-red">Offer</span>
        </h2>
        <p className="text-neutral-300 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
          I build tailored web solutions designed to solve business challenges, improve operational efficiency, and deliver outstanding user experiences.
        </p>
      </div>

      {/* Clean 3-Column Offerings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
        {SERVICES.map((service) => {
          const Icon = service.icon;

          return (
            <div 
              key={service.id}
              className="h-full p-6 sm:p-8 rounded-3xl bg-black/80 border border-red-500/30 hover:border-red-500/60 transition-all duration-300 flex flex-col justify-between shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(239,68,68,0.25)] group"
            >
              <div>
                {/* Header Icon & Subtitle */}
                <div className="flex items-center justify-between gap-2 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-500 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-red-950/60 border border-red-500/30 text-red-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {service.subtitle}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-black text-white group-hover:text-red-400 transition-colors tracking-tight mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed mb-6 font-normal">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="border-t border-red-500/20 pt-4 mb-6">
                  <div className="text-[11px] font-mono text-red-400 uppercase tracking-widest font-bold mb-3">Key Deliverables</div>
                  <ul className="space-y-2.5 text-xs text-neutral-300">
                    {service.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="border-t border-red-500/20 pt-4">
                <div className="flex flex-wrap gap-1.5">
                  {service.techStack.map((tech, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded-md bg-red-950/70 border border-red-500/30 text-red-300 font-mono text-[11px]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}
