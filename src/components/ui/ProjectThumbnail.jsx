import React from "react";

export default function ProjectThumbnail({ slug, color = "#ff6b3d" }) {
  // Flagship Platform SVG
  if (slug === "flagship-platform") {
    return (
      <div className="relative w-full h-48 bg-[#10101c] flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
        <svg viewBox="0 0 400 200" className="w-full h-full opacity-85">
          <defs>
            <linearGradient id="grid-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff4d88" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <g stroke="rgba(255,255,255,0.08)" strokeWidth="1">
            <line x1="0" y1="180" x2="400" y2="180" />
            <line x1="0" y1="150" x2="400" y2="150" />
            <line x1="0" y1="120" x2="400" y2="120" />
            <line x1="200" y1="60" x2="20" y2="200" />
            <line x1="200" y1="60" x2="100" y2="200" />
            <line x1="200" y1="60" x2="200" y2="200" />
            <line x1="200" y1="60" x2="300" y2="200" />
            <line x1="200" y1="60" x2="380" y2="200" />
          </g>

          <polygon
            points="200,40 260,80 200,120 140,80"
            fill="url(#grid-grad-1)"
            stroke={color}
            strokeWidth="2"
            className="animate-pulse"
          />
          <polygon
            points="200,120 260,80 260,130 200,170"
            fill="rgba(0,0,0,0.4)"
            stroke={color}
            strokeWidth="1.5"
          />
          <polygon
            points="200,120 140,80 140,130 200,170"
            fill="rgba(255,255,255,0.08)"
            stroke={color}
            strokeWidth="1.5"
          />

          <circle cx="90" cy="65" r="4" fill={color} className="animate-ping" />
          <circle cx="310" cy="75" r="4" fill="#00f2fe" />
          <line x1="140" y1="80" x2="90" y2="65" stroke={color} strokeDasharray="3,3" strokeWidth="1.5" />
          <line x1="260" y1="80" x2="310" y2="75" stroke="#00f2fe" strokeDasharray="3,3" strokeWidth="1.5" />

          <line x1="0" y1="90" x2="400" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </svg>
        <span className="absolute bottom-2 left-3 text-[10px] font-mono-code text-slate-400 bg-black/60 px-2 py-0.5 rounded border border-white/10">
          SYS: REALTIME_CORE // 60FPS
        </span>
      </div>
    );
  }

  // Creative Canvas Engine SVG
  if (slug === "creative-canvas-engine") {
    return (
      <div className="relative w-full h-48 bg-[#09121c] flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
        <svg viewBox="0 0 400 200" className="w-full h-full opacity-85">
          <ellipse cx="200" cy="100" rx="110" ry="40" fill="none" stroke="#00f2fe" strokeWidth="1.5" strokeDasharray="6,4" transform="rotate(-15 200 100)" />
          <ellipse cx="200" cy="100" rx="120" ry="45" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeDasharray="8,6" transform="rotate(25 200 100)" />

          <circle cx="200" cy="100" r="30" fill="radial-gradient(circle, #00f2fe 0%, #000 80%)" stroke="#00f2fe" strokeWidth="2" />
          <circle cx="200" cy="100" r="14" fill="#ffffff" />
          <circle cx="200" cy="100" r="45" fill="none" stroke="rgba(0, 242, 254, 0.4)" strokeWidth="1" />

          <line x1="200" y1="50" x2="200" y2="20" stroke="#00f2fe" strokeWidth="2" />
          <line x1="200" y1="150" x2="200" y2="180" stroke="#00f2fe" strokeWidth="2" />
          <line x1="140" y1="100" x2="100" y2="100" stroke="#00f2fe" strokeWidth="2" />
          <line x1="260" y1="100" x2="300" y2="100" stroke="#00f2fe" strokeWidth="2" />
        </svg>
        <span className="absolute bottom-2 left-3 text-[10px] font-mono-code text-cyan-300 bg-black/60 px-2 py-0.5 rounded border border-cyan-500/20">
          CANVAS_ENGINE // SHADER_ACTIVE
        </span>
      </div>
    );
  }

  // Cloud Intelligence API SVG
  if (slug === "cloud-intelligence-api") {
    return (
      <div className="relative w-full h-48 bg-[#0a1813] flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
        <svg viewBox="0 0 400 200" className="w-full h-full opacity-85">
          <g stroke="#10b981" strokeWidth="1.5" fill="#122b22">
            <rect x="60" y="40" width="70" height="45" rx="6" />
            <rect x="270" y="40" width="70" height="45" rx="6" />
            <rect x="165" y="125" width="70" height="45" rx="6" />
          </g>

          <path d="M 130 62 L 270 62" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M 95 85 L 165 140" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M 305 85 L 235 140" stroke="#10b981" strokeWidth="2" strokeDasharray="5,5" />

          <circle cx="200" cy="62" r="7" fill="#34d399" className="animate-ping" />
          <circle cx="200" cy="62" r="4" fill="#ffffff" />
        </svg>
        <span className="absolute bottom-2 left-3 text-[10px] font-mono-code text-emerald-300 bg-black/60 px-2 py-0.5 rounded border border-emerald-500/20">
          MICROSERVICES // 10K REQ/S
        </span>
      </div>
    );
  }

  // Default / Devtool CLI SVG
  return (
    <div className="relative w-full h-48 bg-[#150f24] flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
      <svg viewBox="0 0 400 200" className="w-full h-full opacity-85">
        <rect x="40" y="25" width="320" height="150" rx="8" fill="#120c1f" stroke="#a855f7" strokeWidth="1.5" />
        <rect x="40" y="25" width="320" height="26" rx="8" fill="#201538" />
        <circle cx="55" cy="38" r="4" fill="#ff5f56" />
        <circle cx="68" cy="38" r="4" fill="#ffbd2e" />
        <circle cx="81" cy="38" r="4" fill="#27c93f" />

        <text x="60" y="75" fill="#a855f7" fontFamily="JetBrains Mono" fontSize="12" fontWeight="bold">
          $ npx devtool --init --special-grade
        </text>
        <text x="60" y="98" fill="#e2e8f0" fontFamily="JetBrains Mono" fontSize="11">
          ✓ Scaffolding production modules... [100%]
        </text>
        <text x="60" y="118" fill="#10b981" fontFamily="JetBrains Mono" fontSize="11">
          ✓ Architecture verified: Zero boilerplate
        </text>
        <text x="60" y="138" fill="#ec4899" fontFamily="JetBrains Mono" fontSize="11">
          → Launching interactive quest... █
        </text>
      </svg>
      <span className="absolute bottom-2 left-3 text-[10px] font-mono-code text-purple-300 bg-black/60 px-2 py-0.5 rounded border border-purple-500/20">
        CLI_TERMINAL // OPEN_SOURCE
      </span>
    </div>
  );
}