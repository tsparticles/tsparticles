import { updateState } from "./state.js";
import "./bottom.js";
import "./explosions.js";
import "./falling.js";
import "./side.js";
import "./single.js";

document.addEventListener("DOMContentLoaded", () => {
  updateState({
    bottom: true,
  });
});
