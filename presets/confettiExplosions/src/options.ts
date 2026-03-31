import type { ISourceOptions } from "@tsparticles/engine";

export const options: ISourceOptions = {
  palette: "confetti",
  background: {
    color: {
      value: "",
    },
  },
  fullScreen: {
    enable: true,
    zIndex: 100,
  },
  particles: {
    number: {
      value: 0,
      density: {
        enable: true,
      },
    },
    shape: {
      type: ["square", "circle"],
    },
    size: {
      value: {
        min: 3,
        max: 5,
      },
    },
    opacity: {
      value: { min: 0, max: 1 },
      animation: {
        enable: true,
        startValue: "max",
        destroy: "min",
        speed: 3,
      },
    },
    move: {
      angle: {
        value: 45,
        offset: 0,
      },
      drift: 0,
      enable: true,
      gravity: {
        enable: true,
        acceleration: 9.81,
      },
      speed: {
        min: 15,
        max: 25,
      },
      decay: 0.1,
      random: true,
      straight: false,
      outModes: {
        default: "destroy",
        top: "none",
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
      value: {
        min: 0,
        max: 360,
      },
      animation: {
        enable: true,
        speed: 60,
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
      mode: "both",
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
  emitters: {
    name: "confetti",
    size: {
      width: 0,
      height: 0,
    },
    rate: {
      delay: 0,
      quantity: 50,
    },
    life: {
      count: 0,
      duration: 0.1,
      delay: 0.4,
    },
  },
  motion: {
    disable: true,
  },
};
