import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Cpu,
  Terminal,
  ArrowRight,
  Activity,
  Layers,
  Sparkles,
  Command,
  Boxes,
  Code2,
  Layout,
  Cloud,
} from "lucide-react";
import { skillsData } from "../../data/portfolioData";
import TechIcon from "../ui/TechIcon";
import Card3D from "../ui/Card3D";
import { sound } from "../../utils/audio";
import Section3DTransition from "../ui/Section3DTransition";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkillId, setSelectedSkillId] = useState("python");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Flatten all skills for instant lookup & filtering
  const allSkills = useMemo(() => {
    return skillsData.flatMap((cat) => cat.skills);
  }, []);

  // Filter skills by category & search query
  const filteredSkills = useMemo(() => {
    return allSkills.filter((skill) => {
      const matchesCategory =
        activeCategory === "All" || skill.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        skill.name.toLowerCase().includes(q) ||
        skill.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        skill.tagline.toLowerCase().includes(q) ||
        skill.highlight.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [allSkills, activeCategory, searchQuery]);

  // Selected skill metadata
  const currentSkill = useMemo(() => {
    return (
      allSkills.find((s) => s.id === selectedSkillId) ||
      filteredSkills[0] ||
      allSkills[0]
    );
  }, [allSkills, filteredSkills, selectedSkillId]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: allSkills.length };
    skillsData.forEach((cat) => {
      counts[cat.category] = cat.skills.length;
    });
    return counts;
  }, [allSkills]);

  // Category icon helper
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Programming":
        return Code2;
      case "Web Development":
        return Layout;
      case "AI / Machine Learning":
        return Cpu;
      case "Cloud & Tools":
        return Cloud;
      default:
        return Boxes;
    }
  };

  // Cursor following glow handler
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleSelectSkill = (skillId) => {
    sound.playClick();
    setSelectedSkillId(skillId);
  };

  const handleCategoryChange = (category) => {
    sound.playClick();
    setActiveCategory(category);
    if (category !== "All") {
      const match = allSkills.find((s) => s.category === category);
      if (match) setSelectedSkillId(match.id);
    }
  };

  return (
    <section
      id="skills"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Dynamic Ambient Theme Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[var(--color-accent-primary)]/10 via-[var(--color-accent-secondary)]/5 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[350px] bg-[var(--color-accent-primary)]/10 blur-[110px] pointer-events-none" />

      {/* Subtle Matrix Circuit Grid Backdrop */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(var(--color-accent-primary) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <Section3DTransition>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/10 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] text-xs font-mono-code font-bold mb-3 border border-[var(--color-border-accent)] shadow-[0_0_15px_var(--color-accent-glow)]">
                <Terminal size={13} className="text-[var(--color-accent-primary)]" />
                <span>SKILLS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Skills & Technologies
              </h2>
              <p className="mt-2 text-sm text-slate-400 max-w-xl">
              </p>
            </div>

            {/* Live Telemetry Status Pill */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-[var(--color-border-accent)] backdrop-blur-md self-start md:self-auto">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-primary)] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[var(--color-accent-primary)]" />
              </span>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono-code font-bold text-slate-400">
                  WORKSPACE TELEMETRY
                </span>
                <span className="text-xs font-mono-code text-[var(--color-accent-primary)] font-semibold">
                </span>
              </div>
            </div>
          </div>
        </Section3DTransition>

        {/* Central Interactive App Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="relative rounded-2xl bg-[var(--color-bg-card)]/80 border border-[var(--color-border-accent)] shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_40px_var(--color-accent-glow)] backdrop-blur-xl overflow-hidden"
        >
          {/* Cursor-Following Ambient Glow Spotlight */}
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-60"
            style={{
              background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, var(--color-accent-glow), transparent 45%)`,
            }}
          />

          {/* App Window Title & Navigation Bar */}
          <div className="p-4 sm:p-5 border-b border-white/10 bg-[var(--color-bg-surface)]/90 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Left: Window Controls + Label */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 mr-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2 text-xs font-mono-code text-slate-300">
                <Command size={12} className="text-[var(--color-accent-primary)]" />
                <span className="font-bold">TECH_NAVIGATOR.EXE</span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">// v2.6.4</span>
              </div>
            </div>

            {/* Middle: Category Tabs (Pills) */}
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {["All", "Programming", "Web Development", "AI / Machine Learning", "Cloud & Tools"].map((cat) => {
                const isActive = activeCategory === cat;
                const Icon = getCategoryIcon(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`relative px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all duration-200 flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? "text-white font-bold"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 bg-[var(--color-accent-primary)]/20 border border-[var(--color-accent-primary)]/50 rounded-lg shadow-[0_0_15px_var(--color-accent-glow)]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon size={12} className={isActive ? "text-[var(--color-accent-primary)]" : "text-slate-500"} />
                    <span className="relative z-10">{cat}</span>
                    <span
                      className={`relative z-10 text-[9px] px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-[var(--color-accent-primary)]/30 text-[var(--color-accent-primary)] font-bold"
                          : "bg-white/5 text-slate-500"
                      }`}
                    >
                      {categoryCounts[cat]}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right: Quick Search Input */}
            <div className="relative min-w-[200px] lg:w-56">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter stack..."
                className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-[var(--color-bg-dark)] border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)]/40 font-mono-code transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          </div>

          {/* App Body: Dual Panel (Left: Grid / Right: Interactive Inspector) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
            {/* Left 7 Columns: Skills Matrix */}
            <div className="lg:col-span-7 p-5 sm:p-6 lg:border-r border-white/10 flex flex-col justify-between">
              <div>
                {/* Active Results Summary */}
                <div className="flex items-center justify-between mb-4 text-xs font-mono-code text-slate-400">
                  <div className="flex items-center gap-2">
                    <Activity size={12} className="text-[var(--color-accent-primary)]" />
                    <span>
                      MATCHING NODES: <strong className="text-white">{filteredSkills.length}</strong>
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    HOVER FOR 3D TILT // CLICK TO INSPECT
                  </span>
                </div>

                {/* Grid of Interactive Technology Tiles with 3D Tilt */}
                {filteredSkills.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {filteredSkills.map((skill) => {
                      const isSelected = skill.id === currentSkill.id;
                      return (
                        <Card3D
                          key={skill.id}
                          maxTilt={10}
                          className="h-full"
                          onClick={() => handleSelectSkill(skill.id)}
                        >
                          <div
                            className={`p-3 rounded-xl border text-left transition-all duration-200 relative group cursor-pointer h-full flex flex-col justify-between ${
                              isSelected
                                ? "bg-[var(--color-accent-primary)]/15 border-[var(--color-accent-primary)] shadow-[0_0_20px_var(--color-accent-glow)] ring-1 ring-[var(--color-accent-primary)]/50"
                                : "bg-white/[0.02] hover:bg-white/[0.05] border-white/10 hover:border-[var(--color-border-accent)]"
                            }`}
                          >
                            {isSelected && (
                              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)] shadow-[0_0_8px_var(--color-accent-primary)]" />
                            )}
                            <div className="flex items-center gap-2.5">
                              <div
                                className={`p-2 rounded-lg transition-transform group-hover:scale-105 ${
                                  isSelected
                                    ? "bg-[var(--color-accent-primary)]/20 shadow-[0_0_10px_var(--color-accent-glow)]"
                                    : "bg-white/5"
                                }`}
                              >
                                <TechIcon id={skill.id} className="w-5 h-5" />
                              </div>
                              <div className="min-w-0 flex-grow">
                                <div className="flex items-center justify-between">
                                  <span
                                    className={`text-xs font-bold font-mono-code truncate ${
                                      isSelected
                                        ? "text-[var(--color-accent-primary)] font-semibold"
                                        : "text-white group-hover:text-slate-200"
                                    }`}
                                  >
                                    {skill.name}
                                  </span>
                                  <ArrowRight
                                    size={10}
                                    className={`transition-all ${
                                      isSelected
                                        ? "text-[var(--color-accent-primary)] translate-x-0.5 opacity-100"
                                        : "text-slate-600 opacity-0 group-hover:opacity-100"
                                    }`}
                                  />
                                </div>
                                <span className="text-[10px] text-slate-400 font-mono-code truncate block">
                                  {skill.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card3D>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <p className="text-sm font-mono-code text-slate-400">
                      No technology matched query "{searchQuery}"
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-3 px-3 py-1.5 rounded-lg bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] text-xs font-mono-code border border-[var(--color-border-accent)] hover:bg-[var(--color-accent-primary)]/20 transition-colors cursor-pointer"
                    >
                      Clear Search Filter
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom Keyboard / Click Hint */}
              <div className="mt-6 pt-4 border-t border-white/5 hidden sm:flex items-center justify-between text-[11px] font-mono-code text-slate-500">
                <span></span>
                <span className="text-[var(--color-accent-primary)]/80"></span>
              </div>
            </div>

            {/* Right 5 Columns: Contextual Inspector Console */}
            <div className="lg:col-span-5 p-5 sm:p-7 bg-[var(--color-bg-surface)]/95 flex flex-col justify-between">
              {currentSkill ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSkill.id}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col h-full justify-between space-y-6"
                  >
                    <div>
                      {/* Top Inspector Status Strip */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-primary)] animate-pulse" />
                          <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[var(--color-accent-primary)]">
                            INSPECTOR // {currentSkill.category}
                          </span>
                        </div>
                        <span className="text-[10px] font-mono-code text-slate-500 bg-white/5 px-2 py-0.5 rounded">
                          ID: {currentSkill.id}
                        </span>
                      </div>

                      {/* Main Technology Hero Header with 3D Tilt */}
                      <Card3D maxTilt={6} className="mb-4">
                        <div className="p-4 rounded-2xl bg-[var(--color-accent-primary)]/10 border border-[var(--color-border-accent)] shadow-[0_0_25px_var(--color-accent-glow)] flex items-start gap-4">
                          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
                            <TechIcon id={currentSkill.id} className="w-9 h-9" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                              {currentSkill.name}
                            </h3>
                            <div className="mt-1 inline-flex items-center gap-1.5 text-xs font-mono-code text-[var(--color-accent-primary)] font-semibold">
                              <span>{currentSkill.highlight}</span>
                            </div>
                          </div>
                        </div>
                      </Card3D>

                      {/* Tagline / Practical Role with 3D Tilt */}
                      <Card3D maxTilt={6} className="mb-5">
                        <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                          <span className="text-[10px] font-mono-code text-slate-400 font-bold uppercase tracking-wider block mb-1">
                            PRACTICAL ROLE IN STACK
                          </span>
                          <p className="text-xs text-slate-200 leading-relaxed font-mono-code">
                            "{currentSkill.tagline}"
                          </p>
                        </div>
                      </Card3D>

                      {/* In-Depth Description */}
                      <div className="mb-5">
                        <span className="text-[10px] font-mono-code text-slate-400 font-bold uppercase tracking-wider block mb-1.5">
                          SYSTEM OVERVIEW
                        </span>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                          {currentSkill.description}
                        </p>
                      </div>

                      {/* Key Architectural Capabilities (Tags - strictly no % or ratings) */}
                      <div className="mb-5">
                        <span className="text-[10px] font-mono-code text-slate-400 font-bold uppercase tracking-wider block mb-2">
                          KEY ARCHITECTURAL FOCUS
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentSkill.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-mono-code px-2.5 py-1 rounded-md bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] border border-[var(--color-border-accent)]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Connected Stack / Related Technologies (Interactive Pills) */}
                      <div>
                        <span className="text-[10px] font-mono-code text-slate-400 font-bold uppercase tracking-wider block mb-2">
                          CONNECTED WORKSPACE ECOSYSTEM
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {currentSkill.related.map((relId) => {
                            const relSkill = allSkills.find((s) => s.id === relId);
                            if (!relSkill) return null;
                            return (
                              <button
                                key={relId}
                                onClick={() => handleSelectSkill(relId)}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[var(--color-accent-primary)]/20 text-slate-300 hover:text-white border border-white/5 hover:border-[var(--color-border-accent)] text-xs font-mono-code transition-all cursor-pointer group"
                              >
                                <TechIcon id={relId} className="w-3.5 h-3.5" />
                                <span>{relSkill.name}</span>
                                <ArrowRight
                                  size={10}
                                  className="text-[var(--color-accent-primary)] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                                />
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Inspector Footer */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <Sparkles size={11} className="text-[var(--color-accent-primary)]" />
                        <span></span>
                      </span>
                      <button
                        onClick={() => handleCategoryChange(currentSkill.category)}
                        className="text-[var(--color-accent-primary)] hover:opacity-80 underline underline-offset-4 cursor-pointer"
                      >
                        View all in {currentSkill.category}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
