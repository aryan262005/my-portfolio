import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Sparkles } from "lucide-react";
import { educationData } from "../../data/portfolioData";
import Card3D from "../ui/Card3D";
import Section3DTransition from "../ui/Section3DTransition";
import { sound } from "../../utils/audio";

export default function Education() {
  const containerRef = useRef(null);
  const [activeNode, setActiveNode] = useState(null);

  // Progressive scroll-linked timeline glow animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end 65%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="education"
      className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#090912]/60 overflow-hidden"
    >
      {/* Background Cybernetic Ambient Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[var(--color-accent-primary)]/10 via-cyan-500/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <Section3DTransition>
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 border-b border-white/10 pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] text-xs font-mono-code font-bold mb-3 border border-[var(--color-accent-primary)]/30 shadow-[0_0_12px_var(--color-accent-glow)]">
                <GraduationCap size={13} />
                <span>ACADEMIC TRAJECTORY // SYSTEM FOUNDATIONS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Education Journey
              </h2>
            </div>
            <p className="text-sm font-mono-code text-slate-400 max-w-md">
            </p>
          </div>
        </Section3DTransition>

        {/* Vertical Interactive Timeline Container */}
        <div ref={containerRef} className="relative mt-8 sm:mt-12">
          {/* Central Connected Timeline Line (Desktop: Centered, Mobile: Left-aligned) */}
          <div className="absolute top-8 bottom-8 left-6 sm:left-8 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-white/10 pointer-events-none">
            {/* Scroll-driven Glowing Gradient Progress Line */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-[var(--color-accent-primary)] via-cyan-400 to-[var(--color-accent-primary)] shadow-[0_0_15px_var(--color-accent-glow)]"
            />
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-12 sm:space-y-16">
            {educationData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isActive = activeNode === idx;

              return (
                <div
                  key={item.step}
                  className="relative flex flex-col md:flex-row items-center"
                >
                  {/* Glowing Stage Node Reticle (01, 02, 03) */}
                  <div
                    onClick={() => {
                      sound.playChirp();
                      setActiveNode(isActive ? null : idx);
                    }}
                    onMouseEnter={() => {
                      sound.playHover();
                      setActiveNode(idx);
                    }}
                    onMouseLeave={() => setActiveNode(null)}
                    className={`absolute z-30 cursor-pointer left-6 sm:left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-300 ${
                      isActive ? "scale-115" : "hover:scale-110"
                    }`}
                  >
                    {/* Pulsing Backlight Halo on Active */}
                    <div
                      className={`absolute -inset-2 rounded-full transition-opacity duration-300 ${
                        isActive
                          ? "bg-[var(--color-accent-primary)] opacity-40 blur-md animate-pulse"
                          : "opacity-0"
                      }`}
                    />

                    {/* Node Circle Badge */}
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center font-mono-code font-black text-xs sm:text-sm backdrop-blur-xl transition-all duration-300 ${
                        isActive
                          ? "bg-[var(--color-accent-primary)] text-black border-white shadow-[0_0_25px_var(--color-accent-glow)]"
                          : "bg-[#0c0d18] text-[var(--color-accent-primary)] border-[var(--color-accent-primary)]/60 shadow-[0_0_15px_rgba(0,0,0,0.8),0_0_10px_var(--color-accent-glow)]"
                      }`}
                    >
                      {item.step}
                    </div>
                  </div>

                  {/* Horizontal Connector Line (Desktop) */}
                  <div
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] transition-all duration-300 pointer-events-none z-10 ${
                      isEven
                        ? "right-1/2 w-10 bg-gradient-to-l"
                        : "left-1/2 w-10 bg-gradient-to-r"
                    } ${
                      isActive
                        ? "from-[var(--color-accent-primary)] to-[var(--color-accent-primary)]/80 shadow-[0_0_10px_var(--color-accent-primary)]"
                        : "from-[var(--color-accent-primary)]/40 to-transparent"
                    }`}
                  />

                  {/* Milestone Card Container with Alternating Placement on Desktop */}
                  <motion.div
                    initial={{ opacity: 0, y: 35, x: isEven ? -25 : 25 }}
                    whileInView={{ opacity: 1, y: 0, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full pl-16 sm:pl-20 md:pl-0 ${
                      isEven
                        ? "md:mr-auto md:w-[calc(50%-2.5rem)]"
                        : "md:ml-auto md:w-[calc(50%-2.5rem)]"
                    }`}
                  >
                    <Card3D maxTilt={7}>
                      <div
                        onMouseEnter={() => setActiveNode(idx)}
                        onMouseLeave={() => setActiveNode(null)}
                        onClick={() => {
                          sound.playClick();
                          setActiveNode(isActive ? null : idx);
                        }}
                        className={`relative rounded-2xl p-6 sm:p-8 bg-[#0c0d18]/85 backdrop-blur-xl border transition-all duration-300 overflow-hidden cursor-pointer group ${
                          isActive
                            ? "border-[var(--color-accent-primary)] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_var(--color-accent-glow)]"
                            : "border-white/10 hover:border-[var(--color-accent-primary)]/50 shadow-[0_15px_35px_rgba(0,0,0,0.7)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_var(--color-accent-glow)]"
                        }`}
                      >
                        {/* Subtle Corner Laser Brackets */}
                        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[var(--color-accent-primary)] opacity-40 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[var(--color-accent-primary)] opacity-40 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[var(--color-accent-primary)] opacity-40 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[var(--color-accent-primary)] opacity-40 group-hover:opacity-100 transition-opacity" />

                        {/* Top Ambient Edge Bar */}
                        <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-primary)]/40 to-transparent group-hover:via-[var(--color-accent-primary)] transition-all" />

                        {/* Header: Year / Period Badge */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] font-mono-code text-xs font-bold border border-[var(--color-accent-primary)]/30 shadow-[0_0_10px_var(--color-accent-glow)]">
                            <Calendar size={12} />
                            <span>{item.period}</span>
                          </div>
                          <span className="text-[10px] font-mono-code text-slate-500 tracking-wider">
                            STAGE // {item.step}
                          </span>
                        </div>

                        {/* Qualification Title */}
                        <h3 className="text-xl sm:text-2xl font-black text-white font-mono-code tracking-tight mb-2 group-hover:text-[var(--color-accent-primary)] transition-colors">
                          {item.qualification}
                        </h3>

                        {/* Institution Name */}
                        <div className="text-base sm:text-lg font-bold text-slate-200 tracking-wide mb-3 flex items-center gap-2">
                          <GraduationCap
                            size={18}
                            className="text-[var(--color-accent-primary)] shrink-0"
                          />
                          <span>{item.institution}</span>
                        </div>

                        {/* Location (rendered only if provided) */}
                        {item.location && (
                          <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs font-mono-code text-slate-400">
                            <MapPin size={13} className="text-slate-500 shrink-0" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </Card3D>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
