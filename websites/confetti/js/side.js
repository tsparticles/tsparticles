import {
  animationState,
  animationStateButtons,
  getParticlesShapes,
  updateAnimationState,
} from "./state.js";
import { optionsToCode } from "./utils.js";

const config = () => {
  return {
    fullScreen: {
      enable: false,
    },
    emitters: [
      {
        position: {
          x: 0,
          y: 30,
        },
        rate: {
          quantity: 5,
          delay: 0.15,
        },
        particles: {
          move: {
            direction: "top-right",
            outModes: {
              top: "none",
              left: "none",
              default: "destroy",
            },
          },
        },
      },
      {
        position: {
          x: 100,
          y: 30,
        },
        rate: {
          quantity: 5,
          delay: 0.15,
        },
        particles: {
          move: {
            direction: "top-left",
            outModes: {
              top: "none",
              right: "none",
              default: "destroy",
            },
          },
        },
      },
    ],
    particles: {
      color: {
        value: ["#ffffff", "#FF0000"],
      },
      move: {
        decay: 0.05,
        direction: "top",
        enable: true,
        gravity: {
          enable: true,
        },
        outModes: {
          top: "none",
          default: "destroy",
        },
        speed: { min: 10, max: 20 },
      },
      number: {
        value: 0,
      },
      opacity: {
        value: 1,
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        direction: "random",
        animation: {
          enable: true,
          speed: 30,
        },
      },
      tilt: {
        direction: "random",
        enable: true,
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 30,
        },
      },
      size: {
        value: { min: 0, max: 2 },
        animation: {
          enable: true,
          startValue: "min",
          count: 1,
          speed: 16,
          sync: true,
        },
      },
      roll: {
        darken: {
          enable: true,
          value: 25,
        },
        enable: true,
        speed: {
          min: 5,
          max: 15,
        },
      },
      wobble: {
        distance: 30,
        enable: true,
        speed: {
          min: -7,
          max: 7,
        },
      },
      shape: getParticlesShapes(),
    },
  };
};

const refreshSideConfetti = () => {
  tsParticles
    //.loadJSON("tsparticles", "configs/side.json")
    .load("tsparticles", config())
    .then(optionsToCode);
};

const toggleSideConfetti = (status) => {
  if (status) {
    refreshSideConfetti();
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
    refresh: refreshSideConfetti,
  });

  btnSideConfetti.addEventListener("click", () => {
    updateSide();
  });
});
