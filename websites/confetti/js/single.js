import { animationState, animationStateButtons, updateAnimationState } from "./state.js";

const toggleSingleConfetti = (status) => {
  if (status) {
    tsParticles.loadJSON("tsparticles", "configs/single.json");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const updateSingle = (status) => {
    updateAnimationState({
      bottom: false,
      explosions: false,
      side: false,
      falling: false,
      singleExplosion: !status,
    });
  };

  const btnSingleConfetti = document.getElementById("btnSingleConfetti");

  animationStateButtons.push({
    status: () => animationState.singleExplosion,
    button: btnSingleConfetti,
    toggle: toggleSingleConfetti,
  });

  btnSingleConfetti.addEventListener("click", () => {
    updateSingle(false);
  });
});
