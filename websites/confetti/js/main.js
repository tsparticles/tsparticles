import { appState, updateAnimationState, updateState } from "./state.js";
import "./bottom.js";
import "./explosions.js";
import "./falling.js";
import "./side.js";
import "./single.js";

document.addEventListener("DOMContentLoaded", () => {
  updateAnimationState({
    bottom: true,
  });

  const btnToggleCode = document.getElementById("btnToggleCode");

  btnToggleCode.addEventListener("click", () => {
    updateState({
      code: !appState.code,
    });
  });

  hljs.highlightAll();
});
