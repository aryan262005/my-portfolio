import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Zap, Radio } from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "../../utils/audio";

export default function CinematicIntro({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [isWarping, setIsWarping] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [displayTitle, setDisplayTitle] = useState("");
  const [isHoveringEnter, setIsHoveringEnter] = useState(false);
  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  // Check session storage
  useEffect(() => {
    const seen = sessionStorage.getItem("intro_seen");
    if (seen === "true") {
      setVisible(false);
      onComplete?.();
    }
  }, [onComplete]);

  // Cyber Matrix Text Scramble / Decrypt Animation
  useEffect(() => {
    const targetName = "ARYAN MAHANTY";
    const targetTitle = "DECODER OF DATA & BUILDER OF SYSTEMS";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayName(
        targetName
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return targetName[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      setDisplayTitle(
        targetTitle
          .split("")
          .map((char, index) => {
            if (char === " " || char === "&") return char;
            if (index < iteration) return targetTitle[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= targetName.length && iteration >= targetTitle.length) {
        setDisplayName(targetName);
        setDisplayTitle(targetTitle);
        clearInterval(interval);
      }
      iteration += 1;
    }, 30);

    return () => clearInterval(interval);
  }, []);

  // Mouse Parallax Steering for 3D Card Tilt
  useEffect(() => {
    const handleMouseMove = (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const tiltX = ((e.clientY - centerY) / centerY) * -7;
      const tiltY = ((e.clientX - centerX) / centerX) * 7;
      setCardTilt({ x: tiltX, y: tiltY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 3D Hyperspace Warp Speed Canvas Engine + Cyber Horizon Grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };
    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Starfield particles in 3D
    const numStars = 650;
    const stars = [];
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 2000,
        z: Math.random() * 1500 + 1,
        prevZ: 1500,
      });
    }

    // Ripple shockwaves
    const ripples = [];
    const addRipple = (x, y) => {
      ripples.push({ x, y, r: 10, maxR: 350, alpha: 0.8 });
    };

    const handleCanvasClick = (e) => {
      addRipple(e.clientX, e.clientY);
      sound.playClick();
    };
    window.addEventListener("click", handleCanvasClick);

    let baseSpeed = 8;
    let gridOffset = 0;

    const render = () => {
      ctx.fillStyle = "rgba(7, 7, 14, 0.35)";
      ctx.fillRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const centerX = mouse.x;
      const centerY = mouse.y;

      const speed = isWarping ? 75 : baseSpeed;

      const computed = getComputedStyle(document.documentElement);
      const accentColor = computed.getPropertyValue("--color-accent-primary").trim() || "#ff6b3d";

      // 1. Draw 3D Perspective Cyber Horizon Grid at the bottom
      const horizonY = height * 0.58;
      gridOffset = (gridOffset + speed * 0.4) % 40;

      ctx.save();
      ctx.strokeStyle = accentColor;
      ctx.globalAlpha = 0.18;
      ctx.lineWidth = 1;

      // Horizontal receding perspective lines
      for (let y = horizonY; y < height; y += 18) {
        const factor = Math.pow((y - horizonY) / (height - horizonY), 2);
        const dynamicY = horizonY + factor * (height - horizonY) + (gridOffset * factor);
        if (dynamicY < height) {
          ctx.beginPath();
          ctx.moveTo(0, dynamicY);
          ctx.lineTo(width, dynamicY);
          ctx.stroke();
        }
      }

      // Vanishing point perspective lines
      for (let x = -width; x < width * 2; x += 60) {
        ctx.beginPath();
        ctx.moveTo(width / 2, horizonY);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Glowing horizon beam
      const horizonGrad = ctx.createLinearGradient(0, horizonY - 40, 0, horizonY + 40);
      horizonGrad.addColorStop(0, "transparent");
      horizonGrad.addColorStop(0.5, accentColor);
      horizonGrad.addColorStop(1, "transparent");
      ctx.fillStyle = horizonGrad;
      ctx.globalAlpha = 0.25;
      ctx.fillRect(0, horizonY - 10, width, 20);
      ctx.restore();

      // 2. Draw 3D streaking stars
      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.prevZ = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * 2000;
          star.y = (Math.random() - 0.5) * 2000;
          star.z = 1500;
          star.prevZ = 1500;
        }

        const k = 250 / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        const prevK = 250 / star.prevZ;
        const prevPx = star.x * prevK + centerX;
        const prevPy = star.y * prevK + centerY;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alpha = Math.min((1 - star.z / 1500) * 1.5, 1);
          const size = Math.max((1 - star.z / 1500) * (isWarping ? 4.5 : 2.2), 0.8);

          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = i % 4 === 0 ? accentColor : "#ffffff";
          ctx.lineWidth = size;
          ctx.globalAlpha = alpha;
          ctx.stroke();
        }
      }

      // 3. Draw interactive shockwave ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.r += 12;
        r.alpha -= 0.025;

        if (r.alpha <= 0) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = accentColor;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = r.alpha;
        ctx.shadowBlur = 15;
        ctx.shadowColor = accentColor;
        ctx.stroke();
      }

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleCanvasClick);
    };
  }, [isWarping]);

  // Initiate Hyperspace Entry
  const handleEnter = () => {
    sound.playFanfare();
    setIsWarping(true);

    confetti({
      particleCount: 70,
      spread: 120,
      origin: { y: 0.5 },
      colors: ["#ff6b3d", "#00f2fe", "#10b981", "#a855f7", "#ffffff"],
    });

    setTimeout(() => {
      sessionStorage.setItem("intro_seen", "true");
      setVisible(false);
      onComplete?.();
    }, 700);
  };

  const handleSkip = (e) => {
    e?.stopPropagation();
    sound.playClick();
    sessionStorage.setItem("intro_seen", "true");
    setVisible(false);
    onComplete?.();
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cinematic-portal"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.15,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-[#07070c] flex flex-col items-center justify-center p-4 sm:p-6 select-none overflow-hidden"
        >
          {/* 3D Hyperspace Warp Canvas + Horizon Cyber Grid */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-auto cursor-crosshair"
          />

          {/* Glowing Animated Aurora Nebula Gradients */}
          <div className="absolute w-[650px] h-[650px] rounded-full bg-[var(--color-accent-primary)]/15 blur-[160px] pointer-events-none animate-aura-pulse" />
          <div className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[150px] pointer-events-none -bottom-20 -right-20 animate-pulse" />

          {/* Top Skip Button */}
          <div className="absolute top-6 right-6 z-30">
            <button
              onClick={handleSkip}
              className="text-xs font-mono-code text-slate-300 hover:text-white px-4 py-2 rounded-full border border-white/20 hover:border-[var(--color-accent-primary)] bg-black/60 backdrop-blur-xl transition-all flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <span>Skip Intro</span>
              <ChevronRight size={13} />
            </button>
          </div>

          {/* Top Left Telemetry Readout */}
          <div className="absolute top-6 left-6 z-30 hidden sm:flex items-center gap-2 text-[10px] font-mono-code text-slate-400 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <Radio size={12} className="text-[var(--color-accent-primary)] animate-pulse" />
            <span>STEER: MOVE MOUSE // CLICK FOR SHOCKWAVE</span>
          </div>

          {/* 3D Center Stage: High-End Futuristic Intro Hero Card */}
          <div
            style={{
              perspective: 1200,
              transform: `rotateX(${cardTilt.x.toFixed(2)}deg) rotateY(${cardTilt.y.toFixed(2)}deg)`,
              transition: "transform 0.15s ease-out",
            }}
            className="relative z-20 max-w-xl w-full flex flex-col items-center will-change-transform px-4"
          >
            {/* Ambient Radial Backlight Glow Behind Card */}
            <div
              className={`absolute -inset-4 sm:-inset-8 rounded-[40px] bg-gradient-to-r from-[var(--color-accent-primary)]/20 via-cyan-500/15 to-[var(--color-accent-primary)]/20 blur-3xl pointer-events-none transition-all duration-700 ${
                isHoveringEnter ? "opacity-90 scale-105" : "opacity-50 scale-100"
              }`}
            />

            {/* THE HOLOGRAPHIC TERMINAL CARD */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 20 }}
              animate={{ scale: isWarping ? 1.06 : 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 w-full flex flex-col items-center text-center p-8 sm:p-14 py-12 sm:py-16 rounded-3xl bg-[#0b0c16]/90 border border-[var(--color-accent-primary)]/40 shadow-[0_0_80px_rgba(0,0,0,0.95),0_0_40px_var(--color-accent-glow)] backdrop-blur-2xl overflow-hidden group hover:border-[var(--color-accent-primary)]/70 transition-colors duration-500"
            >
              {/* Subtle Animated Surface Sheen Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/40 pointer-events-none" />

              {/* Animated Corner Laser Brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[var(--color-accent-primary)] transition-all duration-300 group-hover:w-10 group-hover:h-10" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[var(--color-accent-primary)] transition-all duration-300 group-hover:w-10 group-hover:h-10" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[var(--color-accent-primary)] transition-all duration-300 group-hover:w-10 group-hover:h-10" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[var(--color-accent-primary)] transition-all duration-300 group-hover:w-10 group-hover:h-10" />

              {/* Top & Bottom Ambient Edge Glow Bars */}
              <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-[var(--color-accent-primary)] to-transparent shadow-[0_0_15px_var(--color-accent-primary)]" />
              <div className="absolute bottom-0 left-20 right-20 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-primary)]/50 to-transparent" />

              {/* Aryan Mahanty: Clean Futuristic Typography */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3 min-h-[2.5rem] sm:min-h-[3.75rem] flex items-center justify-center font-mono-code drop-shadow-[0_0_35px_rgba(255,255,255,0.3)] select-text sm:whitespace-nowrap"
              >
                <span className="bg-gradient-to-b from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  {displayName || "Aryan Mahanty"}
                </span>
              </motion.h1>

              {/* Subtitle: DECODER OF DATA & BUILDER OF SYSTEMS */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[11px] sm:text-xs md:text-sm text-[var(--color-accent-primary)] font-mono-code font-bold tracking-[0.14em] sm:tracking-[0.2em] mb-10 sm:mb-12 uppercase min-h-[1.5rem] drop-shadow-[0_0_14px_var(--color-accent-glow)] max-w-lg leading-relaxed"
              >
                {displayTitle || "DECODER OF DATA & BUILDER OF SYSTEMS"}
              </motion.p>

              {/* Big Warp Enter Button */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96, y: 0 }}
                onMouseEnter={() => setIsHoveringEnter(true)}
                onMouseLeave={() => setIsHoveringEnter(false)}
                onClick={handleEnter}
                className="group/btn relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 sm:px-12 py-4 rounded-2xl font-extrabold text-sm text-black bg-[var(--color-accent-primary)] hover:bg-white shadow-[0_0_35px_var(--color-accent-glow)] hover:shadow-[0_0_50px_var(--color-accent-glow),0_0_20px_rgba(255,255,255,0.6)] transition-all duration-300 cursor-pointer font-mono-code uppercase tracking-wider"
              >
                <Zap size={16} fill="currentColor" className="animate-bounce shrink-0" />
                <span className="tracking-wide">
                  {isWarping ? "WARPING INTO PORTFOLIO..." : "ENTER PORTFOLIO"}
                </span>
                <span className="text-[10px] bg-black/20 text-black px-2 py-0.5 rounded font-black tracking-normal group-hover/btn:bg-black/10 transition-colors">
                  LAUNCH
                </span>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}