import type { IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Avocado",
  background: "#081009",
  blendMode: "multiply",
  colors: {
    fill: {
      enable: true,
      value: [
        "#C5E1A5", // light flesh
        "#9CCC65",
        "#7CB342",
        "#558B2F",
        "#1B5E20", // peel
        "#3E2723", // pit
      ],
    },
  },
};
