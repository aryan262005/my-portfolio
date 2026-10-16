import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gamepad2 } from "lucide-react";
import SnakeGame from "./games/SnakeGame";
import Game2048 from "./games/Game2048";
import SudokuGame from "./games/SudokuGame";
import MinesweeperGame from "./games/MinesweeperGame";
import TicTacToeGame from "./games/TicTacToeGame";
import { sound } from "../../utils/audio";

const GAME_META = {
  snake: {
    title: "SNAKE // 01",
    subtitle: "Classic Cyberpunk Grid Navigation",
    component: SnakeGame,
  },
  "2048": {
    title: "2048 // MATRIX MERGE",
    subtitle: "Mathematical Tile Convergence",
    component: Game2048,
  },
  sudoku: {
    title: "SUDOKU // LOGIC ENGINE",
    subtitle: "Algorithmic Precision Matrix",
    component: SudokuGame,
  },
  minesweeper: {
    title: "MINESWEEPER // HAZARD DEFUSER",
    subtitle: "Tactical Subsurface Detection",
    component: MinesweeperGame,
  },
  tictactoe: {
    title: "TIC-TAC-TOE // NEURAL DUEL",
    subtitle: "Player vs Adaptive Minimax AI",
    component: TicTacToeGame,
  },
};

export default function GameModal({ gameId, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!gameId || !GAME_META[gameId]) return null;

  const { title, subtitle, component: GameComponent } = GAME_META[gameId];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-lg rounded-3xl bg-[var(--color-bg-card)]/95 border border-[var(--color-border-accent)] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_50px_var(--color-accent-glow)] overflow-hidden z-10 my-auto backdrop-blur-xl"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 bg-[var(--color-bg-surface)]/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[var(--color-accent-primary)]/10 border border-[var(--color-border-accent)] text-[var(--color-accent-primary)]">
                <Gamepad2 size={18} />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-mono-code flex items-center gap-2">
                  {title}
                </h3>
                <p className="text-[11px] font-mono-code text-slate-400">
                  {subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Game Component Container */}
          <div className="p-5 sm:p-7 bg-[var(--color-bg-dark)]/95">
            <GameComponent />
          </div>

          {/* Footer Controls Hint */}
          <div className="p-3.5 px-6 border-t border-white/10 bg-[var(--color-bg-surface)]/60 flex items-center justify-between text-[11px] font-mono-code text-slate-500">
            <span>Controls: Keyboard WASD/Arrows & Touch</span>
            <span className="text-[var(--color-accent-primary)]">INTERACTIVE PLAYGROUND</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
