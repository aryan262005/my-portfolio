import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Gamepad2,
  Camera,
  Play,
  Sparkles,
  Trophy,
  Activity,
  ArrowRight,
  Headphones,
  Zap,
  Lock,
} from "lucide-react";
import GameModal from "./GameModal";
import PhotoBoothModal from "../photobooth/PhotoBoothModal";
import PhotoVaultModal from "../photobooth/PhotoVaultModal";
import { useMusic } from "../music/useMusic";
import Card3D from "../ui/Card3D";
import { sound } from "../../utils/audio";
import Section3DTransition from "../ui/Section3DTransition";

const PLAYGROUND_ITEMS = [
  {
    id: "snake",
    type: "game",
    title: "Cyber Snake",
    category: "RETRO ARCADE",
    badge: "CLASSIC",
    tagline: "Navigate the cyber grid, collect energy nodes, and test your reflexes.",
    icon: Gamepad2,
    gradient: "from-[var(--color-accent-primary)]/20 via-[var(--color-accent-secondary)]/10 to-transparent",
    accentColor: "text-[var(--color-accent-primary)]",
    borderColor: "hover:border-[var(--color-border-accent)]",
    stats: "HIGH SCORE // KEYBOARD & TOUCH",
  },
  {
    id: "2048",
    type: "game",
    title: "Matrix 2048",
    category: "PUZZLE LOGIC",
    badge: "POPULAR",
    tagline: "Merge mathematical power-of-two tiles and reach the 2048 singularity.",
    icon: Activity,
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accentColor: "text-amber-400",
    borderColor: "hover:border-amber-400/50",
    stats: "SWIPE & ARROWS // TILE MERGE",
  },
  {
    id: "sudoku",
    type: "game",
    title: "Sudoku Engine",
    category: "LOGIC SOLVER",
    badge: "ALGORITHMIC",
    tagline: "Deductive 9x9 matrix with difficulty presets and conflict detection.",
    icon: Sparkles,
    gradient: "from-purple-500/20 via-indigo-500/10 to-transparent",
    accentColor: "text-purple-400",
    borderColor: "hover:border-purple-400/50",
    stats: "EASY & MED // NUMPAD SUPPORT",
  },
  {
    id: "minesweeper",
    type: "game",
    title: "Minesweeper",
    category: "TACTICAL DEFUSER",
    badge: "TACTICAL",
    tagline: "Uncover hidden subsurfaces and flag danger zones against the clock.",
    icon: Zap,
    gradient: "from-rose-500/20 via-red-500/10 to-transparent",
    accentColor: "text-rose-400",
    borderColor: "hover:border-rose-400/50",
    stats: "FLAG MODE // RECURSIVE CLEAR",
  },
  {
    id: "tictactoe",
    type: "game",
    title: "Neural Tic-Tac-Toe",
    category: "MINIMAX DUEL",
    badge: "AI MODE",
    tagline: "Challenge adaptive heuristic AI or play with a friend locally.",
    icon: Trophy,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accentColor: "text-emerald-400",
    borderColor: "hover:border-emerald-400/50",
    stats: "VS AI // SCORE TRACKER",
  },
  {
    id: "music-lab",
    type: "music",
    title: "Music Lab",
    category: "SOUNDTRACK STREAM",
    badge: "FREE STREAMING",
    tagline: "Search any song or listen to curated coding lofi without subscriptions.",
    icon: Headphones,
    gradient: "from-[var(--color-accent-primary)]/25 via-[var(--color-accent-secondary)]/15 to-transparent",
    accentColor: "text-[var(--color-accent-primary)]",
    borderColor: "hover:border-[var(--color-border-accent)]",
    stats: "YOUTUBE IFRAME // MINI DOCK",
  },
];

export default function Playground({ onOpenExplore }) {
  const [activeGameId, setActiveGameId] = useState(null);
  const [isPhotoBoothOpen, setIsPhotoBoothOpen] = useState(false);
  const [isAdminVaultOpen, setIsAdminVaultOpen] = useState(false);

  const { openMusicLab } = useMusic();

  const handleCardClick = (item) => {
    sound.playClick();
    if (item.type === "music") {
      openMusicLab();
    } else {
      setActiveGameId(item.id);
    }
  };

  return (
    <section id="playground" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting connected to active theme */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-[var(--color-accent-primary)]/10 via-[var(--color-accent-secondary)]/5 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[350px] bg-[var(--color-accent-primary)]/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <Section3DTransition>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] text-xs font-mono-code font-bold mb-3 border border-[var(--color-border-accent)] shadow-[0_0_15px_var(--color-accent-glow)]">
                <Gamepad2 size={13} />
                <span>INTERACTIVE LAB // MINI APPS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Playground & Sound Lab
              </h2>
              <p className="mt-2 text-sm text-slate-400 max-w-xl font-sans">
                Take a quick break. Play a retro mini-game, stream coding music, or snap a photo in the interactive Photo Booth.
              </p>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-[var(--color-border-accent)] backdrop-blur-md self-start md:self-auto">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-primary)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-accent-primary)]" />
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono-code font-bold text-slate-400">
                  INTERACTIVE ARCADE
                </span>
                <span className="text-xs font-mono-code text-[var(--color-accent-primary)] font-semibold">
                  5 GAMES // PHOTO BOOTH // MUSIC LAB
                </span>
              </div>
            </div>
          </div>
        </Section3DTransition>

        {/* Feature Spotlight Banner: Explore Aryan 2D RPG World with 3D Tilt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6"
        >
          <Card3D maxTilt={6}>
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[var(--color-bg-card)]/90 via-[#0d1222]/90 to-[var(--color-bg-card)]/90 border border-[var(--color-border-accent)] shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_30px_var(--color-accent-glow)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
              <div className="flex items-start gap-4 z-10">
                <div className="p-3.5 rounded-2xl bg-[var(--color-accent-primary)]/15 border border-[var(--color-border-accent)] text-[var(--color-accent-primary)] shadow-[0_0_20px_var(--color-accent-glow)] shrink-0">
                  <Gamepad2 size={26} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono-code font-bold text-[var(--color-accent-primary)] uppercase tracking-wider">
                      INTERACTIVE 2D RPG EXPERIENCE
                    </span>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/40 font-bold">
                      NEW
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-mono-code tracking-tight">
                    Explore Aryan // Developer Universe
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-sans">
                    Step inside a 2D top-down cyberpunk campus. Control your developer avatar, walk through project labs, skill matrix stations, trophy vaults, and secret easter eggs.
                  </p>
                </div>
              </div>

              <div className="shrink-0 z-10 w-full md:w-auto">
                <button
                  onClick={() => {
                    sound.playFanfare();
                    onOpenExplore?.();
                  }}
                  className="w-full md:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[var(--color-accent-primary)] via-cyan-400 to-[var(--color-accent-secondary)] hover:opacity-95 text-black font-mono-code font-extrabold text-xs uppercase tracking-wider shadow-[0_0_25px_var(--color-accent-glow)] transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                >
                  <Sparkles size={15} />
                  <span>Enter 2D World</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </Card3D>
        </motion.div>

        {/* Feature Spotlight Banner: Cyber Photo Booth with 3D Tilt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <Card3D maxTilt={6}>
            <div className="p-6 sm:p-8 rounded-3xl bg-[var(--color-bg-card)]/80 border border-[var(--color-border-accent)] shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_30px_var(--color-accent-glow)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden backdrop-blur-xl">
              <div className="flex items-start gap-4 z-10">
                <div className="p-3.5 rounded-2xl bg-[var(--color-accent-primary)]/15 border border-[var(--color-border-accent)] text-[var(--color-accent-primary)] shadow-[0_0_20px_var(--color-accent-glow)] shrink-0">
                  <Camera size={26} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono-code font-bold text-[var(--color-accent-primary)] uppercase tracking-wider">
                      VISITOR EXPERIENCE
                    </span>
                    <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-white/10 text-white font-bold">
                      NEW
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-mono-code tracking-tight">
                    Cyber Photo Booth // Snap & Send
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-sans">
                    Take an instant webcam selfie with cyberpunk visual filters, download a polaroid, or send it directly to Aryan's private visitor wall.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 z-10 w-full md:w-auto justify-end">
                <button
                  onClick={() => {
                    sound.playClick();
                    setIsPhotoBoothOpen(true);
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-black font-mono-code font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_var(--color-accent-glow)] transition-all cursor-pointer hover:scale-102"
                >
                  <Camera size={16} />
                  <span>Launch Photo Booth</span>
                </button>

                <button
                  onClick={() => {
                    sound.playClick();
                    setIsAdminVaultOpen(true);
                  }}
                  title="Aryan's Admin Photo Vault"
                  className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--color-border-accent)] text-slate-400 hover:text-[var(--color-accent-primary)] transition-all cursor-pointer"
                >
                  <Lock size={16} />
                </button>
              </div>
            </div>
          </Card3D>
        </motion.div>

        {/* 6 Grid Cards: 5 Games + Music Lab with Cursor-Following 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PLAYGROUND_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="h-full"
              >
                <Card3D
                  maxTilt={10}
                  className="h-full"
                  onClick={() => handleCardClick(item)}
                >
                  <div
                    className={`relative rounded-2xl p-5 bg-[var(--color-bg-card)]/80 border border-white/10 ${item.borderColor} shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.6),0_0_25px_var(--color-accent-glow)] transition-all cursor-pointer group flex flex-col justify-between h-full min-h-[200px] overflow-hidden backdrop-blur-md`}
                  >
                    {/* Subtle Card Background Accent Glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                    />

                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`text-[10px] font-mono-code font-bold uppercase tracking-wider ${item.accentColor}`}>
                          {item.category}
                        </span>
                        <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                          {item.badge}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${item.accentColor} group-hover:scale-105 transition-transform`}>
                          <Icon size={20} />
                        </div>
                        <h4 className="text-lg font-bold text-white font-mono-code group-hover:text-[var(--color-accent-primary)] transition-colors">
                          {item.title}
                        </h4>
                      </div>

                      <p className="text-xs text-slate-400 font-sans leading-relaxed line-clamp-2 mt-1">
                        {item.tagline}
                      </p>
                    </div>

                    <div className="relative z-10 pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-code">
                      <span className="text-slate-500">{item.stats}</span>
                      <span className="flex items-center gap-1 text-[var(--color-accent-primary)] group-hover:translate-x-1 transition-transform">
                        <span>Launch</span>
                        <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Reusable Cyber Game Modal Container */}
      <GameModal
        gameId={activeGameId}
        onClose={() => setActiveGameId(null)}
      />

      {/* Cyber Photo Booth Modal */}
      <PhotoBoothModal
        isOpen={isPhotoBoothOpen}
        onClose={() => setIsPhotoBoothOpen(false)}
        onOpenAdminVault={() => {
          setIsPhotoBoothOpen(false);
          setIsAdminVaultOpen(true);
        }}
      />

      {/* Admin Photo Vault Modal */}
      <PhotoVaultModal
        isOpen={isAdminVaultOpen}
        onClose={() => setIsAdminVaultOpen(false)}
      />
    </section>
  );
}
