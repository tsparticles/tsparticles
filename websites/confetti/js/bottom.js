import { animationState, animationStateButtons, updateAnimationState, updateCode } from "./state.js";
import { optionsToCode } from "./utils.js";

const toggleBottomConfetti = (status) => {
  if (status) {
    tsParticles.loadJSON("tsparticles", "configs/bottom.json").then(optionsToCode);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const updateBottom = () => {
    updateAnimationState({
      bottom: !animationState.bottom,
      explosions: false,
      side: false,
      falling: false,
      singleExplosion: false,
    });
  };

  const btnBottomConfetti = document.getElementById("btnBottomConfetti");

  animationStateButtons.push({
    status: () => animationState.bottom,
    button: btnBottomConfetti,
    toggle: toggleBottomConfetti,
  });

  btnBottomConfetti.addEventListener("click", () => {
    updateBottom();
  });
});
