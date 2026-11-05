"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Plus, Pencil, X } from "lucide-react";
import { addProject, updateProject } from "@/app/actions";

interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  project_url: string;
  status_text?: string;
}

interface ProjectFormModalProps {
  project?: Project;
  trigger?: React.ReactNode;
}

export default function ProjectFormModal({ project, trigger }: ProjectFormModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      let res;
      if (project) {
        res = await updateProject(project.id, formData);
      } else {
        res = await addProject(formData);
      }
      if (res?.error) {
        alert(`Error saving project: ${res.error}`);
      } else {
        setIsOpen(false);
      }
    } catch (error: any) {
      console.error(error);
      alert(error?.message || "Error saving project");
    } finally {
      setLoading(false);
    }
  };

  const triggerElement = trigger ? (
    <span onClick={() => setIsOpen(true)} className="inline-block cursor-pointer">
      {trigger}
    </span>
  ) : (
    <button
      type="button"
      onClick={() => setIsOpen(true)}
      className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-200 hover:text-white transition-all px-4 py-2 rounded-xl border border-red-500/30 bg-black/80 backdrop-blur-md shadow-[0_0_15px_rgba(239,68,68,0.2)] hover:border-red-500 hover:shadow-[0_0_25px_rgba(239,68,68,0.4)]"
    >
      {project ? (
        <Pencil size={14} className="text-red-500" />
      ) : (
        <>
          <Plus size={14} className="text-red-500" /> Add Project
        </>
      )}
    </button>
  );

  const modalContent = (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-xl z-[9999] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="glass-card-red border border-red-500/30 bg-black/90 shadow-[0_0_50px_rgba(220,38,38,0.3)] w-full max-w-xl overflow-hidden rounded-3xl animate-in zoom-in-95 duration-300">
        <div className="px-8 py-6 border-b border-red-500/20 flex justify-between items-center bg-zinc-950/80">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-red-500 red-glow-text">
            {project ? "Update Project" : "Add New System / Project"}
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-red-500/10"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Project Title
            </label>
            <input
              name="title"
              defaultValue={project?.title}
              required
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-slate-200 placeholder:text-slate-600 text-sm"
              placeholder="Enterprise Business System..."
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Overview & Business Impact
            </label>
            <textarea
              name="description"
              defaultValue={project?.description}
              required
              rows={3}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-slate-200 placeholder:text-slate-600 text-sm"
              placeholder="Describe how this website/web application solves business needs and tech stack..."
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Project Status / Category
            </label>
            <input
              name="status_text"
              defaultValue={project?.status_text || "Web Application"}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-slate-200 placeholder:text-slate-600 text-sm"
              placeholder="Website / Web Application / Business System"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Live URL
            </label>
            <input
              name="project_url"
              type="url"
              defaultValue={project?.project_url}
              className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all text-slate-200 placeholder:text-slate-600 text-sm"
              placeholder="https://..."
            />
          </div>
          <div className="space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
              Project Preview Image
            </label>
            <div className="relative group/file">
              <input
                name="image"
                type="file"
                accept="image/*"
                className="w-full text-xs text-slate-400 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-[0.1em] file:bg-red-600 file:text-white hover:file:bg-red-500 file:transition-all file:cursor-pointer"
              />
            </div>
            {project?.image_url && (
              <input
                type="hidden"
                name="existing_image_url"
                value={project.image_url}
              />
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="px-6 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-red-600 via-rose-600 to-red-800 text-white px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:opacity-95 disabled:opacity-50 transition-all shadow-[0_0_25px_rgba(239,68,68,0.4)]"
            >
              {loading
                ? "Processing..."
                : project
                  ? "Update Project"
                  : "Deploy Project"}
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
        {isOpen && createPortal(modalContent, document.body)}
      </>
    );
  }

  return triggerElement;
}
