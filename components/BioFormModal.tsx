"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Pencil, X, Upload, Settings2, UserCircle2 } from "lucide-react";
import { updateProfile, checkServerStatus } from "@/app/actions";

interface Profile {
  id: string;
  bio_text: string | null;
  full_name: string | null;
  background: string | null;
  demographics: string | null;
  avatar_url: string | null;
  nav_title: string | null;
  portfolio_heading: string | null;
  portfolio_intro: string | null;
  projects_heading: string | null;
  projects_subheading: string | null;
  empty_projects_text: string | null;
  footer_text: string | null;
  contact_email: string | null;
}

export default function BioFormModal({
  initialBio,
  profile,
  defaultTab = "identity",
  initialTab,
  trigger,
}: {
  initialBio?: Profile | null;
  profile?: Profile | null;
  defaultTab?: "identity" | "site" | "projects" | "footer";
  initialTab?: "identity" | "site" | "projects" | "footer";
  trigger?: React.ReactNode;
}) {
  const bioData = initialBio || profile || null;
  const activeDefaultTab = initialTab || defaultTab;
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "identity" | "site" | "projects" | "footer"
  >(defaultTab);

  useEffect(() => {
    setMounted(true);
    checkServerStatus().then(res => console.log("CMS Connection Test:", res));
  }, []);

  // Identity states
  const [bio, setBio] = useState(initialBio?.bio_text || "");
  const [fullName, setFullName] = useState(initialBio?.full_name || "Virgilio Flor E. Guaño");
  const [background, setBackground] = useState(initialBio?.background || "Full-stack Web Developer");
  const [demographics, setDemographics] = useState(
    initialBio?.demographics || "Remote / Worldwide",
  );
  const [contactEmail, setContactEmail] = useState(
    initialBio?.contact_email || "virgilio.guano@example.com",
  );
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialBio?.avatar_url || null,
  );

  // Site Setting states
  const [navTitle, setNavTitle] = useState(
    initialBio?.nav_title || "Virgilio Guaño",
  );
  const [portfolioHeading, setPortfolioHeading] = useState(
    initialBio?.portfolio_heading || "High-Impact Websites & Business Applications",
  );
  const [portfolioIntro, setPortfolioIntro] = useState(
    initialBio?.portfolio_intro || "I design and build tailored websites, web applications, and digital systems that solve real problems and grow businesses.",
  );
  const [projectsHeading, setProjectsHeading] = useState(
    initialBio?.projects_heading || "Selected Works & Systems",
  );
  const [projectsSubheading, setProjectsSubheading] = useState(
    initialBio?.projects_subheading || "Websites, Web Apps & Business Architectures",
  );
  const [emptyProjectsText, setEmptyProjectsText] = useState(
    initialBio?.empty_projects_text || "No projects added yet",
  );
  const [footerQuote, setFooterQuote] = useState("");
  const [footerAuthor, setFooterAuthor] = useState("");

  useEffect(() => {
    if (initialBio?.footer_text) {
      if (initialBio.footer_text.includes("|||")) {
        const [quote, author] = initialBio.footer_text.split("|||");
        setFooterQuote(quote);
        setFooterAuthor(author);
      } else {
        setFooterQuote(initialBio.footer_text);
        setFooterAuthor(initialBio.full_name || "Virgilio Flor E. Guaño");
      }
    } else {
      setFooterQuote("Engineered for speed, performance, and business growth.");
      setFooterAuthor(initialBio?.full_name || "Virgilio Flor E. Guaño");
    }
  }, [initialBio]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("bio_text", bio);
    formData.append("full_name", fullName);
    formData.append("background", background);
    formData.append("demographics", demographics);
    formData.append("nav_title", navTitle);
    formData.append("portfolio_heading", portfolioHeading);
    formData.append("portfolio_intro", portfolioIntro);
    formData.append("projects_heading", projectsHeading);
    formData.append("projects_subheading", projectsSubheading);
    formData.append("empty_projects_text", emptyProjectsText);
    formData.append("footer_text", `${footerQuote}|||${footerAuthor}`);
    formData.append("contact_email", contactEmail);

    if (avatar) {
      formData.append("avatar", avatar);
    }
    if (initialBio?.avatar_url) {
      formData.append("existing_avatar_url", initialBio.avatar_url);
    }

    try {
      const result = await updateProfile(formData);
      if (result?.error) {
        alert(`Failed to update profile: ${result.error}`);
      } else {
        setIsOpen(false);
      }
    } catch (error: any) {
      console.error(error);
      alert(
        "An unexpected error occurred. Please check the console for details.",
      );
    } finally {
      setLoading(false);
    }
  };

  const triggerElement = trigger ? (
    <div onClick={() => setIsOpen(true)} suppressHydrationWarning className="inline-block">
      {trigger}
    </div>
  ) : (
    <button
      onClick={() => setIsOpen(true)}
      className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300 hover:text-white transition-all px-3.5 py-1.5 rounded-xl border border-red-500/30 bg-black/80 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:border-red-500 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]"
    >
      <Settings2 size={14} className="text-red-500" /> CMS Settings
    </button>
  );

  if (!isOpen) return triggerElement;

  const modalContent = (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-xl z-[9999] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="glass-card-red border border-red-500/30 bg-black/90 shadow-[0_0_50px_rgba(220,38,38,0.3)] w-full max-w-2xl overflow-hidden rounded-3xl animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        <div className="px-8 py-6 border-b border-red-500/20 flex justify-between items-center bg-zinc-950/80 backdrop-blur-sm shrink-0">
          <div className="flex gap-4 md:gap-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab("identity")}
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-colors py-1 ${activeTab === "identity" ? "text-red-500 border-b-2 border-red-500 red-glow-text" : "text-slate-400 hover:text-slate-200"}`}
            >
              <UserCircle2 size={16} /> Identity
            </button>
            <button
              onClick={() => setActiveTab("site")}
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-colors py-1 ${activeTab === "site" ? "text-red-500 border-b-2 border-red-500 red-glow-text" : "text-slate-400 hover:text-slate-200"}`}
            >
              <Settings2 size={16} /> Site
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-colors py-1 ${activeTab === "projects" ? "text-red-500 border-b-2 border-red-500 red-glow-text" : "text-slate-400 hover:text-slate-200"}`}
            >
              <Pencil size={16} /> Projects
            </button>
            <button
              onClick={() => setActiveTab("footer")}
              className={`flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] transition-colors py-1 ${activeTab === "footer" ? "text-red-500 border-b-2 border-red-500 red-glow-text" : "text-slate-400 hover:text-slate-200"}`}
            >
              <Settings2 size={16} /> Footer
            </button>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-red-500/10"
          >
            <X size={20} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-8 overflow-y-auto grow"
        >
          {activeTab === "identity" ? (
            <div className="space-y-8 animate-in slide-in-from-left-4 duration-300">
              {/* Avatar Upload */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative group cursor-pointer">
                  <div className="w-28 h-28 rounded-2xl border-2 border-dashed border-red-500/40 overflow-hidden bg-zinc-950 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="text-red-500/60" size={28} />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-red-400 tracking-wider">
                      Change Photo
                    </span>
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Profile Photo
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-sm text-slate-200"
                    placeholder="Virgilio Flor E. Guaño"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    Location / Demographics
                  </label>
                  <input
                    type="text"
                    value={demographics}
                    onChange={(e) => setDemographics(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-sm text-slate-200"
                    placeholder="Remote / Worldwide"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-sm text-slate-200"
                    placeholder="virgilio.guano@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Background / Role Title
                </label>
                <input
                  type="text"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-sm text-slate-200"
                  placeholder="Full-stack Web Developer"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Bio (Markdown supported)
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={5}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-mono text-sm text-slate-200"
                  placeholder="Experienced Full-Stack Web Developer creating websites and web applications..."
                  required
                />
              </div>
            </div>
          ) : activeTab === "site" ? (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Navigation Title / Brand
                </label>
                <input
                  type="text"
                  value={navTitle}
                  onChange={(e) => setNavTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-sm text-slate-200"
                  placeholder="Virgilio Guaño"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Portfolio Main Heading
                </label>
                <input
                  type="text"
                  value={portfolioHeading}
                  onChange={(e) => setPortfolioHeading(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-sm text-slate-200"
                  placeholder="High-Impact Websites & Web Applications"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Hero Intro Subtext
                </label>
                <textarea
                  value={portfolioIntro}
                  onChange={(e) => setPortfolioIntro(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-sm text-slate-200"
                  placeholder="I build dynamic systems and web solutions that help businesses thrive..."
                />
              </div>
            </div>
          ) : activeTab === "projects" ? (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    Projects Section Heading
                  </label>
                  <input
                    type="text"
                    value={projectsHeading}
                    onChange={(e) => setProjectsHeading(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-sm text-slate-200"
                    placeholder="Selected Works & Systems"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                    Projects Subheading
                  </label>
                  <input
                    type="text"
                    value={projectsSubheading}
                    onChange={(e) => setProjectsSubheading(e.target.value)}
                    className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-sm text-slate-200"
                    placeholder="Websites, Web Apps & Business Architectures"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Empty State Text
                </label>
                <input
                  type="text"
                  value={emptyProjectsText}
                  onChange={(e) => setEmptyProjectsText(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-sm text-slate-200"
                  placeholder="No projects added yet"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Footer Quote
                </label>
                <textarea
                  value={footerQuote}
                  onChange={(e) => setFooterQuote(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-sm text-slate-200"
                  placeholder="Engineered for performance and business results."
                />
              </div>
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                  Footer Author Tag
                </label>
                <input
                  type="text"
                  value={footerAuthor}
                  onChange={(e) => setFooterAuthor(e.target.value)}
                  className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-sm text-slate-200"
                  placeholder="Virgilio Flor E. Guaño"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4 border-t border-zinc-800 shrink-0">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-red-600 via-rose-600 to-red-800 text-white px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:opacity-95 disabled:opacity-50 transition-all shadow-[0_0_25px_rgba(239,68,68,0.4)]"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (mounted) {
    return (
      <>
        {triggerElement}
        {createPortal(modalContent, document.body)}
      </>
    );
  }

  return triggerElement;
}
