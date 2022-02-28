import {
  animationState,
  animationStateButtons,
  updateAnimationState,
  getParticlesShapes,
} from "./state.js";
import { optionsToCode } from "./utils.js";

const config = () => {
  return {
    fullScreen: {
      enable: false,
    },
    emitters: {
      position: {
        x: 50,
        y: 100,
      },
      rate: {
        quantity: 5,
        delay: 0.15,
      },
    },
    particles: {
      color: {
        value: ["#1E00FF", "#FF0061", "#E1FF00", "#00FF9E"],
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
        speed: { min: 75, max: 150 },
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
        value: 3,
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
        enlighten: {
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

const refreshBottomConfetti = () => {
  tsParticles
    .load("tsparticles", config())
    //.loadJSON("tsparticles", "configs/bottom.json")
    .then(optionsToCode);
};

const toggleBottomConfetti = (status) => {
  if (status) {
    refreshBottomConfetti();
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
    refresh: refreshBottomConfetti,
  });

  btnBottomConfetti.addEventListener("click", () => {
    updateBottom();
  });
});
