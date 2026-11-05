import type { IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Pac-Man",
  background: "#000000",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: [
        "#FFFD72", // Pac-Man yellow
        "#D64532", // Blinky (red ghost)
        "#78C7F5", // Inky (cyan ghost)
        "#E8AD53", // Clyde (orange ghost)
        "#E7AFD7", // Pinky (pink ghost)
      ],
    },
  },
};
