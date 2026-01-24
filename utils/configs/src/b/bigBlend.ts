import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
  key: "bigBlend",
  name: "Big Particles with Blend",
  particles: {
    number: {
      value: 30,
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
        min: 300,
        max: 400,
      },
      animation: {
        enable: true,
        speed: 100,
        sync: false,
      },
    },
    move: {
      enable: true,
      speed: 10,
      direction: "top",
    },
  },
  background: {
    color: "#ffffff",
  },
  blend: {
    enable: true,
    mode: "screen",
  },
};

export default options;
