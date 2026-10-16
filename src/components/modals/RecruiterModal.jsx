import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Mail,
  Copy,
  Check,
  FileText,
  Sparkles,
  Zap,
  MapPin,
  Briefcase,
  Layers,
  Award,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../ui/Icons";
import confetti from "canvas-confetti";
import { sound } from "../../utils/audio";
import {
  personalInfo,
  projectsData,
  skillsData,
  certificatesData,
} from "../../data/portfolioData";

export default function RecruiterModal({ isOpen, onClose }) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if ((e.key === "r" || e.key === "R") && !e.target.matches("input, textarea")) {
        onClose();
      }
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

  const copyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    sound.playFanfare();

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#ff6b3d", "#00f2fe", "#10b981", "#ffffff"],
    });

    setTimeout(() => setCopiedEmail(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-4xl bg-[#0f0f18] border-2 border-[var(--color-accent-primary)]/50 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_var(--color-accent-glow)] overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
        >
          {/* Top HUD Header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#141422] border-b border-white/10 font-mono-code text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-primary)] animate-ping" />
              <span className="text-[var(--color-accent-primary)] font-bold tracking-wider">
                ⚡ RECRUITER 15-SECOND EXECUTIVE SCAN
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-slate-500 text-[11px]">
                PRESS [ESC] OR [R] TO CLOSE
              </span>
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto p-5 sm:p-8 space-y-6 text-slate-200">
            {/* Candidate Quick Snapshot Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl bg-white/[0.03] border border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {personalInfo.name}
                  </h2>
                  <span className="px-2 py-0.5 rounded bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] font-mono-code text-[11px] font-bold border border-[var(--color-accent-primary)]/30">
                    {personalInfo.auraLevel}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-accent-primary)] font-mono-code mb-2">
                  {personalInfo.title}
                </p>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono-code">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-slate-500" />
                    {personalInfo.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-emerald-400">
                    <Briefcase size={13} />
                    {personalInfo.status}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={copyEmail}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-[var(--color-accent-primary)] text-black font-mono-code text-xs font-bold hover:bg-white transition-all shadow-[0_0_15px_var(--color-accent-glow)]"
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copiedEmail ? "EMAIL COPIED!" : "COPY EMAIL"}</span>
                </button>
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-white font-mono-code text-xs font-semibold border border-white/10 transition-all"
                >
                  <FileText size={14} />
                  <span>RESUME / CV</span>
                </a>
              </div>
            </div>

            {/* Quick Elevator Pitch */}
            <div className="p-4 rounded-xl bg-[var(--color-accent-primary)]/5 border border-[var(--color-accent-primary)]/20 text-xs sm:text-sm text-slate-300 leading-relaxed font-mono-code">
              <span className="text-[var(--color-accent-primary)] font-bold mr-1">
                SUMMARY:
              </span>
              {personalInfo.elevatorPitch}
            </div>

            {/* Flagship Projects (Top 4) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-mono-code font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Zap size={14} className="text-[var(--color-accent-primary)]" />
                  FLAGSHIP PROJECTS & PROVEN IMPACT
                </h3>
                <span className="text-[11px] font-mono-code text-slate-500">
                  TOP SHOWCASE
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {projectsData.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-xl bg-[#141422] border border-white/10 hover:border-[var(--color-accent-primary)]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-sm text-white">
                          {p.title}
                        </span>
                        <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-white/5 text-[var(--color-accent-primary)]">
                          {p.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                        {p.tagline}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {p.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pt-2 border-t border-white/5 text-xs font-mono-code">
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[var(--color-accent-primary)] hover:underline flex items-center gap-1"
                      >
                        <ExternalLink size={12} /> Live Demo
                      </a>
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-white flex items-center gap-1"
                      >
                        <GithubIcon size={12} /> Source Code
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills Overview */}
            <div>
              <h3 className="text-sm font-mono-code font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-3">
                <Layers size={14} className="text-[var(--color-accent-primary)]" />
                TECHNICAL COMPETENCY MATRIX
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skillsData.map((cat) => (
                  <div
                    key={cat.category}
                    className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10"
                  >
                    <span className="text-xs font-mono-code font-bold text-[var(--color-accent-primary)] block mb-2">
                      {cat.category}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill.name}
                          className="text-[11px] font-mono-code px-2 py-1 rounded bg-white/5 text-slate-200 border border-white/5"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Certifications & Social Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div>
                <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-2">
                  <Award size={13} className="text-[var(--color-accent-primary)]" />
                  VERIFIED CREDENTIALS
                </h4>
                <div className="space-y-2">
                  {certificatesData.slice(0, 2).map((cert) => (
                    <div
                      key={cert.id}
                      className="p-2.5 rounded-lg bg-white/[0.02] border border-white/5 text-xs font-mono-code flex items-center justify-between"
                    >
                      <div>
                        <div className="text-slate-200 font-semibold truncate max-w-[240px]">
                          {cert.title}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {cert.issuer} • {cert.date}
                        </div>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)]">
                        {cert.rarity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2 mb-2">
                  <Mail size={13} className="text-[var(--color-accent-primary)]" />
                  PRIMARY DIRECT PROFILES
                </h4>
                <div className="flex flex-col gap-2">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-code text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <GithubIcon size={14} /> GitHub Profile
                    </span>
                    <ExternalLink size={12} />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono-code text-slate-300 hover:text-white transition-colors"
                  >
                    <span className="flex items-center gap-2">
                      <LinkedinIcon size={14} /> LinkedIn Profile
                    </span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="px-6 py-3 bg-[#141422] border-t border-white/10 flex items-center justify-between text-[11px] font-mono-code text-slate-400">
            <span>Direct Email: {personalInfo.email}</span>
            <button
              onClick={onClose}
              className="text-[var(--color-accent-primary)] hover:underline font-bold"
            >
              Close Quick Scan [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}