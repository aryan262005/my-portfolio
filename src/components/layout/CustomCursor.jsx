import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch fine pointer devices
    if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
      setIsVisible(true);
    } else {
      return;
    }

    const onMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target.closest("button") ||
        target.closest("a") ||
        target.closest("[role='button']") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest(".interactive-target")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Primary Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-[var(--color-accent-primary)] shadow-[0_0_12px_var(--color-accent-primary)]"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: isClicking ? 0.6 : isHovered ? 1.6 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 450, mass: 0.1 }}
      />

      {/* Outer Anime Reticle Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[var(--color-accent-primary)]/60"
        animate={{
          x: mousePosition.x - (isHovered ? 24 : 16),
          y: mousePosition.y - (isHovered ? 24 : 16),
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          borderColor: isHovered ? "var(--color-accent-primary)" : "rgba(255,255,255,0.25)",
          scale: isClicking ? 0.8 : 1,
          rotate: isHovered ? 90 : 0
        }}
        transition={{ type: "spring", damping: 24, stiffness: 220, mass: 0.2 }}
      >
        {/* Subtle crosshair notches on hover */}
        {isHovered && (
          <>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-1.5 h-0.5 bg-[var(--color-accent-primary)]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1 w-1.5 h-0.5 bg-[var(--color-accent-primary)]" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 w-0.5 h-1.5 bg-[var(--color-accent-primary)]" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-0.5 h-1.5 bg-[var(--color-accent-primary)]" />
          </>
        )}
      </motion.div>
    </div>
  );
}