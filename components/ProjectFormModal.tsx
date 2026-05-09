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

export default function ProjectFormModal({ project }: { project?: Project }) {
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
      if (project) {
        await updateProject(project.id, formData);
      } else {
        await addProject(formData);
      }
      setIsOpen(false);
    } catch (error) {
      console.error(error);
      alert("Error saving project");
    } finally {
      setLoading(false);
    }
  };

  const trigger = (
    <button
      onClick={() => setIsOpen(true)}
      className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors px-4 py-2 rounded-lg border border-slate-800 bg-slate-900/50"
    >
      {project ? (
        <Pencil size={14} />
      ) : (
        <>
          <Plus size={14} /> Add Project
        </>
      )}
    </button>
  );

  if (!isOpen) return trigger;

  const modalContent = (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[9999] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-slate-900 border border-slate-800 shadow-2xl w-full max-w-xl overflow-hidden rounded-3xl animate-in zoom-in-95 duration-300">
        <div className="px-8 py-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-500">
            {project ? "Update Project" : "New Discovery"}
          </h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-500 hover:text-white transition-colors p-2"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              Project Title
            </label>
            <input
              name="title"
              defaultValue={project?.title}
              required
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-300 placeholder:text-slate-700"
              placeholder="Modern E-commerce..."
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              Overview
            </label>
            <textarea
              name="description"
              defaultValue={project?.description}
              required
              rows={3}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-300 placeholder:text-slate-700"
              placeholder="Describe the mission and tech stack..."
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              Project Status / Date
            </label>
            <input
              name="status_text"
              defaultValue={project?.status_text || "Stable Build"}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-300 placeholder:text-slate-700"
              placeholder="May 2024 / Completed"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              Live URL
            </label>
            <input
              name="project_url"
              type="url"
              defaultValue={project?.project_url}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-300 placeholder:text-slate-700"
              placeholder="https://..."
            />
          </div>
          <div className="space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              Visual Identity
            </label>
            <div className="relative group/file">
              <input
                name="image"
                type="file"
                accept="image/*"
                className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-[10px] file:font-black file:uppercase file:tracking-[0.1em] file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 file:transition-all file:cursor-pointer"
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

          <div className="flex justify-end gap-4 pt-4">
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
              className="bg-indigo-600 text-white px-8 py-2.5 rounded-xl text-xs font-black uppercase tracking-[0.2em] hover:bg-indigo-500 disabled:opacity-50 transition-all shadow-lg shadow-indigo-500/20"
            >
              {loading
                ? "Processing..."
                : project
                  ? "Update Mission"
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
        {trigger}
        {createPortal(modalContent, document.body)}
      </>
    );
  }

  return trigger;
}
