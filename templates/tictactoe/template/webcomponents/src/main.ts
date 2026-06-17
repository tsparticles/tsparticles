import "./style.css";
import { confetti } from "@tsparticles/confetti";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

type Player = "X" | "O";

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

interface GameState {
  board: (Player | null)[];
  currentPlayer: Player;
  winner: Player | "draw" | null;
  winLine: number[] | null;
  scores: { X: number; O: number; draw: number };
}

let state: GameState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
  winLine: null,
  scores: { X: 0, O: 0, draw: 0 },
};

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

function fireConfettiEffect(): void {
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

function render(): void {
  const boardEl = document.getElementById("board") as HTMLDivElement;
  const turnEl = document.getElementById("turn") as HTMLDivElement;
  const scoreX = document.getElementById("scoreX") as HTMLSpanElement;
  const scoreO = document.getElementById("scoreO") as HTMLSpanElement;
  const scoreDraw = document.getElementById("scoreDraw") as HTMLSpanElement;

  const cells = boardEl.querySelectorAll(".cell");
  cells.forEach((cell, i) => {
    cell.textContent = state.board[i] ?? "";
    cell.classList.toggle("taken", state.board[i] !== null);
    cell.classList.toggle("win", state.winLine?.includes(i) ?? false);
  });

  if (!state.winner) turnEl.textContent = `${state.currentPlayer}'s turn`;
  else if (state.winner === "draw") turnEl.textContent = "It's a draw!";
  else turnEl.textContent = `${state.winner} wins!`;

  scoreX.textContent = String(state.scores.X);
  scoreO.textContent = String(state.scores.O);
  scoreDraw.textContent = String(state.scores.draw);
}

function handleMove(index: number): void {
  if (state.board[index] || state.winner) return;
  const board = [...state.board];
  board[index] = state.currentPlayer;
  const result = checkWin(board);
  if (result) {
    state = { ...state, board, winner: result.winner, winLine: result.winLine };
    if (result.winner === "draw") state.scores.draw++;
    else state.scores[result.winner]++;
    if (result.winner !== "draw") setTimeout(fireConfettiEffect, 100);
  } else {
    state = { ...state, board, currentPlayer: state.currentPlayer === "X" ? "O" : "X" };
  }
  render();
}

function handleReset(): void {
  state = {
    ...state,
    board: Array(9).fill(null),
    currentPlayer: "X",
    winner: null,
    winLine: null,
  };
  render();
}

document.getElementById("board")?.addEventListener("click", (e) => {
  const cell = (e.target as HTMLElement).closest(".cell") as HTMLElement | null;
  if (!cell) return;
  const index = parseInt(cell.dataset.index ?? "", 10);
  if (!isNaN(index)) handleMove(index);
});

document.getElementById("resetBtn")?.addEventListener("click", handleReset);

render();

(async () => {
  await loadSlim(tsParticles);
  await tsParticles.load({
    id: "tsparticles",
    options: {
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
    },
  });
})();
