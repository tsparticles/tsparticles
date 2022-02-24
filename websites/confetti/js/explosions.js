import { animationState, animationStateButtons, updateAnimationState } from "./state.js";

const toggleConfettiExplosions = (status) => {
  if (status) {
    tsParticles.loadJSON("tsparticles", "configs/explosions.json");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const updateExplosions = () => {
    updateAnimationState({
      bottom: false,
      explosions: !animationState.explosions,
      side: false,
      falling: false,
      singleExplosion: false,
    });
  };

  const btnConfettiExplosions = document.getElementById(
    "btnConfettiExplosions"
  );

  animationStateButtons.push({
    status: () => animationState.explosions,
    button: btnConfettiExplosions,
    toggle: toggleConfettiExplosions,
  });

  btnConfettiExplosions.addEventListener("click", () => {
    updateExplosions();
  });
});
