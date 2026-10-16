import React, { useState, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CustomCursor from "./components/layout/CustomCursor";
import CinematicIntro from "./components/layout/CinematicIntro";
import InteractiveAuraCanvas from "./components/canvas/InteractiveAuraCanvas";
import AuraMascot from "./components/ui/AuraMascot";
import RecruiterModal from "./components/modals/RecruiterModal";
import ExploreAryanModal from "./components/world/ExploreAryanModal";

import Hero from "./components/sections/Hero";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Playground from "./components/playground/Playground";
import Certificates from "./components/sections/Certificates";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import Profiles from "./components/sections/Profiles";
import Contact from "./components/sections/Contact";

import { MusicProvider } from "./components/music/MusicContext";
import FloatingMiniPlayer from "./components/music/FloatingMiniPlayer";
import MusicPlayerModal from "./components/music/MusicPlayerModal";

import { sound } from "./utils/audio";

export default function App() {
  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [introKey, setIntroKey] = useState(0);

  // Global keyboard shortcuts: 'R' toggles Recruiter Mode, 'G' toggles Explore Aryan 2D RPG
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        !e.target.matches("input, textarea") &&
        !e.metaKey &&
        !e.ctrlKey
      ) {
        if (e.key === "r" || e.key === "R") {
          setRecruiterOpen((prev) => !prev);
        } else if (e.key === "g" || e.key === "G") {
          setExploreOpen((prev) => !prev);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleReplayIntro = () => {
    sessionStorage.removeItem("intro_seen");
    sound.playWoosh();
    setIntroKey((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MusicProvider>
      <div className="min-h-screen flex flex-col bg-[var(--color-bg-dark)] text-slate-100 relative selection:bg-[var(--color-accent-primary)] selection:text-black">
        {/* Custom Pointer Reticle */}
        <CustomCursor />

        {/* Cinematic Opening Intro Experience */}
        <CinematicIntro key={introKey} />

        {/* Background Interactive Stardust Aura Canvas */}
        <InteractiveAuraCanvas />

        {/* Navigation Header with Music & Playground */}
        <Navbar
          onOpenRecruiter={() => setRecruiterOpen(true)}
          onOpenExplore={() => setExploreOpen(true)}
        />

        {/* Main Experience Stream */}
        <main className="flex-grow w-full relative z-10">
          <Hero
            onOpenRecruiter={() => setRecruiterOpen(true)}
            onOpenExplore={() => setExploreOpen(true)}
          />
          <Projects />
          <Skills />
          <Playground onOpenExplore={() => setExploreOpen(true)} />
          <Certificates />
          <Experience />
          <Education />
          <Profiles />
          <Contact />
        </main>

        {/* Handcrafted Footer */}
        <Footer onReplayIntro={handleReplayIntro} />

        {/* Interactive Floating Anime Spirit Mascot */}
        <AuraMascot />

        {/* Floating Unobtrusive Music Mini-Player */}
        <FloatingMiniPlayer />

        {/* Full Music Lab Modal */}
        <MusicPlayerModal />

        {/* 15-Second Recruiter Quick-Scan Modal */}
        <RecruiterModal
          isOpen={recruiterOpen}
          onClose={() => setRecruiterOpen(false)}
        />

        {/* EXPLORE ARYAN // 2D RPG Interactive Universe */}
        <ExploreAryanModal
          isOpen={exploreOpen}
          onClose={() => setExploreOpen(false)}
          onOpenPhotoBooth={() => {
            setExploreOpen(false);
            const el = document.getElementById("playground");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          onOpenMusicLab={() => {
            // Handled via useMusic
          }}
          onOpenGame={() => {
            setExploreOpen(false);
            const el = document.getElementById("playground");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />
      </div>
    </MusicProvider>
  );
}
