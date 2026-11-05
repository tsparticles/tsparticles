import type { IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Apple Red",
  background: "#0b0f08",
  blendMode: "multiply",
  colors: {
    fill: {
      enable: true,
      value: [
        "#FFF8E1", // inner flesh light
        "#FFE0B2",
        "#FFCC80",
        "#E53935", // red skin
        "#C62828",
        "#AD2A2F",
        "#6D4C41", // stem
      ],
    },
  },
};

export default options;
