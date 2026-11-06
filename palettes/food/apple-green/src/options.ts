import type { IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Apple Green",
  background: "#0b0f08",
  blendMode: "multiply",
  colors: {
    fill: {
      enable: true,
      value: [
        "#F1F8E9", // light flesh
        "#DCEDC8",
        "#C5E1A5",
        "#AED581",
        "#9CCC65", // green skin
        "#7CB342",
        "#558B2F",
        "#33691E",
        "#6D4C41", // stem
      ],
    },
  },
};

export default options;
