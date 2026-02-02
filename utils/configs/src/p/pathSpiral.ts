import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "pathSpiral",
  name: "Path Spiral",
  particles: {
    color: {
      value: ["#ffffff", "#ff0000", "#00ff00", "#0000ff"],
    },
    move: {
      enable: true,
      outModes: "out",
      speed: 0,
      path: {
        enable: true,
        options: {
          maxRadius: { min: 5, max: 10 },
          angularSpeed: { min: 10, max: 15 },
          radialSpeed: { min: 3, max: 6 },
        },
        generator: "spiralPathGenerator",
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
            min: 15,
            max: 30,
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
