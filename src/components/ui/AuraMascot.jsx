import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, MessageSquareHeart } from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "../../utils/audio";
import { mascotQuotes } from "../../data/portfolioData";

export default function AuraMascot() {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showBubble, setShowBubble] = useState(false);
  const [isHappy, setIsHappy] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    sound.playChirp();
    setIsHappy(true);
    setShowBubble(true);
    setQuoteIndex((prev) => (prev + 1) % mascotQuotes.length);

    // Cute mini confetti burst
    confetti({
      particleCount: 24,
      spread: 45,
      origin: {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      },
      colors: ["#ff6b3d", "#00f2fe", "#10b981", "#a855f7", "#ffffff"],
    });

    setTimeout(() => setIsHappy(false), 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* Speech Bubble */}
      <AnimatePresence>
        {showBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="pointer-events-auto max-w-[260px] bg-[#141420] border border-[var(--color-accent-primary)]/40 text-slate-200 text-xs p-3 rounded-2xl rounded-br-none shadow-[0_10px_30px_rgba(0,0,0,0.6)] mb-3 relative"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowBubble(false);
              }}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#202030] text-slate-400 hover:text-white flex items-center justify-center border border-white/10"
            >
              <X size={10} />
            </button>
            <p className="font-mono-code text-[11px] leading-relaxed">
              {mascotQuotes[quoteIndex]}
            </p>
            <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono-code text-[var(--color-accent-primary)]">
              <span className="flex items-center gap-1">
                <Sparkles size={10} /> AURA SPIRIT
              </span>
              <span className="text-slate-500">TAP TO CHAT</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mascot Avatar Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        title="Tap me! (Aura Companion)"
        className="pointer-events-auto relative w-14 h-14 rounded-2xl bg-[#12121c] border-2 border-[var(--color-accent-primary)] flex items-center justify-center shadow-[0_0_20px_var(--color-accent-glow)] group cursor-pointer animate-float-slow"
      >
        {/* Cute Anime Spirit SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-10 h-10 transition-transform duration-200"
        >
          {/* Floating Halo */}
          <ellipse
            cx="50"
            cy="16"
            rx="24"
            ry="6"
            fill="none"
            stroke="var(--color-accent-primary)"
            strokeWidth="3.5"
            className="animate-pulse"
          />

          {/* Body */}
          <circle
            cx="50"
            cy="52"
            r="32"
            fill="#1d1d2b"
            stroke="var(--color-accent-primary)"
            strokeWidth="3"
          />

          {/* Blushing cheeks */}
          <ellipse cx="32" cy="58" rx="5" ry="3" fill="#ff4d88" opacity="0.8" />
          <ellipse cx="68" cy="58" rx="5" ry="3" fill="#ff4d88" opacity="0.8" />

          {/* Eyes - blink or smile if happy */}
          {isHappy ? (
            <>
              {/* Happy squint eyes ^^ */}
              <path
                d="M 32 50 Q 37 44 42 50"
                fill="none"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <path
                d="M 58 50 Q 63 44 68 50"
                fill="none"
                stroke="white"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            </>
          ) : (
            <>
              {/* Big Anime Eyes */}
              <ellipse cx="37" cy="48" rx="4.5" ry="7" fill="white" />
              <circle cx="38" cy="46" r="2" fill="var(--color-accent-primary)" />
              <ellipse cx="63" cy="48" rx="4.5" ry="7" fill="white" />
              <circle cx="64" cy="46" r="2" fill="var(--color-accent-primary)" />
            </>
          )}

          {/* Mouth */}
          {isHappy ? (
            <path
              d="M 44 60 Q 50 68 56 60"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ) : (
            <circle cx="50" cy="62" r="2.5" fill="white" />
          )}
        </svg>

        {/* Pulsing indicator tag */}
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[var(--color-accent-primary)] border-2 border-[#12121c] flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
        </span>
      </motion.button>
    </div>
  );
}