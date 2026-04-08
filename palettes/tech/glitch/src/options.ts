import { type IPalette } from "@tsparticles/engine";

export const options: IPalette = {
  name: "Glitch - Full RGB Shift",
  background: "#000000",
  blendMode: "screen",
  colors: {
    fill: {
      enable: true,
      value: [
        "#FF0033",
        "#00FF66",
        "#0099FF",
        "#FFFFFF",
        "#AAAAAA",
        "#000000",
      ],
    },
    stroke: [
      {
        value: [
          "#FF0033",
          "#00FF66",
          "#0099FF",
          "#CC0000",
          "#0000CC",
        ],
        width: {
          min: 0.5,
          max: 1.1,
        },
      },
      {
        value: [
          "#00FFFF",
          "#FF00FF",
          "#AAAAAA",
          "#333333",
        ],
        width: {
          min: 1.6,
          max: 3,
        },
      },
    ],
  },
};
