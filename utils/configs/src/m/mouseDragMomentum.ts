import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "mouseDragMomentum",
  name: "Mouse Drag Momentum",
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    fill: {
      color: {
        value: "#ff0000",
        animation: {
          enable: true,
          speed: 20,
          sync: true,
        },
      },
      enable: true,
    },
    shape: {
      type: "circle",
    },
    size: {
      value: {
        min: 20,
        max: 30,
      },
    },
    move: {
      enable: true,
      speed: 6,
    },
  },
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "drag",
      },
    },
    modes: {
      drag: {
        preserveMomentum: true,
      },
    },
  },
  background: {
    color: "#000000",
  },
};

export default options;
