import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "mouseDestroy",
  name: "Mouse Destroy",
  particles: {
    number: {
      value: 120,
      density: {
        enable: true,
      },
    },
    paint: {
      fill: {
        color: {
          value: ["#7dd3fc", "#34d399", "#fbbf24", "#f97316", "#ef4444"],
        },
        enable: true,
      },
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.8,
    },
    size: {
      value: {
        min: 2,
        max: 5,
      },
    },
    move: {
      enable: true,
      speed: 1.8,
      outModes: "bounce",
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "destroy",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      destroy: {
        distance: 130,
      },
      push: {
        quantity: 6,
      },
    },
  },
  background: {
    color: "#05070b",
  },
};

export default options;
