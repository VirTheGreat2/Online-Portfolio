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
  defaultTab = "identity",
  trigger,
}: {
  initialBio: Profile | null;
  defaultTab?: "identity" | "site" | "projects" | "footer";
  trigger?: React.ReactNode;
}) {
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
  const [fullName, setFullName] = useState(initialBio?.full_name || "");
  const [background, setBackground] = useState(initialBio?.background || "");
  const [demographics, setDemographics] = useState(
    initialBio?.demographics || "",
  );
  const [contactEmail, setContactEmail] = useState(
    initialBio?.contact_email || "contact@example.com",
  );
  const [avatar, setAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialBio?.avatar_url || null,
  );

  // Site Setting states
  const [navTitle, setNavTitle] = useState(
    initialBio?.nav_title || "Developer",
  );
  const [portfolioHeading, setPortfolioHeading] = useState(
    initialBio?.portfolio_heading || "My Portfolio",
  );
  const [portfolioIntro, setPortfolioIntro] = useState(
    initialBio?.portfolio_intro || "Welcome to my digital workshop.",
  );
  const [projectsHeading, setProjectsHeading] = useState(
    initialBio?.projects_heading || "Manifestations",
  );
  const [projectsSubheading, setProjectsSubheading] = useState(
    initialBio?.projects_subheading || "Selected Digital Artifacts",
  );
  const [emptyProjectsText, setEmptyProjectsText] = useState(
    initialBio?.empty_projects_text || "The Archives are empty",
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
        setFooterAuthor(initialBio.full_name || "");
      }
    } else {
      setFooterQuote("Built with focus and precision.");
      setFooterAuthor(initialBio?.full_name || "");
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
    <div onClick={() => setIsOpen(true)} suppressHydrationWarning>
      {trigger}
    </div>
  ) : (
    <button
      onClick={() => setIsOpen(true)}
      className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/50"
    >
      <Settings2 size={14} /> CMS Settings
    </button>
  );

  if (!isOpen) return triggerElement;

  const modalContent = (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 shadow-2xl w-full max-w-2xl overflow-hidden rounded-3xl animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
        <div className="px-8 py-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/95 backdrop-blur-sm shrink-0">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("identity")}
              className={`flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] transition-colors ${activeTab === "identity" ? "text-indigo-500" : "text-slate-500 hover:text-slate-300"}`}
            >
              <UserCircle2 size={18} /> Identity
            </button>
            <button
              onClick={() => setActiveTab("site")}
              className={`flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] transition-colors ${activeTab === "site" ? "text-indigo-500" : "text-slate-500 hover:text-slate-300"}`}
            >
              <Settings2 size={18} /> Site Text
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] transition-colors ${activeTab === "projects" ? "text-indigo-500" : "text-slate-500 hover:text-slate-300"}`}
            >
              <Pencil size={18} /> Projects Text
            </button>
            <button
              onClick={() => setActiveTab("footer")}
              className={`flex items-center gap-2 text-sm font-black uppercase tracking-[0.2em] transition-colors ${activeTab === "footer" ? "text-indigo-500" : "text-slate-500 hover:text-slate-300"}`}
            >
              <Settings2 size={18} /> Footer Text
            </button>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-500 hover:text-white transition-colors p-2"
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
                <div className="relative group">
                  <div className="w-32 h-32 rounded-3xl border-2 border-dashed border-slate-700 overflow-hidden bg-slate-950 flex items-center justify-center">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Upload className="text-slate-700" size={32} />
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity pointer-events-none rounded-3xl">
                    <span className="text-[10px] font-black uppercase text-white">
                      Change Photo
                    </span>
                  </div>
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Formal Picture
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm text-slate-300"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Demographics
                  </label>
                  <input
                    type="text"
                    value={demographics}
                    onChange={(e) => setDemographics(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm text-slate-300"
                    placeholder="City, Country"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm text-slate-300"
                    placeholder="contact@example.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Background / Profession
                </label>
                <input
                  type="text"
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm text-slate-300"
                  placeholder="Software Engineer & Designer"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Bio (Markdown)
                </label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all font-mono text-sm text-slate-300"
                  placeholder="# Hello World..."
                  required
                />
              </div>
            </div>
          ) : activeTab === "site" ? (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Navigation Title
                </label>
                <input
                  type="text"
                  value={navTitle}
                  onChange={(e) => setNavTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm text-slate-300"
                  placeholder="Developer"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Portfolio Section Heading
                </label>
                <input
                  type="text"
                  value={portfolioHeading}
                  onChange={(e) => setPortfolioHeading(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm text-slate-300"
                  placeholder="My Portfolio"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Portfolio Intro Text
                </label>
                <textarea
                  value={portfolioIntro}
                  onChange={(e) => setPortfolioIntro(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm text-slate-300"
                  placeholder="Welcome to my digital workshop..."
                />
              </div>
            </div>
          ) : activeTab === "projects" ? (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Projects Heading
                  </label>
                  <input
                    type="text"
                    value={projectsHeading}
                    onChange={(e) => setProjectsHeading(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm text-slate-300"
                    placeholder="Manifestations"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    Projects Subheading
                  </label>
                  <input
                    type="text"
                    value={projectsSubheading}
                    onChange={(e) => setProjectsSubheading(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm text-slate-300"
                    placeholder="Selected Digital Artifacts"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Empty Archives Text
                </label>
                <input
                  type="text"
                  value={emptyProjectsText}
                  onChange={(e) => setEmptyProjectsText(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm text-slate-300"
                  placeholder="The Archives are empty"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-300">
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Footer Quote
                </label>
                <textarea
                  value={footerQuote}
                  onChange={(e) => setFooterQuote(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm text-slate-300"
                  placeholder="Built with focus and precision."
                />
              </div>
              <div className="space-y-3">
                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                  Footer Author
                </label>
                <input
                  type="text"
                  value={footerAuthor}
                  onChange={(e) => setFooterAuthor(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-sm text-slate-300"
                  placeholder="Your Name"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-800 shrink-0">
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
              className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-500/20"
            >
              {loading ? "Syncing..." : "Save All Changes"}
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
