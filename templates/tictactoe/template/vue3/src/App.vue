<script setup lang="ts">
import { reactive, computed } from "vue";
import { confetti } from "@tsparticles/confetti";
import type { ISourceOptions } from "@tsparticles/engine";

type Player = "X" | "O";

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

const state = reactive({
  board: Array(9).fill(null) as (Player | null)[],
  currentPlayer: "X" as Player,
  winner: null as Player | "draw" | null,
  winLine: null as number[] | null,
  scores: { X: 0, O: 0, draw: 0 },
});

const status = computed(() => {
  if (!state.winner) return `${state.currentPlayer}'s turn`;
  if (state.winner === "draw") return "It's a draw!";
  return `${state.winner} wins!`;
});

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

function handleMove(index: number) {
  if (state.board[index] || state.winner) return;
  const board = [...state.board];
  board[index] = state.currentPlayer;
  const result = checkWin(board);
  if (result) {
    state.board = board;
    state.winner = result.winner;
    state.winLine = result.winLine;
    if (result.winner === "draw") state.scores.draw++;
    else state.scores[result.winner]++;
    if (result.winner !== "draw") setTimeout(fireConfettiEffect, 100);
  } else {
    state.board = board;
    state.currentPlayer = state.currentPlayer === "X" ? "O" : "X";
  }
}

function handleReset() {
  state.board = Array(9).fill(null);
  state.currentPlayer = "X";
  state.winner = null;
  state.winLine = null;
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
</script>

<template>
  <vue-particles id="tsparticles" :options="particlesOptions" />
  <div id="app">
    <h1>Tic-Tac-Toe</h1>
    <div class="scoreboard">
      <span>X: <strong>{{ state.scores.X }}</strong></span>
      <span>Draws: <strong>{{ state.scores.draw }}</strong></span>
      <span>O: <strong>{{ state.scores.O }}</strong></span>
    </div>
    <div class="turn">{{ status }}</div>
    <div class="board">
      <div
        v-for="(cell, i) in state.board"
        :key="i"
        :class="['cell', { taken: cell, win: state.winLine?.includes(i) }]"
        @click="handleMove(i)"
      >
        {{ cell }}
      </div>
    </div>
    <button class="reset-btn" @click="handleReset">New Game</button>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0a1a;
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  color: #fff;
}

#app {
  text-align: center;
  z-index: 10;
  padding: 1rem;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #6c5ce7, #fd79a8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.scoreboard {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
  font-size: 1.1em;
  opacity: 0.8;
}

.turn {
  font-size: 1.2em;
  margin-bottom: 1rem;
  opacity: 0.7;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  margin: 0 auto;
  width: fit-content;
}

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5em;
  font-weight: 700;
  background: #12122a;
  cursor: pointer;
  transition: background 0.2s;
  user-select: none;
}

.cell:hover {
  background: #1a1a3a;
}

.cell.taken {
  cursor: default;
}

.cell.win {
  background: rgba(108, 92, 231, 0.3);
}

.reset-btn {
  margin-top: 1.5rem;
  padding: 0.7em 2em;
  font-size: 1em;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #6c5ce7, #a29bfe);
  color: #fff;
  cursor: pointer;
  transition: transform 0.2s;
}

.reset-btn:hover {
  transform: scale(1.05);
}
</style>
