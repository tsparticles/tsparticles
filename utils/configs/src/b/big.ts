import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "big",
  name: "Big Particles",
  particles: {
    number: {
      value: 50,
    },
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
    shape: {
      type: "circle",
    },
    opacity: {
      value: {
        min: 0.5,
        max: 0.9,
      },
    },
    size: {
      value: {
        min: 30,
        max: 400,
      },
      animation: {
        enable: true,
        speed: 50,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: { min: 3, max: 7 },
      direction: "top",
    },
  },
  background: {
    color: "rgb(250, 255, 255, 0.625)",
  },
  poisson: {
    enable: true,
  },
};

export default options;
