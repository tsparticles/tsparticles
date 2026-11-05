import type { IPalette } from "@tsparticles/engine";

// Iris — accurate anodized rainbow
export const options: IPalette = {
  name: "Iris",
  background: "#0a0a0a",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: [
        "#F5F7FA", // metallic highlight
        "#90CAF9", // blue
        "#5C6BC0", // indigo
        "#7E57C2", // violet
        "#EC407A", // magenta/pink
        "#FFCA28", // gold/yellow
        "#26C6DA", // teal
      ],
    },
  },
};
