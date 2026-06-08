import { type GameState, makeMove } from "./game-state";
import { fireConfetti } from "./confetti-effect";

const boardEl = document.getElementById("board") as HTMLDivElement;
const turnEl = document.getElementById("turnIndicator") as HTMLDivElement;
const scoreX = document.getElementById("scoreX") as HTMLSpanElement;
const scoreO = document.getElementById("scoreO") as HTMLSpanElement;
const scoreDraw = document.getElementById("scoreDraw") as HTMLSpanElement;

export function renderBoard(state: GameState): void {
  const cells = boardEl.querySelectorAll(".cell");

  cells.forEach((cell, i) => {
    cell.textContent = state.board[i] ?? "";
    cell.classList.toggle("taken", state.board[i] !== null);
    cell.classList.toggle("win", state.winLine?.includes(i) ?? false);
  });

  if (!state.winner) {
    turnEl.textContent = `${state.currentPlayer}'s turn`;
  } else if (state.winner === "draw") {
    turnEl.textContent = "It's a draw!";
  } else {
    turnEl.textContent = `${state.winner} wins!`;
    fireConfetti();
  }

  scoreX.textContent = String(state.scores.X);
  scoreO.textContent = String(state.scores.O);
  scoreDraw.textContent = String(state.scores.draw);
}

export function setupBoard(onMove: (index: number) => void): void {
  boardEl.addEventListener("click", (e) => {
    const cell = (e.target as HTMLElement).closest(".cell") as HTMLElement | null;

    if (!cell) {
      return;
    }

    const index = parseInt(cell.dataset.index ?? "", 10);

    if (isNaN(index)) {
      return;
    }

    onMove(index);
  });
}
