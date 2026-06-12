"use client";

import { useState, useCallback } from "react";
import Particles from "@tsparticles/react";
import { confetti } from "@tsparticles/confetti";
import type { ISourceOptions } from "@tsparticles/engine";
import Providers from "./providers";

type Player = "X" | "O";

interface GameState {
  board: (Player | null)[];
  currentPlayer: Player;
  winner: Player | "draw" | null;
  winLine: number[] | null;
  scores: { X: number; O: number; draw: number };
}

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function createInitialState(): GameState {
  return {
    board: Array(9).fill(null),
    currentPlayer: "X",
    winner: null,
    winLine: null,
    scores: { X: 0, O: 0, draw: 0 },
  };
}

function checkWin(board: (Player | null)[]): { winner: Player | "draw"; winLine: number[] } | null {
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, winLine: pattern };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { winner: "draw" as const, winLine: [] };
  }
  return null;
}

function fireConfettiEffect() {
  const count = 200;
  const defaults = { origin: { y: 0.7 } };
  const fire = (particleRatio: number, opts: Record<string, unknown>) => {
    confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
  };
  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

const particlesOptions: ISourceOptions = {
  fullScreen: { enable: true, zIndex: -1 },
  background: { color: { value: "#0a0a1a" } },
  fpsLimit: 60,
  particles: {
    number: { value: 30, density: { enable: true } },
    color: { value: ["#6c5ce7", "#a29bfe"] },
    shape: { type: "circle" },
    opacity: { value: 0.2, random: true },
    size: { value: { min: 1, max: 2 } },
    move: { enable: true, speed: 0.5, direction: "none", random: true, straight: false, outModes: { default: "out" } },
  },
  detectRetina: true,
};

export default function Home() {
  const [state, setState] = useState<GameState>(createInitialState);

  const handleMove = useCallback((index: number) => {
    setState((prev) => {
      if (prev.board[index] || prev.winner) return prev;
      const board = [...prev.board];
      board[index] = prev.currentPlayer;
      const result = checkWin(board);
      if (result) {
        const scores = { ...prev.scores };
        if (result.winner === "draw") scores.draw++;
        else scores[result.winner]++;
        if (result.winner !== "draw") {
          setTimeout(fireConfettiEffect, 100);
        }
        return { ...prev, board, winner: result.winner, winLine: result.winLine, scores };
      }
      return { ...prev, board, currentPlayer: prev.currentPlayer === "X" ? "O" : "X" };
    });
  }, []);

  function handleReset() {
    setState((prev) => ({
      ...prev,
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: null,
      winLine: null,
    }));
  }

  const status = state.winner
    ? state.winner === "draw" ? "It's a draw!" : `${state.winner} wins!`
    : `${state.currentPlayer}'s turn`;

  return (
    <Providers>
      <Particles id="tsparticles" options={particlesOptions} />
      <div id="app" style={{
        textAlign: "center", zIndex: 10, padding: "1rem",
      }}>
        <h1 style={{
          fontSize: "2.5em", marginBottom: "1rem",
          background: "linear-gradient(135deg, #6c5ce7, #fd79a8)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          Tic-Tac-Toe
        </h1>
        <div className="scoreboard" style={{
          display: "flex", justifyContent: "center", gap: "2rem",
          marginBottom: "1rem", fontSize: "1.1em", opacity: 0.8,
        }}>
          <span>X: <strong>{state.scores.X}</strong></span>
          <span>Draws: <strong>{state.scores.draw}</strong></span>
          <span>O: <strong>{state.scores.O}</strong></span>
        </div>
        <div className="turn" style={{ fontSize: "1.2em", marginBottom: "1rem", opacity: 0.7 }}>
          {status}
        </div>
        <div className="board" style={{
          display: "grid", gridTemplateColumns: "repeat(3, 100px)",
          gridTemplateRows: "repeat(3, 100px)", gap: "4px",
          background: "rgba(255,255,255,0.1)", borderRadius: "12px",
          overflow: "hidden", margin: "0 auto", width: "fit-content",
        }}>
          {state.board.map((cell, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "2.5em", fontWeight: 700, background: "#12122a",
                cursor: cell ? "default" : "pointer", transition: "background 0.2s",
                userSelect: "none", color: "#fff",
                ...(state.winLine?.includes(i) ? { background: "rgba(108,92,231,0.3)" } : {}),
              }}
              onClick={() => handleMove(i)}
            >
              {cell}
            </div>
          ))}
        </div>
        <button
          style={{
            marginTop: "1.5rem", padding: "0.7em 2em", fontSize: "1em",
            fontWeight: 600, border: "none", borderRadius: "8px",
            background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
            color: "#fff", cursor: "pointer", transition: "transform 0.2s",
          }}
          onClick={handleReset}
        >
          New Game
        </button>
      </div>
    </Providers>
  );
}
