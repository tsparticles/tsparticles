import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "lch",
  name: "LCH",
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    color: {
      value: "lch(63.94% 33.1 0.67)",
      animation: {
        enable: true,
        speed: 20,
        sync: true,
      },
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: {
        min: 1,
        max: 3,
      },
    },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      repulse: {
        distance: 200,
      },
      push: {
        quantity: 4,
      },
    },
  },
  background: {
    color: "#000000",
  },
};

export default options;
