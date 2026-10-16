import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExploreWorldCanvas from "./ExploreWorldCanvas";
import WorldHUD from "./WorldHUD";
import WorldInteractionDialog from "./WorldInteractionDialog";
import { sound } from "../../utils/audio";

const TOTAL_DISCOVERIES = 6;

export default function ExploreAryanModal({
  isOpen,
  onClose,
  onOpenPhotoBooth,
  onOpenMusicLab,
  onOpenGame,
}) {
  const [currentZone, setCurrentZone] = useState(null);
  const [nearbyNode, setNearbyNode] = useState(null);
  const [activeDialogNode, setActiveDialogNode] = useState(null);
  const [discoveries, setDiscoveries] = useState(new Set());
  const [mobileInput, setMobileInput] = useState({ dx: 0, dy: 0, isMoving: false });
  const [actionSignal, setActionSignal] = useState(0);
  const [teleportTarget, setTeleportTarget] = useState(null);
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(true);

  // Auto-dismiss welcome banner after 4 seconds
  useEffect(() => {
    if (isOpen) {
      setShowWelcomeBanner(true);
      const timer = setTimeout(() => setShowWelcomeBanner(false), 4500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle interacting with a node
  const handleInteract = (node) => {
    if (!node) return;
    setActiveDialogNode(node);

    // If it's a secret node or first-time key station, record discovery
    if (node.discoveryId || node.type === "secret") {
      const key = node.discoveryId || node.id;
      if (!discoveries.has(key)) {
        sound.playFanfare();
        setDiscoveries((prev) => new Set([...prev, key]));
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex flex-col overflow-hidden select-none"
      >
        {/* Top & Overlay HUD */}
        <WorldHUD
          currentZone={currentZone}
          nearbyNode={nearbyNode}
          discoveriesCount={discoveries.size}
          totalDiscoveries={TOTAL_DISCOVERIES}
          onInteract={handleInteract}
          onTeleport={(target) => setTeleportTarget(target)}
          onClose={onClose}
          onSetMobileInput={setMobileInput}
          onAction={() => setActionSignal((s) => s + 1)}
        />

        {/* 2D Top-Down Canvas World Engine */}
        <div className="w-full h-full relative">
          <ExploreWorldCanvas
            onInteract={handleInteract}
            onNearbyNodeChange={setNearbyNode}
            onZoneChange={setCurrentZone}
            mobileInput={mobileInput}
            triggerActionSignal={actionSignal}
            teleportTarget={teleportTarget}
          />
        </div>

        {/* Brief Initial Welcome Banner */}
        <AnimatePresence>
          {showWelcomeBanner && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-6 py-3 rounded-2xl bg-black/85 backdrop-blur-xl border border-[var(--color-accent-primary)]/50 shadow-[0_0_30px_var(--color-accent-glow)] text-center font-mono-code"
            >
              <span className="text-[11px] text-[var(--color-accent-primary)] font-bold block uppercase tracking-widest">
                EXPLORE ARYAN // 2D RPG WORLD
              </span>
              <span className="text-xs text-slate-300">
                Move with <span className="text-white font-bold">WASD / Arrow Keys</span> • Press <span className="text-[var(--color-accent-primary)] font-bold">[E]</span> to Interact
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Station Interaction Modal Dialog */}
        {activeDialogNode && (
          <WorldInteractionDialog
            node={activeDialogNode}
            onClose={() => setActiveDialogNode(null)}
            onOpenPhotoBooth={onOpenPhotoBooth}
            onOpenMusicLab={onOpenMusicLab}
            onOpenGame={onOpenGame}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
