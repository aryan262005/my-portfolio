import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  ExternalLink,
  RotateCw,
  FileText,
} from "lucide-react";
import { sound } from "../../utils/audio";
import { certificatesData } from "../../data/portfolioData";
import CertificateModal from "../modals/CertificateModal";
import Card3D from "../ui/Card3D";
import Section3DTransition from "../ui/Section3DTransition";

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const [missingPdfCertId, setMissingPdfCertId] = useState(null);

  const toggleFlip = (e, id) => {
    e.stopPropagation();
    sound.playClick();
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const openCert = (cert) => {
    sound.playFanfare();
    setSelectedCert(cert);
  };

  const handleCheckCertificate = async (e, cert) => {
    if (!cert.certificatePdf) {
      e.preventDefault();
      e.stopPropagation();
      sound.playClick();
      setMissingPdfCertId(cert.id);
      setTimeout(() => setMissingPdfCertId(null), 3500);
      return;
    }

    try {
      const res = await fetch(cert.certificatePdf, { method: "HEAD" });
      const contentType = res.headers.get("content-type") || "";
      if (!res.ok || contentType.includes("text/html")) {
        e.preventDefault();
        e.stopPropagation();
        sound.playClick();
        setMissingPdfCertId(cert.id);
        setTimeout(() => setMissingPdfCertId(null), 3500);
        return;
      }
    } catch {
      // In case network fetch is restricted, permit default link navigation
    }

    sound.playFanfare();
  };

  const rarityColors = {
    LEGENDARY: {
      border: "border-amber-400/50",
      glow: "shadow-[0_0_25px_rgba(251,191,36,0.25)]",
      badge: "bg-amber-400/10 text-amber-400 border-amber-400/30",
      gem: "bg-amber-400",
    },
    MASTER: {
      border: "border-cyan-400/50",
      glow: "shadow-[0_0_25px_rgba(34,211,238,0.25)]",
      badge: "bg-cyan-400/10 text-cyan-400 border-cyan-400/30",
      gem: "bg-cyan-400",
    },
    VERIFIED: {
      border: "border-purple-400/50",
      glow: "shadow-[0_0_25px_rgba(192,132,252,0.25)]",
      badge: "bg-purple-400/10 text-purple-400 border-purple-400/30",
      gem: "bg-purple-400",
    },
  };

  return (
    <section id="certificates" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <Section3DTransition>
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] text-xs font-mono-code font-bold mb-3 border border-[var(--color-accent-primary)]/30">
                <Award size={13} />
                <span>Certificates</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Certifications
              </h2>
            </div>
            <p className="text-sm font-mono-code text-slate-400 max-w-md">
            </p>
          </div>
        </Section3DTransition>

        {/* 3D Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {certificatesData.map((cert) => {
            const style = rarityColors[cert.rarity] || rarityColors.VERIFIED;
            const isFlipped = Boolean(flippedCards[cert.id]);

            return (
              <Card3D key={cert.id} maxTilt={14} className="h-full">
                <div
                  style={{
                    perspective: 1000,
                    transformStyle: "preserve-3d",
                  }}
                  className="w-full h-full min-h-[380px] relative"
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="w-full h-full rounded-2xl relative"
                  >
                    {/* CARD FRONT */}
                    <div
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                      className={`absolute inset-0 rounded-2xl bg-[#12121d] border-2 ${style.border} ${style.glow} p-5 flex flex-col justify-between overflow-hidden group`}
                    >
                      <div className="absolute inset-0 holo-foil opacity-10 group-hover:opacity-25 transition-opacity pointer-events-none" />

                      <div>
                        {/* Top Ribbon */}
                        <div className="flex items-center justify-between mb-4">
                          <span
                            className={`text-[9px] font-mono-code font-bold px-2 py-0.5 rounded-full border ${style.badge} flex items-center gap-1.5`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${style.gem} animate-ping`} />
                            <span>{cert.rarity}</span>
                          </span>

                          {/* 3D Flip Trigger Button */}
                          <button
                            onClick={(e) => toggleFlip(e, cert.id)}
                            title="Flip Card in 3D"
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1 text-[10px] font-mono-code"
                          >
                            <RotateCw size={11} className="text-[var(--color-accent-primary)]" />
                            <span>FLIP 3D</span>
                          </button>
                        </div>

                        {/* Trophy Icon */}
                        <div
                          onClick={() => openCert(cert)}
                          className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-accent-primary)] mb-4 group-hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Award size={24} />
                        </div>

                        {/* Title & Issuer */}
                        <h3
                          onClick={() => openCert(cert)}
                          className="text-base font-bold text-white mb-1 leading-snug group-hover:text-[var(--color-accent-primary)] transition-colors cursor-pointer"
                        >
                          {cert.title}
                        </h3>
                        <p className="text-xs font-mono-code text-[var(--color-accent-primary)] font-medium mb-3">
                          {cert.issuer}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {cert.skills.slice(0, 2).map((s) => (
                            <span
                              key={s}
                              className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom row */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono-code text-slate-400">
                        <span className="text-[10px] text-slate-500 truncate max-w-[110px]">
                          ID: {cert.credentialId}
                        </span>
                        <button
                          onClick={() => openCert(cert)}
                          className="text-[var(--color-accent-primary)] hover:underline flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <span>Inspect</span>
                          <ExternalLink size={11} />
                        </button>
                      </div>
                    </div>

                    {/* CARD BACK (3D Flips Over 180deg) */}
                    <div
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                      className={`absolute inset-0 rounded-2xl bg-[#0e0e18] border-2 ${style.border} ${style.glow} p-5 flex flex-col justify-between overflow-hidden text-center`}
                    >
                      {/* Top Header */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[9px] font-mono-code text-[var(--color-accent-primary)] font-bold tracking-wider">
                            CERTIFICATE PREVIEW
                          </span>
                          <button
                            onClick={(e) => toggleFlip(e, cert.id)}
                            title="Flip Back to Front"
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1 text-[10px] font-mono-code cursor-pointer"
                          >
                            <RotateCw size={11} className="text-[var(--color-accent-primary)]" />
                            <span>FLIP BACK</span>
                          </button>
                        </div>
                      </div>

                      {/* Center Content */}
                      <div className="flex-1 flex flex-col items-center justify-center my-auto py-2">
                        {/* Certificate Holographic Icon */}
                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-accent-primary)] shadow-[0_0_20px_rgba(0,0,0,0.6)] mb-3 group-hover:scale-105 transition-transform">
                          <FileText size={26} />
                        </div>

                        <div className="text-xs sm:text-sm font-bold text-white font-mono-code mb-1.5 px-2">
                          Happy you want to see my certificate!
                        </div>

                        <p className="text-[11px] font-mono-code text-slate-400 leading-relaxed max-w-[210px] mx-auto">
                          Your certificate is available here.
                        </p>
                      </div>

                      {/* Bottom Action Button */}
                      <div className="pt-2">
                        {missingPdfCertId === cert.id && (
                          <div className="text-[10px] font-mono-code text-amber-400 mb-1.5 animate-pulse font-medium">
                            Certificate currently unavailable.
                          </div>
                        )}
                        <a
                          href={cert.certificatePdf || "#"}
                          onClick={(e) => handleCheckCertificate(e, cert)}
                          target={cert.certificatePdf ? "_blank" : "_self"}
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-[var(--color-accent-primary)] text-black font-mono-code text-[11px] font-bold hover:bg-white transition-all shadow-[0_0_15px_var(--color-accent-glow)] cursor-pointer uppercase tracking-wider"
                        >
                          <ExternalLink size={13} />
                          <span>CHECK MY CERTIFICATE</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </Card3D>
            );
          })}
        </div>
      </div>

      {/* Certificate Detailed Modal */}
      <CertificateModal
        cert={selectedCert}
        isOpen={Boolean(selectedCert)}
        onClose={() => setSelectedCert(null)}
      />
    </section>
  );
}