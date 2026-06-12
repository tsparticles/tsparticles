import { Component } from "@angular/core";
import { confetti } from "@tsparticles/confetti";
import type { ISourceOptions } from "@tsparticles/engine";

type Player = "X" | "O";

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  board: (Player | null)[] = Array(9).fill(null);
  currentPlayer: Player = "X";
  winner: Player | "draw" | null = null;
  winLine: number[] | null = null;
  scores = { X: 0, O: 0, draw: 0 };

  particlesOptions: ISourceOptions = {
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

  get status(): string {
    if (!this.winner) return `${this.currentPlayer}'s turn`;
    if (this.winner === "draw") return "It's a draw!";
    return `${this.winner} wins!`;
  }

  private checkWin(board: (Player | null)[]): { winner: Player | "draw"; winLine: number[] } | null {
    for (const pattern of WIN_PATTERNS) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a] as Player, winLine: pattern };
      }
    }
    if (board.every((cell) => cell !== null)) return { winner: "draw" as const, winLine: [] };
    return null;
  }

  private fireConfettiEffect(): void {
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

  handleMove(index: number): void {
    if (this.board[index] || this.winner) return;
    const board = [...this.board];
    board[index] = this.currentPlayer;
    const result = this.checkWin(board);
    if (result) {
      this.board = board;
      this.winner = result.winner;
      this.winLine = result.winLine;
      if (result.winner === "draw") this.scores.draw++;
      else this.scores[result.winner]++;
      if (result.winner !== "draw") setTimeout(() => this.fireConfettiEffect(), 100);
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
}
