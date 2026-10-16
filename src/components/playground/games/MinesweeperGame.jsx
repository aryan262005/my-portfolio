import React, { useState, useEffect, useCallback } from "react";
import { Flag, Bomb, RotateCcw, Clock, Smile, Frown, Sparkles } from "lucide-react";
import { sound } from "../../../utils/audio";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

export default function MinesweeperGame() {
  const [grid, setGrid] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [flagMode, setFlagMode] = useState(false); // Mobile toggle
  const [mineCount, setMineCount] = useState(MINES);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const initGame = useCallback(() => {
    sound.playClick();
    let newGrid = Array(ROWS)
      .fill(null)
      .map(() =>
        Array(COLS).fill(null).map(() => ({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          count: 0,
        }))
      );

    // Place mines
    let placed = 0;
    while (placed < MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c].isMine = true;
        placed++;
      }
    }

    // Count adjacent mines
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newGrid[nr][nc].isMine) {
                count++;
              }
            }
          }
          newGrid[r][c].count = count;
        }
      }
    }

    setGrid(newGrid);
    setIsGameOver(false);
    setHasWon(false);
    setMineCount(MINES);
    setTimer(0);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Timer loop
  useEffect(() => {
    let interval;
    if (isRunning && !isGameOver && !hasWon) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isGameOver, hasWon]);

  // Flood fill reveal
  const revealCell = (r, c) => {
    if (isGameOver || hasWon || grid[r][c].isFlagged || grid[r][c].isRevealed) return;

    if (!isRunning) setIsRunning(true);

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));

    if (newGrid[r][c].isMine) {
      // Hit a mine!
      sound.playWoosh();
      setIsGameOver(true);
      // Reveal all mines
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          if (newGrid[row][col].isMine) newGrid[row][col].isRevealed = true;
        }
      }
      setGrid(newGrid);
      return;
    }

    sound.playClick();

    const flood = (cr, cc) => {
      if (cr < 0 || cr >= ROWS || cc < 0 || cc >= COLS) return;
      if (newGrid[cr][cc].isRevealed || newGrid[cr][cc].isFlagged) return;

      newGrid[cr][cc].isRevealed = true;

      if (newGrid[cr][cc].count === 0 && !newGrid[cr][cc].isMine) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr !== 0 || dc !== 0) flood(cr + dr, cc + dc);
          }
        }
      }
    };

    flood(r, c);

    // Check Win
    let unrevealedSafe = 0;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (!newGrid[row][col].isMine && !newGrid[row][col].isRevealed) {
          unrevealedSafe++;
        }
      }
    }

    if (unrevealedSafe === 0) {
      sound.playFanfare();
      setHasWon(true);
    }

    setGrid(newGrid);
  };

  const toggleFlag = (r, c, e) => {
    if (e) e.preventDefault();
    if (isGameOver || hasWon || grid[r][c].isRevealed) return;

    sound.playClick();
    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const wasFlagged = newGrid[r][c].isFlagged;
    newGrid[r][c].isFlagged = !wasFlagged;
    setMineCount((m) => (wasFlagged ? m + 1 : m - 1));
    setGrid(newGrid);
  };

  const handleCellAction = (r, c) => {
    if (flagMode) {
      toggleFlag(r, c);
    } else {
      revealCell(r, c);
    }
  };

  const getNumberColor = (count) => {
    switch (count) {
      case 1: return "text-[var(--color-accent-primary)]";
      case 2: return "text-teal-400";
      case 3: return "text-rose-400";
      case 4: return "text-amber-400";
      default: return "text-purple-400";
    }
  };

  return (
    <div className="flex flex-col items-center select-none max-w-sm mx-auto">
      {/* Header bar */}
      <div className="w-full flex items-center justify-between px-3 py-2 bg-black/40 rounded-xl border border-white/10 mb-3 text-xs font-mono-code">
        <div className="flex items-center gap-1.5 text-rose-400">
          <Bomb size={14} />
          <span>{String(mineCount).padStart(2, "0")}</span>
        </div>

        <button
          onClick={initGame}
          className="p-1 rounded bg-white/5 hover:bg-white/10 text-white cursor-pointer"
        >
          {isGameOver ? <Frown size={18} className="text-rose-400" /> : hasWon ? <Sparkles size={18} className="text-[var(--color-accent-primary)] animate-spin" /> : <Smile size={18} className="text-amber-400" />}
        </button>

        <div className="flex items-center gap-1.5 text-[var(--color-accent-primary)]">
          <Clock size={14} />
          <span>{String(timer).padStart(3, "0")}s</span>
        </div>
      </div>

      {/* Grid */}
      <div className="relative w-[300px] h-[300px] sm:w-[320px] sm:h-[320px] p-2 rounded-2xl bg-[var(--color-bg-dark)] border border-[var(--color-border-accent)] grid grid-cols-9 gap-1 shadow-[0_0_25px_var(--color-accent-glow)]">
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <button
              key={`${r}-${c}`}
              onClick={() => handleCellAction(r, c)}
              onContextMenu={(e) => toggleFlag(r, c, e)}
              className={`rounded font-mono-code font-bold text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer ${
                cell.isRevealed
                  ? cell.isMine
                    ? "bg-rose-500/40 border border-rose-500 text-rose-300"
                    : "bg-white/[0.04] border border-white/5"
                  : "bg-[var(--color-accent-primary)]/10 hover:bg-[var(--color-accent-primary)]/20 border border-[var(--color-border-accent)]/40 active:scale-95"
              }`}
            >
              {cell.isRevealed ? (
                cell.isMine ? (
                  <Bomb size={13} className="text-rose-400 animate-pulse" />
                ) : cell.count > 0 ? (
                  <span className={getNumberColor(cell.count)}>{cell.count}</span>
                ) : null
              ) : cell.isFlagged ? (
                <Flag size={11} className="text-amber-400 fill-amber-400" />
              ) : null}
            </button>
          ))
        )}

        {/* Win Overlay */}
        {hasWon && (
          <div className="absolute inset-0 bg-black/90 rounded-2xl flex flex-col items-center justify-center p-4">
            <Sparkles size={32} className="text-[var(--color-accent-primary)] mb-2" />
            <h4 className="text-xl font-bold font-mono-code text-white">MINES CLEARED!</h4>
            <p className="text-xs text-slate-300 font-mono-code mb-4">Completed in {timer} seconds</p>
            <button
              onClick={initGame}
              className="px-4 py-2 rounded-xl bg-[var(--color-accent-primary)] hover:opacity-90 text-black font-bold font-mono-code text-xs"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Flag Mode Toggle (Great for mobile!) */}
      <div className="mt-3 flex items-center gap-2 text-xs font-mono-code text-slate-400">
        <button
          onClick={() => {
            sound.playClick();
            setFlagMode((f) => !f);
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
            flagMode
              ? "bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-[0_0_10px_rgba(245,158,11,0.3)]"
              : "bg-white/5 border-white/10 text-slate-400"
          }`}
        >
          <Flag size={13} className={flagMode ? "fill-amber-400" : ""} />
          <span>{flagMode ? "FLAG MODE ON" : "REVEAL MODE"}</span>
        </button>
        <span className="text-[10px] text-slate-500">(Right click or toggle to flag)</span>
      </div>
    </div>
  );
}

