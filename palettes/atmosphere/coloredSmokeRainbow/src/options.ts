import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Colored Smoke - Rainbow",
  background: "#050505",
  blendMode: "source-over",
  colors: {
    fill: {
      enable: true,
      value: [
        "#CC0000",
        "#CC6600",
        "#CCCC00",
        "#00CC00",
        "#0000CC",
        "#6600CC",
        "#CC00CC",
      ],
    },
  },
};
