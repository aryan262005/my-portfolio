import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Terminal,
  Layers,
  Cpu,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { GithubIcon } from "../ui/Icons";
import { sound } from "../../utils/audio";
import ProjectThumbnail from "../ui/ProjectThumbnail";

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-3xl bg-[#11111a] border-2 border-[var(--color-accent-primary)]/50 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_25px_var(--color-accent-glow)] overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#171726] border-b border-white/10 font-mono-code text-xs">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: project.accentColor }}
              />
              <span className="text-white font-bold tracking-wider">
                PROJECT DOSSIER // {project.auraTag}
              </span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="overflow-y-auto p-5 sm:p-7 space-y-6 text-slate-200">
            {/* Visual Header Artwork */}
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
              <ProjectThumbnail
                slug={project.slug}
                color={project.accentColor}
                title={project.title}
              />
            </div>

            {/* Title & Tagline */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-[var(--color-accent-primary)] border border-white/10">
                  {project.category}
                </span>
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  {project.status}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {project.title}
              </h2>
              <p className="text-sm font-mono-code text-slate-300 leading-relaxed">
                {project.tagline}
              </p>
            </div>

            {/* Description */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 text-xs sm:text-sm text-slate-300 leading-relaxed font-mono-code">
              {project.description}
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-3">
              {project.metrics?.map((m) => (
                <div
                  key={m.label}
                  className="p-3 rounded-lg bg-[#161624] border border-white/10 text-center"
                >
                  <div className="text-base sm:text-lg font-extrabold text-white font-mono-code">
                    {m.value}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono-code">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Architecture Deep Dive */}
            {project.architecture && (
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Cpu size={14} className="text-[var(--color-accent-primary)]" />
                  SYSTEM ARCHITECTURE & DECISIONS
                </h3>

                {/* Problem Statement */}
                <div className="p-3.5 rounded-lg bg-red-500/5 border border-red-500/20 text-xs text-slate-300 font-mono-code">
                  <div className="flex items-center gap-1.5 text-red-400 font-bold mb-1">
                    <AlertCircle size={13} /> PROBLEM STATEMENT
                  </div>
                  {project.architecture.problem}
                </div>

                {/* Architectural Solution */}
                <div className="p-3.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs text-slate-300 font-mono-code">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                    <CheckCircle2 size={13} /> ARCHITECTURAL SOLUTION
                  </div>
                  {project.architecture.solution}
                </div>

                {/* Key Decisions */}
                <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/10">
                  <span className="text-[11px] font-mono-code font-bold text-slate-300 block mb-2">
                    KEY ENGINEERING DECISIONS:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-400 font-mono-code">
                    {project.architecture.keyDecisions.map((dec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[var(--color-accent-primary)] font-bold">
                          [0{i + 1}]
                        </span>
                        <span>{dec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Measured Impact */}
                <div className="p-3.5 rounded-lg bg-[var(--color-accent-primary)]/5 border border-[var(--color-accent-primary)]/20 text-xs text-slate-300 font-mono-code flex items-start gap-2">
                  <TrendingUp
                    size={16}
                    className="text-[var(--color-accent-primary)] shrink-0 mt-0.5"
                  />
                  <div>
                    <span className="text-[var(--color-accent-primary)] font-bold mr-1">
                      MEASURED IMPACT:
                    </span>
                    {project.architecture.impact}
                  </div>
                </div>
              </div>
            )}

            {/* Tech Stack Pills */}
            <div>
              <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-2">
                <Layers size={13} className="text-[var(--color-accent-primary)]" />
                TECHNOLOGIES USED
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono-code px-2.5 py-1 rounded-md bg-white/5 text-slate-200 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-3.5 bg-[#171726] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-accent-primary)] text-black font-mono-code text-xs font-bold hover:bg-white transition-all shadow-[0_0_15px_var(--color-accent-glow)]"
              >
                <ExternalLink size={13} />
                <span>LAUNCH LIVE DEMO</span>
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white font-mono-code text-xs font-semibold border border-white/10 transition-all"
              >
                <GithubIcon size={14} />
                <span>SOURCE CODE</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs font-mono-code text-slate-400 hover:text-white"
            >
              Close Dossier [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}