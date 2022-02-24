import { animationState, animationStateButtons, updateAnimationState } from "./state.js";
import { optionsToCode } from "./utils.js";

const toggleFallingConfetti = (status) => {
  if (status) {
    tsParticles.loadJSON("tsparticles", "configs/falling.json").then(optionsToCode);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const updateFalling = () => {
    updateAnimationState({
      bottom: false,
      explosions: false,
      side: false,
      falling: !animationState.falling,
      singleExplosion: false,
    });
  };

  const btnFallingConfetti = document.getElementById("btnFallingConfetti");

  animationStateButtons.push({
    status: () => animationState.falling,
    button: btnFallingConfetti,
    toggle: toggleFallingConfetti,
  });

  btnFallingConfetti.addEventListener("click", () => {
    updateFalling();
  });
});
