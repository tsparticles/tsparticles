import type { IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Mermaid",
  background: "#04101a",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: [
        "#B3E5FC", // light shimmer
        "#4DD0E1",
        "#26A69A",
        "#00897B",
        "#006064", // deep sea
      ],
    },
  },
};
