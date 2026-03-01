import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "matrix",
  name: "Matrix",
  fpsLimit: 30,
  particles: {
    number: {
      value: 300,
      density: {
        enable: true,
      },
    },
    color: {
      value: {
        h: 120,
        s: 100,
        l: 50,
      },
      animation: {
        l: {
          enable: true,
          speed: 70,
          sync: false,
          min: 30,
          max: 100,
        },
      },
    },
    shape: {
      type: "matrix",
      options: {
        matrix: {
          interval: {
            min: 30,
            max: 60,
          },
        },
      },
    },
    effect: {
      type: "shadow",
      options: {
        shadow: {
          color: "#00ff41",
          blur: 7,
        },
      },
    },
    size: {
      value: 10,
    },
    move: {
      enable: true,
      direction: "bottom",
      straight: true,
      speed: { min: 8, max: 15 },
    },
  },
  trail: {
    enable: true,
    length: 10,
    fill: {
      color: "#000",
    },
  },
  poisson: {
    enable: true,
  },
  background: {
    color: "#000000",
  },
};

export default options;
