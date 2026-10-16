import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ExternalLink,
  Maximize2,
  FolderGit2,
} from "lucide-react";
import { GithubIcon } from "../ui/Icons";
import { sound } from "../../utils/audio";
import { projectCategories, projectsData } from "../../data/portfolioData";
import ProjectThumbnail from "../ui/ProjectThumbnail";
import ProjectModal from "../modals/ProjectModal";
import Card3D from "../ui/Card3D";
import Section3DTransition from "../ui/Section3DTransition";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

  const handleCategoryChange = (cat) => {
    sound.playClick();
    setActiveCategory(cat);
  };

  const openDossier = (project) => {
    sound.playWoosh();
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <Section3DTransition>
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent-primary)]/10 text-[var(--color-accent-primary)] text-xs font-mono-code font-bold mb-3 border border-[var(--color-accent-primary)]/30">
                <FolderGit2 size={13} />
                <span>PROJECTS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Projects Section
              </h2>
            </div>
            <p className="text-sm font-mono-code text-slate-400 max-w-md">
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-10">
            {projectCategories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all cursor-pointer ${
                    isActive
                      ? "bg-[var(--color-accent-primary)] text-black font-bold shadow-[0_0_15px_var(--color-accent-glow)] scale-105"
                      : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Section3DTransition>

        {/* Projects Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
              >
                <Card3D maxTilt={10} className="h-full">
                  <div className="anime-panel rounded-2xl overflow-hidden flex flex-col justify-between h-full group">
                    {/* Visual Thumbnail Header with 3D Pop */}
                    <div
                      onClick={() => openDossier(project)}
                      className="relative cursor-pointer overflow-hidden border-b border-white/10"
                    >
                      <ProjectThumbnail
                        slug={project.slug}
                        color={project.accentColor}
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="text-[10px] font-mono-code font-bold px-2 py-0.5 rounded bg-black/70 text-[var(--color-accent-primary)] border border-white/10 backdrop-blur-md">
                          {project.auraTag}
                        </span>
                        <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-black/70 text-emerald-400 border border-white/10 backdrop-blur-md">
                          {project.status}
                        </span>
                      </div>

                      {/* Hover Inspect Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 text-white font-mono-code text-xs border border-white/20 shadow-lg">
                          <Maximize2 size={13} className="text-[var(--color-accent-primary)]" />
                          <span>Inspect Dossier</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="text-[11px] font-mono-code text-[var(--color-accent-primary)] mb-1.5 font-bold uppercase tracking-wider">
                          {project.category}
                        </div>

                        <h3
                          onClick={() => openDossier(project)}
                          className="text-xl sm:text-2xl font-bold text-white mb-2 cursor-pointer hover:text-[var(--color-accent-primary)] transition-colors"
                        >
                          {project.title}
                        </h3>

                        <p className="text-xs sm:text-sm font-mono-code text-slate-400 leading-relaxed mb-4">
                          {project.tagline}
                        </p>

                        {/* Metric Chips */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          {project.metrics?.map((m) => (
                            <div
                              key={m.label}
                              className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-center"
                            >
                              <div className="text-xs font-mono-code font-bold text-white">
                                {m.value}
                              </div>
                              <div className="text-[9px] font-mono-code text-slate-500">
                                {m.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack Pills */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Card Bottom Actions */}
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                        <button
                          onClick={() => openDossier(project)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono-code font-bold text-[var(--color-accent-primary)] hover:underline cursor-pointer"
                        >
                          <Sparkles size={13} />
                          <span>Deep Dive Dossier</span>
                        </button>

                        <div className="flex items-center gap-2">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                            title="Open Live Demo"
                          >
                            <ExternalLink size={14} />
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors"
                            title="View Source Code"
                          >
                            <GithubIcon size={14} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Project Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}