import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "test",
  name: "Test",
  background: {
    color: {
      value: "#000",
    },
  },
  particles: {
    groups: {
      z5000: {
        number: {
          value: 70,
        },
        color: {
          value: "#f00",
        },
        zIndex: {
          value: 50,
        },
      },
      z7500: {
        number: {
          value: 30,
        },
        color: {
          value: "#0f0",
        },
        zIndex: {
          value: 75,
        },
      },
      z2500: {
        number: {
          value: 50,
        },
        color: {
          value: "#00f",
        },
        zIndex: {
          value: 25,
        },
      },
      z1000: {
        number: {
          value: 40,
        },
        color: {
          value: "#ff0",
        },
        zIndex: {
          value: 10,
        },
      },
    },
    zIndex: {
      value: 5,
      opacityRate: 0.5,
      sizeRate: 1,
      velocityRate: 1,
    },
    number: {
      value: 300,
    },
    color: {
      value: "#fff",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.8,
    },
    size: {
      value: 69,
    },
    move: {
      enable: true,
      speed: 3,
      direction: 0,
      angle: 0,
      outModes: {
        default: "destroy",
      },
    },
  },
  emitters: {
    autoPlay: true,
    fill: false,
    life: {
      wait: false,
    },
    rate: {
      quantity: 1,
      delay: 2,
    },
    shape: {
      type: "square",
    },
    startCount: 0,
    size: {
      mode: "percent",
      height: 100,
      width: 0,
    },
    particles: {
      shape: {
        type: "square",
      },
    },
    position: {
      x: 50,
      y: 50,
    },
  },
};

export default options;
