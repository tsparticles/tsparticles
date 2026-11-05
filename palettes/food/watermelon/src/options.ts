import type { IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Watermelon",
  background: "#FFF9F9",
  blendMode: "overlay",
  colors: {
    fill: {
      enable: true,
      value: [
        "#FFEDEE", // inner highlight (no pure white)
        "#FFD6D9",
        "#FF6B6B",
        "#FF2A2A",
        "#C62828",
        "#212121", // seeds
        "#66BB6A",
        "#2E7D32",
        "#1B5E20",
      ],
    },
  },
};
