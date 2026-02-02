import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "pathLevy",
  name: "Path Levy",
  particles: {
    color: {
      value: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
    },
    move: {
      enable: true,
      outModes: "out",
      speed: { min: 10, max: 15 },
      path: {
        enable: true,
        options: {
          alpha: 1.7,
          scale: 0.8,
          maxStep: 50,
        },
        generator: "levyPathGenerator",
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
