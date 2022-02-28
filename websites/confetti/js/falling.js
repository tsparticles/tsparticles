import {
  animationState,
  animationStateButtons,
  getParticlesShapes,
  updateAnimationState,
} from "./state.js";
import { optionsToCode } from "./utils.js";

const config = () => {
  return {
    particles: {
      color: {
        value: ["#FFFFFF", "#FFd700"]
      },
      move: {
        direction: "bottom",
        enable: true,
        outModes: {
          default: "out",
        },
        size: true,
        speed: {
          min: 1,
          max: 3,
        },
      },
      number: {
        value: 500,
        density: {
          enable: true,
          area: 800,
        },
      },
      opacity: {
        value: 1,
        animation: {
          enable: false,
          startValue: "max",
          destroy: "min",
          speed: 0.3,
          sync: true,
        },
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        direction: "random",
        move: true,
        animation: {
          enable: true,
          speed: 60,
        },
      },
      tilt: {
        direction: "random",
        enable: true,
        move: true,
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 60,
        },
      },
      shape: getParticlesShapes(),
      size: {
        value: {
          min: 2,
          max: 4,
        },
      },
      roll: {
        darken: {
          enable: true,
          value: 30,
        },
        enlighten: {
          enable: true,
          value: 30,
        },
        enable: true,
        speed: {
          min: 15,
          max: 25,
        },
      },
      wobble: {
        distance: 30,
        enable: true,
        move: true,
        speed: {
          min: -15,
          max: 15,
        },
      },
    },
  };
};

const refreshFallingConfetti = () => {
  tsParticles
    //.loadJSON("tsparticles", "configs/falling.json")
    .load("tsparticles", config())
    .then(optionsToCode);
};

const toggleFallingConfetti = (status) => {
  if (status) {
    refreshFallingConfetti();
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
    refresh: refreshFallingConfetti,
  });

  btnFallingConfetti.addEventListener("click", () => {
    updateFalling();
  });
});
