import { state, stateButtons, updateState } from "./state.js";

const toggleSingleConfetti = (status) => {
  if (status) {
    tsParticles.loadJSON("tsparticles", "configs/single.json");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const updateSingle = (status) => {
    updateState({
      bottom: false,
      explosions: false,
      side: false,
      falling: false,
      singleExplosion: !status,
    });
  };

  const btnSingleConfetti = document.getElementById("btnSingleConfetti");

  stateButtons.push({
    status: () => state.singleExplosion,
    button: btnSingleConfetti,
    toggle: toggleSingleConfetti,
  });

  btnSingleConfetti.addEventListener("click", () => {
    updateSingle(false);
  });
});
