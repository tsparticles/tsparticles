import { type ISourceOptions, half } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "pathBranches",
  name: "Path Branches",
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
          segmentLength: 25,
          branchChance: 0.35,
          maxAngle: Math.PI * half,
          speedVariation: 0.4,
        },
        generator: "branchesPathGenerator",
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
