import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "pathGridPath",
  name: "Path Grid Path",
  particles: {
    color: {
      value: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
    },
    move: {
      enable: true,
      outModes: "out",
      speed: { min: 1, max: 3 },
      path: {
        enable: true,
        options: {
          cellSize: 40,
        },
        generator: "gridPathGenerator",
      },
    },
    number: {
      value: 80,
    },
    opacity: {
      value: 1,
    },
    shape: {
      type: "circle",
    },
    effect: {
      type: "trail",
      options: {
        trail: {
          length: {
            min: 30,
            max: 50,
          },
        },
      },
    },
    size: {
      value: 3,
    },
  },
  background: {
    color: "#000000",
  },
};

export default options;
