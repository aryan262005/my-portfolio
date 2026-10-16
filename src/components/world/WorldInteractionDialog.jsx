import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Sparkles,
  Terminal,
  FolderGit2,
  Layers,
  Award,
  Gamepad2,
  Camera,
  Headphones,
  Send,
  Copy,
  Check,
  Zap,
  ArrowRight,
  Code2,
} from "lucide-react";
import { GithubIcon } from "../ui/Icons";
import {
  personalInfo,
  projectsData,
  experienceData,
  socialProfiles,
} from "../../data/portfolioData";
import { sound } from "../../utils/audio";

export default function WorldInteractionDialog({
  node,
  onClose,
  onOpenPhotoBooth,
  onOpenMusicLab,
  onOpenGame,
}) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!node) return null;

  const handleCopyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-2xl rounded-3xl bg-[var(--color-bg-card)]/95 border border-[var(--color-border-accent)] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_var(--color-accent-glow)] backdrop-blur-xl overflow-hidden z-10 my-auto font-mono-code"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 bg-[var(--color-bg-surface)]/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
                style={{
                  backgroundColor: `${node.color}20`,
                  color: node.color,
                  border: `1px solid ${node.color}60`,
                }}
              >
                <Zap size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                    style={{
                      backgroundColor: `${node.color}15`,
                      color: node.color,
                      borderColor: `${node.color}40`,
                    }}
                  >
                    {node.badge}
                  </span>
                  <span className="text-[10px] text-slate-500">TERMINAL // ACTIVE</span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-white mt-0.5">
                  {node.title}
                </h3>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Dialog Body */}
          <div className="p-5 sm:p-7 bg-[var(--color-bg-dark)]/95 max-h-[72vh] overflow-y-auto space-y-5">
            {/* 1. PROJECT TERMINAL */}
            {node.type === "project" && node.projectData && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <div className="text-xs text-[var(--color-accent-primary)] font-bold">
                    {node.projectData.category} • {node.projectData.status}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {node.projectData.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div>
                  <span className="text-[11px] text-slate-400 font-bold block mb-2">
                    TECHNOLOGY STACK
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {node.projectData.techStack?.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                {node.projectData.metrics && (
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    {node.projectData.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center"
                      >
                        <span className="text-[10px] text-slate-500 block">{m.label}</span>
                        <span className="text-sm font-extrabold text-[var(--color-accent-primary)]">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/10">
                  {node.projectData.githubUrl && (
                    <a
                      href={node.projectData.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.playClick()}
                      className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold flex items-center gap-2 transition-colors"
                    >
                      <GithubIcon size={14} />
                      <span>Source Code</span>
                    </a>
                  )}
                  {node.projectData.liveUrl && (
                    <a
                      href={node.projectData.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.playClick()}
                      className="px-5 py-2.5 rounded-xl bg-[var(--color-accent-primary)] hover:bg-white text-black text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_var(--color-accent-glow)]"
                    >
                      <span>Live Deployment</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* 2. PROJECT LIST / MAINFRAME */}
            {node.type === "project_list" && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Access flagship projects authored by Aryan:
                </p>
                <div className="space-y-2.5">
                  {projectsData.map((p) => (
                    <div
                      key={p.id}
                      className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-white block">
                          {p.title}
                        </span>
                        <span className="text-[11px] text-slate-400 font-sans line-clamp-1">
                          {p.tagline}
                        </span>
                      </div>
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => sound.playClick()}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs flex items-center gap-1.5"
                      >
                        <span>Repo</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. SKILL STATION */}
            {node.type === "skill" && (
              <div className="space-y-4">
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {node.summary}
                </p>

                <div className="space-y-2">
                  <span className="text-xs text-[var(--color-accent-primary)] font-bold block">
                    ACTIVE TECHNOLOGIES
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {node.skills?.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1.5 rounded-xl bg-white/5 border border-[var(--color-border-accent)] text-white text-xs font-semibold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-300 font-sans">
                  💡 No traditional progress bars or arbitrary percentage ratings. These are the tools and frameworks actively used to build real products.
                </div>
              </div>
            )}

            {/* 4. CERTIFICATE / TROPHY */}
            {node.type === "certificate" && node.certData && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
                  <div className="text-xs font-bold uppercase tracking-wider mb-1">
                    {node.certData.issuer} • {node.certData.date}
                  </div>
                  <h4 className="text-base font-extrabold text-white">
                    {node.certData.title}
                  </h4>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {node.certData.summary}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {node.certData.skills?.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                {node.certData.verifyUrl && (
                  <div className="pt-2">
                    <a
                      href={node.certData.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.playClick()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* 5. CAREER PROGRESSION */}
            {node.type === "experience" && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Software engineering journey across ventures and digital studios:
                </p>
                <div className="space-y-3">
                  {experienceData.map((exp) => (
                    <div
                      key={exp.id}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{exp.role}</span>
                        <span className="text-[10px] text-[var(--color-accent-primary)] font-bold">
                          {exp.period}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 block">{exp.company}</span>
                      <p className="text-xs text-slate-300 font-sans leading-relaxed pt-1">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. PHOTO BOOTH PORTAL */}
            {node.type === "photobooth_portal" && (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-pink-500/20 border border-pink-500/40 text-pink-400 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.3)]">
                  <Camera size={32} />
                </div>
                <h4 className="text-lg font-bold text-white">
                  Cyber Photo Booth
                </h4>
                <p className="text-xs text-slate-300 font-sans max-w-sm mx-auto leading-relaxed">
                  Capture a live visitor photo with your front camera, customize with watermarks, download, or submit directly to Aryan's private collection.
                </p>
                <button
                  onClick={() => {
                    sound.playClick();
                    onClose();
                    onOpenPhotoBooth?.();
                  }}
                  className="px-6 py-3 rounded-xl bg-pink-500 hover:bg-pink-400 text-white font-bold text-xs flex items-center justify-center gap-2 mx-auto shadow-[0_0_20px_rgba(236,72,153,0.5)] cursor-pointer"
                >
                  <Camera size={16} />
                  <span>Launch Photo Booth</span>
                </button>
              </div>
            )}

            {/* 7. MUSIC LAB PORTAL */}
            {node.type === "music_portal" && (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-pink-500/20 border border-pink-500/40 text-pink-400 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(236,72,153,0.3)]">
                  <Headphones size={32} />
                </div>
                <h4 className="text-lg font-bold text-white">
                  Sound Lab / Music Player
                </h4>
                <p className="text-xs text-slate-300 font-sans max-w-sm mx-auto leading-relaxed">
                  Free music stream powered by official YouTube embeds. Listen to Lo-Fi, Synthwave, Cyberpunk ambient tracks, or search for any song.
                </p>
                <button
                  onClick={() => {
                    sound.playClick();
                    onClose();
                    onOpenMusicLab?.();
                  }}
                  className="px-6 py-3 rounded-xl bg-[var(--color-accent-primary)] hover:bg-white text-black font-bold text-xs flex items-center justify-center gap-2 mx-auto shadow-[0_0_20px_var(--color-accent-glow)] cursor-pointer"
                >
                  <Headphones size={16} />
                  <span>Open Sound Lab</span>
                </button>
              </div>
            )}

            {/* 8. ARCADE GAMES PORTAL */}
            {node.type === "game_portal" && (
              <div className="space-y-4">
                <p className="text-xs text-slate-300 font-sans">
                  Select a mini-game to launch directly in your browser:
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {["snake", "2048", "sudoku", "minesweeper", "tictactoe"].map((gameId) => (
                    <button
                      key={gameId}
                      onClick={() => {
                        sound.playClick();
                        onClose();
                        onOpenGame?.(gameId);
                      }}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-pink-500 text-left cursor-pointer transition-all"
                    >
                      <span className="text-xs font-bold text-white uppercase block">
                        {gameId === "snake" ? "Cyber Snake" : gameId === "2048" ? "Matrix 2048" : gameId.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-pink-400">Play Now →</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 9. CONTACT DISPATCH */}
            {node.type === "contact_dispatch" && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                  <span className="text-xs text-emerald-400 font-bold block">
                    DIRECT INBOX DISPATCH
                  </span>
                  <p className="text-xs text-slate-300 font-sans">
                    Have an opportunity, high-impact project, or architectural inquiry?
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-white font-bold">{personalInfo.email}</span>
                    <button
                      onClick={handleCopyEmail}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-bold border border-emerald-500/40 flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedEmail ? <Check size={12} /> : <Copy size={12} />}
                      <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 10. SOCIALS NEXUS */}
            {node.type === "contact_socials" && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Connect across all 6 verified developer channels:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {socialProfiles.map((p) => (
                    <a
                      key={p.id}
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => sound.playClick()}
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-400/50 flex items-center justify-between group transition-all"
                    >
                      <div>
                        <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors block">
                          {p.name}
                        </span>
                        <span className="text-[10px] text-slate-500">{p.handle}</span>
                      </div>
                      <ExternalLink size={13} className="text-slate-500 group-hover:text-white" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* 11. EASTER EGGS / SECRETS */}
            {node.type === "secret" && (
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-300 mx-auto flex items-center justify-center shadow-[0_0_25px_rgba(245,158,11,0.4)] animate-bounce">
                  <Sparkles size={32} />
                </div>
                <h4 className="text-lg font-bold text-white">
                  SECRET DISCOVERED!
                </h4>
                <p className="text-xs text-slate-200 font-sans max-w-md mx-auto leading-relaxed bg-white/5 p-4 rounded-xl border border-white/10">
                  {node.summary}
                </p>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                  🏆 Added to your World Discoveries Log
                </span>
              </div>
            )}

            {/* 12. DIALOGUE / BIO / MANIFESTO */}
            {(node.type === "dialogue" || node.type === "info") && (
              <div className="space-y-4 font-sans">
                <p className="text-sm text-slate-200 leading-relaxed">
                  {node.summary}
                </p>
                {node.content?.elevatorPitch && (
                  <div className="p-3.5 rounded-xl bg-[var(--color-accent-primary)]/10 border border-[var(--color-border-accent)] text-xs text-slate-300 font-mono-code">
                    {node.content.elevatorPitch}
                  </div>
                )}
                {node.content?.paragraphs && (
                  <div className="space-y-2">
                    {node.content.paragraphs.map((p, idx) => (
                      <p key={idx} className="text-xs text-slate-300 leading-relaxed font-sans">
                        {p}
                      </p>
                    ))}
                  </div>
                )}
                {node.content?.status && (
                  <div className="grid grid-cols-2 gap-2 font-mono-code pt-2">
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-500 block">STATUS</span>
                      <span className="text-xs text-emerald-400 font-bold">{node.content.status}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                      <span className="text-[10px] text-slate-500 block">AVAILABILITY</span>
                      <span className="text-xs text-white font-bold">{node.content.availability}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
