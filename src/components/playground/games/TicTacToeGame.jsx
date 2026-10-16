import React, { useState } from "react";
import { RotateCcw, Bot, User, Sparkles } from "lucide-react";
import { sound } from "../../../utils/audio";

const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function calculateWinner(squares) {
  for (let combo of WINNING_COMBOS) {
    const [a, b, c] = combo;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], combo };
    }
  }
  if (squares.every((sq) => sq !== null)) {
    return { winner: "Draw", combo: [] };
  }
  return null;
}

function computeAiMove(currentBoard) {
  const emptyIndices = currentBoard
    .map((val, idx) => (val === null ? idx : null))
    .filter((val) => val !== null);

  if (emptyIndices.length === 0) return currentBoard;

  for (let idx of emptyIndices) {
    const copy = [...currentBoard];
    copy[idx] = "O";
    if (calculateWinner(copy)?.winner === "O") {
      return copy;
    }
  }

  for (let idx of emptyIndices) {
    const copy = [...currentBoard];
    copy[idx] = "X";
    if (calculateWinner(copy)?.winner === "X") {
      copy[idx] = "O";
      return copy;
    }
  }

  if (currentBoard[4] === null) {
    const copy = [...currentBoard];
    copy[4] = "O";
    return copy;
  }

  const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  const copy = [...currentBoard];
  copy[randomIdx] = "O";
  return copy;
}

export default function TicTacToeGame() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [vsAi, setVsAi] = useState(true);
  const [scores, setScores] = useState({ x: 0, o: 0, draws: 0 });

  const winInfo = calculateWinner(board);
  const winner = winInfo?.winner;

  const handleGameEnd = (endWinner) => {
    if (endWinner === "Draw") {
      setScores((s) => ({ ...s, draws: s.draws + 1 }));
    } else if (endWinner === "X") {
      sound.playFanfare();
      setScores((s) => ({ ...s, x: s.x + 1 }));
    } else if (endWinner === "O") {
      sound.playWoosh();
      setScores((s) => ({ ...s, o: s.o + 1 }));
    }
  };

  const finalizeAiMove = (nextBoard) => {
    sound.playClick();
    setBoard(nextBoard);
    const result = calculateWinner(nextBoard);
    if (result) {
      handleGameEnd(result.winner);
    } else {
      setIsXNext(true);
    }
  };

  const makeAiMove = (currentBoard) => {
    const nextBoard = computeAiMove(currentBoard);
    finalizeAiMove(nextBoard);
  };

  const handleClick = (index) => {
    if (board[index] || winner) return;

    sound.playClick();
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result) {
      handleGameEnd(result.winner);
      return;
    }

    if (vsAi && isXNext) {
      setTimeout(() => {
        makeAiMove(newBoard);
      }, 250);
    } else {
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    sound.playClick();
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="flex flex-col items-center select-none max-w-sm mx-auto">
      <div className="w-full flex items-center justify-between mb-3 text-xs font-mono-code">
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
          <button
            onClick={() => {
              setVsAi(true);
              resetGame();
            }}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] cursor-pointer ${
              vsAi ? "bg-[var(--color-accent-primary)] text-black font-bold" : "text-slate-400"
            }`}
          >
            <Bot size={11} />
            <span>VS AI</span>
          </button>
          <button
            onClick={() => {
              setVsAi(false);
              resetGame();
            }}
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] cursor-pointer ${
              !vsAi ? "bg-[var(--color-accent-primary)] text-black font-bold" : "text-slate-400"
            }`}
          >
            <User size={11} />
            <span>2-PLAYER</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono-code">
          <span className="text-[var(--color-accent-primary)] font-bold">X: {scores.x}</span>
          <span className="text-slate-500">|</span>
          <span className="text-rose-400 font-bold">O: {scores.o}</span>
        </div>

        <button
          onClick={resetGame}
          className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-300"
        >
          <RotateCcw size={13} />
        </button>
      </div>

      <div className="relative w-[280px] h-[280px] sm:w-[300px] sm:h-[300px] p-2 rounded-2xl bg-[var(--color-bg-dark)] border border-[var(--color-border-accent)] grid grid-cols-3 gap-2 shadow-[0_0_25px_var(--color-accent-glow)]">
        {board.map((cell, idx) => {
          const isWinningCell = winInfo?.combo?.includes(idx);
          return (
            <button
              key={idx}
              onClick={() => handleClick(idx)}
              className={`rounded-xl border font-mono-code font-black text-3xl sm:text-4xl flex items-center justify-center transition-all cursor-pointer ${
                isWinningCell
                  ? "bg-[var(--color-accent-primary)]/25 border-[var(--color-accent-primary)] shadow-[0_0_15px_var(--color-accent-glow)] scale-102"
                  : "bg-white/[0.03] hover:bg-white/[0.06] border-white/10"
              }`}
            >
              {cell === "X" && (
                <span className="text-[var(--color-accent-primary)] animate-in zoom-in-50 duration-150">X</span>
              )}
              {cell === "O" && (
                <span className="text-rose-400 animate-in zoom-in-50 duration-150">O</span>
              )}
            </button>
          );
        })}

        {winner && (
          <div className="absolute inset-0 bg-black/85 rounded-2xl flex flex-col items-center justify-center p-4 animate-in fade-in duration-150">
            {winner === "Draw" ? (
              <h4 className="text-xl font-bold font-mono-code text-slate-300 mb-2">DRAW GAME!</h4>
            ) : (
              <>
                <Sparkles size={28} className="text-[var(--color-accent-primary)] mb-1" />
                <h4 className="text-2xl font-bold font-mono-code text-white mb-2">
                  <span className={winner === "X" ? "text-[var(--color-accent-primary)]" : "text-rose-400"}>
                    {winner}
                  </span>{" "}
                  WINS!
                </h4>
              </>
            )}
            <button
              onClick={resetGame}
              className="mt-2 px-4 py-2 rounded-xl bg-[var(--color-accent-primary)] hover:opacity-90 text-black font-bold font-mono-code text-xs cursor-pointer"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 text-[11px] font-mono-code text-slate-500">
        {!winner && (
          <span>
            Current Turn:{" "}
            <span className={isXNext ? "text-[var(--color-accent-primary)] font-bold" : "text-rose-400 font-bold"}>
              {isXNext ? "Player X" : vsAi ? "AI (O)" : "Player O"}
            </span>
          </span>
        )}
      </div>
    </div>
  );
}

