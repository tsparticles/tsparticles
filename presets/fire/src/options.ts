import type { ISourceOptions } from "@tsparticles/engine";

export const options: ISourceOptions = {
  fpsLimit: 40,
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
      },
    },
    paint: {
      fill: {
        color: {
          value: ["#fdcf58", "#757676", "#f27d0c", "#800909", "#f07f13"],
        },
        enable: true,
      },
    },
    opacity: {
      value: { min: 0.1, max: 0.5 },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    move: {
      enable: true,
      speed: 6,
      random: false,
    },
  },
  interactivity: {
    detectsOn: "window",
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
    },
  },
  background: {
    image: "radial-gradient(#4a0000, #000)",
  },
};
