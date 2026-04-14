import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "mouseDestroyExplode",
  name: "Mouse Destroy Explode Stress",
  particles: {
    number: {
      value: 500,
    },
    destroy: {
      mode: "explode",
      explode: {
        maxSizeFactor: 10,
        speed: 2,
      },
    },
    paint: {
      stroke: {
        color: {
          value: ["#60a5fa", "#22d3ee", "#22c55e", "#fde047", "#f97316", "#ef4444"],
        },
        width: 2,
      },
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
      speed: 4,
      direction: "inside",
      outModes: "destroy",
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: ["attract", "destroy", "repulse"],
      },
    },
    modes: {
      destroy: {
        distance: 75,
      },
      repulse: {
        distance: 75,
      },
      attract: {
        distance: 1920,
        speed: 7,
      },
    },
  },
  background: {
    color: "#030712",
  },
  emitters: {
    fill: false,
    size: {
      width: 100,
      height: 100,
    },
    position: {
      x: 50,
      y: 50,
    },
    rate: {
      delay: 0.1,
      quantity: 20,
    },
  },
};

export default options;
