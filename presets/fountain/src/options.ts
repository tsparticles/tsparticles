import { type ISourceOptions, MoveDirection, OutMode } from "@tsparticles/engine";

export const options: ISourceOptions = {
  fpsLimit: 120,
  particles: {
    bounce: {
      vertical: {
        value: {
          min: 0.75,
          max: 0.85,
        },
      },
    },
    color: {
      value: ["#3998D0", "#2EB6AF", "#A9BD33", "#FEC73B", "#F89930", "#F45623", "#D62E32", "#EB586E", "#9952CF"],
    },
    number: {
      value: 0,
    },
    destroy: {
      mode: "split",
      split: {
        count: 2,
        factor: {
          value: {
            min: 1.1,
            max: 2,
          },
        },
        rate: {
          value: {
            min: 2,
            max: 3,
          },
        },
      },
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: {
        min: 10,
        max: 20,
      },
    },
    move: {
      enable: true,
      gravity: {
        enable: true,
        maxSpeed: 50,
      },
      speed: {
        min: 10,
        max: 20,
      },
      direction: MoveDirection.none,
      random: false,
      straight: false,
      outModes: {
        bottom: OutMode.split,
        default: OutMode.bounce,
        top: OutMode.none,
      },
    },
  },
  detectRetina: true,
  background: {
    color: "#fff",
  },
  emitters: {
    direction: MoveDirection.top,
    life: {
      count: 0,
      duration: 0.15,
      delay: 3,
    },
    rate: {
      delay: 0.1,
      quantity: 5,
    },
    size: {
      width: 0,
      height: 0,
    },
  },
  trail: {
    enable: true,
    fill: {
      color: "#fff",
    },
    length: 3,
  },
};
