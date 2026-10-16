import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Zap,
  Menu,
  X,
  Code2,
  Layers,
  Award,
  Compass,
  Mail,
  FolderGit2,
  Gamepad2,
  Music,
} from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import { sound } from "../../utils/audio";
import { personalInfo } from "../../data/portfolioData";
import { useMusic } from "../music/useMusic";

export default function Navbar({ onOpenRecruiter, onOpenExplore }) {
  const [scrolled, setScrolled] = useState(false);
  const [muted, setMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openMusicLab, isPlaying } = useMusic();

  useEffect(() => {
    setMuted(sound.isMuted());

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const isNowMuted = sound.toggleMute();
    setMuted(isNowMuted);
  };

  const navItems = [
    { label: "Projects", href: "#projects", icon: FolderGit2 },
    { label: "Skills", href: "#skills", icon: Layers },
    { label: "Playground", href: "#playground", icon: Gamepad2 },
    { label: "Trophy Vault", href: "#certificates", icon: Award },
    { label: "Journey", href: "#experience", icon: Compass },
    { label: "Profiles", href: "#profiles", icon: Code2 },
    { label: "Contact", href: "#contact", icon: Mail },
  ];

  const handleNavClick = (href) => {
    sound.playClick();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#0b0b10]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand / Aura Badge */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
              sound.playChirp();
            }}
            className="flex items-center gap-2.5 group"
          >
            {/* Holographic Hex/Square Icon */}
            <div className="relative w-8 h-8 rounded-lg bg-[#141422] border border-[var(--color-accent-primary)]/60 flex items-center justify-center shadow-[0_0_12px_var(--color-accent-glow)] group-hover:scale-105 transition-transform">
              <Sparkles
                size={16}
                className="text-[var(--color-accent-primary)] animate-spin"
                style={{ animationDuration: "8s" }}
              />
              <span className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full bg-[var(--color-accent-primary)] animate-ping" />
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-sm sm:text-base text-white tracking-tight flex items-center gap-1.5 font-mono-code">
                {personalInfo.name}
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[var(--color-accent-primary)]/20 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/40 font-bold hidden sm:inline">
                  {personalInfo.auraLevel}
                </span>
              </span>
              <span className="text-[10px] font-mono-code text-slate-400 -mt-0.5 hidden sm:block">
                {personalInfo.characterClass}
              </span>
            </div>
          </a>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-3 py-1.5 backdrop-blur-md">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="px-3.5 py-1 rounded-full text-xs font-mono-code text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Right Action HUD */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Music Lab Launcher */}
            <button
              onClick={openMusicLab}
              title="Open Music Lab (Free Streaming)"
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[var(--color-border-accent)] text-[var(--color-accent-primary)] hover:text-white hover:shadow-[0_0_12px_var(--color-accent-glow)] transition-all text-xs cursor-pointer flex items-center gap-1.5"
            >
              <Music size={15} className={isPlaying ? "text-[var(--color-accent-primary)] animate-pulse" : "text-slate-300"} />
              <span className="hidden xl:inline font-mono-code text-[11px] font-bold">MUSIC LAB</span>
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={muted ? "Unmute Sound FX" : "Mute Sound FX"}
              className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-[var(--color-accent-primary)]/50 text-slate-300 hover:text-white transition-all text-xs"
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[var(--color-accent-primary)]" />}
            </button>

            {/* Theme Selector */}
            <ThemeSwitcher />

            {/* Explore Aryan 2D RPG Launcher */}
            <button
              onClick={() => {
                sound.playFanfare();
                onOpenExplore?.();
              }}
              title="Explore Aryan's 2D RPG World (Press G)"
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-gradient-to-r from-[var(--color-accent-primary)]/20 to-[var(--color-accent-secondary)]/20 border border-[var(--color-border-accent)] hover:border-[var(--color-accent-primary)] text-white hover:shadow-[0_0_15px_var(--color-accent-glow)] transition-all text-xs cursor-pointer flex items-center gap-1.5 group"
            >
              <Gamepad2 size={15} className="text-[var(--color-accent-primary)] group-hover:rotate-12 transition-transform" />
              <span className="font-mono-code text-[11px] font-extrabold tracking-wide hidden sm:inline">
                EXPLORE ARYAN
              </span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-[var(--color-accent-primary)]/30 text-[var(--color-accent-primary)] border border-[var(--color-accent-primary)]/40 font-bold hidden md:inline">
                2D RPG
              </span>
            </button>

            {/* Recruiter Quick Scan Button */}
            <button
              onClick={() => {
                sound.playFanfare();
                onOpenRecruiter();
              }}
              title="Open 15-Second Recruiter Overview"
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-accent-primary)] text-black font-mono-code text-xs font-bold hover:bg-white transition-all shadow-[0_0_18px_var(--color-accent-glow)] cursor-pointer"
            >
              <Zap size={13} fill="currentColor" />
              <span className="hidden sm:inline">RECRUITER 15s</span>
              <span className="sm:hidden">15s</span>
              <span className="hidden md:inline text-[9px] bg-black/20 text-black px-1 rounded font-bold">
                [R]
              </span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => {
                sound.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0e0e17] border-b border-white/10 px-4 py-4 space-y-2 animate-in slide-in-from-top duration-200">
          <button
            onClick={() => {
              sound.playFanfare();
              setMobileMenuOpen(false);
              onOpenExplore?.();
            }}
            className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono-code text-white bg-gradient-to-r from-[var(--color-accent-primary)]/20 to-transparent border border-[var(--color-border-accent)]"
          >
            <span className="flex items-center gap-2">
              <Gamepad2 size={15} className="text-[var(--color-accent-primary)]" />
              <span className="font-bold">Explore Aryan (2D RPG)</span>
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-[var(--color-accent-primary)] text-black font-bold">
              START
            </span>
          </button>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.href)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono-code text-slate-300 hover:text-white hover:bg-white/5"
              >
                <Icon size={14} className="text-[var(--color-accent-primary)]" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openMusicLab();
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-mono-code text-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10 border border-[var(--color-border-accent)]"
          >
            <Music size={14} className="text-[var(--color-accent-primary)]" />
            <span>Open Music Lab 🎵</span>
          </button>
        </div>
      )}
    </header>
  );
}

