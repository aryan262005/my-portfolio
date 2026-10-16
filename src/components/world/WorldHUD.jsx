import React, { useState } from "react";
import {
  Compass,
  MapPin,
  Trophy,
  Volume2,
  VolumeX,
  X,
  Sparkles,
  Zap,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Menu,
  ChevronRight,
} from "lucide-react";
import { ZONES, WORLD_NODES } from "./worldData";
import { sound } from "../../utils/audio";

export default function WorldHUD({
  currentZone,
  nearbyNode,
  discoveriesCount,
  totalDiscoveries,
  onInteract,
  onTeleport,
  onClose,
  onSetMobileInput,
  onAction,
}) {
  const [minimapOpen, setMinimapOpen] = useState(false);
  const [directoryOpen, setDirectoryOpen] = useState(false);
  const [muted, setMuted] = useState(sound.isMuted());

  const handleToggleSound = () => {
    const isNowMuted = sound.toggleMute();
    setMuted(isNowMuted);
  };

  const handleTeleportTo = (zone) => {
    sound.playClick();
    onTeleport({ x: zone.x, y: zone.y + 40 });
    setMinimapOpen(false);
    setDirectoryOpen(false);
  };

  // Virtual D-Pad touch handlers
  const handleTouchDirection = (dx, dy) => {
    if (onSetMobileInput) {
      onSetMobileInput({ dx, dy, isMoving: dx !== 0 || dy !== 0 });
    }
  };

  return (
    <>
      {/* ================= TOP HUD HEADER ================= */}
      <header className="absolute top-0 left-0 right-0 z-30 p-3 sm:p-5 flex items-center justify-between pointer-events-none">
        {/* Left: Zone Indicator Pill */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <div className="px-3.5 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-xs font-mono-code text-white shadow-lg flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]"
              style={{
                backgroundColor: currentZone?.color || "var(--color-accent-primary)",
                color: currentZone?.color || "var(--color-accent-primary)",
              }}
            />
            <span className="font-bold">
              {currentZone ? currentZone.name.toUpperCase() : "EXPLORING CAMPUS"}
            </span>
            <span className="text-white/20 hidden sm:inline">|</span>
            <span className="text-slate-400 text-[11px] hidden sm:inline">
              {currentZone ? currentZone.tagline : "Explore Aryan's 2D Universe"}
            </span>
          </div>
        </div>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Discoveries Badge */}
          <div
            title="Secrets & Easter Eggs Discovered"
            className="px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-amber-500/30 text-xs font-mono-code text-amber-300 shadow-lg flex items-center gap-1.5"
          >
            <Trophy size={13} className="text-amber-400" />
            <span className="font-bold">
              {discoveriesCount} / {totalDiscoveries}
            </span>
            <span className="text-[10px] text-amber-400/70 hidden sm:inline">DISCOVERIES</span>
          </div>

          {/* Minimap / Fast-Travel Radar Button */}
          <button
            onClick={() => {
              sound.playClick();
              setMinimapOpen(!minimapOpen);
            }}
            title="Tactical Radar Minimap & Fast-Travel"
            className="px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-[var(--color-border-accent)] text-[var(--color-accent-primary)] hover:text-white transition-all text-xs font-mono-code flex items-center gap-1.5 cursor-pointer shadow-lg"
          >
            <Compass size={14} />
            <span className="hidden sm:inline font-bold">RADAR</span>
          </button>

          {/* Accessible Directory List Button */}
          <button
            onClick={() => {
              sound.playClick();
              setDirectoryOpen(!directoryOpen);
            }}
            title="Accessible Campus Directory (Card View)"
            className="px-3 py-1.5 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/15 text-slate-300 hover:text-white transition-all text-xs font-mono-code flex items-center gap-1.5 cursor-pointer shadow-lg"
          >
            <Menu size={14} />
            <span className="hidden md:inline font-bold">DIRECTORY</span>
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={handleToggleSound}
            title={muted ? "Unmute Audio" : "Mute Audio"}
            className="p-2 rounded-xl bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/15 text-slate-300 hover:text-white transition-all text-xs cursor-pointer shadow-lg"
          >
            {muted ? <VolumeX size={15} /> : <Volume2 size={15} className="text-[var(--color-accent-primary)]" />}
          </button>

          {/* Exit / Return to Portfolio */}
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            title="Exit 2D World (Return to Portfolio)"
            className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white border border-rose-500/40 transition-all text-xs font-mono-code flex items-center gap-1.5 cursor-pointer shadow-lg font-bold"
          >
            <X size={14} />
            <span>EXIT</span>
          </button>
        </div>
      </header>

      {/* ================= BOTTOM INTERACTION PROMPT ================= */}
      {nearbyNode && (
        <div className="absolute bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-auto">
          <button
            onClick={() => {
              sound.playClick();
              onInteract(nearbyNode);
            }}
            className="px-5 py-3 rounded-2xl bg-black/85 backdrop-blur-xl border-2 border-[var(--color-accent-primary)] shadow-[0_0_30px_var(--color-accent-glow)] flex items-center gap-3 text-white font-mono-code transition-all hover:scale-105 active:scale-95 cursor-pointer animate-bounce"
          >
            <div className="w-8 h-8 rounded-xl bg-[var(--color-accent-primary)]/20 border border-[var(--color-accent-primary)]/50 flex items-center justify-center text-[var(--color-accent-primary)] font-bold text-xs">
              E
            </div>
            <div className="text-left">
              <span className="text-[10px] text-[var(--color-accent-primary)] font-bold block uppercase tracking-wider">
                INTERACT WITH TERMINAL
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-white">
                {nearbyNode.name}
              </span>
            </div>
          </button>
        </div>
      )}

      {/* ================= MOBILE ON-SCREEN VIRTUAL CONTROLS ================= */}
      <div className="md:hidden absolute inset-x-0 bottom-3 z-20 px-4 flex items-end justify-between pointer-events-none">
        {/* Virtual Directional D-Pad (Left Bottom) */}
        <div className="grid grid-cols-3 gap-1.5 pointer-events-auto bg-black/60 p-2 rounded-2xl backdrop-blur-md border border-white/10">
          <div />
          <button
            onPointerDown={() => handleTouchDirection(0, -1)}
            onPointerUp={() => handleTouchDirection(0, 0)}
            className="w-12 h-12 rounded-xl bg-white/10 active:bg-[var(--color-accent-primary)] text-white active:text-black flex items-center justify-center font-bold"
          >
            <ArrowUp size={20} />
          </button>
          <div />
          <button
            onPointerDown={() => handleTouchDirection(-1, 0)}
            onPointerUp={() => handleTouchDirection(0, 0)}
            className="w-12 h-12 rounded-xl bg-white/10 active:bg-[var(--color-accent-primary)] text-white active:text-black flex items-center justify-center font-bold"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="w-12 h-12 rounded-xl bg-black/30 flex items-center justify-center text-slate-500 font-mono-code text-[10px]">
            MOVE
          </div>
          <button
            onPointerDown={() => handleTouchDirection(1, 0)}
            onPointerUp={() => handleTouchDirection(0, 0)}
            className="w-12 h-12 rounded-xl bg-white/10 active:bg-[var(--color-accent-primary)] text-white active:text-black flex items-center justify-center font-bold"
          >
            <ArrowRight size={20} />
          </button>
          <div />
          <button
            onPointerDown={() => handleTouchDirection(0, 1)}
            onPointerUp={() => handleTouchDirection(0, 0)}
            className="w-12 h-12 rounded-xl bg-white/10 active:bg-[var(--color-accent-primary)] text-white active:text-black flex items-center justify-center font-bold"
          >
            <ArrowDown size={20} />
          </button>
          <div />
        </div>

        {/* Action Button (Right Bottom) */}
        {nearbyNode && (
          <button
            onClick={() => {
              sound.playClick();
              onInteract(nearbyNode);
              onAction?.();
            }}
            className="pointer-events-auto px-5 py-4 rounded-2xl bg-[var(--color-accent-primary)] text-black font-mono-code font-extrabold text-xs flex items-center gap-2 shadow-[0_0_20px_var(--color-accent-glow)] active:scale-95"
          >
            <Zap size={16} />
            <span>INTERACT</span>
          </button>
        )}
      </div>

      {/* ================= TACTICAL RADAR MINIMAP MODAL ================= */}
      {minimapOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[var(--color-bg-card)] border border-[var(--color-border-accent)] p-6 shadow-2xl relative font-mono-code">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <span className="text-white font-bold flex items-center gap-2 text-sm">
                <Compass size={16} className="text-[var(--color-accent-primary)]" />
                TACTICAL RADAR // FAST-TRAVEL
              </span>
              <button
                onClick={() => setMinimapOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              Select any sector below to immediately teleport your character directly to that station.
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {ZONES.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => handleTeleportTo(zone)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[var(--color-border-accent)] transition-all text-left flex flex-col justify-between group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className="text-xs font-bold group-hover:text-white transition-colors"
                      style={{ color: zone.color }}
                    >
                      {zone.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono-code">
                      WARP
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 line-clamp-1">
                    {zone.tagline}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex justify-between items-center text-[10px] text-slate-500">
              <span>Map size: 1600 x 1200 px</span>
              <span className="text-[var(--color-accent-primary)] font-bold">1-Click Fast Travel</span>
            </div>
          </div>
        </div>
      )}

      {/* ================= ACCESSIBLE HOLONET DIRECTORY MODAL ================= */}
      {directoryOpen && (
        <div className="fixed inset-0 z-40 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-3xl max-h-[85vh] rounded-3xl bg-[var(--color-bg-card)] border border-[var(--color-border-accent)] p-5 sm:p-7 shadow-2xl flex flex-col font-mono-code my-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
              <span className="text-white font-bold flex items-center gap-2 text-base">
                <Menu size={18} className="text-[var(--color-accent-primary)]" />
                CAMPUS DIRECTORY // ACCESSIBLE STATIONS
              </span>
              <button
                onClick={() => setDirectoryOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-4">
              For visitors or recruiters who prefer direct point-and-click inspection without navigating the 2D world:
            </p>

            <div className="flex-grow overflow-y-auto space-y-4 pr-1">
              {ZONES.map((zone) => {
                const zoneNodes = WORLD_NODES.filter((n) => n.zoneId === zone.id);
                return (
                  <div
                    key={zone.id}
                    className="p-4 rounded-2xl bg-white/[0.02] border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: zone.color }}
                        />
                        <h4 className="text-sm font-bold text-white">
                          {zone.name}
                        </h4>
                      </div>
                      <button
                        onClick={() => handleTeleportTo(zone)}
                        className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[var(--color-accent-primary)] border border-white/10 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Teleport</span>
                        <ChevronRight size={12} />
                      </button>
                    </div>

                    <p className="text-xs text-slate-400 mb-3">{zone.desc}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {zoneNodes.map((node) => (
                        <button
                          key={node.id}
                          onClick={() => {
                            sound.playClick();
                            setDirectoryOpen(false);
                            onInteract(node);
                          }}
                          className="p-2.5 rounded-xl bg-black/40 hover:bg-white/10 border border-white/5 hover:border-[var(--color-border-accent)] transition-all text-left flex items-center justify-between group cursor-pointer"
                        >
                          <div>
                            <span className="text-xs font-bold text-slate-200 group-hover:text-[var(--color-accent-primary)] block">
                              {node.name}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {node.badge}
                            </span>
                          </div>
                          <ChevronRight
                            size={14}
                            className="text-slate-500 group-hover:text-white transition-colors"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
