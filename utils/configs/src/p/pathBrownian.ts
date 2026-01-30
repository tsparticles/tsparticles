import { type ISourceOptions } from "@tsparticles/engine";

const angleDeltaFactor = 18;

const options: ISourceOptions = {
  key: "pathBrownian",
  name: "Path Brownian",
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
          angleDelta: Math.PI / angleDeltaFactor,
          damping: 0.95,
        },
        generator: "brownianPathGenerator",
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
