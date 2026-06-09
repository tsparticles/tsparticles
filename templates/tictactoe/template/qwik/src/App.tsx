import { component$, useSignal, $ } from "@builder.io/qwik";
import Particles from "@tsparticles/qwik";
import { loadSlim } from "@tsparticles/slim";
import { confetti } from "@tsparticles/confetti";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

type Player = "X" | "O";

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWin(board: (Player | null)[]): { winner: Player | "draw"; winLine: number[] } | null {
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, winLine: pattern };
    }
  }
  if (board.every((cell) => cell !== null)) return { winner: "draw" as const, winLine: [] };
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

async function init(engine: Engine): Promise<void> {
  await loadSlim(engine);
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

interface GameState {
  board: (Player | null)[];
  currentPlayer: Player;
  winner: Player | "draw" | null;
  winLine: number[] | null;
  scores: { X: number; O: number; draw: number };
}

export default component$(() => {
  const state = useSignal<GameState>({
    board: Array(9).fill(null),
    currentPlayer: "X",
    winner: null,
    winLine: null,
    scores: { X: 0, O: 0, draw: 0 },
  });

  const handleMove = $((index: number) => {
    const prev = state.value;
    if (prev.board[index] || prev.winner) return;
    const board = [...prev.board];
    board[index] = prev.currentPlayer;
    const result = checkWin(board);
    if (result) {
      const scores = { ...prev.scores };
      if (result.winner === "draw") scores.draw++;
      else scores[result.winner]++;
      if (result.winner !== "draw") setTimeout(fireConfettiEffect, 100);
      state.value = { ...prev, board, winner: result.winner, winLine: result.winLine, scores };
    } else {
      state.value = { ...prev, board, currentPlayer: prev.currentPlayer === "X" ? "O" : "X" };
    }
  });

  const handleReset = $(() => {
    state.value = {
      ...state.value,
      board: Array(9).fill(null),
      currentPlayer: "X",
      winner: null,
      winLine: null,
    };
  });

  const status = state.value.winner
    ? state.value.winner === "draw" ? "It's a draw!" : `${state.value.winner} wins!`
    : `${state.value.currentPlayer}'s turn`;

  return (
    <>
      <Particles init={init} id="tsparticles" options={particlesOptions} />
      <div id="app">
        <h1>Tic-Tac-Toe</h1>
        <div class="scoreboard">
          <span>X: <strong>{state.value.scores.X}</strong></span>
          <span>Draws: <strong>{state.value.scores.draw}</strong></span>
          <span>O: <strong>{state.value.scores.O}</strong></span>
        </div>
        <div class="turn">{status}</div>
        <div class="board">
          {state.value.board.map((cell, i) => (
            <div
              key={i}
              class={`cell${cell ? " taken" : ""}${state.value.winLine?.includes(i) ? " win" : ""}`}
              onClick$={() => handleMove(i)}
            >
              {cell}
            </div>
          ))}
        </div>
        <button class="reset-btn" onClick$={handleReset}>New Game</button>
      </div>
    </>
  );
});
