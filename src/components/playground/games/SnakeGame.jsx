import React, { useState, useEffect, useRef, useCallback } from "react";
import { Play, RotateCcw, Trophy, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from "lucide-react";
import { sound } from "../../../utils/audio";

const GRID_SIZE = 18;
const INITIAL_SNAKE = [
  { x: 8, y: 8 },
  { x: 7, y: 8 },
  { x: 6, y: 8 },
];
const INITIAL_DIRECTION = { x: 1, y: 0 };

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 12, y: 8 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("snake_high_score") || "0", 10);
  });
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const directionRef = useRef(direction);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const generateFood = useCallback((currentSnake) => {
    while (true) {
      const newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const collision = currentSnake.some(
        (seg) => seg.x === newFood.x && seg.y === newFood.y
      );
      if (!collision) return newFood;
    }
  }, []);

  const resetGame = () => {
    sound.playClick();
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    directionRef.current = INITIAL_DIRECTION;
    setFood({ x: 12, y: 8 });
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setIsPlaying(true);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPlaying || isGameOver) return;

      const current = directionRef.current;
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (current.y === 0) {
            setDirection({ x: 0, y: -1 });
            directionRef.current = { x: 0, y: -1 };
          }
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (current.y === 0) {
            setDirection({ x: 0, y: 1 });
            directionRef.current = { x: 0, y: 1 };
          }
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (current.x === 0) {
            setDirection({ x: -1, y: 0 });
            directionRef.current = { x: -1, y: 0 };
          }
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (current.x === 0) {
            setDirection({ x: 1, y: 0 });
            directionRef.current = { x: 1, y: 0 };
          }
          break;
        case " ":
          setIsPaused((p) => !p);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, isGameOver]);

  // Main game loop
  useEffect(() => {
    if (!isPlaying || isPaused || isGameOver) return;

    const speed = Math.max(70, 140 - Math.floor(score / 3) * 6);
    const interval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + directionRef.current.x,
          y: head.y + directionRef.current.y,
        };

        // Wall collisions
        if (
          newHead.x < 0 ||
          newHead.x >= GRID_SIZE ||
          newHead.y < 0 ||
          newHead.y >= GRID_SIZE
        ) {
          setIsGameOver(true);
          sound.playWoosh();
          return prevSnake;
        }

        // Self collision
        if (
          prevSnake.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
        ) {
          setIsGameOver(true);
          sound.playWoosh();
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Eat food
        if (newHead.x === food.x && newHead.y === food.y) {
          sound.playClick();
          setScore((s) => {
            const nextScore = s + 10;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              localStorage.setItem("snake_high_score", nextScore.toString());
            }
            return nextScore;
          });
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, isPaused, isGameOver, food, generateFood, score, highScore]);

  const handleDpad = (dir) => {
    sound.playClick();
    const current = directionRef.current;
    if (dir === "UP" && current.y === 0) {
      setDirection({ x: 0, y: -1 });
      directionRef.current = { x: 0, y: -1 };
    }
    if (dir === "DOWN" && current.y === 0) {
      setDirection({ x: 0, y: 1 });
      directionRef.current = { x: 0, y: 1 };
    }
    if (dir === "LEFT" && current.x === 0) {
      setDirection({ x: -1, y: 0 });
      directionRef.current = { x: -1, y: 0 };
    }
    if (dir === "RIGHT" && current.x === 0) {
      setDirection({ x: 1, y: 0 });
      directionRef.current = { x: 1, y: 0 };
    }
  };

  return (
    <div className="flex flex-col items-center select-none max-w-sm mx-auto">
      {/* Score Header */}
      <div className="w-full flex items-center justify-between px-3 py-2 bg-black/40 rounded-xl border border-white/10 mb-3 text-xs font-mono-code">
        <div className="flex items-center gap-1.5 text-[var(--color-accent-primary)]">
          <span>SCORE:</span>
          <span className="text-white font-bold text-sm">{score}</span>
        </div>
        <div className="flex items-center gap-1.5 text-amber-400">
          <Trophy size={13} />
          <span>BEST:</span>
          <span className="text-white font-bold text-sm">{highScore}</span>
        </div>
      </div>

      {/* Game Board Canvas */}
      <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] bg-[var(--color-bg-dark)] border-2 border-[var(--color-border-accent)] rounded-2xl overflow-hidden shadow-[0_0_30px_var(--color-accent-glow)]">
        {/* Subtle Grid Lines */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(34,211,238,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,211,238,0.3) 1px, transparent 1px)`,
            backgroundSize: `${340 / GRID_SIZE}px ${340 / GRID_SIZE}px`,
          }}
        />

        {/* Snake Segments */}
        {snake.map((seg, idx) => {
          const isHead = idx === 0;
          return (
            <div
              key={`${seg.x}-${seg.y}-${idx}`}
              className={`absolute rounded-sm transition-all duration-75 ${
                isHead
                  ? "bg-[var(--color-accent-primary)] shadow-[0_0_10px_var(--color-accent-primary)] z-10"
                  : "bg-[var(--color-accent-secondary)]/80"
              }`}
              style={{
                width: `${100 / GRID_SIZE}%`,
                height: `${100 / GRID_SIZE}%`,
                left: `${(seg.x / GRID_SIZE) * 100}%`,
                top: `${(seg.y / GRID_SIZE) * 100}%`,
              }}
            />
          );
        })}

        {/* Food */}
        <div
          className="absolute rounded-full bg-rose-500 shadow-[0_0_12px_#f43f5e] animate-pulse"
          style={{
            width: `${100 / GRID_SIZE}%`,
            height: `${100 / GRID_SIZE}%`,
            left: `${(food.x / GRID_SIZE) * 100}%`,
            top: `${(food.y / GRID_SIZE) * 100}%`,
          }}
        />

        {/* Overlay: Game Not Started */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center">
            <h4 className="text-xl font-bold font-mono-code text-white mb-2">
              CYBER SNAKE
            </h4>
            <p className="text-xs text-slate-400 font-mono-code mb-4">
              Use Arrow keys, WASD, or the D-pad below to navigate.
            </p>
            <button
              onClick={resetGame}
              className="px-6 py-2.5 rounded-xl bg-[var(--color-accent-primary)] hover:opacity-90 text-black font-mono-code font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_var(--color-accent-glow)] cursor-pointer"
            >
              <Play size={14} fill="currentColor" />
              <span>START GAME</span>
            </button>
          </div>
        )}

        {/* Overlay: Game Over */}
        {isGameOver && (
          <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
            <h4 className="text-2xl font-bold font-mono-code text-rose-500 mb-1">
              SYSTEM CRASH
            </h4>
            <p className="text-xs text-slate-400 font-mono-code mb-1">
              Score: <span className="text-white font-bold">{score}</span>
            </p>
            <button
              onClick={resetGame}
              className="mt-4 px-5 py-2 rounded-xl bg-[var(--color-accent-primary)] hover:opacity-90 text-black font-mono-code font-bold text-xs flex items-center gap-2 shadow-[0_0_15px_var(--color-accent-glow)] cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>TRY AGAIN</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile Touch D-Pad */}
      <div className="mt-4 flex flex-col items-center gap-1 sm:hidden">
        <button
          onClick={() => handleDpad("UP")}
          className="w-12 h-12 rounded-xl bg-white/10 active:bg-[var(--color-accent-primary)]/30 flex items-center justify-center text-white"
        >
          <ArrowUp size={20} />
        </button>
        <div className="flex items-center gap-6">
          <button
            onClick={() => handleDpad("LEFT")}
            className="w-12 h-12 rounded-xl bg-white/10 active:bg-[var(--color-accent-primary)]/30 flex items-center justify-center text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={() => handleDpad("DOWN")}
            className="w-12 h-12 rounded-xl bg-white/10 active:bg-[var(--color-accent-primary)]/30 flex items-center justify-center text-white"
          >
            <ArrowDown size={20} />
          </button>
          <button
            onClick={() => handleDpad("RIGHT")}
            className="w-12 h-12 rounded-xl bg-white/10 active:bg-[var(--color-accent-primary)]/30 flex items-center justify-center text-white"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

