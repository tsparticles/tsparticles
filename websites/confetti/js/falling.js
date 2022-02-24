import { state, stateButtons, updateState } from "./state.js";

const toggleFallingConfetti = (status) => {
  if (status) {
    tsParticles.loadJSON("tsparticles", "configs/falling.json");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const updateFalling = () => {
    updateState({
      bottom: false,
      explosions: false,
      side: false,
      falling: !state.falling,
      singleExplosion: false,
    });
  };

  const btnFallingConfetti = document.getElementById("btnFallingConfetti");

  stateButtons.push({
    status: () => state.falling,
    button: btnFallingConfetti,
    toggle: toggleFallingConfetti,
  });

  btnFallingConfetti.addEventListener("click", () => {
    updateFalling();
  });
});
