import { type ISourceOptions, half } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "pathBranches",
  name: "Path Branches",
  particles: {
    color: {
      value: [
        "#FF0000",
        "#FF2A00",
        "#FF5500",
        "#FF8000",
        "#FFAA00",
        "#FFD400",
        "#FFFF00",
        "#D4FF00",
        "#AAFF00",
        "#80FF00",
        "#55FF00",
        "#2AFF00",
        "#00FF00",
        "#00FF2A",
        "#00FF55",
        "#00FF80",
        "#00FFAA",
        "#00FFD4",
        "#00FFFF",
        "#00D4FF",
        "#00AAFF",
        "#0080FF",
        "#0055FF",
        "#002AFF",
        "#0000FF",
        "#2A00FF",
        "#5500FF",
        "#8000FF",
        "#AA00FF",
        "#D400FF",
        "#FF00FF",
        "#FF00D4",
        "#FF00AA",
        "#FF0080",
        "#FF0055",
        "#FF002A",
      ],
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
