import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "poisson",
  name: "Poisson",
  particles: {
    number: {
      value: 100,
    },
    paint: {
      fill: {
        color: {
          value: "#f0f0f0",
        },
        enable: true,
      },
    },
    links: {
      enable: true,
      distance: 200,
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 1,
    },
    size: {
      value: {
        min: 4,
        max: 6,
      },
    },
    move: {
      enable: true,
      speed: 2,
    },
  },
  background: {
    color: "#0d0d0d",
  },
  poisson: {
    enable: true,
  },
};

export default options;
