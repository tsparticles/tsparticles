import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "emitterPaths",
  name: "Emitter Paths",
  particles: {
    number: {
      value: 0,
    },
    paint: {
      fill: {
        color: {
          value: "#1a1a1a",
        },
        enable: true,
      },
    },
    move: {
      enable: true,
      outModes: "destroy",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 1,
    },
    size: {
      value: 3,
    },
  },
  background: {
    color: "#f5f7fa",
  },
  emitters: [
    {
      position: {
        x: 33,
        y: 50,
      },
      rate: {
        value: 0.5,
      },
      particles: {
        life: {
          count: 1,
          duration: {
            value: 10,
          },
        },
        move: {
          path: {
            clamp: false,
            enable: true,
            delay: {
              value: 0,
            },
            generator: "polygonPathGenerator",
            options: {
              sides: 6,
              turnSteps: 30,
              angle: 30,
            },
          },
        },
      },
    },
    {
      position: {
        x: 67,
        y: 50,
      },
      rate: {
        value: 0.5,
      },
      particles: {
        move: {
          path: {
            clamp: false,
            enable: true,
            delay: {
              value: 0,
            },
            generator: "curvesPathGenerator",
          },
        },
      },
    },
  ],
  trail: {
    enable: true,
    fill: { color: "#f0f0f0" },
    length: 20,
  },
};

export default options;
