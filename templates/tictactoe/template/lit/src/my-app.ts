import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";
import { confetti } from "@tsparticles/confetti";
import type { ISourceOptions } from "@tsparticles/engine";

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

export class MyApp extends LitElement {
  @state() private board: (Player | null)[] = Array(9).fill(null);
  @state() private currentPlayer: Player = "X";
  @state() private winner: Player | "draw" | null = null;
  @state() private winLine: number[] | null = null;
  @state() private scores = { X: 0, O: 0, draw: 0 };

  get status(): string {
    if (!this.winner) return `${this.currentPlayer}'s turn`;
    if (this.winner === "draw") return "It's a draw!";
    return `${this.winner} wins!`;
  }

  handleMove(index: number): void {
    if (this.board[index] || this.winner) return;
    const board = [...this.board];
    board[index] = this.currentPlayer;
    const result = checkWin(board);
    if (result) {
      this.board = board;
      this.winner = result.winner;
      this.winLine = result.winLine;
      if (result.winner === "draw") this.scores = { ...this.scores, draw: this.scores.draw + 1 };
      else this.scores = { ...this.scores, [result.winner]: this.scores[result.winner] + 1 };
      if (result.winner !== "draw") setTimeout(fireConfettiEffect, 100);
    } else {
      this.board = board;
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }
  }

  handleReset(): void {
    this.board = Array(9).fill(null);
    this.currentPlayer = "X";
    this.winner = null;
    this.winLine = null;
  }

  render() {
    return html`
      <lit-particles id="tsparticles" .options=${particlesOptions}></lit-particles>
      <div id="app">
        <h1>Tic-Tac-Toe</h1>
        <div class="scoreboard">
          <span>X: <strong>${this.scores.X}</strong></span>
          <span>Draws: <strong>${this.scores.draw}</strong></span>
          <span>O: <strong>${this.scores.O}</strong></span>
        </div>
        <div class="turn">${this.status}</div>
        <div class="board">
          ${this.board.map((cell, i) => html`
            <div
              class="cell${cell ? " taken" : ""}${this.winLine?.includes(i) ? " win" : ""}"
              @click=${() => this.handleMove(i)}
            >
              ${cell ?? ""}
            </div>
          `)}
        </div>
        <button class="reset-btn" @click=${this.handleReset}>New Game</button>
      </div>
    `;
  }

  static styles = css`
    :host { display: block; }
    #app { text-align: center; z-index: 10; padding: 1rem; }
    h1 { font-size: 2.5em; margin-bottom: 1rem; background: linear-gradient(135deg, #6c5ce7, #fd79a8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .scoreboard { display: flex; justify-content: center; gap: 2rem; margin-bottom: 1rem; font-size: 1.1em; opacity: 0.8; }
    .turn { font-size: 1.2em; margin-bottom: 1rem; opacity: 0.7; }
    .board { display: grid; grid-template-columns: repeat(3, 100px); grid-template-rows: repeat(3, 100px); gap: 4px; background: rgba(255,255,255,0.1); border-radius: 12px; overflow: hidden; margin: 0 auto; width: fit-content; }
    .cell { display: flex; align-items: center; justify-content: center; font-size: 2.5em; font-weight: 700; background: #12122a; cursor: pointer; transition: background 0.2s; user-select: none; }
    .cell:hover { background: #1a1a3a; }
    .cell.taken { cursor: default; }
    .cell.win { background: rgba(108,92,231,0.3); }
    .reset-btn { margin-top: 1.5rem; padding: 0.7em 2em; font-size: 1em; font-weight: 600; border: none; border-radius: 8px; background: linear-gradient(135deg, #6c5ce7, #a29bfe); color: #fff; cursor: pointer; transition: transform 0.2s; }
    .reset-btn:hover { transform: scale(1.05); }
  `;
}

customElements.define("my-app", MyApp);
