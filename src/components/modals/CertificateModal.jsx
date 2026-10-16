import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Award,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Sparkles,
  BookmarkCheck,
} from "lucide-react";
import { sound } from "../../utils/audio";

export default function CertificateModal({ cert, isOpen, onClose }) {
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

  if (!isOpen || !cert) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Certificate Inspection Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-2xl bg-[#0f0f18] border-2 border-[var(--color-accent-primary)]/60 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_30px_var(--color-accent-glow)] overflow-hidden z-10 p-6 sm:p-10 my-auto"
        >
          {/* Top Holographic Sheen Layer */}
          <div className="absolute inset-0 holo-foil opacity-20 pointer-events-none" />

          {/* Top HUD Row */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6 font-mono-code text-xs relative z-10">
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-[var(--color-accent-primary)] animate-spin" />
              <span className="text-[var(--color-accent-primary)] font-bold">
                COLLECTIBLE TROPHY // {cert.rarity} RARITY
              </span>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
            >
              <X size={18} />
            </button>
          </div>

          {/* Certificate Body Container */}
          <div className="relative z-10 space-y-6 text-center">
            {/* Seal / Trophy Insignia */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[var(--color-accent-primary)]/10 border-2 border-[var(--color-accent-primary)] shadow-[0_0_25px_var(--color-accent-glow)] text-[var(--color-accent-primary)] mx-auto">
              <Award size={40} />
            </div>

            {/* Title & Issuer */}
            <div>
              <span className="text-xs font-mono-code text-slate-400 uppercase tracking-widest block mb-1">
                Official Credential Verification
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {cert.title}
              </h3>
              <p className="text-sm font-mono-code text-[var(--color-accent-primary)] font-semibold">
                Issued by {cert.issuer}
              </p>
            </div>

            {/* Summary */}
            <p className="text-xs sm:text-sm font-mono-code text-slate-300 leading-relaxed max-w-lg mx-auto bg-white/[0.03] p-4 rounded-xl border border-white/10">
              {cert.summary}
            </p>

            {/* Verified Skills */}
            <div>
              <span className="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider block mb-2 font-bold">
                Verified Core Competencies:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {cert.skills.map((s) => (
                  <span
                    key={s}
                    className="text-xs font-mono-code px-3 py-1 rounded-lg bg-white/5 text-slate-200 border border-white/10 flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={12} className="text-emerald-400" />
                    <span>{s}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Metadata Footer */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-xs font-mono-code text-slate-400 text-left">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">Credential ID</span>
                <span className="text-slate-200 font-bold break-all">{cert.credentialId}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-500 uppercase block">Issue Year</span>
                <span className="text-slate-200 font-bold">{cert.date}</span>
              </div>
            </div>

            {/* Action Link */}
            <div className="pt-2">
              <a
                href={cert.verifyUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-accent-primary)] hover:bg-white text-black font-mono-code font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_var(--color-accent-glow)] transition-all cursor-pointer"
              >
                <ShieldCheck size={14} />
                <span>Verify Official Record</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}