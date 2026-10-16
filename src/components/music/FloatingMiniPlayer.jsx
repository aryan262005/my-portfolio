import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Maximize2,
  X,
  Disc3,
} from "lucide-react";
import { useMusic } from "./useMusic";
import Card3D from "../ui/Card3D";

export default function FloatingMiniPlayer() {
  const {
    isMiniPlayerVisible,
    currentTrack,
    isPlaying,
    togglePlay,
    openMusicLab,
    closeMiniPlayer,
    isMinimized,
    toggleMinimize,
  } = useMusic();

  if (!isMiniPlayerVisible || !currentTrack) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="fixed bottom-5 right-4 sm:right-6 z-40 select-none will-change-transform"
      >
        {isMinimized ? (
          /* Minimized Circular Bubble */
          <button
            onClick={toggleMinimize}
            title="Expand Mini Player"
            className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-bg-surface)] border-2 border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_var(--color-accent-glow)] hover:scale-105 transition-all cursor-pointer group"
          >
            <Disc3
              size={22}
              className={`text-[var(--color-accent-primary)] ${isPlaying ? "animate-spin" : ""}`}
              style={{ animationDuration: "4s" }}
            />
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--color-accent-primary)] animate-ping" />
            )}
          </button>
        ) : (
          /* Expanded Sleek Cyber Dock with 3D Tilt */
          <Card3D maxTilt={6} glare={false}>
            <div className="flex items-center gap-3 p-2.5 sm:p-3 pr-3 rounded-2xl bg-[var(--color-bg-card)]/95 border border-[var(--color-border-accent)] shadow-[0_15px_40px_rgba(0,0,0,0.85),0_0_30px_var(--color-accent-glow)] backdrop-blur-xl max-w-[340px] sm:max-w-md">
              {/* Spinning Disc / Thumbnail */}
              <div
                onClick={openMusicLab}
                title="Click to open Music Lab"
                className="relative w-10 h-10 rounded-xl bg-[var(--color-accent-primary)]/10 border border-[var(--color-border-accent)] flex items-center justify-center shrink-0 cursor-pointer overflow-hidden group"
              >
                <Disc3
                  size={20}
                  className={`text-[var(--color-accent-primary)] transition-transform duration-300 ${
                    isPlaying ? "animate-spin" : "group-hover:rotate-45"
                  }`}
                  style={{ animationDuration: "5s" }}
                />
                <div className="absolute inset-0 bg-[var(--color-accent-primary)]/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Maximize2 size={12} className="text-white" />
                </div>
              </div>

              {/* Track Info */}
              <div
                onClick={openMusicLab}
                className="flex-grow min-w-0 cursor-pointer"
              >
                <div className="flex items-center gap-1.5 text-[9px] font-mono-code text-[var(--color-accent-primary)] font-bold uppercase tracking-wider">
                  <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? "bg-[var(--color-accent-primary)] animate-pulse" : "bg-slate-500"}`} />
                  <span>MUSIC LAB // NOW STREAMING</span>
                </div>
                <h5 className="text-xs font-bold text-white font-mono-code truncate">
                  {currentTrack.title}
                </h5>
                <p className="text-[10px] text-slate-400 font-mono-code truncate">
                  {currentTrack.artist}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1 shrink-0">
                {/* Play / Pause */}
                <button
                  onClick={togglePlay}
                  title={isPlaying ? "Pause" : "Play"}
                  className="p-2 rounded-xl bg-[var(--color-accent-primary)] hover:opacity-90 text-black transition-all cursor-pointer shadow-[0_0_12px_var(--color-accent-glow)]"
                >
                  {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>

                {/* Expand to Full Music Lab */}
                <button
                  onClick={openMusicLab}
                  title="Expand Music Lab"
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <Maximize2 size={13} />
                </button>

                {/* Close Mini Player */}
                <button
                  onClick={closeMiniPlayer}
                  title="Close Player"
                  className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition-colors cursor-pointer"
                >
                  <X size={13} />
                </button>
              </div>
            </div>
          </Card3D>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
