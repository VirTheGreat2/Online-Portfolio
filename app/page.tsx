import { createServerSideClient } from "@/lib/supabase-server";
import ReactMarkdown from "react-markdown";
import {
  LogOut,
  ExternalLink,
  Trash2,
  ArrowUpRight,
  Plus,
  Pencil,
} from "lucide-react";
import { logout, deleteProject } from "./actions";
import { checkAdmin } from "@/lib/auth";
import ProjectFormModal from "@/components/ProjectFormModal";
import BioFormModal from "@/components/BioFormModal";
import ParallaxWrapper from "@/components/ParallaxWrapper";
import ScrollIndicator from "@/components/ScrollIndicator";

export default async function Portfolio() {
  const supabase = await createServerSideClient();
  const isAdmin = await checkAdmin();

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .maybeSingle();

  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <ParallaxWrapper>
      <ScrollIndicator />
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12 relative">
        {/* Navigation */}
        <nav className="mb-24 flex flex-col md:flex-row justify-between items-center gap-8 relative z-20">
          <div className="relative group/nav">
            <div className="brutalist-card px-8 py-4 bg-white rotate-[-2deg] brutalist-card-hover cursor-pointer">
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black break-words">
                {profile?.nav_title || "Developer"}
              </h1>
            </div>
            {isAdmin && (
              <div className="absolute -top-4 -right-4 opacity-0 group-hover/nav:opacity-100 transition-opacity">
                <BioFormModal
                  initialBio={profile}
                  defaultTab="site"
                  trigger={
                    <button className="brutalist-card p-2 bg-black text-white hover:bg-white hover:text-black transition-colors">
                      <Pencil size={16} strokeWidth={3} />
                    </button>
                  }
                />
              </div>
            )}
          </div>
          <div className="flex gap-8 items-center">
            <a
              href={`mailto:${profile?.contact_email || "contact@example.com"}`}
              className="brutalist-card bg-white px-6 py-2 handwritten text-lg font-black text-black hover:bg-black hover:text-white transition-all flex items-center gap-2 rotate-[1deg]"
            >
              Get in touch <ArrowUpRight size={18} strokeWidth={3} />
            </a>
            {isAdmin && (
              <form action={logout}>
                <button className="brutalist-card px-4 py-2 text-xs font-black uppercase bg-black text-white hover:bg-white hover:text-black transition-colors">
                  Exit CMS
                </button>
              </form>
            )}
          </div>
        </nav>

        <main className="space-y-32">
          {/* About Me Section (The "Central Hub") */}
          <section className="flex justify-center">
            <div className="brutalist-card p-12 md:p-20 max-w-4xl bg-white relative z-10 rotate-[1deg] brutalist-card-hover group">
              {isAdmin && (
                <div className="absolute -top-4 -right-4 opacity-0 group-hover:opacity-100 transition-opacity z-30">
                  <BioFormModal
                    initialBio={profile}
                    defaultTab="site"
                    trigger={
                      <button className="brutalist-card p-4 bg-black text-white hover:bg-white hover:text-black transition-colors">
                        <Pencil size={24} strokeWidth={3} />
                      </button>
                    }
                  />
                </div>
              )}
              <div className="flex justify-between items-start mb-12">
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black italic underline decoration-4 underline-offset-8 break-words">
                  {profile?.portfolio_heading || "My Portfolio"}
                </h2>
              </div>

              <div className="prose prose-slate max-w-none leading-[1.8] text-black text-xl font-bold">
                <p className="handwritten text-black/60 italic text-2xl">
                  {profile?.portfolio_intro ||
                    "Welcome to my digital workshop. Below you will find my story and the artifacts I've crafted."}
                </p>
              </div>
            </div>
          </section>

          {/* New Identity Section */}
          <section className="max-w-5xl mx-auto relative z-10">
            <div className="brutalist-card bg-white p-12 md:p-16 rotate-[-1deg] brutalist-card-hover">
              <div className="flex flex-col md:flex-row gap-16 items-start">
                {/* Avatar/Picture */}
                <div className="w-full md:w-1/3 aspect-square brutalist-card bg-slate-100 overflow-hidden relative group">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={profile.full_name || "Profile"}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-black/5">
                      <Plus size={48} className="text-black/20" />
                    </div>
                  )}
                  {isAdmin && (
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <BioFormModal
                        initialBio={profile}
                        defaultTab="identity"
                        trigger={
                          <button className="brutalist-card p-2 bg-black text-white hover:bg-white hover:text-black transition-colors">
                            <Pencil size={16} strokeWidth={3} />
                          </button>
                        }
                      />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="w-full md:w-2/3 space-y-8 group/details relative">
                  {isAdmin && (
                    <div className="absolute -top-4 -right-4 opacity-0 group-hover/details:opacity-100 transition-opacity z-30">
                      <BioFormModal
                        initialBio={profile}
                        defaultTab="identity"
                        trigger={
                          <button className="brutalist-card p-2 bg-black text-white hover:bg-white hover:text-black transition-colors">
                            <Pencil size={16} strokeWidth={3} />
                          </button>
                        }
                      />
                    </div>
                  )}
                  <div className="space-y-2 border-b-4 border-black pb-6">
                    <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black italic break-words">
                      {profile?.full_name || "The Developer"}
                    </h2>
                    <p className="handwritten text-xl font-bold text-black/60">
                      {profile?.background || "Digital Craftsman"}
                    </p>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-black/40">
                      Based in: {profile?.demographics || "The Grid"}
                    </p>
                  </div>

                  <div className="prose prose-slate max-w-none leading-relaxed text-black font-medium text-lg">
                    {profile?.bio_text ? (
                      <ReactMarkdown>{profile.bio_text}</ReactMarkdown>
                    ) : (
                      <p className="handwritten text-black/40 italic">
                        HELLOOOOO
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Project Section */}
          <section className="space-y-24 relative z-10 group/projects">
            <div className="flex justify-between items-end border-b-4 border-black pb-8 relative">
              <div className="space-y-2">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black break-words">
                  {profile?.projects_heading || "Manifestations"}
                </h2>
                <p className="handwritten text-sm font-black text-black tracking-widest uppercase italic underline decoration-2 underline-offset-4">
                  {profile?.projects_subheading || "Selected Digital Artifacts"}
                </p>
              </div>
              <div className="flex gap-4 items-center">
                {isAdmin && (
                  <div className="opacity-0 group-hover/projects:opacity-100 transition-opacity">
                    <BioFormModal
                      initialBio={profile}
                      defaultTab="projects"
                      trigger={
                        <button className="brutalist-card p-2 bg-black text-white hover:bg-white hover:text-black transition-colors">
                          <Pencil size={16} strokeWidth={3} />
                        </button>
                      }
                    />
                  </div>
                )}
                {isAdmin && <ProjectFormModal />}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
              {projects?.map((project, index) => {
                const rotation =
                  index % 2 === 0 ? "rotate-[-1.5deg]" : "rotate-[1.5deg]";

                return (
                  <div
                    key={project.id}
                    className={`${rotation} brutalist-card group overflow-hidden bg-white hover:rotate-0 hover:scale-105 hover:z-20`}
                  >
                    {project.image_url && (
                      <div className="aspect-square overflow-hidden border-b-2 border-black">
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    )}
                    <div className="p-8 space-y-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-black tracking-tight uppercase text-black italic leading-none">
                          {project.title}
                        </h3>
                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          {isAdmin && (
                            <>
                              <ProjectFormModal project={project} />
                              <form
                                action={async () => {
                                  "use server";
                                  await deleteProject(
                                    project.id,
                                    project.image_url,
                                  );
                                }}
                              >
                                <button className="text-black hover:text-red-600">
                                  <Trash2 size={20} strokeWidth={2.5} />
                                </button>
                              </form>
                            </>
                          )}
                          {project.project_url && (
                            <a
                              href={project.project_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-black hover:underline transition-colors"
                            >
                              <ArrowUpRight size={24} strokeWidth={3} />
                            </a>
                          )}
                        </div>
                      </div>
                      <p className="text-black font-bold leading-relaxed text-sm">
                        {project.description}
                      </p>
                      <div className="pt-4 border-t border-black/10 flex items-center justify-end text-[10px] font-black uppercase tracking-widest text-black">
                        <span className="bg-black text-white px-2 py-0.5 rounded">
                          {project.status_text || "Stable Build"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              {projects?.length === 0 && (
                <div className="col-span-full border-4 border-dashed border-black rounded-3xl py-48 flex flex-col items-center justify-center gap-8 bg-white group cursor-pointer hover:bg-black/5 transition-colors">
                  <div className="w-20 h-20 rounded-full border-2 border-black flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                    <Plus size={40} strokeWidth={3} />
                  </div>
                  <p className="handwritten text-2xl text-black font-black tracking-widest uppercase">
                    {profile?.empty_projects_text || "The Archives are empty"}
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>

        <footer className="mt-32 pt-20 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-12 relative z-20 group/footer">
          <div className="relative">
            <div className="brutalist-card bg-white px-8 py-4 rotate-[-1deg] hover:rotate-0 transition-transform">
              <div className="space-y-4">
                {(() => {
                  const footerContent = profile?.footer_text || "";
                  const [quote, author] = footerContent.includes("|||")
                    ? footerContent.split("|||")
                    : [footerContent, profile?.full_name || "Author Name"];

                  return (
                    <>
                      <div className="handwritten text-2xl font-black italic text-black leading-relaxed">
                        {quote ? `“${quote}”` : "“Your inspiring quote here.”"}
                      </div>
                      <div className="text-right text-sm font-black uppercase tracking-[0.2em] text-black/50">
                        — {author || "Author Name"}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
            {isAdmin && (
              <div className="absolute -top-4 -right-4 opacity-0 group-hover/footer:opacity-100 transition-opacity">
                <BioFormModal
                  initialBio={profile}
                  defaultTab="footer"
                  trigger={
                    <button className="brutalist-card p-2 bg-black text-white hover:bg-white hover:text-black transition-colors">
                      <Pencil size={16} strokeWidth={3} />
                    </button>
                  }
                />
              </div>
            )}
          </div>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-black bg-white/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-black/5">
            <span>NEXT.JS 15</span>
            <span>SUPABASE CLOUD</span>
            <span>TAILWIND 4.0</span>
          </div>
        </footer>
      </div>
    </ParallaxWrapper>
  );
}
