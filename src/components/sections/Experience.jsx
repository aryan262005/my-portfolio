import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Calendar,
  MapPin,
  FileText,
  ExternalLink,
} from "lucide-react";
import { sound } from "../../utils/audio";
import { experienceData } from "../../data/portfolioData";
import Card3D from "../ui/Card3D";
import Section3DTransition from "../ui/Section3DTransition";

export default function Experience() {
  const [missingPdfId, setMissingPdfId] = useState(null);

  const handleCertificateClick = async (e, item) => {
    if (!item.certificatePdf) {
      e.preventDefault();
      sound?.playClick?.();
      setMissingPdfId(item.id);
      setTimeout(() => setMissingPdfId(null), 3500);
      return;
    }

    try {
      const res = await fetch(item.certificatePdf, { method: "HEAD" });
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok || contentType.includes("text/html")) {
        e.preventDefault();
        sound?.playClick?.();
        setMissingPdfId(item.id);
        setTimeout(() => setMissingPdfId(null), 3500);
        return;
      }
    } catch {
      // In case network fetch is restricted or offline, permit default navigation
    }

    sound?.playFanfare?.();
  };
  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0a0a12]/50">
      <div className="max-w-5xl mx-auto">
        <Section3DTransition>
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-white/10 pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] text-xs font-mono-code font-bold mb-3 border border-[var(--color-accent-primary)]/30">
                <Compass size={13} />
                <span>QUEST CHRONICLES // CAREER JOURNEY</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Work Experience & Milestones
              </h2>
            </div>
            <p className="text-sm font-mono-code text-slate-400 max-w-md">
            </p>
          </div>
        </Section3DTransition>

        {/* Quest Timeline */}
        <div className="relative border-l-2 border-white/10 ml-4 sm:ml-8 space-y-12">
          {experienceData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Timeline Node Reticle */}
              <div className="absolute -left-[9px] top-4 w-4 h-4 rounded-full bg-[#0b0b10] border-2 border-[var(--color-accent-primary)] shadow-[0_0_12px_var(--color-accent-glow)] group-hover:scale-125 transition-transform flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)]" />
              </div>

              {/* Quest Card with 3D Tilt */}
              <Card3D maxTilt={6}>
                <div className="anime-panel rounded-2xl p-6 sm:p-8 relative">
                  {/* Header Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] font-bold border border-[var(--color-accent-primary)]/30">
                          {item.questBadge}
                        </span>
                        <span className="text-xs font-mono-code text-slate-400">
                          {item.type}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">
                        {item.role}
                      </h3>
                      <div className="text-sm font-mono-code text-[var(--color-accent-primary)] font-semibold mt-0.5">
                        {item.company}
                      </div>
                    </div>

                    {/* Period & Location */}
                    <div className="text-left sm:text-right font-mono-code text-xs text-slate-400 space-y-1">
                      <div className="flex items-center sm:justify-end gap-1.5 text-slate-300">
                        <Calendar size={13} className="text-[var(--color-accent-primary)]" />
                        <span>{item.period}</span>
                      </div>
                      <div className="flex items-center sm:justify-end gap-1.5 text-slate-500 text-[11px]">
                        <MapPin size={12} />
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm font-mono-code text-slate-300 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Impact Bullet Points */}
                  <ul className="space-y-2 mb-6">
                    {item.bulletPoints.map((bullet, bIdx) => (
                      <li
                        key={bIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm font-mono-code text-slate-400 leading-relaxed"
                      >
                        <span className="text-[var(--color-accent-primary)] font-bold mt-0.5">
                          ▸
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                    {item.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono-code px-2.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Internship Certificate Action */}
                  {item.certificatePdf && (
                    <div className="pt-3.5 mt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center gap-2.5">
                      <a
                        href={item.certificatePdf}
                        onClick={(e) => handleCertificateClick(e, item)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-lg bg-[var(--color-accent-primary)]/10 hover:bg-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:text-black border border-[var(--color-accent-primary)]/30 hover:border-[var(--color-accent-primary)] font-mono-code text-xs font-semibold transition-all duration-200 shadow-[0_0_10px_rgba(255,200,0,0.05)] hover:shadow-[0_0_15px_var(--color-accent-glow)] cursor-pointer group/btn"
                      >
                        <FileText size={13} className="text-[var(--color-accent-primary)] group-hover/btn:text-black transition-colors" />
                        <span>View Internship Certificate</span>
                        <ExternalLink size={12} className="opacity-70 group-hover/btn:opacity-100 transition-opacity" />
                      </a>

                      {missingPdfId === item.id && (
                        <span className="text-[11px] font-mono-code text-amber-400 animate-pulse font-medium">
                          Certificate currently unavailable.
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Card3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}