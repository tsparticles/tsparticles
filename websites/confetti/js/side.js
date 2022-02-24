import { state, stateButtons, updateState } from "./state.js";

const toggleSideConfetti = (status) => {
  if (status) {
    tsParticles.loadJSON("tsparticles", "configs/side.json");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const updateSide = () => {
    updateState({
      bottom: false,
      explosions: false,
      side: !state.side,
      falling: false,
      singleExplosion: false,
    });
  };

  const btnSideConfetti = document.getElementById("btnSideConfetti");

  stateButtons.push({
    status: () => state.side,
    button: btnSideConfetti,
    toggle: toggleSideConfetti,
  });

  btnSideConfetti.addEventListener("click", () => {
    updateSide();
  });
});
