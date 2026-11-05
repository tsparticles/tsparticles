import type { IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Super Mario Bros",
  background: "#1B2A4A",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: [
        "#D13D2E", // Mario Red
        "#5AA345", // Pipe Green
        "#EC6486", // Pink
        "#F3CB4E", // Coin Yellow
        "#4B2197", // Purple
      ],
    },
  },
};
