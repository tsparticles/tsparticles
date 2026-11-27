import { type GameState, createGameState, makeMove, resetBoard } from "./game/game-state";
import "./style.css";

import { renderBoard, setupBoard } from "./game/board";
import { engine } from "../particlesEngine";
import { loadSlim } from "@tsparticles/slim";

let state: GameState = createGameState();

const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;

function handleMove(index: number): void {
  const newState = makeMove(state, index);

  if (newState !== state) {
    state = newState;
    renderBoard(state);
  }
}

function handleReset(): void {
  state = resetBoard(state);
  renderBoard(state);
}

setupBoard(handleMove);
resetBtn.addEventListener("click", handleReset);

renderBoard(state);

(async () => {
  await loadSlim(engine);

  await engine.load({
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
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "out" },
        },
      },
      detectRetina: true,
    },
  });
})();
