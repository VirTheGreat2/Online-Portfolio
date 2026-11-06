"use client";

import { useState } from "react";
import { Code2, Server, Database, Layers, Wrench } from "lucide-react";

interface SkillCategory {
  id: string;
  title: string;
  icon: any;
  description: string;
  skills: { name: string; tag: string; level: string }[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    title: "Web & App Development",
    icon: Code2,
    description: "Creating fast, responsive, and easy-to-use websites and web applications tailored for your business.",
    skills: [
      { name: "Next.js & React", tag: "Modern Web Apps", level: "Expert" },
      { name: "Responsive Mobile & Desktop Design", tag: "User Experience", level: "Expert" },
      { name: "TypeScript & JavaScript", tag: "Interactive Features", level: "Advanced" },
      { name: "Tailwind CSS & Modern Styling", tag: "Custom UI Design", level: "Expert" },
      { name: "SEO & Web Performance", tag: "Google Optimization", level: "Advanced" },
    ],
  },
  {
    id: "backend",
    title: "Database & Cloud Security",
    icon: Database,
    description: "Setting up secure backend systems, cloud databases, and user login features for safe data management.",
    skills: [
      { name: "Supabase & PostgreSQL", tag: "Cloud Database", level: "Advanced" },
      { name: "User Authentication & Security", tag: "Data Protection", level: "Advanced" },
      { name: "Cloud APIs & Server Logic", tag: "Backend Power", level: "Advanced" },
      { name: "Secure Access Controls", tag: "Privacy Standards", level: "Advanced" },
    ],
  },
  {
    id: "workflow",
    title: "Hosting & Maintenance",
    icon: Wrench,
    description: "Deploying websites on fast global servers with continuous backups, high uptime, and modern workflows.",
    skills: [
      { name: "Vercel Cloud Hosting", tag: "Fast & Reliable", level: "Expert" },
      { name: "Git & GitHub Versioning", tag: "Code Backups", level: "Advanced" },
      { name: "Speed & Performance Tuning", tag: "Fast Loading", level: "Expert" },
      { name: "Clean & Maintainable Code", tag: "Long-term Quality", level: "Advanced" },
    ],
  },
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="space-y-10">
      {/* Category Selection Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
            activeTab === "all"
              ? "bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] border border-red-500"
              : "bg-black/80 text-neutral-400 border border-neutral-800 hover:border-red-500/40 hover:text-white"
          }`}
        >
          All Tech Stack
        </button>
        {SKILL_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                activeTab === cat.id
                  ? "bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] border border-red-500"
                  : "bg-black/80 text-neutral-400 border border-neutral-800 hover:border-red-500/40 hover:text-white"
              }`}
            >
              <Icon size={14} />
              <span>{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.filter((cat) => activeTab === "all" || activeTab === cat.id).map(
          (category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                className="rounded-2xl p-6 sm:p-8 space-y-6 bg-black/80 border border-red-500/25 hover:border-red-500/50 transition-all flex flex-col justify-between shadow-[0_0_20px_rgba(0,0,0,0.8)]"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-500/30 text-red-400 shadow-[0_0_12px_rgba(239,68,68,0.2)] shrink-0">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-xl font-extrabold text-white">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal mb-4">
                    {category.description}
                  </p>
                </div>

                {/* Skill List Pills */}
                <div className="space-y-2 pt-2 border-t border-red-500/20">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 flex items-center justify-between text-xs transition-colors hover:border-red-500/40"
                    >
                      <span className="font-semibold text-white">
                        {skill.name}
                      </span>
                      <div className="flex items-center gap-2 font-mono text-[10px]">
                        <span className="text-neutral-400">{skill.tag}</span>
                        <span className="text-red-400 font-bold px-2 py-0.5 rounded bg-red-950/80 border border-red-500/30">
                          {skill.level}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}
