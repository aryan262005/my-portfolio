import React from "react";
import {
  ArrowUp,
  Sparkles,
  Play,
  Heart,
  Terminal,
  Code2,
} from "lucide-react";
import { sound } from "../../utils/audio";
import { personalInfo } from "../../data/portfolioData";

export default function Footer({ onReplayIntro }) {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-white/10 bg-[#07070b] relative z-10 font-mono-code text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#12121e] border border-[var(--color-accent-primary)]/50 flex items-center justify-center text-[var(--color-accent-primary)]">
              <Sparkles size={16} />
            </div>
            <div>
              <div className="text-white font-bold text-sm">
                {personalInfo.name}
              </div>
              <div className="text-slate-500 text-[11px]">
                {personalInfo.characterClass} • {personalInfo.auraLevel}
              </div>
            </div>
          </div>

          {/* Quick Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onReplayIntro}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
            >
              <Play size={12} />
              <span>Replay Cinematic Intro</span>
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-accent-primary)]/10 hover:bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/30 transition-colors"
            >
              <ArrowUp size={13} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} {personalInfo.name}.
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span className="text-[var(--color-accent-primary)]"></span>
          </div>
        </div>
      </div>
    </footer>
  );
}