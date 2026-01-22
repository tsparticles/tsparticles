import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "namedColors",
  name: "Named Colors",
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    color: {
      value: ["aqua", "deepskyblue", "firebrick", "khaki"],
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 1,
    },
    size: {
      value: {
        min: 3,
        max: 7,
      },
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
