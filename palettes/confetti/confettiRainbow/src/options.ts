import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Confetti - Rainbow",
  background: "#1a1a2e",
  blendMode: "source-over",
  colors: {
    fill: {
      enable: true,
      value: [
        "#FF0000",
        "#FF7700",
        "#FFFF00",
        "#00CC00",
        "#0000FF",
        "#8800FF",
        "#FF0099",
      ],
    },
  },
};
