import Controller from "@ember/controller";
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { confetti } from "@tsparticles/confetti";

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export default class ApplicationController extends Controller {
  @tracked board = Array(9).fill(null);
  @tracked currentPlayer = "X";
  @tracked winner = null;
  @tracked winLine = null;
  @tracked scores = { X: 0, O: 0, draw: 0 };

  particlesOptions = {
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

  get status() {
    if (!this.winner) return `${this.currentPlayer}'s turn`;
    if (this.winner === "draw") return "It's a draw!";
    return `${this.winner} wins!`;
  }

  isWinLine(index) {
    return this.winLine?.includes(index) ?? false;
  }

  checkWin(board) {
    for (const pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a], winLine: pattern };
      }
    }
    if (board.every((cell) => cell !== null)) return { winner: "draw", winLine: [] };
    return null;
  }

  fireConfettiEffect() {
    const count = 200;
    const defaults = { origin: { y: 0.7 } };
    const fire = (particleRatio, opts) => {
      confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
    };
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  }

  @action
  handleMove(index) {
    if (this.board[index] || this.winner) return;
    const board = [...this.board];
    board[index] = this.currentPlayer;
    const result = this.checkWin(board);
    if (result) {
      this.board = board;
      this.winner = result.winner;
      this.winLine = result.winLine;
      if (result.winner === "draw") this.scores = { ...this.scores, draw: this.scores.draw + 1 };
      else this.scores = { ...this.scores, [result.winner]: this.scores[result.winner] + 1 };
      if (result.winner !== "draw") setTimeout(() => this.fireConfettiEffect(), 100);
    } else {
      this.board = board;
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }
  }

  @action
  handleReset() {
    this.board = Array(9).fill(null);
    this.currentPlayer = "X";
    this.winner = null;
    this.winLine = null;
  }
}
