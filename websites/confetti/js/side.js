import { animationState, animationStateButtons, updateAnimationState } from "./state.js";

const toggleSideConfetti = (status) => {
  if (status) {
    tsParticles.loadJSON("tsparticles", "configs/side.json");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const updateSide = () => {
    updateAnimationState({
      bottom: false,
      explosions: false,
      side: !animationState.side,
      falling: false,
      singleExplosion: false,
    });
  };

  const btnSideConfetti = document.getElementById("btnSideConfetti");

  animationStateButtons.push({
    status: () => animationState.side,
    button: btnSideConfetti,
    toggle: toggleSideConfetti,
  });

  btnSideConfetti.addEventListener("click", () => {
    updateSide();
  });
});
