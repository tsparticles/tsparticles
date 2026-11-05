import type { IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Tetris",
  background: "#0B0B1A",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: [
        "#6CE9ED", // I piece Cyan
        "#0000E2", // J piece Blue
        "#E5A238", // L piece Orange
        "#F0F14F", // O piece Yellow
        "#6DEA46", // S piece Green
        "#911CE7", // T piece Purple
        "#D92F20", // Z piece Red
      ],
    },
  },
};
