import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Zap,
  ArrowDown,
  Copy,
  Check,
  FileText,
} from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "../../utils/audio";
import { personalInfo, quickStats } from "../../data/portfolioData";
import Hero3DArtifact from "../canvas/Hero3DArtifact";
import Card3D from "../ui/Card3D";

export default function Hero({ onOpenRecruiter, onOpenExplore }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    sound.playFanfare();

    confetti({
      particleCount: 35,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#ff6b3d", "#00f2fe", "#10b981", "#ffffff"],
    });

    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToProjects = () => {
    sound.playClick();
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent-primary)]/10 rounded-full blur-[150px] pointer-events-none -z-10 animate-aura-pulse" />

      <div className="max-w-7xl mx-auto w-full flex flex-col items-center relative z-10">
        {/* Top Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono-code mb-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="text-slate-300 font-medium">
            {personalInfo.status}
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[var(--color-accent-primary)] font-bold">
            {personalInfo.auraLevel}
          </span>
        </motion.div>

        {/* Dual Column Layout on Desktop: Text & Interactive 3D Artifact */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-14">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 text-center lg:text-left space-y-4"
          >
            <div className="inline-block relative">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
                {personalInfo.name}
              </h1>
              {/* Anime holographic stamp */}
              <span className="absolute -top-3 right-0 sm:-right-8 px-2 py-0.5 rounded bg-[var(--color-accent-primary)] text-black text-[9px] sm:text-[10px] font-mono-code font-black uppercase tracking-wider rotate-6 shadow-[0_0_15px_var(--color-accent-glow)]">
                {personalInfo.characterClass}
              </span>
            </div>

            <p className="text-lg sm:text-2xl font-mono-code text-[var(--color-accent-primary)] font-semibold tracking-wide uppercase">
              {personalInfo.title}
            </p>

            <p className="text-sm sm:text-base text-slate-400 font-mono-code leading-relaxed max-w-xl mx-auto lg:mx-0">
              {personalInfo.tagline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
              <button
                onClick={() => {
                  sound.playFanfare();
                  onOpenExplore?.();
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--color-accent-primary)] via-cyan-400 to-[var(--color-accent-secondary)] hover:opacity-95 text-black font-mono-code font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_var(--color-accent-glow)] transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Sparkles size={14} className="animate-spin" style={{ animationDuration: "6s" }} />
                <span>Explore Aryan's (2D World)</span>
              </button>

              <button
                onClick={scrollToProjects}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/15 font-mono-code font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <span>Explore Quests</span>
                <ArrowDown size={14} />
              </button>

              <button
                onClick={() => {
                  sound.playFanfare();
                  onOpenRecruiter();
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#151524] hover:bg-white/10 text-white border border-[var(--color-accent-primary)]/50 font-mono-code font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer hover:scale-105 active:scale-95"
              >
                <Zap size={14} className="text-[var(--color-accent-primary)]" />
                <span>Recruiter 15s Scan</span>
              </button>

              <button
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-mono-code text-xs transition-all cursor-pointer"
              >
                {copied ? (
                  <Check size={14} className="text-emerald-400" />
                ) : (
                  <Copy size={14} />
                )}
                <span>{copied ? "Email Copied!" : "Copy Email"}</span>
              </button>

              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-mono-code text-xs transition-all"
              >
                <FileText size={14} />
                <span>Resume / CV</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Holographic Artifact */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <Hero3DArtifact />
          </motion.div>
        </div>

        {/* Quick Stats Grid with 3D Card Tilt */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          {quickStats.map((stat) => (
            <Card3D key={stat.id} maxTilt={10}>
              <div className="p-4 rounded-xl bg-[#12121d]/85 border border-white/10 hover:border-[var(--color-accent-primary)]/50 transition-colors text-left relative overflow-hidden group shadow-[0_8px_20px_rgba(0,0,0,0.5)] h-full flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono-code text-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10 px-1.5 py-0.5 rounded border border-[var(--color-accent-primary)]/20">
                    {stat.aura}
                  </span>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-white font-mono-code mb-1 group-hover:text-[var(--color-accent-primary)] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 font-mono-code">
                    {stat.label}
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent-primary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card3D>
          ))}
        </motion.div>
      </div>
    </section>
  );
}