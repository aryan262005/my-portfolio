import React, { useState, useEffect } from "react";
import { RotateCcw, Sparkles, Check, Delete } from "lucide-react";
import { sound } from "../../../utils/audio";

const PUZZLES = {
  easy: {
    initial: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9],
    ],
    solution: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ],
  },
  medium: {
    initial: [
      [0, 0, 0, 6, 0, 0, 4, 0, 0],
      [7, 0, 0, 0, 0, 3, 6, 0, 0],
      [0, 0, 0, 0, 9, 1, 0, 8, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 5, 0, 1, 8, 0, 0, 0, 3],
      [0, 0, 0, 3, 0, 6, 0, 4, 5],
      [0, 4, 0, 2, 0, 0, 0, 6, 0],
      [9, 0, 3, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 1, 0, 0],
    ],
    solution: [
      [5, 8, 9, 6, 7, 2, 4, 3, 1],
      [7, 1, 4, 8, 5, 3, 6, 9, 2],
      [2, 3, 6, 4, 9, 1, 5, 8, 7],
      [1, 7, 2, 5, 4, 9, 8, 3, 6],
      [4, 5, 8, 1, 8, 7, 9, 2, 3],
      [3, 9, 1, 3, 2, 6, 7, 4, 5],
      [8, 4, 5, 2, 1, 8, 3, 6, 9],
      [9, 6, 3, 7, 3, 4, 2, 1, 8],
      [6, 2, 7, 9, 6, 5, 1, 7, 4],
    ],
  },
};

export default function SudokuGame() {
  const [difficulty, setDifficulty] = useState("easy");
  const [board, setBoard] = useState(() => PUZZLES.easy.initial.map((r) => [...r]));
  const [selectedCell, setSelectedCell] = useState({ r: 0, c: 0 });
  const [isCompleted, setIsCompleted] = useState(false);

  const initialPreset = PUZZLES[difficulty].initial;
  const solutionPreset = PUZZLES[difficulty].solution;

  const handleDifficulty = (diff) => {
    sound.playClick();
    setDifficulty(diff);
    setBoard(PUZZLES[diff].initial.map((r) => [...r]));
    setSelectedCell({ r: 0, c: 0 });
    setIsCompleted(false);
  };

  const handleCellClick = (r, c) => {
    sound.playClick();
    setSelectedCell({ r, c });
  };

  const handleSetNumber = (num) => {
    if (initialPreset[selectedCell.r][selectedCell.c] !== 0) return;
    sound.playClick();
    const newBoard = board.map((row, r) =>
      row.map((val, c) => {
        if (r === selectedCell.r && c === selectedCell.c) return num;
        return val;
      })
    );
    setBoard(newBoard);

    // Check completion
    const complete = newBoard.every((row, r) =>
      row.every((val, c) => val === solutionPreset[r][c])
    );
    if (complete) {
      sound.playFanfare();
      setIsCompleted(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= 9) {
        handleSetNumber(num);
      } else if (e.key === "Backspace" || e.key === "Delete" || e.key === "0") {
        handleSetNumber(0);
      } else if (e.key === "ArrowUp") {
        setSelectedCell((prev) => ({ ...prev, r: Math.max(0, prev.r - 1) }));
      } else if (e.key === "ArrowDown") {
        setSelectedCell((prev) => ({ ...prev, r: Math.min(8, prev.r + 1) }));
      } else if (e.key === "ArrowLeft") {
        setSelectedCell((prev) => ({ ...prev, c: Math.max(0, prev.c - 1) }));
      } else if (e.key === "ArrowRight") {
        setSelectedCell((prev) => ({ ...prev, c: Math.min(8, prev.c + 1) }));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="flex flex-col items-center select-none max-w-sm mx-auto">
      {/* Controls & Difficulty */}
      <div className="w-full flex items-center justify-between mb-3 text-xs font-mono-code">
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => handleDifficulty("easy")}
            className={`px-2 py-0.5 rounded text-[10px] ${
              difficulty === "easy" ? "bg-[var(--color-accent-primary)] text-black font-bold" : "text-slate-400"
            }`}
          >
            EASY
          </button>
          <button
            onClick={() => handleDifficulty("medium")}
            className={`px-2 py-0.5 rounded text-[10px] ${
              difficulty === "medium" ? "bg-[var(--color-accent-primary)] text-black font-bold" : "text-slate-400"
            }`}
          >
            MED
          </button>
        </div>

        <button
          onClick={() => handleDifficulty(difficulty)}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-[10px]"
        >
          <RotateCcw size={12} />
          <span>Reset</span>
        </button>
      </div>

      {/* 9x9 Board */}
      <div className="relative w-[300px] h-[300px] sm:w-[330px] sm:h-[330px] bg-[var(--color-bg-dark)] border-2 border-[var(--color-border-accent)] rounded-xl overflow-hidden grid grid-cols-9 grid-rows-9 shadow-[0_0_25px_var(--color-accent-glow)]">
        {board.map((row, r) =>
          row.map((val, c) => {
            const isInitial = initialPreset[r][c] !== 0;
            const isSelected = selectedCell.r === r && selectedCell.c === c;
            const isSameRowOrCol = selectedCell.r === r || selectedCell.c === c;
            const isRightBorder = c === 2 || c === 5;
            const isBottomBorder = r === 2 || r === 5;

            return (
              <button
                key={`${r}-${c}`}
                onClick={() => handleCellClick(r, c)}
                className={`flex items-center justify-center font-mono-code font-bold text-xs sm:text-sm border-r border-b border-white/10 transition-colors ${
                  isRightBorder ? "border-r-2 border-r-[var(--color-border-accent)]" : ""
                } ${isBottomBorder ? "border-b-2 border-b-[var(--color-border-accent)]" : ""} ${
                  isSelected
                    ? "bg-[var(--color-accent-primary)]/30 text-white ring-1 ring-[var(--color-accent-primary)] z-10"
                    : isSameRowOrCol
                    ? "bg-white/[0.04]"
                    : "bg-transparent"
                } ${isInitial ? "text-[var(--color-accent-primary)] font-black" : "text-white"}`}
              >
                {val !== 0 ? val : ""}
              </button>
            );
          })
        )}

        {/* Victory Overlay */}
        {isCompleted && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-4">
            <Sparkles size={32} className="text-[var(--color-accent-primary)] mb-2 animate-bounce" />
            <h4 className="text-xl font-bold font-mono-code text-white">SUDOKU SOLVED!</h4>
            <p className="text-xs text-slate-300 font-mono-code mb-4">Precision Engineering Aura</p>
            <button
              onClick={() => handleDifficulty("easy")}
              className="px-4 py-2 rounded-xl bg-[var(--color-accent-primary)] text-black font-bold font-mono-code text-xs"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Number Pad for Mobile/Click */}
      <div className="mt-3 grid grid-cols-10 gap-1 w-full max-w-[330px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleSetNumber(num)}
            className="py-2 rounded-lg bg-white/5 hover:bg-[var(--color-accent-primary)]/20 hover:border-[var(--color-border-accent)] text-white font-mono-code font-bold text-xs border border-white/10 cursor-pointer"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleSetNumber(0)}
          title="Erase"
          className="py-2 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-mono-code font-bold text-xs border border-rose-500/30 flex items-center justify-center cursor-pointer"
        >
          <Delete size={14} />
        </button>
      </div>
    </div>
  );
}

