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
    title: "Frontend Development",
    icon: Code2,
    description: "Building fast, responsive, and accessible user interfaces using modern frameworks and standard practices.",
    skills: [
      { name: "Next.js 16 (App Router)", tag: "Framework", level: "Advanced" },
      { name: "React 19", tag: "UI Library", level: "Advanced" },
      { name: "TypeScript", tag: "Language", level: "Advanced" },
      { name: "Tailwind CSS v4", tag: "Styling", level: "Expert" },
      { name: "HTML5 / CSS3 / ES6+", tag: "Core Web", level: "Expert" },
      { name: "Responsive UI/UX", tag: "Design", level: "Expert" },
    ],
  },
  {
    id: "backend",
    title: "Backend & Database",
    icon: Database,
    description: "Designing database schemas, managing server actions, and creating secure backend architectures.",
    skills: [
      { name: "Supabase (SSR & Client)", tag: "Cloud Platform", level: "Advanced" },
      { name: "PostgreSQL", tag: "Relational DB", level: "Advanced" },
      { name: "Row-Level Security (RLS)", tag: "Auth & Security", level: "Advanced" },
      { name: "Next.js Server Actions", tag: "API Logic", level: "Advanced" },
      { name: "RESTful APIs", tag: "Architecture", level: "Advanced" },
      { name: "Node.js", tag: "Runtime", level: "Intermediate" },
    ],
  },
  {
    id: "workflow",
    title: "Dev Tools & Workflow",
    icon: Wrench,
    description: "Utilizing modern tools and deployment platforms to deliver robust, high-quality code efficiently.",
    skills: [
      { name: "Git & GitHub", tag: "Version Control", level: "Advanced" },
      { name: "Vercel Deployment", tag: "Cloud / Hosting", level: "Advanced" },
      { name: "VS Code & CLI", tag: "IDE / Terminal", level: "Expert" },
      { name: "Clean Architecture", tag: "Design Pattern", level: "Advanced" },
      { name: "Performance Optimization", tag: "Core Web Vitals", level: "Advanced" },
      { name: "Agile Development", tag: "Methodology", level: "Advanced" },
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
