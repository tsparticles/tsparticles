import { state, stateButtons, updateState } from "./state.js";

const toggleConfettiExplosions = (status) => {
  if (status) {
    tsParticles.loadJSON("tsparticles", "configs/explosions.json");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const updateExplosions = () => {
    updateState({
      bottom: false,
      explosions: !state.explosions,
      side: false,
      falling: false,
      singleExplosion: false,
    });
  };

  const btnConfettiExplosions = document.getElementById(
    "btnConfettiExplosions"
  );

  stateButtons.push({
    status: () => state.explosions,
    button: btnConfettiExplosions,
    toggle: toggleConfettiExplosions,
  });

  btnConfettiExplosions.addEventListener("click", () => {
    updateExplosions();
  });
});
