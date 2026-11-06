import Image from "next/image";
import Link from "next/link";
import { createServerSideClient } from "@/lib/supabase-server";
import { checkAdmin } from "@/lib/auth";
import BioFormModal from "@/components/BioFormModal";
import ProjectFormModal from "@/components/ProjectFormModal";
import ParallaxWrapper from "@/components/ParallaxWrapper";
import ScrollIndicator from "@/components/ScrollIndicator";
import SkillsSection from "@/components/SkillsSection";
import ThreeDCard from "@/components/ThreeDCard";
import Scroll3DReveal from "@/components/Scroll3DReveal";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import GeometricBackground from "@/components/GeometricBackground";
import { deleteProject } from "@/app/actions";
import { 
  Mail, 
  Sparkles, 
  Code2, 
  Terminal, 
  Layers, 
  Cpu, 
  ArrowUpRight, 
  Trash2, 
  FolderGit2,
  Globe,
  Plus,
  ShieldCheck,
  UserCheck
} from "lucide-react";

function GithubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export const revalidate = 0;

export default async function Portfolio() {
  const supabase = await createServerSideClient();
  const isAdmin = await checkAdmin();

  // Fetch Profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .single();

  // Fetch Projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  const fullName = profile?.full_name || "Virgilio Flor E. Guaño";
  const headline = profile?.headline || "Experienced Full-stack Web Developer | Websites & Business Applications";
  const shortBio = profile?.short_bio || "I build high-performance websites, dynamic web applications, and custom software systems designed to solve real business problems and empower growth.";

  return (
    <ParallaxWrapper>
      <GeometricBackground />
      <ScrollIndicator />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 relative overflow-x-hidden" suppressHydrationWarning>
        {/* Navigation Header */}
        <header className="sticky top-3 sm:top-6 z-50 mb-10 md:mb-20">
          <nav
            className="max-w-6xl mx-auto rounded-2xl p-2.5 sm:px-6 sm:py-3.5 flex flex-col md:flex-row md:items-center justify-between border border-red-500/35 bg-black/95 shadow-[0_0_25px_rgba(239,68,68,0.15)] backdrop-blur-2xl transition-all gap-2 sm:gap-3"
            aria-label="Global"
          >
            <div className="flex items-center justify-between gap-2 w-full md:w-auto">
              {/* Logo / Brand Name */}
              <Link href="/" className="flex items-center gap-2.5 group shrink-0 min-h-[44px]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-red-500 to-red-950 flex items-center justify-center text-white font-black text-base shadow-[0_0_15px_rgba(239,68,68,0.6)] group-hover:scale-105 transition-transform border border-red-400/40 shrink-0">
                  {fullName.charAt(0)}
                </div>
                <div className="flex flex-col shrink-0 min-w-0">
                  <span className="font-extrabold text-white tracking-wide text-xs sm:text-base group-hover:text-red-400 transition-colors whitespace-nowrap">
                    {fullName}
                  </span>
                  <span className="text-[10px] font-mono text-red-400/80 uppercase tracking-widest hidden xl:inline whitespace-nowrap">
                    Full-Stack Web Developer
                  </span>
                </div>
              </Link>

              {/* Status & Admin Control */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl bg-red-950/50 border border-red-500/40 text-red-400 text-[11px] sm:text-xs font-mono whitespace-nowrap shrink-0">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444] shrink-0" />
                  <span className="hidden xs:inline whitespace-nowrap">AVAILABLE FOR WORK</span>
                  <span className="xs:hidden font-bold">AVAILABLE</span>
                </div>

                {isAdmin && (
                  <div className="relative group/nav shrink-0">
                    <BioFormModal
                      profile={profile}
                      trigger={
                        <button className="px-3 py-2 min-h-[44px] rounded-xl bg-red-600/30 text-red-300 hover:bg-red-600/60 border border-red-500/50 transition-all text-xs font-mono font-semibold flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer">
                          <Terminal className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span className="hidden sm:inline">CMS ADMIN</span>
                        </button>
                      }
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Nav Jump Links (Scrollable on mobile, flex on desktop) */}
            <div className="flex items-center gap-1.5 lg:gap-2 text-xs font-mono uppercase tracking-wider text-neutral-300 overflow-x-auto no-scrollbar py-1 w-full md:w-auto border-t md:border-t-0 border-red-500/20 pt-2 md:pt-0">
              <a
                href="#about"
                className="group px-3 py-2 rounded-xl border border-red-500/25 bg-red-950/20 hover:bg-red-900/40 hover:border-red-500/60 hover:text-red-300 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shadow-sm hover:shadow-[0_0_12px_rgba(239,68,68,0.25)] active:scale-95 font-medium shrink-0 min-h-[44px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 group-hover:bg-red-400 group-hover:shadow-[0_0_6px_#ef4444] transition-all" />
                <span>About</span>
              </a>
              <a
                href="#services"
                className="group px-3 py-2 rounded-xl border border-red-500/25 bg-red-950/20 hover:bg-red-900/40 hover:border-red-500/60 hover:text-red-300 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shadow-sm hover:shadow-[0_0_12px_rgba(239,68,68,0.25)] active:scale-95 font-medium shrink-0 min-h-[44px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 group-hover:bg-red-400 group-hover:shadow-[0_0_6px_#ef4444] transition-all" />
                <span>Offerings</span>
              </a>
              <a
                href="#projects"
                className="group px-3 py-2 rounded-xl border border-red-500/25 bg-red-950/20 hover:bg-red-900/40 hover:border-red-500/60 hover:text-red-300 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shadow-sm hover:shadow-[0_0_12px_rgba(239,68,68,0.25)] active:scale-95 font-medium shrink-0 min-h-[44px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 group-hover:bg-red-400 group-hover:shadow-[0_0_6px_#ef4444] transition-all" />
                <span>Projects</span>
              </a>
              <a
                href="#skills"
                className="group px-3 py-2 rounded-xl border border-red-500/25 bg-red-950/20 hover:bg-red-900/40 hover:border-red-500/60 hover:text-red-300 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shadow-sm hover:shadow-[0_0_12px_rgba(239,68,68,0.25)] active:scale-95 font-medium shrink-0 min-h-[44px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 group-hover:bg-red-400 group-hover:shadow-[0_0_6px_#ef4444] transition-all" />
                <span>Stack</span>
              </a>
              <a
                href="#contact"
                className="group px-3 py-2 rounded-xl border border-red-500/25 bg-red-950/20 hover:bg-red-900/40 hover:border-red-500/60 hover:text-red-300 transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 shadow-sm hover:shadow-[0_0_12px_rgba(239,68,68,0.25)] active:scale-95 font-medium shrink-0 min-h-[44px]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 group-hover:bg-red-400 group-hover:shadow-[0_0_6px_#ef4444] transition-all" />
                <span>Contact</span>
              </a>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="space-y-20 md:space-y-36" suppressHydrationWarning>
          
          {/* Clean & High-Impact Hero Section */}
          <Scroll3DReveal direction="up">
            <section className="flex flex-col items-center text-center max-w-4xl mx-auto relative pt-2 sm:pt-4" suppressHydrationWarning>
              {/* Ambient Accent Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[500px] h-[220px] sm:h-[300px] bg-red-600/10 rounded-full blur-[90px] sm:blur-[100px] pointer-events-none" />

              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[44px] rounded-full bg-red-950/60 border border-red-500/40 text-red-400 text-xs sm:text-sm font-mono font-semibold mb-6 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.2)] max-w-full">
                <Sparkles className="w-4 h-4 text-red-500 shrink-0" />
                <span className="uppercase tracking-wider truncate">{headline}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl xs:text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.15] mb-6">
                Building Modern Websites &{" "}
                <span className="gradient-text-red drop-shadow-[0_0_20px_rgba(239,68,68,0.4)] block sm:inline">
                  Web Applications.
                </span>
              </h1>

              {/* Subtitle / Bio summary */}
              <p className="text-sm sm:text-xl text-neutral-300 max-w-2xl leading-relaxed mb-8 font-normal px-2">
                {shortBio}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-10 sm:mb-12">
                <a
                  href="#projects"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 min-h-[44px] rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] transition-all flex items-center justify-center gap-2 group border border-red-400/40 cursor-pointer"
                >
                  <span>VIEW MY PREVIOUS PROJECTS</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
                </a>

                <a
                  href="#contact"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 min-h-[44px] rounded-xl bg-black/80 hover:bg-red-950/40 text-neutral-200 hover:text-white border border-red-500/35 hover:border-red-500/70 font-semibold text-xs sm:text-sm transition-all backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.8)] text-center cursor-pointer flex items-center justify-center"
                >
                  GET IN TOUCH
                </a>

                {/* Social Quick Links */}
                <div className="flex items-center gap-2 pt-1 sm:pt-0 sm:ml-2">
                  {profile?.github_url && (
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-black/80 hover:bg-red-950/40 text-neutral-300 hover:text-red-400 border border-red-500/35 hover:border-red-500/70 transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] flex items-center justify-center cursor-pointer"
                      aria-label="GitHub Profile"
                    >
                      <GithubIcon className="w-5 h-5" />
                    </a>
                  )}
                  {profile?.linkedin_url && (
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-black/80 hover:bg-red-950/40 text-neutral-300 hover:text-red-400 border border-red-500/35 hover:border-red-500/70 transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] flex items-center justify-center cursor-pointer"
                      aria-label="LinkedIn Profile"
                    >
                      <LinkedinIcon className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Core Feature Highlights Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-4xl text-left">
                <div className="p-3.5 sm:p-5 rounded-2xl bg-black/90 border border-red-500/25">
                  <div className="text-red-500 font-mono text-sm sm:text-xl font-black mb-1 truncate">Custom Built</div>
                  <div className="text-neutral-400 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider">Tailored to Requirements</div>
                </div>
                <div className="p-3.5 sm:p-5 rounded-2xl bg-black/90 border border-red-500/25">
                  <div className="text-red-500 font-mono text-sm sm:text-xl font-black mb-1 truncate">Full-Stack</div>
                  <div className="text-neutral-400 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider">Frontend to Backend</div>
                </div>
                <div className="p-3.5 sm:p-5 rounded-2xl bg-black/90 border border-red-500/25">
                  <div className="text-red-500 font-mono text-sm sm:text-xl font-black mb-1 truncate">High Performance</div>
                  <div className="text-neutral-400 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider">Fast & SEO Optimized</div>
                </div>
                <div className="p-3.5 sm:p-5 rounded-2xl bg-black/90 border border-red-500/25">
                  <div className="text-red-500 font-mono text-sm sm:text-xl font-black mb-1 truncate">Business Systems</div>
                  <div className="text-neutral-400 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider">Workflow Automation</div>
                </div>
              </div>
            </section>
          </Scroll3DReveal>

          {/* Section 1: About Me */}
          <Scroll3DReveal direction="up">
            <section id="about" className="max-w-5xl mx-auto relative z-10 scroll-mt-28" suppressHydrationWarning>
              <div className="rounded-3xl p-5 sm:p-12 relative overflow-hidden bg-black/90 border border-red-500/35 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                {/* Background glow */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-col md:flex-row gap-6 lg:gap-12 items-center md:items-start relative z-10">
                  {/* Avatar */}
                  <div className="relative group/avatar shrink-0">
                    <div className="relative w-32 h-32 sm:w-48 sm:h-48 rounded-2xl overflow-hidden ring-2 ring-red-500/50 ring-offset-4 ring-offset-black shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                      {profile?.avatar_url ? (
                        <Image
                          src={profile.avatar_url}
                          alt={fullName}
                          fill
                          className="object-cover group-hover/avatar:scale-105 transition-transform duration-500"
                          priority
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-950 via-black to-neutral-950 flex flex-col items-center justify-center text-red-500">
                          <span className="text-4xl sm:text-5xl font-black tracking-widest">{fullName.charAt(0)}</span>
                          <span className="text-[10px] font-mono text-neutral-400 mt-2">DEVELOPER PORTRAIT</span>
                        </div>
                      )}
                    </div>

                    {isAdmin && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover/avatar:opacity-100 transition-opacity z-30">
                        <BioFormModal profile={profile} initialTab="identity" />
                      </div>
                    )}
                  </div>

                  {/* Identity Content */}
                  <div className="flex-1 space-y-5 sm:space-y-6 text-center md:text-left">
                    <div>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-2">
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                          {fullName}
                        </h2>
                        <span className="px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-[10px] sm:text-xs font-mono font-bold tracking-wider">
                          FULL-STACK WEB DEVELOPER
                        </span>
                      </div>

                      <p className="text-red-400/80 font-mono text-xs sm:text-sm">
                        📍 {profile?.location || "Websites & Web Applications Specialist"}
                      </p>
                    </div>

                    {/* Detailed Bio Narrative */}
                    <div className="text-neutral-300 leading-relaxed text-xs sm:text-base space-y-4 font-normal">
                      {profile?.bio_text ? (
                        <p className="whitespace-pre-line">{profile.bio_text}</p>
                      ) : (
                        <p>
                          I am Virgilio Flor E. Guaño, a dedicated Full-stack Web Developer focused on crafting high-performing websites and web applications. With expertise spanning front-end user interfaces, back-end API integrations, and database architectures, I deliver digital solutions built to modern standards.
                        </p>
                      )}
                    </div>

                    {/* Highlights Cards */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-red-500/20">
                      <div className="p-3.5 rounded-2xl bg-black/60 border border-red-500/25">
                        <div className="flex items-center gap-2 text-red-400 mb-1">
                          <Code2 className="w-4 h-4 shrink-0" />
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Core Expertise</span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-white">Full-Stack Web Dev</p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-black/60 border border-red-500/25">
                        <div className="flex items-center gap-2 text-red-400 mb-1">
                          <Cpu className="w-4 h-4 shrink-0" />
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Specialization</span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-white">Web Apps & Systems</p>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-black/60 border border-red-500/25 xs:col-span-2 sm:col-span-1">
                        <div className="flex items-center gap-2 text-red-400 mb-1">
                          <ShieldCheck className="w-4 h-4 shrink-0" />
                          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Quality</span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-white">Clean & Scalable Code</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </Scroll3DReveal>

          {/* Section 2: What I Offer (Capabilities) */}
          <Scroll3DReveal direction="up">
            <CapabilitiesSection />
          </Scroll3DReveal>

          {/* Section 3: Previous Projects */}
          <Scroll3DReveal direction="up">
            <section id="projects" className="space-y-6 sm:space-y-8 relative z-10 scroll-mt-28 group/projects" suppressHydrationWarning>
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-red-500/25 pb-6">
                <div>
                  <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-widest mb-2">
                    <Layers className="w-4 h-4 shrink-0" />
                    <span>PORTFOLIO SHOWCASE</span>
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                    Previous <span className="gradient-text-red">Projects</span>
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] sm:text-xs font-mono text-red-400 bg-red-950/60 px-3.5 py-2 rounded-xl border border-red-500/35 min-h-[44px] flex items-center">
                    {projects?.length || 0} PROJECTS COMPLETED
                  </span>

                  {isAdmin && (
                    <ProjectFormModal
                      trigger={
                        <button className="px-4 py-2.5 min-h-[44px] rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(239,68,68,0.4)] transition-all cursor-pointer">
                          <Plus className="w-4 h-4 shrink-0" />
                          <span>ADD PROJECT</span>
                        </button>
                      }
                    />
                  )}
                </div>
              </div>

              {/* Projects Grid Layout */}
              {!projects || projects.length === 0 ? (
                <div className="rounded-3xl p-8 sm:p-12 text-center text-neutral-400 max-w-lg mx-auto bg-black/90 border border-red-500/30">
                  <FolderGit2 className="w-12 h-12 mx-auto text-red-500/60 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">No Projects Listed Yet</h3>
                  <p className="text-sm text-neutral-400">
                    {isAdmin ? "Click 'ADD PROJECT' above to add your work." : "Projects will be displayed here shortly."}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {projects.map((project) => (
                    <ThreeDCard key={project.id} className="h-full">
                      <article className="h-full rounded-3xl overflow-hidden flex flex-col relative group border border-red-500/30 bg-black/90 shadow-[0_0_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_30px_rgba(239,68,68,0.25)] transition-all">
                        {/* Admin Actions Overlay */}
                        {isAdmin && (
                          <div className="absolute top-3 right-3 z-30 flex items-center gap-2 bg-black/95 backdrop-blur-md p-1.5 rounded-xl border border-red-500/50 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ProjectFormModal project={project} />
                            <form
                              action={async () => {
                                "use server";
                                await deleteProject(project.id, project.image_url);
                              }}
                            >
                              <button
                                type="submit"
                                className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-lg text-red-400 hover:text-white hover:bg-red-600/40 transition-colors flex items-center justify-center cursor-pointer"
                                title="Delete Project"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </form>
                          </div>
                        )}

                        {/* Image / Thumbnail Section */}
                        <div className="relative w-full aspect-video bg-neutral-950 overflow-hidden border-b border-red-500/25">
                          {project.image_url ? (
                            <Image
                              src={project.image_url}
                              alt={project.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-red-950/40 via-black to-neutral-950 flex flex-col items-center justify-center p-6 text-red-500/60">
                              <Code2 className="w-12 h-12 mb-2 text-red-500/70" />
                              <span className="text-xs font-mono uppercase tracking-widest text-red-400/80">Project Preview</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                        </div>

                        {/* Content Section */}
                        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                              {project.title}
                            </h3>

                            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed font-normal">
                              {project.description}
                            </p>
                          </div>

                          {/* Tech Stack Pills */}
                          {project.tech_stack && project.tech_stack.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {project.tech_stack.map((tech: string, i: number) => (
                                <span
                                  key={i}
                                  className="px-2.5 py-1 rounded-md bg-red-950/70 border border-red-500/35 text-red-300 font-mono text-[10px] sm:text-[11px] font-semibold"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Action Links with >44px Touch Targets */}
                          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-red-500/20 text-xs font-mono">
                            {project.live_url && (
                              <a
                                href={project.live_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-500/35 text-red-400 hover:text-red-300 transition-colors group/link font-bold cursor-pointer"
                              >
                                <Globe className="w-3.5 h-3.5 text-red-500 shrink-0" />
                                <span>LIVE PREVIEW</span>
                                <ArrowUpRight className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform shrink-0" />
                              </a>
                            )}

                            {project.github_url && (
                              <a
                                href={project.github_url}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-2.5 min-h-[44px] rounded-lg bg-black hover:bg-neutral-900 border border-neutral-800 hover:border-red-500/40 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                              >
                                <GithubIcon className="w-3.5 h-3.5 shrink-0" />
                                <span>SOURCE CODE</span>
                              </a>
                            )}
                          </div>
                        </div>
                      </article>
                    </ThreeDCard>
                  ))}
                </div>
              )}
            </section>
          </Scroll3DReveal>

          {/* Section 4: Tech Stack */}
          <Scroll3DReveal direction="up">
            <section id="skills" className="space-y-6 sm:space-y-8 scroll-mt-28" suppressHydrationWarning>
              <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/60 border border-red-500/35 text-red-400 text-xs font-mono uppercase tracking-widest mb-3 backdrop-blur-md">
                  <Code2 className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>Technical Arsenal</span>
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  My <span className="gradient-text-red">Tech Stack</span>
                </h2>
                <p className="text-neutral-300 text-xs sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed px-2">
                  A breakdown of the modern frameworks, languages, databases, and development tools I use to build robust web applications.
                </p>
              </div>

              <SkillsSection />
            </section>
          </Scroll3DReveal>

          {/* Footer / Contact Section */}
          <footer id="contact" className="pt-12 sm:pt-16 pb-12 border-t border-red-500/30 relative z-20 group/footer" suppressHydrationWarning>
            <div className="rounded-3xl p-6 sm:p-12 mb-10 sm:mb-12 relative overflow-hidden bg-black/95 border border-red-500/35 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-500/40 text-red-400 text-xs font-mono uppercase tracking-widest">
                  <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>START A CONVERSATION</span>
                </div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Have a project or website in mind?
                </h3>
                <p className="text-neutral-300 text-xs sm:text-base leading-relaxed">
                  I am available for website development, web applications, and system development opportunities. Get in touch to discuss how I can help bring your project to life.
                </p>
              </div>

              <a
                href={`mailto:${profile?.contact_email || "virgilio.guano@example.com"}`}
                className="w-full sm:w-auto px-8 py-4 min-h-[44px] rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs sm:text-sm tracking-wider shadow-[0_0_25px_rgba(239,68,68,0.4)] transition-all flex items-center justify-center gap-3 shrink-0 border border-red-400/40 hover:scale-105 cursor-pointer"
              >
                <Mail className="w-5 h-5 text-white shrink-0" />
                <span>SEND DIRECT EMAIL</span>
              </a>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8">
              <div className="space-y-2.5">
                <div className="flex items-center gap-3 text-red-500 font-extrabold tracking-tight text-xl">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 to-red-950 flex items-center justify-center text-white text-sm font-black border border-red-400/40 shadow-[0_0_12px_rgba(239,68,68,0.5)] shrink-0">
                    {fullName.charAt(0)}
                  </div>
                  <span className="text-white">{fullName}</span>
                </div>
                <p className="text-neutral-400 text-xs sm:text-sm max-w-md leading-relaxed">
                  {headline}
                </p>
              </div>

              {/* Social & Contact Buttons with >44px Touch Targets */}
              <div className="flex flex-wrap items-center gap-3">
                {profile?.github_url && (
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-black border border-red-500/35 text-neutral-300 hover:text-red-400 hover:border-red-500/70 transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] flex items-center justify-center cursor-pointer"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-5 h-5" />
                  </a>
                )}

                {profile?.linkedin_url && (
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-black border border-red-500/35 text-neutral-300 hover:text-red-400 hover:border-red-500/70 transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] flex items-center justify-center cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </a>
                )}

                {isAdmin && (
                  <BioFormModal
                    profile={profile}
                    initialTab="site"
                    trigger={
                      <button className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl bg-black border border-red-500/35 text-neutral-400 hover:text-red-400 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.8)] flex items-center justify-center cursor-pointer" title="Site Settings">
                        <Terminal className="w-5 h-5" />
                      </button>
                    }
                  />
                )}
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500 gap-4 text-center sm:text-left">
              <p>© {new Date().getFullYear()} {fullName}. All rights reserved.</p>
              <p className="flex items-center gap-2 text-red-400/80">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_#ef4444] shrink-0" />
                Built with Next.js, React & Tailwind CSS
              </p>
            </div>
          </footer>
        </main>
      </div>
    </ParallaxWrapper>
  );
}
