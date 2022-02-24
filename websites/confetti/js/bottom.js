import { state, stateButtons, updateState } from "./state.js";

const toggleBottomConfetti = (status) => {
  if (status) {
    tsParticles.loadJSON("tsparticles", "configs/bottom.json");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const updateBottom = () => {
    updateState({
      bottom: !state.bottom,
      explosions: false,
      side: false,
      falling: false,
      singleExplosion: false,
    });
  };

  const btnBottomConfetti = document.getElementById("btnBottomConfetti");

  stateButtons.push({
    status: () => state.bottom,
    button: btnBottomConfetti,
    toggle: toggleBottomConfetti,
  });

  btnBottomConfetti.addEventListener("click", () => {
    updateBottom();
  });
});
