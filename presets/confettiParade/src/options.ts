import type { ISourceOptions } from "@tsparticles/engine";

const lifeDurationNum = 10,
  percent = 100,
  identity = 1,
  thirdFactor = 3,
  third = identity / thirdFactor,
  lifeDuration = lifeDurationNum * third;

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
    },
    shape: {
      type: ["square", "circle"],
    },
    opacity: {
      value: { min: 0, max: 1 },
      animation: {
        enable: true,
        speed: 0.5,
        startValue: "max",
        destroy: "min",
      },
    },
    size: {
      value: 5,
    },
    links: {
      enable: false,
    },
    life: {
      duration: {
        sync: true,
        value: lifeDuration,
      },
      count: 1,
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
      speed: 90,
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
        value: 25,
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
      speed: {
        min: -15,
        max: 15,
      },
    },
  },
  motion: {
    disable: true,
  },
  emitters: [
    {
      name: "confetti-left",
      startCount: 50,
      position: {
        x: 0,
        y: third * percent,
      },
      size: {
        width: 0,
        height: 0,
      },
      rate: {
        delay: 0.1,
        quantity: 10,
      },
      life: {
        duration: 10,
        count: 1,
      },
      particles: {
        move: {
          direction: "top-right",
        },
      },
    },
    {
      name: "confetti-right",
      startCount: 50,
      position: {
        x: 100,
        y: third * percent,
      },
      size: {
        width: 0,
        height: 0,
      },
      rate: {
        delay: 0.1,
        quantity: 10,
      },
      life: {
        duration: 10,
        count: 1,
      },
      particles: {
        move: {
          direction: "top-left",
        },
      },
    },
  ],
};
