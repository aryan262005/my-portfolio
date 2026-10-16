import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../../data/portfolioData";

export default function Hero3DArtifact() {
  const cardRef = useRef(null);

  const [avatarSrc] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("portfolio_custom_avatar") ||
        personalInfo.avatarUrl ||
        "/avatar.png"
      );
    }
    return personalInfo.avatarUrl || "/avatar.png";
  });

  const [rotationDeg] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("portfolio_avatar_rotation");
      return saved ? parseInt(saved, 10) : 0;
    }
    return 0;
  });

  // 3D Parallax Tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 16;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* 3D Interactive Portrait Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative will-change-transform"
        style={{ perspective: 1200 }}
      >
        {/* Floating Pulsing Aura Halo Backdrop */}
        <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--color-accent-primary)] via-transparent to-[var(--color-accent-secondary)] rounded-[2.5rem] opacity-35 blur-2xl animate-aura-pulse pointer-events-none" />

        {/* 3D Card Surface */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1200px) rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`,
            transformStyle: "preserve-3d",
            transition: "transform 0.15s ease-out",
          }}
          className="relative w-64 h-80 sm:w-76 sm:h-96 rounded-3xl p-2 bg-[#12121e]/90 border-2 border-[var(--color-accent-primary)]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_var(--color-accent-glow)] group overflow-hidden cursor-pointer"
        >
          {/* Corner Anime HUD Targeting Accents */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[var(--color-accent-primary)] z-20 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[var(--color-accent-primary)] z-20 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[var(--color-accent-primary)] z-20 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[var(--color-accent-primary)] z-20 pointer-events-none" />

          {/* Top Status Tag */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono-code text-white pointer-events-none shadow-lg">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)] animate-ping" />
            <span className="font-bold text-[var(--color-accent-primary)]">
              {personalInfo.characterClass || "CREATIVE BUILDER"}
            </span>
          </div>

          {/* User's Photo with Smooth Float & Transition */}
          <div className="w-full h-full rounded-2xl overflow-hidden relative bg-[#090910]">
            <img
              src={avatarSrc}
              alt={personalInfo.name || "Portfolio Portrait"}
              style={{
                transform: `rotate(${rotationDeg}deg)`,
                transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 will-change-transform"
            />

            {/* Subtle Aesthetic Anime Scanline & Glow Overlay */}
            <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Specular 3D Reflection Glare */}
            <div
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                opacity: glare.opacity,
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.08) 45%, transparent 80%)`,
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}