import React, { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import { sound } from "../../utils/audio";

const THEMES = [
  { id: "default", name: "Sakura Drift", color: "#ff6b3d", tag: "CORAL" },
  { id: "cyan", name: "Neo Shibuya", color: "#00f2fe", tag: "CYBER" },
  { id: "amber", name: "Shiba Gold", color: "#f59e0b", tag: "WARM" },
  { id: "emerald", name: "Viper Jade", color: "#10b981", tag: "MINT" },
  { id: "violet", name: "Amethyst Void", color: "#a855f7", tag: "VOID" },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState("default");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_theme") || "default";
    setCurrentTheme(saved);
    if (saved === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const changeTheme = (themeId) => {
    sound.playThemeSwitch();
    setCurrentTheme(themeId);
    if (themeId === "default") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", themeId);
    }
    localStorage.setItem("portfolio_theme", themeId);
    setIsOpen(false);
  };

  const activeTheme = THEMES.find((t) => t.id === currentTheme) || THEMES[0];

  return (
    <div className="relative">
      <button
        onClick={() => {
          sound.playClick();
          setIsOpen(!isOpen);
        }}
        title="Switch Aura Theme"
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-[var(--color-accent-primary)]/50 hover:bg-white/10 transition-all text-xs font-mono-code cursor-pointer"
      >
        <span
          className="w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor] transition-colors"
          style={{ backgroundColor: activeTheme.color, color: activeTheme.color }}
        />
        <span className="hidden sm:inline text-slate-300 font-medium">
          {activeTheme.name}
        </span>
        <Sparkles size={13} className="text-[var(--color-accent-primary)] transition-colors" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[var(--color-bg-card)] border border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150 backdrop-blur-xl">
            <div className="px-2.5 py-1.5 text-[10px] font-mono-code uppercase tracking-wider text-slate-400 border-b border-white/5 mb-1 flex items-center justify-between">
              <span>Select Aura Palette</span>
              <span className="text-[var(--color-accent-primary)] font-bold">SYS</span>
            </div>
            {THEMES.map((theme) => {
              const isSelected = currentTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => changeTheme(theme.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                    isSelected
                      ? "bg-white/10 text-white font-medium"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: theme.color,
                        boxShadow: isSelected ? `0 0 10px ${theme.color}` : "none",
                      }}
                    />
                    <span>{theme.name}</span>
                  </div>
                  <span className="text-[9px] font-mono-code text-slate-400 bg-white/5 px-1.5 py-0.5 rounded border border-white/5">
                    {theme.tag}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
