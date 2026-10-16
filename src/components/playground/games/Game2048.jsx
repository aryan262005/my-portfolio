import React, { useState, useEffect, useCallback, useRef } from "react";
import { RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { sound } from "../../../utils/audio";

const SIZE = 4;

function addRandom(currentBoard) {
  const emptyCells = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (currentBoard[r][c] === 0) emptyCells.push({ r, c });
    }
  }
  if (emptyCells.length === 0) return currentBoard;
  const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  const newBoard = currentBoard.map((row) => [...row]);
  newBoard[randomCell.r][randomCell.c] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
}

function initBoard() {
  let b = Array(SIZE)
    .fill(null)
    .map(() => Array(SIZE).fill(0));
  b = addRandom(b);
  b = addRandom(b);
  return b;
}

function checkGameOver(grid) {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (grid[r][c] === 0) return false;
      if (r < SIZE - 1 && grid[r][c] === grid[r + 1][c]) return false;
      if (c < SIZE - 1 && grid[r][c] === grid[r][c + 1]) return false;
    }
  }
  return true;
}

export default function Game2048() {
  const [board, setBoard] = useState(() => initBoard());
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem("2048_best_score") || "0", 10);
  });
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const resetGame = () => {
    sound.playClick();
    setBoard(initBoard());
    setScore(0);
    setGameOver(false);
    setHasWon(false);
  };

  const move = useCallback((direction) => {
    let newScore = score;
    let current = board.map((row) => [...row]);

    const rotateClockwise = (matrix) => {
      return matrix[0].map((_, index) => matrix.map((row) => row[index]).reverse());
    };

    if (direction === "RIGHT") {
      current = rotateClockwise(rotateClockwise(current));
    } else if (direction === "UP") {
      current = rotateClockwise(rotateClockwise(rotateClockwise(current)));
    } else if (direction === "DOWN") {
      current = rotateClockwise(current);
    }

    let moved = false;
    const nextBoard = current.map((row) => {
      let filtered = row.filter((val) => val !== 0);
      for (let i = 0; i < filtered.length - 1; i++) {
        if (filtered[i] === filtered[i + 1]) {
          filtered[i] *= 2;
          newScore += filtered[i];
          if (filtered[i] === 2048) setHasWon(true);
          filtered.splice(i + 1, 1);
          moved = true;
        }
      }
      while (filtered.length < SIZE) {
        filtered.push(0);
      }
      if (filtered.some((val, idx) => val !== row[idx])) moved = true;
      return filtered;
    });

    let finalBoard = nextBoard;
    if (direction === "RIGHT") {
      finalBoard = rotateClockwise(rotateClockwise(finalBoard));
    } else if (direction === "UP") {
      finalBoard = rotateClockwise(finalBoard);
    } else if (direction === "DOWN") {
      finalBoard = rotateClockwise(rotateClockwise(rotateClockwise(finalBoard)));
    }

    if (moved) {
      sound.playClick();
      const updated = addRandom(finalBoard);
      setBoard(updated);
      setScore(newScore);
      if (newScore > bestScore) {
        setBestScore(newScore);
        localStorage.setItem("2048_best_score", newScore.toString());
      }

      if (checkGameOver(updated)) {
        setGameOver(true);
        sound.playWoosh();
      }
    }
  }, [board, score, bestScore]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "s", "a", "d"].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") move("LEFT");
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") move("RIGHT");
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") move("UP");
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") move("DOWN");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e) => {
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 30) move("RIGHT");
      else if (dx < -30) move("LEFT");
    } else {
      if (dy > 30) move("DOWN");
      else if (dy < -30) move("UP");
    }
  };

  const getTileStyle = (val) => {
    switch (val) {
      case 2:
        return "bg-[var(--color-accent-primary)]/15 text-[var(--color-accent-primary)] border-[var(--color-border-accent)]";
      case 4:
        return "bg-teal-900/60 text-teal-200 border-teal-500/30";
      case 8:
        return "bg-amber-900/50 text-amber-200 border-amber-500/40";
      case 16:
        return "bg-orange-900/60 text-orange-200 border-orange-500/50";
      case 32:
        return "bg-rose-900/60 text-rose-200 border-rose-500/60";
      case 64:
        return "bg-purple-900/60 text-purple-200 border-purple-500/70";
      case 128:
      case 256:
      case 512:
        return "bg-[var(--color-accent-primary)]/30 text-white font-extrabold border-[var(--color-accent-primary)] shadow-[0_0_15px_var(--color-accent-glow)]";
      case 1024:
      case 2048:
        return "bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] text-black font-black shadow-[0_0_25px_var(--color-accent-glow)]";
      default:
        return "bg-white/[0.03] text-transparent border-transparent";
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="flex flex-col items-center select-none max-w-sm mx-auto"
    >
      <div className="w-full flex items-center justify-between px-3 py-2 bg-black/40 rounded-xl border border-white/10 mb-3 text-xs font-mono-code">
        <div className="flex items-center gap-1.5 text-[var(--color-accent-primary)]">
          <span>SCORE:</span>
          <span className="text-white font-bold text-sm">{score}</span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-400">
          <Trophy size={13} />
          <span>BEST:</span>
          <span className="text-white font-bold text-sm">{bestScore}</span>
        </div>
        <button
          onClick={resetGame}
          className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      <div className="relative w-[300px] h-[300px] sm:w-[320px] sm:h-[320px] p-3 rounded-2xl bg-[var(--color-bg-dark)] border border-[var(--color-border-accent)] shadow-[0_0_30px_var(--color-accent-glow)] grid grid-cols-4 gap-2.5">
        {board.map((row, r) =>
          row.map((val, c) => (
            <div
              key={`${r}-${c}`}
              className={`rounded-xl border flex items-center justify-center font-mono-code font-bold transition-all duration-100 ${
                val > 512 ? "text-lg" : "text-xl"
              } ${getTileStyle(val)}`}
            >
              {val !== 0 ? val : ""}
            </div>
          ))
        )}

        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/90 rounded-2xl flex flex-col items-center justify-center p-4">
            <h4 className="text-2xl font-bold font-mono-code text-rose-500 mb-2">GAME OVER</h4>
            <button
              onClick={resetGame}
              className="px-5 py-2 rounded-xl bg-[var(--color-accent-primary)] hover:opacity-90 text-black font-mono-code font-bold text-xs"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Win */}
        {hasWon && (
          <div className="absolute inset-0 bg-black/90 rounded-2xl flex flex-col items-center justify-center p-4">
            <h4 className="text-2xl font-bold font-mono-code text-[var(--color-accent-primary)] mb-2">2048 REACHED!</h4>
            <p className="text-xs text-slate-300 font-mono-code mb-3">Legendary Builder Aura</p>
            <button
              onClick={resetGame}
              className="px-5 py-2 rounded-xl bg-[var(--color-accent-primary)] hover:opacity-90 text-black font-mono-code font-bold text-xs"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Mobile Swipe / Arrow Controls */}
      <div className="mt-3 flex items-center justify-between gap-2 sm:hidden text-xs text-slate-400 font-mono-code">
        <span>Swipe on board or use buttons:</span>
        <div className="flex gap-1">
          <button onClick={() => move("LEFT")} className="p-2 bg-white/10 rounded-lg text-white"><ArrowLeft size={16} /></button>
          <button onClick={() => move("UP")} className="p-2 bg-white/10 rounded-lg text-white"><ArrowUp size={16} /></button>
          <button onClick={() => move("DOWN")} className="p-2 bg-white/10 rounded-lg text-white"><ArrowDown size={16} /></button>
          <button onClick={() => move("RIGHT")} className="p-2 bg-white/10 rounded-lg text-white"><ArrowRight size={16} /></button>
        </div>
      </div>
    </div>
  );
}

